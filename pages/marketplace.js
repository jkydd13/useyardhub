// pages/marketplace.tsx
import Head from "next/head";

export default function MarketplacePage() {
  return (
    <>
      <Head>
        <title>Marketplace | YardHub</title>
        <meta
          name="description"
          content="Buy and sell locally with YardHub Marketplace. Real people, real items, close to home."
        />
      </Head>

      <main
        style={{
          background: "#FFF1F1",
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
              Marketplace
            </h1>

            <p
              style={{
                fontSize: 19,
                lineHeight: 1.6,
                maxWidth: 720,
              }}
            >
              Buy and sell items locally — with clear expectations, easier pickups,
              and real people nearby.
            </p>

            <div style={{ marginTop: 24, display: "flex", gap: 14 }}>
              <button className="primaryButton">
                Browse listings
              </button>
              <button className="secondaryButton">
                Post an item
              </button>
            </div>
          </section>

          {/* WHY MARKETPLACE */}
          <section style={{ marginBottom: 64 }}>
            <div className="grid">
              <div className="card">
                <h3>Local first</h3>
                <p>
                  Listings stay close to home, making meetups simpler and more
                  comfortable for everyone involved.
                </p>
              </div>

              <div className="card">
                <h3>Clear expectations</h3>
                <p>
                  Honest descriptions, real photos, and respectful
                  communication help everyone have better experiences.
                </p>
              </div>

              <div className="card">
                <h3>Built for trust</h3>
                <p>
                  Message inside YardHub, share approximate locations, and
                  decide how and when to connect.
                </p>
              </div>
            </div>
          </section>

          {/* POPULAR CATEGORIES */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ marginBottom: 24 }}>
              Popular marketplace categories
            </h2>

            <div className="grid">
              <div className="card">
                <h3>Furniture</h3>
                <p>Couches, tables, chairs, and home essentials.</p>
              </div>

              <div className="card">
                <h3>Electronics</h3>
                <p>Phones, TVs, computers, and accessories.</p>
              </div>

              <div className="card">
                <h3>Home & garden</h3>
                <p>Tools, décor, outdoor gear, and supplies.</p>
              </div>

              <div className="card">
                <h3>Clothing & accessories</h3>
                <p>Everyday wear, seasonal items, and shoes.</p>
              </div>

              <div className="card">
                <h3>Kids & baby</h3>
                <p>Toys, gear, clothes, and essentials.</p>
              </div>

              <div className="card">
                <h3>Miscellaneous</h3>
                <p>Those useful items that don’t fit neatly elsewhere.</p>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ marginBottom: 24 }}>
              How Marketplace works
            </h2>

            <div className="grid">
              <div className="card">
                <h3>Create a listing</h3>
                <p>
                  Add photos, a clear description, and set your expectations
                  upfront.
                </p>
              </div>

              <div className="card">
                <h3>Connect locally</h3>
                <p>
                  Message buyers or sellers securely and arrange pickup details
                  together.
                </p>
              </div>

              <div className="card">
                <h3>Close the loop</h3>
                <p>
                  Mark listings as sold to keep the marketplace clean and
                  accurate.
                </p>
              </div>
            </div>
          </section>

          {/* ACCESS NOTE */}
          <section style={{ marginBottom: 64 }}>
            <div className="card">
              <h3>Simple, open access</h3>
              <p>
                Browsing is always available. Some optional features — like
                boosting visibility or running additional active listings —
                may use Credits, which you can manage through your account.
              </p>
            </div>
          </section>

          {/* CLOSING */}
          <section>
            <div className="card">
              <h2>Buy and sell with confidence</h2>
              <p style={{ maxWidth: 720 }}>
                YardHub Marketplace is designed to keep things human —
                respectful conversations, fair deals, and neighbors helping
                neighbors.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
