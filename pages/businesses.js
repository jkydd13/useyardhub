// pages/businesses.tsx
import Head from "next/head";
import CtaLink from "../components/CtaLink";

export default function BusinessesPage() {
  return (
    <>
      <Head>
        <title>Businesses | YardHub</title>
        <meta
          name="description"
          content="Discover and connect with local businesses of all sizes on YardHub."
        />
      </Head>

      <main
        style={{
          background: "#E0F4D9", // soft Businesses green
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
              Businesses
            </h1>

            <p
              style={{
                fontSize: 19,
                lineHeight: 1.6,
                maxWidth: 800,
              }}
            >
              Find and connect with businesses operating in your area — from
              independent owners and startups to established companies and
              larger organizations.
            </p>

            <div style={{ marginTop: 24, display: "flex", gap: 14 }}>
              <CtaLink href="/login?next=/businesses">
                Browse businesses
              </CtaLink>

              <CtaLink
                href="/login?next=/create/business"
                variant="secondary"
              >
                List a business
              </CtaLink>

            </div>
          </section>

           {/* CLARIFICATION NOTE */}
           <section style={{ marginBottom: 48 }}>
             <div className="card">
               <p>
                 If you offer your time or skills directly — such as freelancing,
                 contracting, or appointment-based work — you’ll find a better fit
                 in the <strong>Services</strong> category.
               </p>
             </div>
           </section>

          {/* ALL BUSINESS SIZES */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ marginBottom: 24 }}>
              Businesses of every size
            </h2>

            <div className="grid">
              <div className="card">
                <h3>Micro businesses</h3>
                <p>
                  Small, registered businesses with a consistent presence — such as
                  local shops, studios, practices, and owner-operated storefronts.
                </p>
              </div>

              <div className="card">
                <h3>Small businesses</h3>
                <p>
                  Established local businesses with staff, regular customers, and
                  ongoing operations.
                </p>
              </div>

              <div className="card">
                <h3>Medium businesses</h3>
                <p>
                  Growing companies with teams, multiple services, or more than one
                  location.
                </p>
              </div>

              <div className="card">
                <h3>Large & enterprise organizations</h3>
                <p>
                  Large companies, venues, franchises, and organizations operating
                  at scale.
                </p>
              </div>
            </div>
          </section>

          {/* BUSINESS TYPES */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ marginBottom: 24 }}>
              Types of businesses you’ll find
            </h2>

            <div className="grid">
              <div className="card">
                <h3>Retail & storefronts</h3>
                <p>
                  Shops, boutiques, specialty stores, and retail locations.
                </p>
              </div>

              <div className="card">
                <h3>Food & hospitality</h3>
                <p>
                  Restaurants, food trucks, catering services, bars, and cafés.
                </p>
              </div>

              <div className="card">
                <h3>Services & trades</h3>
                <p>
                  Contractors, cleaners, repair services, technicians, and
                  professional services.
                </p>
              </div>

              <div className="card">
                <h3>Creative & media</h3>
                <p>
                  Artists, designers, photographers, videographers, and content
                  creators.
                </p>
              </div>

              <div className="card">
                <h3>Health, wellness & fitness</h3>
                <p>
                  Trainers, studios, wellness providers, and personal care
                  services.
                </p>
              </div>

              <div className="card">
                <h3>Events, venues & entertainment</h3>
                <p>
                  Event spaces, production teams, venues, promoters, and
                  entertainment-related businesses.
                </p>
              </div>

              <div className="card">
                <h3>Online & remote businesses</h3>
                <p>
                  E-commerce brands, consultants, agencies, and digital-first
                  operations serving the local area.
                </p>
              </div>

              <div className="card">
                <h3>Nonprofits & organizations</h3>
                <p>
                  Community groups, nonprofits, and mission-driven
                  organizations.
                </p>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ marginBottom: 24 }}>
              How Businesses works
            </h2>

            <div className="grid">
              <div className="card">
                <h3>Create a business profile</h3>
                <p>
                  Share what you offer, how people can reach you, and what makes
                  your business useful to the community.
                </p>
              </div>

              <div className="card">
                <h3>Be discoverable locally</h3>
                <p>
                  Appear where people are already browsing for services,
                  products, and local solutions.
                </p>
              </div>

              <div className="card">
                <h3>Engage on your terms</h3>
                <p>
                  Update details, respond to messages, and control how your
                  business shows up.
                </p>
              </div>
            </div>
          </section>

          {/* ACCESS NOTE */}
          <section style={{ marginBottom: 64 }}>
            <div className="card">
              <h3>Access & growth</h3>
              <p>
                Browsing businesses is always available. Some optional tools,
                such as expanded visibility or additional features, may use
                Credits managed through your account.
              </p>
            </div>
          </section>

          {/* CLOSING */}
          <section>
            <div className="card">
              <h2>Built for how business actually works</h2>
              <p style={{ maxWidth: 800 }}>
                YardHub is designed to support businesses at every stage —
                whether you’re just getting started, growing steadily, or
                operating at scale within the community.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
