import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useBusinessEntitlements } from "../../hooks/useBusinessEntitlements";

const POSITIVE_STATES = new Set(["available", "active", "active_and_available"]);

export default function HubPassBusinessActivatedPage() {
  const router = useRouter();
  const { entitlements, summary, loading, error, refresh } =
    useBusinessEntitlements();
  const fallbackActive = POSITIVE_STATES.has(summary.state);
  const expectedBaseCount = router.isReady
    ? Number(router.query.expected_bases)
    : Number.NaN;
  const expectedLocationCount = router.isReady
    ? Number(router.query.expected_locations)
    : Number.NaN;
  const currentBaseCount = Number(summary.totalActiveCount ?? 0);
  const currentLocationCount = (entitlements ?? [])
    .filter((item) => item?.entitlement_status === "active")
    .reduce(
      (sum, item) =>
        sum + Number(item?.additional_location_entitlement_count ?? 0),
      0
    );
  const hasExpectedCounts =
    Number.isFinite(expectedBaseCount) &&
    Number.isFinite(expectedLocationCount);
  const isActive = hasExpectedCounts
    ? currentBaseCount >= expectedBaseCount &&
      currentLocationCount >= expectedLocationCount
    : fallbackActive;
  const firstMonthFree =
    router.isReady &&
    (router.query.free_month === "1" || router.query.trial === "1");
  const locationOnly = router.isReady && router.query.mode === "locations";

  useEffect(() => {
    if (isActive) return undefined;

    let cancelled = false;
    let timer = null;
    let attempt = 0;

    async function pollForEntitlement() {
      attempt += 1;
      await refresh();

      if (!cancelled && attempt < 10) {
        timer = window.setTimeout(pollForEntitlement, 2000);
      }
    }

    void pollForEntitlement();

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [isActive, refresh]);

  return (
    <>
      <Head>
        <title>HubPass Business Updated | YardHub</title>
        <meta
          name="description"
          content="Your HubPass Business checkout is complete."
        />
      </Head>

      <main style={styles.page}>
        <section style={styles.card} aria-live="polite">
          <div style={styles.check}>✓</div>
          <div style={styles.eyebrow}>HubPass Business</div>
          <h1 style={styles.h1}>
            {isActive
              ? locationOnly
                ? "Additional locations activated"
                : "HubPass Business activated"
              : "Finishing your setup…"}
          </h1>

          {error ? (
            <div style={styles.errorBox}>
              YardHub completed Stripe Checkout, but the Business entitlement
              needs another refresh. {error}
            </div>
          ) : isActive ? (
            <>
              <div style={styles.statusPill}>{summary.title}</div>
              <p style={styles.lead}>
                {locationOnly
                  ? "Your additional-location subscription is active and stays related to the HubPass Business base you selected."
                  : firstMonthFree
                  ? "Your first eligible checkout batch received the first month free on every HubPass Business base in this batch."
                  : "Your new HubPass Business base subscription is active."}
              </p>
              <p style={styles.copy}>
                Each HubPass Business base is $29.99/month and includes one
                active location. Additional active locations are $14.99/month
                each for that same Business only. Additional locations are not
                part of the first-month-free base discount.
              </p>
              <p style={styles.detail}>{summary.detail}</p>
            </>
          ) : (
            <p style={styles.lead}>
              Stripe Checkout is complete. YardHub is synchronizing your Business
              access now. This normally takes only a moment.
            </p>
          )}

          <div style={styles.actions}>
            <Link href="/account/hubpass-business" style={styles.primaryButton}>
              Manage HubPass Business
            </Link>
            <Link href="/account" style={styles.secondaryButton}>
              Go to Account
            </Link>
          </div>

          {!isActive && !error ? (
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={loading}
              style={styles.refreshButton}
            >
              {loading ? "Refreshing…" : "Refresh status"}
            </button>
          ) : null}
        </section>
      </main>
    </>
  );
}

const styles = {
  page: {
    minHeight: "70vh",
    background: "#FFFDF8",
    padding: "48px 18px 72px",
    display: "grid",
    placeItems: "start center",
  },
  card: {
    width: "100%",
    maxWidth: 680,
    background:
      "linear-gradient(180deg, rgba(156,39,176,0.07) 0%, #FFFFFF 62%)",
    border: "1px solid rgba(156,39,176,0.20)",
    borderRadius: 24,
    boxShadow: "0 20px 52px rgba(156,39,176,0.10)",
    padding: "34px 28px",
    textAlign: "center",
  },
  check: {
    width: 58,
    height: 58,
    margin: "0 auto 16px",
    borderRadius: 999,
    display: "grid",
    placeItems: "center",
    fontSize: 30,
    fontWeight: 900,
    color: "#1B5E20",
    background: "rgba(76,175,80,0.14)",
    border: "1px solid rgba(76,175,80,0.26)",
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    color: "rgba(0,0,0,0.58)",
  },
  h1: {
    margin: "8px 0 14px",
    fontSize: 34,
    lineHeight: 1.12,
    color: "#111",
    letterSpacing: -0.5,
  },
  statusPill: {
    display: "inline-block",
    marginBottom: 16,
    padding: "7px 13px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 900,
    color: "#1B5E20",
    background: "rgba(76,175,80,0.14)",
    border: "1px solid rgba(76,175,80,0.25)",
  },
  lead: {
    margin: "0 auto",
    maxWidth: 560,
    fontSize: 17,
    lineHeight: 1.6,
    color: "rgba(0,0,0,0.78)",
  },
  copy: {
    margin: "14px auto 0",
    maxWidth: 560,
    fontSize: 14.5,
    lineHeight: 1.55,
    color: "rgba(0,0,0,0.62)",
  },
  detail: {
    margin: "14px auto 0",
    maxWidth: 560,
    padding: 12,
    borderRadius: 14,
    background: "rgba(76,175,80,0.08)",
    border: "1px solid rgba(76,175,80,0.18)",
    fontSize: 13.5,
    lineHeight: 1.5,
    color: "rgba(0,0,0,0.72)",
  },
  errorBox: {
    margin: "16px auto",
    padding: 14,
    maxWidth: 560,
    borderRadius: 14,
    textAlign: "left",
    fontSize: 14,
    lineHeight: 1.5,
    color: "#8B1E1E",
    background: "rgba(211,47,47,0.08)",
    border: "1px solid rgba(211,47,47,0.20)",
  },
  actions: {
    marginTop: 26,
    display: "flex",
    gap: 10,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryButton: {
    display: "inline-block",
    padding: "12px 16px",
    borderRadius: 14,
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 900,
    color: "#0B3A66",
    background: "rgba(33,150,243,0.12)",
    border: "1px solid rgba(33,150,243,0.22)",
  },
  secondaryButton: {
    display: "inline-block",
    padding: "12px 16px",
    borderRadius: 14,
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 900,
    color: "#111",
    background: "rgba(0,0,0,0.05)",
    border: "1px solid rgba(0,0,0,0.10)",
  },
  refreshButton: {
    marginTop: 14,
    padding: "10px 14px",
    borderRadius: 14,
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 800,
    color: "#111",
    background: "#FFFFFF",
    border: "1px solid rgba(0,0,0,0.12)",
    cursor: "pointer",
  },
};
