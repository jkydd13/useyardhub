import { createHash, randomUUID } from "node:crypto";
import {
  getSupabaseAdminClient,
  getSupabaseUserClient,
  requireAuthenticatedUser,
} from "../../../lib/supabaseServer";
import {
  getCommerceEnvironment,
  getStripeServerClient,
  getYardHubSiteOrigin,
  HUBPASS_BUSINESS_BASE_PRODUCT_CODE,
  stripeObjectId,
  unixSecondsToIso,
} from "../../../lib/stripeServer";
import {
  getHubPassBusinessFirstMonthFreeEligibility,
} from "../../../lib/hubpassBusinessFreeMonthServer";

const ADDITIONAL_LOCATION_PRODUCT_CODE =
  "HUBPASS_BUSINESS_ADDITIONAL_LOCATION";
const FIRST_MONTH_FREE_DISCOUNT_CODE =
  "HUBPASS_BUSINESS_FIRST_MONTH_FREE";
const MAX_BASES_PER_BATCH = 100;
const MAX_ADDITIONAL_LOCATIONS_PER_BATCH = 100;

function sendJson(res, statusCode, body) {
  res.status(statusCode).json(body);
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    String(value ?? "")
  );
}

function asWholeNumber(value, fallback = 0) {
  const number = Number(value);
  if (!Number.isInteger(number)) return fallback;
  return number;
}

function normalizeCheckoutRequest(body) {
  const rawBusinesses = Array.isArray(body?.businesses)
    ? body.businesses
    : [];
  const rawExisting = Array.isArray(body?.existingBaseAdditions)
    ? body.existingBaseAdditions
    : [];

  // Backward-compatible default: an empty POST means one new Business base.
  const businesses = (
    rawBusinesses.length > 0 || rawExisting.length > 0
      ? rawBusinesses
      : [{ additionalLocations: 0 }]
  ).map((entry, index) => {
    const additionalLocations = asWholeNumber(entry?.additionalLocations, -1);

    if (
      additionalLocations < 0 ||
      additionalLocations > MAX_ADDITIONAL_LOCATIONS_PER_BATCH
    ) {
      throw new Error(`Additional-location quantity is invalid for Business ${index + 1}.`);
    }

    return {
      baseUnitIndex: index + 1,
      additionalLocations,
    };
  });

  if (businesses.length > MAX_BASES_PER_BATCH) {
    throw new Error(
      `A single checkout can include at most ${MAX_BASES_PER_BATCH} new Businesses.`
    );
  }

  const existingById = new Map();

  for (const entry of rawExisting) {
    const id = String(entry?.hubpassBusinessSubscriptionId ?? "").trim();
    const additionalLocations = asWholeNumber(entry?.additionalLocations, -1);

    if (!isUuid(id)) {
      throw new Error("An existing HubPass Business entitlement ID is invalid.");
    }

    if (
      additionalLocations < 1 ||
      additionalLocations > MAX_ADDITIONAL_LOCATIONS_PER_BATCH
    ) {
      throw new Error("Additional-location quantity must be at least 1.");
    }

    existingById.set(id, (existingById.get(id) ?? 0) + additionalLocations);
  }

  const existingBaseAdditions = Array.from(existingById.entries())
    .map(([hubpassBusinessSubscriptionId, additionalLocations]) => ({
      hubpassBusinessSubscriptionId,
      additionalLocations,
    }))
    .sort((a, b) =>
      a.hubpassBusinessSubscriptionId.localeCompare(
        b.hubpassBusinessSubscriptionId
      )
    );

  const baseQuantity = businesses.length;
  const additionalLocationQuantity =
    businesses.reduce((sum, item) => sum + item.additionalLocations, 0) +
    existingBaseAdditions.reduce(
      (sum, item) => sum + item.additionalLocations,
      0
    );

  if (baseQuantity < 1 && additionalLocationQuantity < 1) {
    throw new Error("Add at least one Business or one additional location.");
  }

  if (additionalLocationQuantity > MAX_ADDITIONAL_LOCATIONS_PER_BATCH) {
    throw new Error(
      `A single checkout can include at most ${MAX_ADDITIONAL_LOCATIONS_PER_BATCH} additional locations.`
    );
  }

  return {
    businesses,
    existingBaseAdditions,
    baseQuantity,
    additionalLocationQuantity,
  };
}

