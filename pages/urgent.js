// pages/urgent.tsx
import Head from "next/head";
import CtaLink from "../components/CtaLink";

export default function UrgentPage() {
  return (
    <>
      <Head>
        <title>Urgent | Get Help | YardHub</title>
        <meta
          name="description"
          content="Get urgent help from your local community when it matters most."
        />
      </Head>

      <main
        style={{
          background: "#F7F7F7",
          padding: "48px 24px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* HERO */}
          <section style={{ marginBottom: 48 }}>
            <h1
              style={{
                fontSize: 42,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Urgent / Get Help
            </h1>

            <p
              style={{
                fontSize: 19,
                lineHeight: 1.6,
                maxWidth: 720,
              }}
            >
              If something unexpected just happened and you need help right now,
              you’re in the right place.
            </p>
          </section>

          {/* PRIMARY ACTION */}
          <section style={{ marginBottom: 56 }}>
            <div
              className="card"
              style={{
                borderTop: "4px solid #D32F2F",
              }}
            >
              <h3>I need help now</h3>
              <p>
                Use this when time matters — safety concerns, being stranded,
                urgent assistance, or situations where waiting isn’t an option.
              </p>

              <CtaLink
                href="/login?next=/create/urgent"
                variant="urgent"
              >
                Create urgent post
              </CtaLink>


            </div>
          </section>

          {/* WHEN TO USE */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ marginBottom: 24 }}>
              When Urgent is the right choice
            </h2>

            <div className="grid">
              <div className="card">
                <h3>Immediate assistance</h3>
                <p>
                  You’re stuck, stranded, locked out, or need help quickly from
                  someone nearby.
                </p>
              </div>

              <div className="card">
                <h3>Safety-related concerns</h3>
                <p>
                  Situations where you feel unsafe and need community support
                  fast.
                </p>
              </div>

              <div className="card">
                <h3>Time-sensitive problems</h3>
                <p>
                  Missed rides, broken-down cars, urgent childcare gaps, or
                  unexpected emergencies.
                </p>
              </div>
            </div>
          </section>

          {/* IMPORTANT NOTE */}
          <section style={{ marginBottom: 56 }}>
            <div
              className="card"
              style={{
                background: "#FFF5F5",
                borderLeft: "4px solid #D32F2F",
              }}
            >
              <h3>This is not a replacement for emergency services</h3>
              <p>
                If someone is in immediate danger or a medical emergency is
                happening, please contact local emergency services first.
                YardHub Urgent is for fast community help — not crisis response.
              </p>
            </div>
          </section>

          {/* COMMUNITY RESPONDERS */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ marginBottom: 24 }}>
              Community Responders
            </h2>

            <div className="card">
              <p>
                Some neighbors opt in to help during urgent situations.
                Community Responders receive notifications sooner and are
                recognized for showing up when it matters.
              </p>

              <p style={{ marginTop: 12 }}>
                There’s no pressure, no obligation, and no gamification —
                just people helping people.
              </p>
            </div>
          </section>

          {/* CLOSING */}
          <section>
            <div className="card">
              <h2>You don’t have to handle it alone</h2>
              <p style={{ maxWidth: 720 }}>
                Asking for help takes courage. YardHub exists so neighbors can
                support one another — especially in moments that matter most.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
