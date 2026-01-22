// pages/events.js
import Head from "next/head";
import CtaLink from "../components/CtaLink";

export default function EventsPage() {
  return (
    <>
      <Head>
        <title>Events | YardHub</title>
        <meta
          name="description"
          content="Discover local events, gatherings, and activities happening near you on YardHub."
        />
      </Head>

      <main
        style={{
          background: "#FAF3FC", // soft Events purple
          padding: "48px 24px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* HERO */}
          <section style={{ marginBottom: 56 }}>
            <h1 style={{ fontSize: 42, fontWeight: 700, marginBottom: 12 }}>
              Events
            </h1>

            <p style={{ fontSize: 19, lineHeight: 1.6, maxWidth: 760 }}>
              Find local events and gatherings — from small meetups to
              neighborhood happenings — all in one place.
            </p>

            <div style={{ marginTop: 24, display: "flex", gap: 14 }}>
              <CtaLink href="/login?next=/events" variant="secondary">
                View upcoming events
              </CtaLink>
              <CtaLink href="/login?next=/create/event">
                Post an event
              </CtaLink>

            </div>
          </section>

          {/* WHY EVENTS */}
          <section style={{ marginBottom: 64 }}>
            <div className="grid">
              <div className="card">
                <h3>Local focus</h3>
                <p>
                  Events are shared by people and organizations nearby, keeping
                  the calendar relevant to your area.
                </p>
              </div>

              <div className="card">
                <h3>Clear details</h3>
                <p>
                  Dates, times, locations, and expectations are visible upfront
                  so you can plan confidently.
                </p>
              </div>

              <div className="card">
                <h3>All kinds of gatherings</h3>
                <p>
                  Public events, community meetups, workshops, fundraisers, and
                  more — big or small.
                </p>
              </div>
            </div>
          </section>

          {/* COMMON EVENT TYPES */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ marginBottom: 28 }}>Common event types</h2>

            <div className="grid">
              <div className="card">
                <h3>Community events</h3>
                <p>
                  Neighborhood meetups, block parties, local celebrations, and
                  city-hosted gatherings.
                </p>
              </div>

              <div className="card">
                <h3>Live entertainment</h3>
                <p>
                  Concerts, DJ sets, comedy shows, residencies, and small venue
                  performances.
                </p>
              </div>

              <div className="card">
                <h3>Raves & electronic events</h3>
                <p>
                  Raves, EDM shows, warehouse events, desert gatherings, and
                  late-night electronic scenes.
                </p>
              </div>

              <div className="card">
                <h3>Concerts & live shows</h3>
                <p>
                  Live music, band performances, comedy shows, and touring acts.
                </p>
              </div>

              <div className="card">
                <h3>Fairs & festivals</h3>
                <p>
                  Street fairs, food festivals, cultural festivals, seasonal
                  celebrations, and large public gatherings.
                </p>
              </div>

              <div className="card">
                <h3>Nightlife & social events</h3>
                <p>
                  Club nights, themed parties, lounge events, and social mixers.
                </p>
              </div>

              <div className="card">
                <h3>Classes & workshops</h3>
                <p>
                  Fitness classes, art workshops, skill-sharing sessions, and
                  learning events.
                </p>
              </div>

              <div className="card">
                <h3>Family & kids events</h3>
                <p>
                  School events, kid-friendly activities, seasonal festivals,
                  and daytime outings.
                </p>
              </div>

              <div className="card">
                <h3>Markets & pop-ups</h3>
                <p>
                  Vendor markets, pop-up shops, food events, and small business
                  showcases.
                </p>
              </div>

              <div className="card">
                <h3>Industry & professional events</h3>
                <p>
                  Conferences, networking events, trade meetups, and professional
                  gatherings.
                </p>
              </div>

              <div className="card">
                <h3>Fundraisers</h3>
                <p>
                  Charity events, benefit shows, donation drives, and community
                  support efforts.
                </p>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ marginBottom: 24 }}>How Events works</h2>

            <div className="grid">
              <div className="card">
                <h3>Create an event</h3>
                <p>
                  Share the basics — what’s happening, when it starts, where
                  it’s located, and any important notes.
                </p>
              </div>

              <div className="card">
                <h3>Discover nearby</h3>
                <p>
                  Browse upcoming events and see what fits your schedule or
                  interests.
                </p>
              </div>

              <div className="card">
                <h3>Stay up to date</h3>
                <p>
                  Event details can be updated so attendees always have the
                  latest information.
                </p>
              </div>
            </div>
          </section>

          {/* ACCESS NOTE */}
          <section style={{ marginBottom: 64 }}>
            <div className="card">
              <h3>Open access</h3>
              <p>
                Browsing events is always available. Some optional features,
                like extended visibility or highlighted listings, may use
                Credits managed through your account.
              </p>
            </div>
          </section>

          {/* CLOSING */}
          <section>
            <div className="card">
              <h2>See what’s happening nearby</h2>
              <p style={{ maxWidth: 760 }}>
                Events bring communities together. Whether you’re attending or
                hosting, YardHub makes it easier to share what’s happening and
                show up informed.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