function normalizedOrigin(value) {
  try {
    return new URL(String(value ?? "")).origin;
  } catch {
    return "";
  }
}

function checkoutFingerprint(request, siteOrigin) {
  const stable = JSON.stringify({
    sourceOrigin: normalizedOrigin(siteOrigin),
    businesses: request.businesses.map((item) => ({
      baseUnitIndex: item.baseUnitIndex,
      additionalLocations: item.additionalLocations,
    })),
    existingBaseAdditions: request.existingBaseAdditions,
  });

  return createHash("sha256").update(stable).digest("hex");
}

async function getActivePriceMapping(admin, environment, productCode) {
  const { data, error } = await admin
    .from("commerce_provider_price_mappings")
    .select("provider_product_id,provider_price_id")
    .eq("provider", "stripe")
    .eq("environment", environment)
    .eq("product_code", productCode)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw error;
  if (!data) {
    throw new Error(`Stripe price mapping is missing for ${productCode}.`);
  }

  return data;
}

async function getFirstMonthFreeDiscount(admin, environment) {
  const { data, error } = await admin
    .from("commerce_provider_discount_mappings")
    .select("provider_discount_id")
    .eq("provider", "stripe")
    .eq("environment", environment)
    .eq("discount_code", FIRST_MONTH_FREE_DISCOUNT_CODE)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw error;
  if (!data?.provider_discount_id) {
    throw new Error(
      "The HubPass Business first-month-free Stripe coupon is not registered."
    );
  }

  return data.provider_discount_id;
}

async function validateExistingBaseTargets({
  admin,
  ownerUserId,
  targets,
}) {
  if (!targets.length) return [];

  const ids = targets.map((item) => item.hubpassBusinessSubscriptionId);
  const { data, error } = await admin
    .from("hubpass_business_subscriptions")
    .select("id,assigned_business_id,status,entitlement_grant_id")
    .eq("owner_user_id", ownerUserId)
    .in("id", ids);

  if (error) throw error;

  const byId = new Map((data ?? []).map((row) => [row.id, row]));

  for (const target of targets) {
    const base = byId.get(target.hubpassBusinessSubscriptionId);
    if (!base || base.status !== "active" || !base.entitlement_grant_id) {
      const error = new Error(
        "Additional locations require an active HubPass Business base entitlement."
      );
      error.statusCode = 409;
      error.code = "ACTIVE_BASE_REQUIRED_FOR_LOCATION";
      throw error;
    }
  }

  return data ?? [];
}

async function findReusableOrExpireOpenCheckout({
  admin,
  stripe,
  ownerUserId,
  environment,
  cartFingerprint,
  siteOrigin,
}) {
  const { data, error } = await admin
    .from("commerce_checkout_sessions")
    .select(
      "id,provider_checkout_session_id,status,expires_at,request_context"
    )
    .eq("owner_user_id", ownerUserId)
    .eq("provider", "stripe")
    .eq("environment", environment)
    .in("product_code", [
      HUBPASS_BUSINESS_BASE_PRODUCT_CODE,
      ADDITIONAL_LOCATION_PRODUCT_CODE,
    ])
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
      const sameCart =
        data.request_context?.cart_fingerprint === cartFingerprint;
      const sameOrigin =
        normalizedOrigin(session.success_url) === normalizedOrigin(siteOrigin);

      if (sameCart && sameOrigin) {
        return session;
      }

      await stripe.checkout.sessions.expire(session.id);
      await admin
        .from("commerce_checkout_sessions")
        .update({ status: "expired" })
        .eq("id", data.id);
      return null;
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
    console.warn("YardHub could not inspect an older Stripe Checkout Session.", {
      checkoutSessionId: data.provider_checkout_session_id,
      message: error?.message,
    });
  }

  return null;
}


