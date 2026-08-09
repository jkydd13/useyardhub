import { getSupabaseBrowserClient } from "./supabaseBrowser";

const ACTIVE_STATUS = "active";

export async function fetchMyBusinessEntitlements() {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("The YardHub website is not ready to read account access.");
  }

  const { data, error } = await supabase.rpc(
    "get_my_business_entitlements"
  );

  if (error) {
    throw error;
  }

  return Array.isArray(data) ? data : [];
}

export function summarizeBusinessEntitlements(rows) {
  const entitlements = Array.isArray(rows) ? rows : [];

  const active = entitlements.filter(
    (item) => item?.entitlement_status === ACTIVE_STATUS
  );

  const assignedActive = active.filter(
    (item) => Boolean(item?.assigned_business_id)
  );

  const available = active.filter(
    (item) => item?.available_for_new_business === true
  );

  const needsAttention = entitlements.filter((item) =>
    ["past_due", "grace_period"].includes(item?.entitlement_status)
  );

  const suspended = entitlements.filter(
    (item) => item?.entitlement_status === "suspended"
  );

  if (assignedActive.length > 0 && available.length > 0) {
    return {
      state: "active_and_available",
      tone: "positive",
      title: "Business access active",
      detail: `${assignedActive.length} ${
        assignedActive.length === 1 ? "Business is" : "Businesses are"
      } active, and ${available.length} ${
        available.length === 1 ? "entitlement is" : "entitlements are"
      } available for a new Business.`,
      activeBusinessCount: assignedActive.length,
      availableBusinessCount: available.length,
    };
  }

  if (assignedActive.length > 0) {
    return {
      state: "active",
      tone: "positive",
      title: "Business access active",
      detail: `${assignedActive.length} ${
        assignedActive.length === 1 ? "Business is" : "Businesses are"
      } connected to this YardHub account.`,
      activeBusinessCount: assignedActive.length,
      availableBusinessCount: 0,
    };
  }

  if (available.length > 0) {
    return {
      state: "available",
      tone: "positive",
      title: "Business access available",
      detail: `${available.length} ${
        available.length === 1 ? "entitlement is" : "entitlements are"
      } ready to be assigned to a new Business.`,
      activeBusinessCount: 0,
      availableBusinessCount: available.length,
    };
  }

  if (needsAttention.length > 0) {
    return {
      state: "attention",
      tone: "warning",
      title: "Business access needs attention",
      detail:
        "Open Subscriptions on YardHub.com to review the account status. No payment details are exposed to the mobile app.",
      activeBusinessCount: 0,
      availableBusinessCount: 0,
    };
  }

  if (suspended.length > 0) {
    return {
      state: "suspended",
      tone: "warning",
      title: "Business access unavailable",
      detail:
        "Business operations are paused. Open Subscriptions on YardHub.com to review the account status.",
      activeBusinessCount: 0,
      availableBusinessCount: 0,
    };
  }

  return {
    state: "none",
    tone: "neutral",
    title: "No Business access yet",
    detail:
      "The production entitlement bridge is connected, but this account does not currently have Business access.",
    activeBusinessCount: 0,
    availableBusinessCount: 0,
  };
}

export function getBusinessEntitlementErrorMessage(error) {
  const message = String(error?.message ?? "").trim();

  if (!message) {
    return "YardHub could not load Business access.";
  }

  if (message.toLowerCase().includes("authentication")) {
    return "Please sign in again to load Business access.";
  }

  return message;
}
