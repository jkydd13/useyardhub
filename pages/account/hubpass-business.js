import Head from "next/head";
import Link from "next/link";
import { useBusinessEntitlements } from "../../hooks/useBusinessEntitlements";

export default function HubPassBusinessManagerPage() {
  const { entitlements, summary, loading, error, refresh } =
    useBusinessEntitlements();

  const active = (entitlements ?? []).filter(
    (item) => item?.entitlement_status === "active"
  );

  return (
    <>
      <Head>
        <title>Manage HubPass Business | YardHub</title>
        <meta
          name="description"
          content="Manage HubPass Business subscriptions and location access."
        />
      </Head>

      <main style={styles.page}>
        <div style={styles.wrap}>
          <section style={styles.header}>
            <div>
              <div style={styles.eyebrow}>HubPass Business</div>
              <h1 style={styles.h1}>Manage HubPass Business</h1>
              <p style={styles.sub}>
                Each active base subscription powers one Business and includes
                one active location. Additional active locations are $14.99/month
                for that same Business only.
              </p>
            </div>
            <div style={styles.statusPill}>
              {loading ? "Checking…" : summary.title}
            </div>
          </section>

          {error ? <div style={styles.error}>{error}</div> : null}

          {!loading && !error && active.length === 0 ? (
            <section style={styles.emptyCard}>
              <h2 style={styles.cardTitle}>No active Business subscriptions</h2>
              <p style={styles.copy}>
                Start with one Business or stack several new Business base
                subscriptions into one Checkout.
              </p>
              <Link href="/account/hubpass-business-checkout" style={styles.primaryBtn}>
                Start HubPass Business
              </Link>
            </section>
          ) : null}

          {active.length > 0 ? (
            <>
              <section style={styles.summaryCard}>
                <strong>{summary.detail}</strong>
                <div style={styles.actions}>
                  <Link
                    href="/account/hubpass-business-checkout"
                    style={styles.primaryBtn}
                  >
                    Add another Business
                  </Link>
                  <button
                    type="button"
                    style={styles.secondaryBtn}
                    onClick={() => void refresh()}
                    disabled={loading}
                  >
                    {loading ? "Refreshing…" : "Refresh status"}
                  </button>
                </div>
              </section>

              <div style={styles.grid}>
                {active.map((item, index) => {
                  const assigned = Boolean(item.assigned_business_id);
                  return (
                    <section key={item.entitlement_id} style={styles.card}>
                      <div style={styles.cardTop}>
                        <div>
                          <div style={styles.cardTitle}>
                            {assigned
                              ? item.assigned_business_name || `HubPass Business #${index + 1}`
                              : `HubPass Business #${index + 1}`}
                          </div>
                          <div style={styles.cardSub}>
                            {assigned
                              ? "Connected to a Business"
                              : "Ready to set up a Business"}
                          </div>
                        </div>
                        <span style={styles.activePill}>Active</span>
                      </div>

                      <p style={styles.copy}>
                        Includes one active location. {Number(
                          item.additional_location_entitlement_count ?? 0
                        )} additional location {Number(
                          item.additional_location_entitlement_count ?? 0
                        ) === 1 ? "subscription is" : "subscriptions are"} active
                        for this HubPass Business base. Additional-location access
                        cannot activate a different Business on the account.
                      </p>

                      <div style={styles.actions}>
                        <Link
                          href={`/account/hubpass-business-checkout?target=${encodeURIComponent(
                            item.entitlement_id
                          )}`}
                          style={styles.secondaryLink}
                        >
                          Add additional locations
                        </Link>
                      </div>
                    </section>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}

const styles = {
  page: {
    background: "#FFFDF8",
    minHeight: "100vh",
    padding: "36px 18px 72px",
  },
  wrap: { maxWidth: 980, margin: "0 auto" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 18,
    flexWrap: "wrap",
    marginBottom: 20,
  },
  eyebrow: {
    fontSize: 13,
    textTransform: "uppercase",
    fontWeight: 900,
    letterSpacing: 0.7,
    color: "rgba(0,0,0,0.55)",
  },
  h1: {
    margin: "6px 0 8px",
    fontSize: 38,
    lineHeight: 1.1,
    letterSpacing: -0.6,
  },
  sub: {
    maxWidth: 720,
    margin: 0,
    lineHeight: 1.55,
    color: "rgba(0,0,0,0.68)",
  },
  statusPill: {
    padding: "8px 13px",
    borderRadius: 999,
    background: "rgba(76,175,80,0.14)",
    border: "1px solid rgba(76,175,80,0.25)",
    color: "#1B5E20",
    fontWeight: 900,
    whiteSpace: "nowrap",
  },
  summaryCard: {
    padding: 18,
    borderRadius: 18,
    border: "1px solid rgba(156,39,176,0.18)",
    background: "rgba(156,39,176,0.05)",
    marginBottom: 16,
  },
  emptyCard: {
    padding: 24,
    borderRadius: 20,
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.08)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 14,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 12px 34px rgba(0,0,0,0.05)",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
  },
  cardTitle: { fontSize: 20, fontWeight: 900, color: "#111" },
  cardSub: { marginTop: 4, fontSize: 13.5, color: "rgba(0,0,0,0.58)" },
  activePill: {
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(76,175,80,0.14)",
    border: "1px solid rgba(76,175,80,0.25)",
    color: "#1B5E20",
    fontWeight: 900,
    fontSize: 12.5,
  },
  copy: { lineHeight: 1.55, color: "rgba(0,0,0,0.68)" },
  actions: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 },
  primaryBtn: {
    display: "inline-block",
    padding: "11px 14px",
    borderRadius: 14,
    textDecoration: "none",
    color: "#0B3A66",
    background: "rgba(33,150,243,0.12)",
    border: "1px solid rgba(33,150,243,0.22)",
    fontWeight: 900,
  },
  secondaryBtn: {
    padding: "11px 14px",
    borderRadius: 14,
    color: "#111",
    background: "rgba(0,0,0,0.05)",
    border: "1px solid rgba(0,0,0,0.10)",
    fontFamily: "inherit",
    fontWeight: 900,
    cursor: "pointer",
  },
  secondaryLink: {
    display: "inline-block",
    padding: "10px 12px",
    borderRadius: 14,
    textDecoration: "none",
    color: "#111",
    background: "rgba(0,0,0,0.05)",
    border: "1px solid rgba(0,0,0,0.10)",
    fontWeight: 900,
  },
  error: {
    padding: 14,
    borderRadius: 14,
    background: "rgba(211,47,47,0.08)",
    border: "1px solid rgba(211,47,47,0.20)",
    color: "#8B1E1E",
    marginBottom: 16,
  },
};
