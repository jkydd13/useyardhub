const HUBPASS_BUSINESS_BASE_PRODUCT_CODE = "HUBPASS_BUSINESS_BASE";

function asTrue(value) {
  return value === true || String(value ?? "").toLowerCase() === "true";
}

function addOneYear(value) {
  const next = new Date(value);
  next.setUTCFullYear(next.getUTCFullYear() + 1);
  return next;
}

/**
 * The free-month clock is based ONLY on a checkout batch that actually received
 * YardHub's first-month-free benefit. Later full-price Business checkouts do not
 * restart the rolling 12-month window.
 *
 * Backward compatibility:
 * - older Stripe trial corridor rows used request_context.trial_eligible=true
 * - stacked discount rows use request_context.first_month_free_applied=true
 */
export async function getHubPassBusinessFirstMonthFreeEligibility({
  admin,
  ownerUserId,
  environment,
  now = new Date(),
}) {
  const { data, error } = await admin
    .from("commerce_checkout_sessions")
    .select("status,request_context,completed_at,created_at")
    .eq("owner_user_id", ownerUserId)
    .eq("provider", "stripe")
    .eq("environment", environment)
    .eq("product_code", HUBPASS_BUSINESS_BASE_PRODUCT_CODE)
    .eq("status", "complete")
    .order("completed_at", { ascending: false, nullsFirst: false })
    .limit(250);

  if (error) throw error;

  let mostRecentBenefitAt = null;

  for (const row of data ?? []) {
    const context = row?.request_context ?? {};
    const receivedBenefit =
      asTrue(context.first_month_free_applied) ||
      asTrue(context.trial_eligible);

    if (!receivedBenefit) continue;

    const timestamp = new Date(row.completed_at ?? row.created_at ?? 0);
    if (!Number.isFinite(timestamp.getTime())) continue;

    if (!mostRecentBenefitAt || timestamp > mostRecentBenefitAt) {
      mostRecentBenefitAt = timestamp;
    }
  }

  if (!mostRecentBenefitAt) {
    return {
      eligible: true,
      lastBenefitAt: null,
      nextEligibleAt: null,
    };
  }

  const nextEligibleAt = addOneYear(mostRecentBenefitAt);

  return {
    eligible: now >= nextEligibleAt,
    lastBenefitAt: mostRecentBenefitAt.toISOString(),
    nextEligibleAt: nextEligibleAt.toISOString(),
  };
}
