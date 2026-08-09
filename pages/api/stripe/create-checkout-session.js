import { randomUUID } from "node:crypto";
import {
  getSupabaseAdminClient,
  requireAuthenticatedUser,
} from "../../../lib/supabaseServer";
import {
  getCommerceEnvironment,
  getStripeServerClient,
  getYardHubSiteOrigin,
  HUBPASS_BUSINESS_BASE_PRODUCT_CODE,
  oneCalendarMonthFromNowUnix,
  stripeObjectId,
  unixSecondsToIso,
} from "../../../lib/stripeServer";

const NON_TERMINAL_SUBSCRIPTION_STATUSES = new Set([
  "active",
  "past_due",
  "grace_period",
  "suspended",
]);

function sendJson(res, statusCode, body) {
  res.status(statusCode).json(body);
}

async function getBaseSubscriptionHistory(admin, ownerUserId, environment) {
  const { data: subscriptions, error: subscriptionsError } = await admin
    .from("commerce_subscriptions")
    .select("id,status,started_at,created_at")
    .eq("owner_user_id", ownerUserId)
    .eq("provider", "stripe")
    .eq("environment", environment)
    .order("created_at", { ascending: false });

  if (subscriptionsError) throw subscriptionsError;
  if (!subscriptions?.length) return [];

  const subscriptionIds = subscriptions.map((item) => item.id);
  const { data: items, error: itemsError } = await admin
    .from("commerce_subscription_items")
    .select("subscription_id")
    .eq("provider", "stripe")
    .eq("environment", environment)
    .eq("product_code", HUBPASS_BUSINESS_BASE_PRODUCT_CODE)
    .in("subscription_id", subscriptionIds);

  if (itemsError) throw itemsError;

  const baseSubscriptionIds = new Set(
    (items ?? []).map((item) => item.subscription_id)
  );

  return subscriptions.filter((item) => baseSubscriptionIds.has(item.id));
}

function hasCurrentBaseSubscription(history) {
  return history.some((item) =>
    NON_TERMINAL_SUBSCRIPTION_STATUSES.has(item.status)
  );
}

function isTrialEligible(history) {
  const eligibilityBoundary = new Date();
  eligibilityBoundary.setUTCFullYear(eligibilityBoundary.getUTCFullYear() - 1);

  return !history.some((item) => {
    const startedAt = new Date(item.started_at ?? item.created_at ?? 0);
    return Number.isFinite(startedAt.getTime()) && startedAt >= eligibilityBoundary;
  });
}

async function hasRecentCompletedCheckout({
  admin,
  ownerUserId,
  environment,
}) {
  const boundary = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await admin
    .from("commerce_checkout_sessions")
    .select("id")
    .eq("owner_user_id", ownerUserId)
    .eq("provider", "stripe")
    .eq("environment", environment)
    .eq("product_code", HUBPASS_BUSINESS_BASE_PRODUCT_CODE)
    .eq("status", "complete")
    .gte("completed_at", boundary)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return Boolean(data);
}

async function getActivePriceMapping(admin, environment) {
  const { data, error } = await admin
    .from("commerce_provider_price_mappings")
    .select("provider_product_id,provider_price_id")
    .eq("provider", "stripe")
    .eq("environment", environment)
    .eq("product_code", HUBPASS_BUSINESS_BASE_PRODUCT_CODE)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw error;
  if (!data) {
    throw new Error("The HubPass Business Stripe test price is not registered.");
  }

  return data;
}

async function findReusableCheckoutSession({
  admin,
  stripe,
  ownerUserId,
  environment,
}) {
  const { data, error } = await admin
    .from("commerce_checkout_sessions")
    .select("id,provider_checkout_session_id,status,expires_at")
    .eq("owner_user_id", ownerUserId)
    .eq("provider", "stripe")
    .eq("environment", environment)
    .eq("product_code", HUBPASS_BUSINESS_BASE_PRODUCT_CODE)
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const expiresAt = data.expires_at ? new Date(data.expires_at) : null;
  if (expiresAt && expiresAt <= new Date()) {
    await admin
      .from("commerce_checkout_sessions")
      .update({ status: "expired" })
      .eq("id", data.id);
    return null;
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(
      data.provider_checkout_session_id
    );

    if (session.status === "open" && session.url) {
      return session;
    }

    const nextStatus = session.status === "complete" ? "complete" : "expired";
    await admin
      .from("commerce_checkout_sessions")
      .update({
        status: nextStatus,
        completed_at:
          nextStatus === "complete" ? new Date().toISOString() : null,
      })
      .eq("id", data.id);
  } catch (error) {
    console.warn("YardHub could not reuse an older Stripe Checkout Session.", {
      checkoutSessionId: data.provider_checkout_session_id,
      message: error?.message,
    });
  }

  return null;
}

