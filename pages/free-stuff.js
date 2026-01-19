// pages/free-stuff.tsx
import Head from "next/head";

export default function FreeStuffPage() {
  return (
    <>
      <Head>
        <title>Free Stuff | YardHub</title>
        <meta
          name="description"
          content="Give away items you no longer need and find free items nearby on YardHub."
        />
      </Head>

      <main
        style={{
          background: "#F2F8FF", // soft Free Stuff blue
          padding: "48px 24px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* HERO */}
          <section style={{ marginBottom: 56 }}>
            <h1
              style={{
                fontSize: 42,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Free Stuff
            </h1>

            <p
              style={{
                fontSize: 19,
                lineHeight: 1.6,
                maxWidth: 760,
              }}
            >
              Give away items you no longer need or find something useful nearby —
              simple, local, and practical.
            </p>

            <div style={{ marginTop: 24, display: "flex", gap: 14 }}>
              <button className="primaryButton">
                Browse free items
              </button>
              <button className="secondaryButton">
                Post free item
              </button>
            </div>
          </section>

          {/* WHY FREE STUFF */}
          <section style={{ marginBottom: 64 }}>
            <div className="grid">
              <div className="card">
                <h3>Keep items in use</h3>
                <p>
                  Free Stuff helps usable items find a second home instead of
                  ending up in storage or the trash.
                </p>
              </div>

              <div className="card">
                <h3>Local pickup</h3>
                <p>
                  Items stay nearby, making pickup easy and keeping things
                  simple for both sides.
                </p>
              </div>

              <div className="card">
                <h3>Clear expectations</h3>
                <p>
                  Listings show condition, pickup details, and any notes upfront
                  so there’s no confusion.
                </p>
              </div>
            </div>
          </section>

          {/* COMMON ITEMS */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ marginBottom: 24 }}>
              Common free items
            </h2>

            <div className="grid">
              <div className="card">
                <h3>Furniture</h3>
                <p>
                  Chairs, tables, shelves, and other pieces that still have life
                  left.
                </p>
              </div>

              <div className="card">
                <h3>Home goods</h3>
                <p>
                  Dishes, storage containers, décor, and everyday household
                  items.
                </p>
              </div>

              <div className="card">
                <h3>Kids items</h3>
                <p>
                  Toys, books, clothes, and gear children quickly outgrow.
                </p>
              </div>

              <div className="card">
                <h3>Supplies & extras</h3>
                <p>
                  Moving boxes, extra materials, and useful leftovers from
                  projects.
                </p>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ marginBottom: 24 }}>
              How Free Stuff works
            </h2>

            <div className="grid">
              <div className="card">
                <h3>Post an item</h3>
                <p>
                  Add photos, describe the condition honestly, and include basic
                  exchange details (pick up, drop off, etc).
                </p>
              </div>

              <div className="card">
                <h3>Connect locally</h3>
                <p>
                  Message through YardHub to coordinate exchange without sharing
                  personal contact information publicly.
                </p>
              </div>

              <div className="card">
                <h3>Mark it claimed</h3>
                <p>
                  Once the item is exchanged, mark the post as claimed to keep
                  the feed accurate.
                </p>
              </div>
            </div>
          </section>

          {/* GUIDELINES */}
          <section style={{ marginBottom: 64 }}>
            <div className="card">
              <h3>Helpful guidelines</h3>
              <p>
                Free Stuff is for items given freely — no payments, trades, or
                hidden conditions. Clear communication helps everything move
                smoothly.             
              </p>
            </div>
          </section>

          {/* ACCESS NOTE */}
          <section style={{ marginBottom: 64 }}>
            <div className="card">
              <h3>Open access</h3>
              <p>
                Browsing Free Stuff is always available. Some optional features,
                like extended visibility or additional active posts, may use
                Credits managed through your account.
              </p>
            </div>
          </section>

          {/* CLOSING */}
          <section>
            <div className="card">
              <h2>Simple generosity, done well</h2>
              <p style={{ maxWidth: 760 }}>
                Free Stuff works best when expectations are clear and items move
                quickly. It’s a practical way to help someone nearby while
                keeping useful things in circulation.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
