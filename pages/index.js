// pages/index.tsx
import Head from "next/head";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>YardHub | Welcome to the Neighborhood</title>
        <meta
          name="description"
          content="YardHub brings neighbors together through local sales, services, events, and help."
        />
      </Head>

      <main style={{ background: "#FFFDF8", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* HERO */}
          <section style={{ marginBottom: 64 }}>
            <h1
              style={{
                fontSize: 44,
                fontWeight: 700,
                marginBottom: 16,
                maxWidth: 720,
              }}
            >
              Welcome to YardHub
            </h1>

            <p
              style={{
                fontSize: 20,
                maxWidth: 720,
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              Welcome to the neighborhood. YardHub is where communities connect
              — to sell, share, help, and support one another locally.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="primaryButton">Explore your area</button>
              <button className="secondaryButton">
                Create a post
              </button>
            </div>
          </section>

          {/* WHAT YOU CAN DO */}
          <section style={{ marginBottom: 72 }}>
            <h2 style={{ marginBottom: 24 }}>What you can do on YardHub</h2>

            <div className="grid">
              <div className="card">
                <h3>Host a yard sale</h3>
                <p>
                  Turn clutter into connection. List your sale and let nearby
                  neighbors find you easily.
                </p>
              </div>

              <div className="card">
                <h3>Buy & sell locally</h3>
                <p>
                  Marketplace listings stay close to home — fewer scams, easier
                  pickups, real people.
                </p>
              </div>

              <div className="card">
                <h3>Give things away</h3>
                <p>
                  Free Stuff keeps usable items out of landfills and helps
                  someone nearby.
                </p>
              </div>

              <div className="card">
                <h3>Find services</h3>
                <p>
                  Hire local help or offer your skills — from babysitting to
                  yard work.
                </p>
              </div>

              <div className="card">
                <h3>Share events</h3>
                <p>
                  Promote local gatherings, garage bands, fundraisers, and
                  neighborhood happenings.
                </p>
              </div>

              <div className="card">
                <h3>Ask for help</h3>
                <p>
                  The Bulletin Board lets neighbors request or offer help in a
                  respectful, pressure-free way.
                </p>
              </div>
            </div>
          </section>

          {/* COMMUNITY VALUES */}
          <section style={{ marginBottom: 72 }}>
            <div className="grid">
              <div className="card">
                <h3>Built for trust</h3>
                <p>
                  Message safely, share approximate locations, and interact on
                  your terms. YardHub is designed to feel human — not risky.
                </p>
              </div>

              <div className="card">
                <h3>Community first</h3>
                <p>
                  We believe local communities work best when neighbors look out
                  for one another — without pressure or noise.
                </p>
              </div>

              <div className="card">
                <h3>Open by default</h3>
                <p>
                  Browsing and connecting is always available. Some features
                  expand with Credits, but YardHub never blocks basic
                  participation.
                </p>
              </div>
            </div>
          </section>

          {/* CATEGORIES PREVIEW */}
          <section style={{ marginBottom: 72 }}>
            <h2 style={{ marginBottom: 24 }}>Explore categories</h2>
<div className="grid">
  {/* Row 1 */}
  <Link href="/yard-sales" style={{ textDecoration: "none" }}>
    <div className="card categoryTile category-yard-sales">
      Yard Sales
    </div>
  </Link>

  <Link href="/marketplace" style={{ textDecoration: "none" }}>
    <div className="card categoryTile category-marketplace">
      Marketplace
    </div>
  </Link>

  {/* Row 2 */}
  <Link href="/free-stuff" style={{ textDecoration: "none" }}>
    <div className="card categoryTile category-free-stuff">
      Free Stuff
    </div>
  </Link>

  <Link href="/businesses" style={{ textDecoration: "none" }}>
    <div className="card categoryTile category-businesses">
      Businesses
    </div>
  </Link>

  {/* Row 3 */}
  <Link href="/events" style={{ textDecoration: "none" }}>
    <div className="card categoryTile category-events">
      Events
    </div>
  </Link>

  <Link href="/bulletin-board" style={{ textDecoration: "none" }}>
    <div className="card categoryTile category-bulletin">
      Bulletin Board
    </div>
  </Link>

  {/* Row 4 */}
  <Link href="/urgent" style={{ textDecoration: "none" }}>
    <div className="card categoryTile category-urgent">
      Urgent
    </div>
  </Link>

  <Link href="/services" style={{ textDecoration: "none" }}>
    <div className="card categoryTile category-services">
      Services
    </div>
  </Link>
</div>

          </section>

          {/* CLOSING */}
          <section>
            <div className="card">
              <h2>You belong here</h2>
              <p style={{ maxWidth: 720 }}>
                Whether you’re selling a couch, hosting a yard sale, offering a
                service, or just helping a neighbor — YardHub is built to support
                real people, in real communities.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
