import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import { useBusinessEntitlements } from "../../hooks/useBusinessEntitlements";

export default function AccountOverviewPage() {
  const { user, profile } = useAuth();
  const {
    summary: businessSummary,
    loading: businessLoading,
    error: businessError,
    refresh: refreshBusinessEntitlements,
  } = useBusinessEntitlements();

  const displayName = profile?.display_name || "YardHub account";
  const handle = profile?.handle ? `@${profile.handle}` : "Handle not set";
  const location = profile?.location_label || "Location not set";

  const businessStatusClass = [
    "entitlementStatus",
    `entitlementStatus-${businessSummary.tone}`,
  ].join(" ");

  return (
    <>
      <Head>
        <title>Account Overview | YardHub</title>
      </Head>

      <main className="accountPage">
        <div className="accountWrap">
          <section className="accountHeading">
            <span className="eyebrow">Connected to YardHub Production</span>
            <h1>Welcome, {displayName}</h1>
            <p>
              Your website and mobile app now open the same YardHub account.
            </p>
          </section>

          <section className="grid accountGrid">
            <div className="card">
              <h3>Profile identity</h3>
              <p><strong>{displayName}</strong></p>
              <p>{handle}</p>
              <p>{location}</p>
              <Link href="/account/profile">View production profile</Link>
            </div>

            <div className="card">
              <h3>Authenticated email</h3>
              <p>{user?.email}</p>
              <p className="mutedText">
                This is the same Supabase Auth user used by the mobile app.
              </p>
            </div>

            <div className="card entitlementCard" aria-live="polite">
              <div className="entitlementCardHeading">
                <h3>Business entitlement bridge</h3>
                <span className="bridgeConnectedPill">Production RPC</span>
              </div>

              {businessLoading ? (
                <>
                  <p><strong>Checking Business access…</strong></p>
                  <p className="mutedText">
                    YardHub is reading the neutral entitlement status for this account.
                  </p>
                </>
              ) : businessError ? (
                <>
                  <div className="entitlementStatus entitlementStatus-warning">
                    Bridge needs attention
                  </div>
                  <p className="mutedText">{businessError}</p>
                </>
              ) : (
                <>
                  <div className={businessStatusClass}>
                    {businessSummary.title}
                  </div>
                  <p className="mutedText">{businessSummary.detail}</p>
                </>
              )}

              <div className="entitlementActions">
                <button
                  type="button"
                  className="secondaryAction entitlementRefreshButton"
                  onClick={() => void refreshBusinessEntitlements()}
                  disabled={businessLoading}
                >
                  {businessLoading ? "Checking…" : "Refresh status"}
                </button>

                <Link href="/account/subscriptions">
                  Open Subscriptions
                </Link>
              </div>

              <p className="entitlementPrivacyNote">
                The app receives only access status. Prices, checkout, and payment-provider details remain on the website and trusted backend.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
