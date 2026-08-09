import { getSupabaseAdminClient } from "../../../lib/supabaseServer";
import {
  getCommerceEnvironment,
  getStripeServerClient,
  getStripeWebhookSecret,
  HUBPASS_BUSINESS_BASE_PRODUCT_CODE,
  stripeObjectId,
  unixSecondsToIso,
} from "../../../lib/stripeServer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const SUBSCRIPTION_EVENT_TYPES = new Set([
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "customer.subscription.paused",
  "customer.subscription.resumed",
]);

async function readRawBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return Buffer.concat(chunks);
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    String(value ?? "")
  );
}

async function claimWebhookEvent(admin, event, environment) {
  const { data, error } = await admin.rpc(
    "commerce_claim_stripe_webhook_event",
    {
      p_environment: environment,
      p_provider_event_id: event.id,
      p_event_type: event.type,
      p_livemode: event.livemode,
      p_payload: event,
    }
  );

  if (error) throw error;

  const claim = Array.isArray(data) ? data[0] : data;
  if (!claim?.commerce_webhook_event_id) {
    throw new Error("Stripe webhook claim did not return an event ID.");
  }

  return claim;
}

async function finishWebhookEvent(admin, eventId, outcome, errorMessage = null) {
  const { error } = await admin.rpc("commerce_finish_stripe_webhook_event", {
    p_commerce_webhook_event_id: eventId,
    p_outcome: outcome,
    p_error: errorMessage,
  });

  if (error) throw error;
}

async function getBasePriceMapping(admin, environment) {
  const { data, error } = await admin
    .from("commerce_provider_price_mappings")
    .select("provider_product_id,provider_price_id")
    .eq("provider", "stripe")
    .eq("environment", environment)
    .eq("product_code", HUBPASS_BUSINESS_BASE_PRODUCT_CODE)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw error;
  return data ?? null;
}

function findBaseSubscriptionItem(subscription, mapping) {
  if (!mapping) return null;

  return (subscription?.items?.data ?? []).find((item) => {
    const priceId = stripeObjectId(item?.price);
    const productId = stripeObjectId(item?.price?.product);

    return (
      priceId === mapping.provider_price_id &&
      productId === mapping.provider_product_id
    );
  });
}

async function resolveOwnerUserId({
  admin,
  stripe,
  environment,
  subscription,
  fallbackUserId,
}) {
  const metadataUserId = subscription?.metadata?.yardhub_user_id;
  if (isUuid(metadataUserId)) return metadataUserId;
  if (isUuid(fallbackUserId)) return fallbackUserId;

  const providerCustomerId = stripeObjectId(subscription?.customer);

  if (providerCustomerId) {
    const { data, error } = await admin
      .from("commerce_customers")
      .select("owner_user_id")
      .eq("provider", "stripe")
      .eq("environment", environment)
      .eq("provider_customer_id", providerCustomerId)
      .maybeSingle();

    if (error) throw error;
    if (isUuid(data?.owner_user_id)) return data.owner_user_id;

    const customer = await stripe.customers.retrieve(providerCustomerId);
    if (!customer.deleted && isUuid(customer.metadata?.yardhub_user_id)) {
      return customer.metadata.yardhub_user_id;
    }
  }

  return null;
}

async function syncHubPassBusinessBase({
  admin,
  stripe,
  environment,
  subscription,
  webhookEventId,
  fallbackUserId,
}) {
  const mapping = await getBasePriceMapping(admin, environment);
  const item = findBaseSubscriptionItem(subscription, mapping);

  if (!item) {
    return { handled: false };
  }

  const ownerUserId = await resolveOwnerUserId({
    admin,
    stripe,
    environment,
    subscription,
    fallbackUserId,
  });

  if (!ownerUserId) {
    return { handled: false };
  }

  const providerCustomerId = stripeObjectId(subscription.customer);
  const providerProductId = stripeObjectId(item.price?.product);
  const providerPriceId = stripeObjectId(item.price);

  if (!providerCustomerId || !providerProductId || !providerPriceId) {
    throw new Error("Stripe subscription identifiers are incomplete.");
  }

  const currentPeriodStart =
    item.current_period_start ?? subscription.current_period_start ?? null;
  const currentPeriodEnd =
    item.current_period_end ?? subscription.current_period_end ?? null;

  const { data, error } = await admin.rpc(
    "commerce_sync_hubpass_business_base_subscription",
    {
      p_owner_user_id: ownerUserId,
      p_environment: environment,
      p_provider_customer_id: providerCustomerId,
      p_provider_subscription_id: subscription.id,
      p_provider_subscription_item_id: item.id,
      p_provider_product_id: providerProductId,
      p_provider_price_id: providerPriceId,
      p_provider_subscription_status: subscription.status,
      p_current_period_start: unixSecondsToIso(currentPeriodStart),
      p_current_period_end: unixSecondsToIso(currentPeriodEnd),
      p_trial_ends_at: unixSecondsToIso(subscription.trial_end),
      p_grace_period_ends_at: null,
      p_cancel_at_period_end: Boolean(subscription.cancel_at_period_end),
      p_cancelled_at: unixSecondsToIso(subscription.canceled_at),
      p_started_at: unixSecondsToIso(
        subscription.start_date ?? subscription.created
      ),
      p_commerce_webhook_event_id: webhookEventId,
    }
  );

  if (error) throw error;
  return { handled: true, result: data };
}

