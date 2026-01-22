// pages/services.tsx
import Head from "next/head";
import CtaLink from "../components/CtaLink";

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Services | YardHub</title>
        <meta
          name="description"
          content="Hire locally or offer your skills with YardHub Services."
        />
      </Head>

      <main style={{ padding: "40px 24px", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* HERO */}
          <section style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 12 }}>
              Services
            </h1>
            <p style={{ fontSize: 18, maxWidth: 720 }}>
              Hire locally. Earn locally. Keep it simple.
            </p>

            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <CtaLink href="/login?next=/services">
                Find a service
              </CtaLink>

              <CtaLink
                href="/login?next=/create/service"
                variant="secondary"
              >
                Offer a service
              </CtaLink>

            </div>
          </section>

          {/* CATEGORIES */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ marginBottom: 24 }}>
               Popular services
            </h2>

            <div className="grid">

              {[
                "Babysitting",
                "Pet sitting",
                "House cleaning",
                "Handyman help",
                "Yard work",
                "Moving help",
                "Tutoring",
                "Tech support",
              ].map((service) => (
                <div key={service} className="card">
                  <h3>{service}</h3>
                  <p>Available near you</p>
                </div>
              ))}
            </div>
          </section>

          {/* TWO PATHS */}
          <section className="grid" style={{ marginBottom: 40 }}>
            <div className="card">
              <h3>I need help</h3>
              <p>
                Post what you need, choose how people respond, and keep your
                contact info private.
              </p>
            </div>

            <div className="card">
              <h3>I want to earn</h3>
              <p>
                Create a profile — not a résumé. Show availability and
                services on your terms.
              </p>
            </div>
          </section>

          {/* TRUST */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ marginBottom: 24 }}>
               Reliability people can feel
            </h2>
            <div className="grid">
              <div className="card">
                <h3>Booking reliability</h3>
                <p>
                  Clear communication and follow-through build trust naturally.
                </p>
              </div>
              <div className="card">
                <h3>Respect-first reviews</h3>
                <p>Helpful feedback only. No pile-ons.</p>
              </div>
              <div className="card">
                <h3>Transparent access</h3>
                <p>
                  Browsing is always open. Some growth features use Credits,
                  managed through your account.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
