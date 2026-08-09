import Head from "next/head";
import { useAuth } from "../../contexts/AuthContext";

function valueOrNotSet(value) {
  const normalized = String(value ?? "").trim();
  return normalized || "Not set";
}

export default function AccountProfilePage() {
  const { user, profile, profileLoading, refreshProfile } = useAuth();

  return (
    <>
      <Head>
        <title>Profile | YardHub</title>
      </Head>

      <main className="accountPage">
        <div className="accountWrap accountNarrow">
          <section className="accountHeading">
            <span className="eyebrow">Same YardHub account</span>
            <h1>Profile</h1>
            <p>
              These details come from the same Supabase profile used by your
              YardHub mobile app.
            </p>
          </section>

          <section className="card profileCard">
            <ProfileRow label="Display name" value={valueOrNotSet(profile?.display_name)} />
            <ProfileRow
              label="Handle"
              value={profile?.handle ? `@${profile.handle}` : "Not set"}
            />
            <ProfileRow label="Email" value={valueOrNotSet(user?.email)} />
            <ProfileRow
              label="Current profile location"
              value={valueOrNotSet(profile?.location_label)}
            />
            <ProfileRow
              label="Visibility preference"
              value={valueOrNotSet(profile?.profile_visibility)}
            />
            <ProfileRow label="Account ID" value={valueOrNotSet(user?.id)} monospace />

            <button
              type="button"
              className="secondaryAction"
              onClick={() => void refreshProfile()}
              disabled={profileLoading}
            >
              {profileLoading ? "Refreshing…" : "Refresh from YardHub Production"}
            </button>
          </section>

          <section className="infoPanel">
            <strong>Website profile editing comes next.</strong>
            <p>
              This canary is intentionally read-only. Its job is to prove the
              website retrieves your existing app-owned profile through the same
              authenticated UUID and RLS policy.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

function ProfileRow({ label, value, monospace = false }) {
  return (
    <div className="profileRow">
      <span>{label}</span>
      <strong className={monospace ? "monospaceValue" : ""}>{value}</strong>
    </div>
  );
}
