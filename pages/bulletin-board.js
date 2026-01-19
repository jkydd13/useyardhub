// pages/bulletin-board.tsx
import Head from "next/head";

export default function BulletinBoardPage() {
  return (
    <>
      <Head>
        <title>Bulletin Board | YardHub</title>
        <meta
          name="description"
          content="Local requests, offers, and neighborhood help — the YardHub Bulletin Board."
        />
      </Head>

      <main style={{ padding: "40px 24px", background: "#FFF8ED" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* HERO */}
          <section style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 12 }}>
              Bulletin Board
            </h1>
            <p style={{ fontSize: 18, maxWidth: 720 }}>
              Local requests, local offers — the kind of help neighbors actually
              ask for.
            </p>

            <div
              style={{
                marginTop: 24,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <button className="primaryButton">
                Create a Bulletin Post
              </button>
              <span style={{ alignSelf: "center", fontSize: 14 }}>
                Share a need, an offer, or a neighborhood note.
              </span>
            </div>
          </section>
           {/* PURPOSE NOTE */}
           <section style={{ marginBottom: 32 }}>
             <div className="card">
               <p>
                 The Bulletin Board is for <strong>neighbors seeking help, sharing
                 information, or offering support</strong> — things that don’t fit neatly
                 into buying, selling, services, or events.
               </p>
               <p style={{ marginTop: 8 }}>
                 It’s commonly used for lost and found, general requests, community
                 updates, neighborhood watch notes, and everyday help.
               </p>
             </div>
           </section>

          {/* FILTERS */}
          <section style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                 "Seeking help",
                 "Offering help",
                 "Borrow / Lend",
                 "Rides & errands",
                 "Recommendations",
                 "Lost & found",
                 "Community watch",
                 "Neighborhood updates",
               ].map((label) => (
                <span key={label} className="filterChip">
                  {label}
                </span>
              ))}
            </div>
          </section>

          {/* CONTENT GRID */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 360px",
              gap: 32,
            }}
          >
            {/* FEED */}
            <div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="card" style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 14, opacity: 0.8 }}>
                    Request • Near you
                  </div>
                  <h3 style={{ margin: "8px 0" }}>
                    Looking to borrow a ladder this weekend
                  </h3>
                  <p style={{ fontSize: 15 }}>
                    Just need it for a quick outdoor fix. Happy to return same
                    day!
                  </p>
                  <button className="linkButton">View details</button>
                </div>
              ))}
            </div>

            {/* SIDEBAR */}
            <aside>
              <div className="card">
                <h3>How it works</h3>
                <ul style={{ paddingLeft: 18 }}>
                  <li>Post clearly and honestly</li>
                  <li>Message safely inside YardHub</li>
                  <li>Mark posts resolved when you’re set</li>
                </ul>
              </div>

              <div className="card" style={{ marginTop: 20 }}>
                <h3>Built to feel safe</h3>
                <p>
                  No phone numbers required. Report spam or unsafe behavior in
                  one tap.
                </p>
              </div>

              <div className="card" style={{ marginTop: 20 }}>
                <h3>Community Responders</h3>
                <p>
                  Some neighbors consistently show up to help. We recognize
                  that — without pressure or gimmicks.
                </p>
              </div>
            </aside>
          </section>

          {/* FOOTER CTA */}
          <section style={{ marginTop: 60 }}>
            <div className="card">
              <h3>Not sure where to post?</h3>
              <p>
                Time-sensitive safety concerns belong in <strong>Urgent</strong>.
                Paid or bookable work belongs in <strong>Services</strong>.
             </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