async function getOrCreateStripeCustomer({
  admin,
  stripe,
  user,
  environment,
}) {
  const { data: existing, error } = await admin
    .from("commerce_customers")
    .select("provider_customer_id")
    .eq("owner_user_id", user.id)
    .eq("provider", "stripe")
    .eq("environment", environment)
    .maybeSingle();

  if (error) throw error;

  if (existing?.provider_customer_id) {
    try {
      const customer = await stripe.customers.retrieve(
        existing.provider_customer_id
      );

      if (!customer.deleted) {
        return existing.provider_customer_id;
      }
    } catch (retrieveError) {
      console.warn("YardHub is replacing an unavailable Stripe customer.", {
        message: retrieveError?.message,
      });
    }
  }

  const customer = await stripe.customers.create({
    email: user.email ?? undefined,
    metadata: {
      yardhub_user_id: user.id,
      yardhub_environment: environment,
    },
  });

  const { error: upsertError } = await admin.rpc(
    "commerce_upsert_stripe_customer",
    {
      p_owner_user_id: user.id,
      p_environment: environment,
      p_provider_customer_id: customer.id,
    }
  );

  if (upsertError) throw upsertError;
  return customer.id;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  let createdSession = null;

  try {
    const user = await requireAuthenticatedUser(req);
    const admin = getSupabaseAdminClient();
    const stripe = getStripeServerClient();
    const environment = getCommerceEnvironment();
    const siteOrigin = getYardHubSiteOrigin(req);

    const history = await getBaseSubscriptionHistory(
      admin,
      user.id,
      environment
    );

    if (hasCurrentBaseSubscription(history)) {
      return sendJson(res, 409, {
        error:
          "This YardHub account already has a current HubPass Business subscription.",
        code: "HUBPASS_BUSINESS_ALREADY_CURRENT",
      });
    }

    const checkoutIsSyncing = await hasRecentCompletedCheckout({
      admin,
      ownerUserId: user.id,
      environment,
    });

    if (checkoutIsSyncing) {
      return sendJson(res, 409, {
        error:
          "Stripe Checkout is complete and YardHub is still synchronizing Business access. Refresh status in a moment.",
        code: "HUBPASS_BUSINESS_SYNCING",
      });
    }

    const reusableSession = await findReusableCheckoutSession({
      admin,
      stripe,
      ownerUserId: user.id,
      environment,
    });

    if (reusableSession) {
      return sendJson(res, 200, {
        url: reusableSession.url,
        reused: true,
      });
    }

    const mapping = await getActivePriceMapping(admin, environment);
    const providerCustomerId = await getOrCreateStripeCustomer({
      admin,
      stripe,
      user,
      environment,
    });
    const trialEligible = isTrialEligible(history);
    const idempotencyKey = [
      "yardhub",
      environment,
      user.id,
      HUBPASS_BUSINESS_BASE_PRODUCT_CODE,
      randomUUID(),
    ].join(":");

    const subscriptionData = {
      metadata: {
        yardhub_user_id: user.id,
        yardhub_product_code: HUBPASS_BUSINESS_BASE_PRODUCT_CODE,
        yardhub_environment: environment,
        yardhub_trial_eligible: trialEligible ? "true" : "false",
      },
    };

    if (trialEligible) {
      subscriptionData.trial_end = oneCalendarMonthFromNowUnix();
    }

    createdSession = await stripe.checkout.sessions.create(
      {
        mode: "subscription",
        origin_context: "web",
        payment_method_collection: "always",
        customer: providerCustomerId,
        client_reference_id: user.id,
        line_items: [
          {
            price: mapping.provider_price_id,
            quantity: 1,
          },
        ],
        metadata: {
          yardhub_user_id: user.id,
          yardhub_product_code: HUBPASS_BUSINESS_BASE_PRODUCT_CODE,
          yardhub_environment: environment,
        },
        subscription_data: subscriptionData,
        success_url: `${siteOrigin}/account/subscriptions?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteOrigin}/account/subscriptions?checkout=cancelled`,
      },
      { idempotencyKey }
    );

    const providerCustomerFromSession =
      stripeObjectId(createdSession.customer) || providerCustomerId;

    const { error: registerError } = await admin.rpc(
      "commerce_register_stripe_checkout_session",
      {
        p_owner_user_id: user.id,
        p_environment: environment,
        p_product_code: HUBPASS_BUSINESS_BASE_PRODUCT_CODE,
        p_provider_checkout_session_id: createdSession.id,
        p_idempotency_key: idempotencyKey,
        p_provider_customer_id: providerCustomerFromSession,
        p_quantity: 1,
        p_expires_at: unixSecondsToIso(createdSession.expires_at),
        p_request_context: {
          source: "yardhub_website",
          route: "/account/subscriptions",
          trial_eligible: trialEligible,
        },
      }
    );

    if (registerError) {
      try {
        await stripe.checkout.sessions.expire(createdSession.id);
      } catch (expireError) {
        console.warn("YardHub could not expire an unregistered Checkout Session.", {
          checkoutSessionId: createdSession.id,
          message: expireError?.message,
        });
      }

      throw registerError;
    }

    return sendJson(res, 200, {
      url: createdSession.url,
      reused: false,
    });
  } catch (error) {
    const statusCode = Number(error?.statusCode) || 500;

    console.error("YardHub Stripe Checkout Session error", {
      message: error?.message,
      checkoutSessionId: createdSession?.id ?? null,
    });

    return sendJson(res, statusCode, {
      error:
        statusCode === 401
          ? error.message
          : "YardHub could not start Stripe Checkout. Please try again.",
    });
  }
}
