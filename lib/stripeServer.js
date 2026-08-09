import Stripe from "stripe";

let stripeClient = null;

export const HUBPASS_BUSINESS_BASE_PRODUCT_CODE = "HUBPASS_BUSINESS_BASE";

export function getCommerceEnvironment() {
  const value = String(
    process.env.YARDHUB_COMMERCE_ENVIRONMENT ?? "test"
  ).toLowerCase();

  if (!['test', 'live'].includes(value)) {
    throw new Error(
      "YARDHUB_COMMERCE_ENVIRONMENT must be either test or live."
    );
  }

  return value;
}

function validateStripeSecretForEnvironment(secretKey, environment) {
  const isTestKey =
    secretKey.startsWith("sk_test_") || secretKey.startsWith("rk_test_");
  const isLiveKey =
    secretKey.startsWith("sk_live_") || secretKey.startsWith("rk_live_");

  if (environment === "test" && !isTestKey) {
    throw new Error(
      "YardHub is configured for test commerce, but STRIPE_SECRET_KEY is not a Stripe test key."
    );
  }

  if (environment === "live" && !isLiveKey) {
    throw new Error(
      "YardHub is configured for live commerce, but STRIPE_SECRET_KEY is not a Stripe live key."
    );
  }
}

export function getStripeServerClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY.");
  }

  const environment = getCommerceEnvironment();
  validateStripeSecretForEnvironment(secretKey, environment);

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      appInfo: {
        name: "YardHub",
        version: "0.1.0",
      },
      maxNetworkRetries: 2,
    });
  }

  return stripeClient;
}

export function getStripeWebhookSecret() {
  const value = process.env.STRIPE_WEBHOOK_SECRET;

  if (!value) {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET.");
  }

  if (!value.startsWith("whsec_")) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not a Stripe webhook secret.");
  }

  return value;
}

export function getYardHubSiteOrigin(req) {
  const configured = String(process.env.YARDHUB_SITE_URL ?? "")
    .trim()
    .replace(/\/$/, "");

  if (configured) {
    return configured;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Missing YARDHUB_SITE_URL in production.");
  }

  const forwardedHost = String(req.headers["x-forwarded-host"] ?? "").trim();
  const host = forwardedHost || String(req.headers.host ?? "").trim();
  const forwardedProto = String(req.headers["x-forwarded-proto"] ?? "").trim();
  const protocol = forwardedProto || "http";

  if (!host) {
    return "http://127.0.0.1:3000";
  }

  return `${protocol}://${host}`;
}

export function stripeObjectId(value) {
  if (typeof value === "string") return value;
  if (value && typeof value.id === "string") return value.id;
  return "";
}

export function unixSecondsToIso(value) {
  if (!Number.isFinite(value)) return null;
  return new Date(value * 1000).toISOString();
}

export function oneCalendarMonthFromNowUnix() {
  const date = new Date();
  date.setUTCMonth(date.getUTCMonth() + 1);
  return Math.floor(date.getTime() / 1000);
}
