import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useBusinessEntitlements } from "../../hooks/useBusinessEntitlements";

const BASE_MONTHLY = 29.99;
const LOCATION_MONTHLY = 14.99;
const MAX_BASES = 100;
const MAX_LOCATIONS = 100;

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}

export default function HubPassBusinessCheckoutPage() {
  const router = useRouter();
  const { session } = useAuth();
  const { entitlements, loading: entitlementsLoading } =
    useBusinessEntitlements();
  const [businesses, setBusinesses] = useState([{ additionalLocations: 0 }]);
  const [existingLocationCount, setExistingLocationCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [eligibility, setEligibility] = useState(null);
  const [eligibilityLoading, setEligibilityLoading] = useState(true);
  const [eligibilityError, setEligibilityError] = useState("");

  const target = router.isReady ? String(router.query.target ?? "").trim() : "";
  const targetEntitlement = useMemo(
    () =>
      (entitlements ?? []).find(
        (item) =>
          item.entitlement_id === target && item.entitlement_status === "active"
      ) ?? null,
    [entitlements, target]
  );
  const locationOnlyMode = Boolean(target);

  useEffect(() => {
    if (locationOnlyMode) {
      setEligibility(null);
      setEligibilityLoading(false);
      setEligibilityError("");
      return undefined;
    }

    if (!session?.access_token) {
      setEligibilityLoading(true);
      return undefined;
    }

    let cancelled = false;

    async function loadEligibility() {
      setEligibilityLoading(true);
      setEligibilityError("");

      try {
        const response = await fetch(
          "/api/stripe/hubpass-business-checkout-preview",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          }
        );
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(
            payload.error || "YardHub could not check free-month eligibility."
          );
        }

        if (!cancelled) setEligibility(payload);
      } catch (nextError) {
        if (!cancelled) {
          setEligibilityError(
            nextError.message ||
              "YardHub could not check free-month eligibility."
          );
        }
      } finally {
        if (!cancelled) setEligibilityLoading(false);
      }
    }

    void loadEligibility();

    return () => {
      cancelled = true;
    };
  }, [locationOnlyMode, session?.access_token]);

  const baseQuantity = locationOnlyMode ? 0 : businesses.length;
  const additionalLocationQuantity = locationOnlyMode
    ? existingLocationCount
    : businesses.reduce((sum, item) => sum + item.additionalLocations, 0);

  const baseSubtotal = baseQuantity * BASE_MONTHLY;
  const additionalLocationSubtotal =
    additionalLocationQuantity * LOCATION_MONTHLY;
  const recurringSubtotal = baseSubtotal + additionalLocationSubtotal;
  const estimatedDueTodayBeforeTax =
    !locationOnlyMode && eligibility?.eligible
      ? additionalLocationSubtotal
      : recurringSubtotal;

  function setAdditionalLocations(index, next) {
    setBusinesses((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              additionalLocations: clamp(next, 0, MAX_LOCATIONS),
            }
          : item
      )
    );
  }

  function addBusiness() {
    setBusinesses((current) => {
      if (current.length >= MAX_BASES) return current;
      return [...current, { additionalLocations: 0 }];
    });
  }

  function removeBusiness(index) {
    setBusinesses((current) => {
      if (current.length <= 1) return current;
      return current.filter((_, itemIndex) => itemIndex !== index);
    });
  }

  async function continueToStripe() {
    if (!session?.access_token || submitting) return;

    if (locationOnlyMode && !targetEntitlement) {
      setError(
        "This additional-location checkout needs an active HubPass Business base."
      );
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const body = locationOnlyMode
        ? {
            existingBaseAdditions: [
              {
                hubpassBusinessSubscriptionId: targetEntitlement.entitlement_id,
                additionalLocations: existingLocationCount,
              },
            ],
          }
        : {
            businesses: businesses.map((item) => ({
              additionalLocations: item.additionalLocations,
            })),
          };

      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(body),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "YardHub could not start checkout.");
      }

      if (!payload.url) {
        throw new Error("Stripe Checkout did not return a destination.");
      }

      window.location.assign(payload.url);
    } catch (nextError) {
      setError(nextError.message || "YardHub could not start Stripe Checkout.");
      setSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>HubPass Business Checkout | YardHub</title>
        <meta
          name="description"
          content="Configure HubPass Businesses and additional locations in one secure Stripe Checkout."
        />
      </Head>

      <main style={styles.page}>
        <div style={styles.wrap}>
          <Link href="/account/hubpass-business" style={styles.backLink}>
            ← Back to HubPass Business
          </Link>

          <section style={styles.header}>
            <div style={styles.eyebrow}>Secure website checkout</div>
            <h1 style={styles.h1}>
              {locationOnlyMode
                ? "Add locations to HubPass Business"
                : "Configure Your HubPass Businesses"}
            </h1>
            <p style={styles.sub}>
              {locationOnlyMode
                ? "Additional active locations are $14.99/month each and stay attached to this HubPass Business base."
                : "Add the businesses and locations you want to activate in this checkout. Each HubPass Business is $29.99/month and includes one active location. Additional locations are $14.99/month each."}
            </p>
          </section>

          {locationOnlyMode ? (
            <section style={styles.card}>
              <div style={styles.cardTop}>
                <div>
                  <div style={styles.cardTitle}>Existing HubPass Business</div>
                  <div style={styles.cardSub}>
                    {entitlementsLoading
                      ? "Checking active base…"
                      : targetEntitlement
                      ? "Active base confirmed"
                      : "Active base required"}
                  </div>
                </div>
                <span style={styles.basePill}>Base already active</span>
              </div>

              <CounterRow
                label="Additional locations"
                value={existingLocationCount}
                min={1}
                max={MAX_LOCATIONS}
                onChange={setExistingLocationCount}
              />
            </section>
          ) : (
            <div style={styles.stack}>
              {businesses.map((item, index) => (
                <section key={index} style={styles.card}>
                  <div style={styles.cardTop}>
                    <div>
                      <div style={styles.cardTitle}>Business #{index + 1}</div>
                      <div style={styles.cardSub}>
                        HubPass Business base • $29.99/month
                      </div>
                    </div>
                    {businesses.length > 1 ? (
                      <button
                        type="button"
                        style={styles.removeBtn}
                        onClick={() => removeBusiness(index)}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>

                  <div style={styles.includedRow}>
                    <span>Included active location</span>
                    <strong>1 included</strong>
                  </div>

                  <CounterRow
                    label="Additional locations"
                    value={item.additionalLocations}
                    min={0}
                    max={MAX_LOCATIONS}
                    onChange={(value) => setAdditionalLocations(index, value)}
                  />
                </section>
              ))}

              <button type="button" style={styles.addBtn} onClick={addBusiness}>
                + Add another Business
              </button>
            </div>
          )}

          <section style={styles.summaryCard}>
            <div style={styles.summaryTitle}>Checkout summary</div>
            {baseQuantity > 0 ? (
              <SummaryRow
                label={`${baseQuantity} HubPass Business ${
                  baseQuantity === 1 ? "base" : "bases"
                }`}
                value={`${money(baseQuantity * BASE_MONTHLY)} / month`}
              />
            ) : null}
            {additionalLocationQuantity > 0 ? (
              <SummaryRow
                label={`${additionalLocationQuantity} additional ${
                  additionalLocationQuantity === 1 ? "location" : "locations"
                }`}
                value={`${money(
                  additionalLocationQuantity * LOCATION_MONTHLY
                )} / month`}
              />
            ) : null}
            <div style={styles.divider} />
            <SummaryRow
              label="Recurring subtotal before tax/discount"
              value={`${money(recurringSubtotal)} / month`}
              strong
            />

            {!locationOnlyMode ? (
              <div style={styles.freeMonthBox}>
                <strong>First-month-free status</strong>
                <br />
                {eligibilityLoading ? (
                  <>YardHub is checking this account securely…</>
                ) : eligibilityError ? (
                  <>
                    We could not confirm eligibility yet. Stripe will still show
                    the exact amount due before you confirm.
                  </>
                ) : eligibility?.eligible ? (
                  <>
                    Eligible now. Every HubPass Business base in this checkout
                    batch receives its first month free. Additional locations are
                    never discounted and begin billing immediately.
                  </>
                ) : (
                  <>
                    This account already used its first-month-free benefit within
                    the current rolling 12-month window. New Business bases begin
                    billing now.
                    {eligibility?.nextEligibleAt ? (
                      <>
                        {" "}The next eligible date is {new Date(
                          eligibility.nextEligibleAt
                        ).toLocaleDateString()}.
                      </>
                    ) : null}
                  </>
                )}
              </div>
            ) : null}

            {!locationOnlyMode && !eligibilityLoading && !eligibilityError ? (
              <>
                {eligibility?.eligible && baseQuantity > 0 ? (
                  <SummaryRow
                    label="First-month-free base discount"
                    value={`−${money(baseSubtotal)} today`}
                  />
                ) : null}
                <SummaryRow
                  label="Estimated due today before tax"
                  value={money(estimatedDueTodayBeforeTax)}
                  strong
                />
              </>
            ) : null}

            <div style={styles.relationshipBox}>
              <strong>Location relationship is enforced by YardHub.</strong>
              <br />
              An additional location cannot be purchased without an active base
              or a base being purchased in this same checkout.
            </div>

            {error ? <div style={styles.error}>{error}</div> : null}

            <button
              type="button"
              style={{
                ...styles.continueBtn,
                opacity:
                  submitting || (locationOnlyMode && !targetEntitlement) ? 0.58 : 1,
                cursor:
                  submitting || (locationOnlyMode && !targetEntitlement)
                    ? "not-allowed"
                    : "pointer",
              }}
              onClick={continueToStripe}
              disabled={
                submitting ||
                entitlementsLoading ||
                (locationOnlyMode && !targetEntitlement)
              }
            >
              {submitting ? "Opening Stripe…" : "Continue to Stripe Checkout"}
            </button>
            <p style={styles.finePrint}>
              Stripe shows the exact amount due today before you confirm. Payment
              details stay with Stripe and YardHub&apos;s trusted server.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

function CounterRow({ label, value, min, max, onChange }) {
  return (
    <div style={styles.counterRow}>
      <div>
        <strong>{label}</strong>
        <div style={styles.counterHint}>$14.99/month each</div>
      </div>
      <div style={styles.counter}>
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          style={{
            ...styles.counterBtn,
            opacity: value <= min ? 0.42 : 1,
          }}
          onClick={() => onChange(clamp(value - 1, min, max))}
          disabled={value <= min}
        >
          −
        </button>
        <span style={styles.counterValue}>{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          style={{
            ...styles.counterBtn,
            opacity: value >= max ? 0.42 : 1,
          }}
          onClick={() => onChange(clamp(value + 1, min, max))}
          disabled={value >= max}
        >
          +
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div style={styles.summaryRow}>
      <span style={strong ? styles.strong : undefined}>{label}</span>
      <span style={strong ? styles.strong : undefined}>{value}</span>
    </div>
  );
}

const styles = {
  page: { background: "#FFFDF8", minHeight: "100vh", padding: "34px 18px 72px" },
  wrap: { maxWidth: 820, margin: "0 auto" },
  backLink: { color: "#0B3A66", fontWeight: 800, textDecoration: "none" },
  header: { margin: "22px 0 18px" },
  eyebrow: { fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: 0.7, color: "rgba(0,0,0,0.55)" },
  h1: { margin: "6px 0 10px", fontSize: 38, lineHeight: 1.1, letterSpacing: -0.6 },
  sub: { margin: 0, lineHeight: 1.6, color: "rgba(0,0,0,0.68)" },
  stack: { display: "grid", gap: 12 },
  card: { background: "#fff", border: "1px solid rgba(156,39,176,0.16)", borderRadius: 20, padding: 18, boxShadow: "0 10px 30px rgba(0,0,0,0.04)", marginBottom: 12 },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 },
  cardTitle: { fontSize: 19, fontWeight: 900 },
  cardSub: { marginTop: 4, fontSize: 13.5, color: "rgba(0,0,0,0.58)" },
  basePill: { padding: "6px 10px", borderRadius: 999, background: "rgba(76,175,80,0.12)", border: "1px solid rgba(76,175,80,0.22)", color: "#1B5E20", fontWeight: 850, fontSize: 12 },
  removeBtn: { border: 0, background: "transparent", color: "#8B1E1E", fontFamily: "inherit", fontWeight: 800, cursor: "pointer" },
  includedRow: { display: "flex", justifyContent: "space-between", gap: 12, marginTop: 18, padding: "12px 0", borderTop: "1px solid rgba(0,0,0,0.07)", borderBottom: "1px solid rgba(0,0,0,0.07)" },
  counterRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, marginTop: 14 },
  counterHint: { fontSize: 12.5, color: "rgba(0,0,0,0.55)", marginTop: 3 },
  counter: { display: "flex", alignItems: "center", gap: 8 },
  counterBtn: { width: 38, height: 38, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)", background: "#fff", color: "#111", WebkitTextFillColor: "#111", fontFamily: "inherit", fontWeight: 900, fontSize: 21, lineHeight: 1, display: "grid", placeItems: "center", cursor: "pointer" },
  counterValue: { minWidth: 34, textAlign: "center", fontWeight: 900, fontSize: 17 },
  addBtn: { width: "100%", padding: "13px 14px", borderRadius: 16, border: "1px dashed rgba(33,150,243,0.40)", background: "rgba(33,150,243,0.06)", color: "#0B3A66", fontFamily: "inherit", fontWeight: 900, cursor: "pointer" },
  summaryCard: { marginTop: 18, background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 20, padding: 20 },
  summaryTitle: { fontSize: 20, fontWeight: 900, marginBottom: 12 },
  summaryRow: { display: "flex", justifyContent: "space-between", gap: 16, padding: "7px 0", color: "rgba(0,0,0,0.72)" },
  strong: { fontWeight: 900, color: "#111" },
  divider: { height: 1, background: "rgba(0,0,0,0.08)", margin: "8px 0" },
  freeMonthBox: { marginTop: 14, padding: 14, borderRadius: 15, background: "rgba(76,175,80,0.09)", border: "1px solid rgba(76,175,80,0.20)", lineHeight: 1.5, color: "rgba(0,0,0,0.72)" },
  relationshipBox: { marginTop: 12, padding: 14, borderRadius: 15, background: "rgba(33,150,243,0.07)", border: "1px solid rgba(33,150,243,0.16)", lineHeight: 1.5, color: "rgba(0,0,0,0.72)" },
  error: { marginTop: 12, padding: 13, borderRadius: 14, background: "rgba(211,47,47,0.08)", border: "1px solid rgba(211,47,47,0.20)", color: "#8B1E1E" },
  continueBtn: { width: "100%", marginTop: 16, padding: "13px 16px", borderRadius: 15, border: "1px solid rgba(33,150,243,0.28)", background: "rgba(33,150,243,0.14)", color: "#0B3A66", fontFamily: "inherit", fontWeight: 900, fontSize: 15 },
  finePrint: { margin: "10px 0 0", textAlign: "center", fontSize: 12.5, lineHeight: 1.45, color: "rgba(0,0,0,0.52)" },
};
