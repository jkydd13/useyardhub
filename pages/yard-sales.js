// pages/yard-sales.tsx
import Head from "next/head";
import CtaLink from "../components/CtaLink";

export default function YardSalesPage() {
  return (
    <>
      <Head>
        <title>Yard Sales | YardHub</title>
        <meta
          name="description"
          content="Find local yard sales happening this weekend in your neighborhood."
        />
      </Head>

      <main
        style={{
          background: "#FFF3C4", // soft Yard Sales yellow
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
              Yard Sales
            </h1>

            <p
              style={{
                fontSize: 19,
                lineHeight: 1.6,
                maxWidth: 720,
              }}
            >
              Discover neighborhood yard sales, weekend finds, and unexpected
              treasures — all close to home.
            </p>

            <div style={{ marginTop: 24, display: "flex", gap: 14 }}>
              <CtaLink href="/login?next=/yard-sales">
                Browse nearby sales
              </CtaLink>

              <CtaLink
                href="/login?next=/create/yard-sale"
                variant="secondary"
              >
                Host a yard sale
              </CtaLink>


            </div>
          </section>

          {/* WHY YARD SALES */}
          <section style={{ marginBottom: 64 }}>
            <div className="grid">
              <div className="card">
                <h3>Weekend-ready</h3>
                <p>
                  Yard sales shine on Saturdays and Sundays. See what’s
                  happening nearby before you head out.
                </p>
              </div>

              <div className="card">
                <h3>Close to home</h3>
                <p>
                  Listings are shared by neighbors, so directions are simple and
                  travel stays local.
                </p>
              </div>

              <div className="card">
                <h3>Easy to explore</h3>
                <p>
                  Browse yard sales, check times, and plan a route that fits your
                  morning.
                </p>
              </div>
            </div>
          </section>

          {/* WHAT YOU'LL FIND */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ marginBottom: 24 }}>
              What you’ll usually find
            </h2>

            <div className="grid">
              <div className="card">
                <h3>Furniture & home goods</h3>
                <p>
                  Tables, chairs, shelves, décor, and everyday essentials.
                </p>
              </div>

              <div className="card">
                <h3>Clothes & accessories</h3>
                <p>
                  Seasonal clothing, shoes, bags, and jackets.
                </p>
              </div>

              <div className="card">
                <h3>Kids & toys</h3>
                <p>
                  Toys, games, bikes, and things kids outgrow quickly.
                </p>
              </div>

              <div className="card">
                <h3>Tools & garage finds</h3>
                <p>
                  Tools, hardware, and the kind of things hiding in storage.
                </p>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ marginBottom: 24 }}>
              How Yard Sales work
            </h2>

            <div className="grid">
              <div className="card">
                <h3>List your yard sale</h3>
                <p>
                  Add dates, times, photos, and anything worth highlighting so
                  neighbors know what to expect.
                </p>
              </div>

              <div className="card">
                <h3>Show up & explore</h3>
                <p>
                  Drop by sales you’re interested in and browse at your own pace.
                </p>
              </div>

              <div className="card">
                <h3>Wrap it up</h3>
                <p>
                  Mark your yard sale as finished once the yard sale winds down.
                </p>
              </div>
            </div>
          </section>

          {/* ACCESS NOTE */}
          <section style={{ marginBottom: 64 }}>
            <div className="card">
              <h3>Open and simple</h3>
              <p>
                Browsing yard sales is always available. Some optional features,
                like promoting a sale or extending visibility, may use Credits
                managed through your account.
              </p>
            </div>
          </section>

          {/* CLOSING */}
          <section>
            <div className="card">
              <h2>Make a weekend out of it</h2>
              <p style={{ maxWidth: 720 }}>
                Yard sales are about more than buying things — they’re about
                getting outside, meeting neighbors, and finding something
                unexpected along the way.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