async function getCurrentHubPassCounts(userClient) {
  const { data, error } = await userClient.rpc(
    "get_my_business_entitlements"
  );

  if (error) throw error;

  const rows = Array.isArray(data) ? data : [];
  const activeRows = rows.filter(
    (item) => item?.entitlement_status === "active"
  );

  return {
    activeBaseCount: activeRows.length,
    activeAdditionalLocationCount: activeRows.reduce(
      (sum, item) =>
        sum + Number(item?.additional_location_entitlement_count ?? 0),
      0
    ),
  };
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
    const userClient = getSupabaseUserClient(req);
    const admin = getSupabaseAdminClient();
    const stripe = getStripeServerClient();
    const environment = getCommerceEnvironment();
    const siteOrigin = getYardHubSiteOrigin(req);
    const checkoutRequest = normalizeCheckoutRequest(req.body ?? {});
    const cartFingerprint = checkoutFingerprint(checkoutRequest, siteOrigin);

    await validateExistingBaseTargets({
      admin,
      ownerUserId: user.id,
      targets: checkoutRequest.existingBaseAdditions,
    });

    const reusableSession = await findReusableOrExpireOpenCheckout({
      admin,
      stripe,
      ownerUserId: user.id,
      environment,
      cartFingerprint,
      siteOrigin,
    });

    if (reusableSession) {
      return sendJson(res, 200, {
        url: reusableSession.url,
        reused: true,
      });
    }

    const firstMonthFreeEligibility =
      await getHubPassBusinessFirstMonthFreeEligibility({
        admin,
        ownerUserId: user.id,
        environment,
      });

    const currentCounts = await getCurrentHubPassCounts(userClient);

    const firstMonthFree =
      checkoutRequest.baseQuantity > 0 && firstMonthFreeEligibility.eligible;
    const expectedBaseCount =
      currentCounts.activeBaseCount + checkoutRequest.baseQuantity;
    const expectedAdditionalLocationCount =
      currentCounts.activeAdditionalLocationCount +
      checkoutRequest.additionalLocationQuantity;

    const [baseMapping, locationMapping] = await Promise.all([
      checkoutRequest.baseQuantity > 0
        ? getActivePriceMapping(
            admin,
            environment,
            HUBPASS_BUSINESS_BASE_PRODUCT_CODE
          )
        : Promise.resolve(null),
      checkoutRequest.additionalLocationQuantity > 0
        ? getActivePriceMapping(
            admin,
            environment,
            ADDITIONAL_LOCATION_PRODUCT_CODE
          )
        : Promise.resolve(null),
    ]);

    const firstMonthFreeCoupon = firstMonthFree
      ? await getFirstMonthFreeDiscount(admin, environment)
      : null;

    const providerCustomerId = await getOrCreateStripeCustomer({
      admin,
      stripe,
      user,
      environment,
    });

    const batchKey = randomUUID();
    const idempotencyKey = [
      "yardhub",
      environment,
      user.id,
      "hubpass-business-batch",
      batchKey,
    ].join(":");

    const lineItems = [];
    if (baseMapping) {
      lineItems.push({
        price: baseMapping.provider_price_id,
        quantity: checkoutRequest.baseQuantity,
      });
    }
    if (locationMapping) {
      lineItems.push({
        price: locationMapping.provider_price_id,
        quantity: checkoutRequest.additionalLocationQuantity,
      });
    }

    const allocationPlan = {
      version: 1,
      new_businesses: checkoutRequest.businesses.map((item) => ({
        base_unit_index: item.baseUnitIndex,
        additional_location_count: item.additionalLocations,
      })),
      existing_bases: checkoutRequest.existingBaseAdditions.map((item) => ({
        hubpass_business_subscription_id:
          item.hubpassBusinessSubscriptionId,
        additional_location_count: item.additionalLocations,
      })),
    };

    const subscriptionData = {
      metadata: {
        yardhub_user_id: user.id,
        yardhub_environment: environment,
        yardhub_batch_key: batchKey,
        yardhub_base_quantity: String(checkoutRequest.baseQuantity),
        yardhub_additional_location_quantity: String(
          checkoutRequest.additionalLocationQuantity
        ),
        yardhub_first_month_free: firstMonthFree ? "true" : "false",
      },
    };

    const sessionParams = {
      mode: "subscription",
      origin_context: "web",
      payment_method_collection: "always",
      customer: providerCustomerId,
      client_reference_id: user.id,
      line_items: lineItems,
      metadata: {
        yardhub_user_id: user.id,
        yardhub_environment: environment,
        yardhub_batch_key: batchKey,
      },
      subscription_data: subscriptionData,
      success_url: `${siteOrigin}/account/hubpass-business-activated?session_id={CHECKOUT_SESSION_ID}&free_month=${
        firstMonthFree ? "1" : "0"
      }&mode=${
        checkoutRequest.baseQuantity > 0 ? "businesses" : "locations"
      }&expected_bases=${expectedBaseCount}&expected_locations=${expectedAdditionalLocationCount}`,
      cancel_url: `${siteOrigin}/account/subscriptions?checkout=cancelled`,
    };

    if (firstMonthFreeCoupon) {
      sessionParams.discounts = [{ coupon: firstMonthFreeCoupon }];
    }

    createdSession = await stripe.checkout.sessions.create(
      sessionParams,
      { idempotencyKey }
    );

    const providerCustomerFromSession =
      stripeObjectId(createdSession.customer) || providerCustomerId;
    const primaryProductCode =
      checkoutRequest.baseQuantity > 0
        ? HUBPASS_BUSINESS_BASE_PRODUCT_CODE
        : ADDITIONAL_LOCATION_PRODUCT_CODE;
    const primaryQuantity =
      checkoutRequest.baseQuantity > 0
        ? checkoutRequest.baseQuantity
        : checkoutRequest.additionalLocationQuantity;

    const { error: registerError } = await admin.rpc(
      "commerce_register_stripe_checkout_session",
      {
        p_owner_user_id: user.id,
        p_environment: environment,
        p_product_code: primaryProductCode,
        p_provider_checkout_session_id: createdSession.id,
        p_idempotency_key: idempotencyKey,
        p_provider_customer_id: providerCustomerFromSession,
        p_quantity: primaryQuantity,
        p_expires_at: unixSecondsToIso(createdSession.expires_at),
        p_request_context: {
          source: "yardhub_website",
          route: "/account/hubpass-business-checkout",
          source_origin: normalizedOrigin(siteOrigin),
          batch_key: batchKey,
          cart_fingerprint: cartFingerprint,
          base_quantity: checkoutRequest.baseQuantity,
          additional_location_quantity:
            checkoutRequest.additionalLocationQuantity,
          first_month_free_applied: firstMonthFree,
          first_month_free_next_eligible_at:
            firstMonthFreeEligibility.nextEligibleAt,
          allocation_plan: allocationPlan,
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
      firstMonthFree,
      baseQuantity: checkoutRequest.baseQuantity,
      additionalLocationQuantity: checkoutRequest.additionalLocationQuantity,
      nextFirstMonthFreeEligibleAt:
        firstMonthFreeEligibility.nextEligibleAt,
    });
  } catch (error) {
    const statusCode = Number(error?.statusCode) || 500;

    console.error("YardHub Stripe Checkout Session error", {
      message: error?.message,
      code: error?.code,
      checkoutSessionId: createdSession?.id ?? null,
    });

    return sendJson(res, statusCode, {
      error:
        statusCode === 401 || statusCode === 409
          ? error.message
          : "YardHub could not start Stripe Checkout. Please try again.",
      code: error?.code ?? null,
    });
  }
}
