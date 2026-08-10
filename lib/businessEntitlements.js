import { getSupabaseBrowserClient } from "./supabaseBrowser";

const ACTIVE_STATUS = "active";

export async function fetchMyBusinessEntitlements() {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("The YardHub website is not ready to read account access.");
  }

  const { data, error } = await supabase.rpc("get_my_business_entitlements");

  if (error) {
    throw error;
  }

  return Array.isArray(data) ? data : [];
}

function activeTitle(count) {
  return count === 1 ? "Active" : `${count} Active`;
}

function activeDetail(activeCount, connectedCount, readyCount) {
  const sentences = [
    `${activeCount} HubPass Business ${
      activeCount === 1 ? "subscription is" : "subscriptions are"
    } active.`,
  ];

  if (connectedCount > 0) {
    sentences.push(
      `${connectedCount} ${
        connectedCount === 1 ? "is" : "are"
      } connected to ${connectedCount === 1 ? "a Business" : "Businesses"}.`
    );
  }

  if (readyCount > 0) {
    sentences.push(
      `${readyCount} ${
        readyCount === 1 ? "is" : "are"
      } ready to set up.`
    );
  }

  return sentences.join(" ");
}

export function summarizeBusinessEntitlements(rows) {
  const entitlements = Array.isArray(rows) ? rows : [];

  const active = entitlements.filter(
    (item) => item?.entitlement_status === ACTIVE_STATUS
  );

  const assignedActive = active.filter((item) =>
    Boolean(item?.assigned_business_id)
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

  if (active.length > 0) {
    const state =
      assignedActive.length > 0 && available.length > 0
        ? "active_and_available"
        : assignedActive.length > 0
        ? "active"
        : "available";

    return {
      state,
      tone: "positive",
      title: activeTitle(active.length),
      detail: activeDetail(
        active.length,
        assignedActive.length,
        available.length
      ),
      totalActiveCount: active.length,
      activeBusinessCount: assignedActive.length,
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
      totalActiveCount: 0,
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
      totalActiveCount: 0,
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
    totalActiveCount: 0,
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