async function retrieveSubscription(stripe, subscriptionId) {
  return stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["items.data.price.product"],
  });
}

async function updateCheckoutSession(admin, session, status) {
  const providerSubscriptionId = stripeObjectId(session.subscription) || null;
  const providerCustomerId = stripeObjectId(session.customer) || null;

  const update = {
    status,
    provider_subscription_id: providerSubscriptionId,
    provider_customer_id: providerCustomerId,
  };

  if (status === "complete") {
    update.completed_at = new Date().toISOString();
  }

  const { error } = await admin
    .from("commerce_checkout_sessions")
    .update(update)
    .eq("provider", "stripe")
    .eq("environment", getCommerceEnvironment())
    .eq("provider_checkout_session_id", session.id);

  if (error) throw error;
}

async function processStripeEvent({
  admin,
  stripe,
  event,
  environment,
  webhookEventId,
}) {
  if (event.type === "checkout.session.expired") {
    await updateCheckoutSession(admin, event.data.object, "expired");
    return "processed";
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await updateCheckoutSession(admin, session, "complete");

    const subscriptionId = stripeObjectId(session.subscription);
    if (!subscriptionId) return "processed";

    const subscription = await retrieveSubscription(stripe, subscriptionId);
    const result = await syncHubPassBusinessBase({
      admin,
      stripe,
      environment,
      subscription,
      webhookEventId,
      fallbackUserId:
        session.metadata?.yardhub_user_id ?? session.client_reference_id,
    });

    return result.handled ? "processed" : "ignored";
  }

  if (SUBSCRIPTION_EVENT_TYPES.has(event.type)) {
    let subscription = event.data.object;

    if (event.type !== "customer.subscription.deleted") {
      subscription = await retrieveSubscription(stripe, subscription.id);
    }

    const result = await syncHubPassBusinessBase({
      admin,
      stripe,
      environment,
      subscription,
      webhookEventId,
      fallbackUserId: null,
    });

    return result.handled ? "processed" : "ignored";
  }

  return "ignored";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const stripe = getStripeServerClient();
  const admin = getSupabaseAdminClient();
  const configuredEnvironment = getCommerceEnvironment();
  let webhookEventId = null;

  try {
    const rawBody = await readRawBody(req);
    const signature = req.headers["stripe-signature"];

    if (!signature) {
      return res.status(400).json({ error: "Missing Stripe signature." });
    }

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      getStripeWebhookSecret()
    );
    const eventEnvironment = event.livemode ? "live" : "test";

    if (eventEnvironment !== configuredEnvironment) {
      return res.status(400).json({ error: "Stripe environment mismatch." });
    }

    const claim = await claimWebhookEvent(admin, event, eventEnvironment);
    webhookEventId = claim.commerce_webhook_event_id;

    if (!claim.should_process) {
      return res.status(200).json({ received: true, duplicate: true });
    }

    const outcome = await processStripeEvent({
      admin,
      stripe,
      event,
      environment: eventEnvironment,
      webhookEventId,
    });

    await finishWebhookEvent(admin, webhookEventId, outcome);
    return res.status(200).json({ received: true, outcome });
  } catch (error) {
    console.error("YardHub Stripe webhook error", {
      message: error?.message,
      webhookEventId,
    });

    if (webhookEventId) {
      try {
        await finishWebhookEvent(
          admin,
          webhookEventId,
          "failed",
          error?.message ?? "unknown_error"
        );
      } catch (finishError) {
        console.error("YardHub could not mark the webhook event failed", {
          message: finishError?.message,
          webhookEventId,
        });
      }
    }

    return res.status(400).json({
      error: "YardHub could not verify or process this Stripe event.",
    });
  }
}
