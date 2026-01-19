// pages/account/index.tsx
import Head from "next/head";
import AccountNav from "../../components/AccountNav";

export default function AccountOverviewPage() {
  // UI-only placeholders (backend later)
  const credits = 120;
  const points = 420;
  const pointsMax = 1000;

  const access = {
    hubPass: false,
    business: false,
    gold: false,
  };

  const badges = ["Community Helper", "Early Member"];
  const rewards = ["Thank-you credit", "Recognition badge"];

  return (
    <>
      <Head>
        <title>Account Overview | YardHub</title>
        <meta
          name="description"
          content="View your YardHub account status, points, credits, and access."
        />
      </Head>

      <main
        style={{
          background: "#FAFAFA",
          padding: "48px 24px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* HEADER */}
          <section style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 6 }}>
              Account Overview
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6 }}>
              Your account status and activity at a glance.
            </p>
          </section>

          {/* SNAPSHOT */}
          <section style={{ marginBottom: 48 }}>
            <div className="grid">
              {/* CREDITS */}
              <div className="card" style={{ textAlign: "center" }}>
                <h3>Credits</h3>
                <p
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    margin: "12px 0 4px",
                  }}
                >
                  {credits}
                </p>
                <p>Available credits</p>
              </div>

              {/* POINTS */}
              <div className="card" style={{ textAlign: "center" }}>
                <h3>Points</h3>

                <div
                  style={{
                    height: 10,
                    background: "#E0E0E0",
                    borderRadius: 6,
                    overflow: "hidden",
                    margin: "16px 0 10px",
                  }}
                >
                  <div
                    style={{
                      width: `${(points / pointsMax) * 100}%`,
                      background: "#FDD835",
                      height: "100%",
                    }}
                  />
                </div>

                <p style={{ fontWeight: 600 }}>
                  {points} / {pointsMax}
                </p>
              </div>

              {/* ACCESS */}
              <div className="card">
                <h3>Active access</h3>
                <p>
                  HubPass:{" "}
                  <strong>{access.hubPass ? "Active" : "Not active"}</strong>
                </p>
                <p>
                  Business access:{" "}
                  <strong>{access.business ? "Active" : "Not active"}</strong>
                </p>
                <p>
                  Gold:{" "}
                  <strong>{access.gold ? "Active" : "Not active"}</strong>
                </p>
              </div>
            </div>
          </section>

          {/* BADGES & REWARDS */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ marginBottom: 24 }}>
              Badges & recognition
            </h2>

            <div className="grid">
              <div className="card">
                <h3>Badges earned</h3>
                {badges.length > 0 ? (
                  <ul style={{ paddingLeft: 18 }}>
                    {badges.map((badge) => (
                      <li key={badge}>{badge}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No badges earned yet.</p>
                )}
              </div>

              <div className="card">
                <h3>Rewards received</h3>
                {rewards.length > 0 ? (
                  <ul style={{ paddingLeft: 18 }}>
                    {rewards.map((reward) => (
                      <li key={reward}>{reward}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No rewards received yet.</p>
                )}
              </div>
            </div>
          </section>

          {/* ACTIVITY */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ marginBottom: 24 }}>
              Your activity
            </h2>

            <div className="grid">
              <div className="card" style={{ textAlign: "center" }}>
                <h3>Active posts</h3>
                <p style={{ fontSize: 26, fontWeight: 700 }}>3</p>
              </div>

              <div className="card" style={{ textAlign: "center" }}>
                <h3>Resolved requests</h3>
                <p style={{ fontSize: 26, fontWeight: 700 }}>12</p>
              </div>

              <div className="card" style={{ textAlign: "center" }}>
                <h3>Member since</h3>
                <p>January 2026</p>
              </div>
            </div>
          </section>

          {/* MANAGE ACCOUNT LINKS */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ marginBottom: 24 }}>
              Manage your account
            </h2>

            <div className="grid">
              <a href="/account/credits" style={{ textDecoration: "none" }}>
                <div className="card">
                  <h3>Credits</h3>
                  <p>
                    View your credit balance and learn how credits are used across YardHub.
                  </p>
                </div>
               </a>

               <a href="/account/subscriptions" style={{ textDecoration: "none" }}>
                 <div className="card">
                   <h3>Subscriptions</h3>
                   <p>
                     Manage your memberships and subscriptions on YardHub.
                     Everything here is optional and transparent.                   </p>
                 </div>
               </a>
             </div>
           </section>

          {/* TRANSPARENCY */}
          <section>
            <div className="card">
              <h3>Clear and flexible access</h3>
              <p>
                YardHub keeps participation open. Optional features are clearly
                marked and available when you choose to expand.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
