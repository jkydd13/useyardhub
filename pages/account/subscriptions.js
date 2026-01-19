// pages/account/subscriptions.js
import Head from "next/head";
import AccountAuthGuard from "../../components/AccountAuthGuard";

const isLoggedIn = false;

export default function SubscriptionsPage() {
  // UI-only placeholders (backend later)
  const status = {
    hubpass: "Not active",
    hubpassBusiness: "Not active",
    gold: "Not active",
    freeStuff: "Not active",
  };

  // Backend-ready placeholders (wire later)
  const manageLinks = {
    hubpass: "#",
    hubpassBusiness: "#",
    gold: "#",
    freeStuff: "#",
    credits: "/account/credits",
  };

  return (
    <>
      {!isLoggedIn && <AccountAuthGuard />}

      <Head>
        <title>Subscriptions | YardHub</title>
        <meta
          name="description"
          content="Manage your memberships and subscriptions on YardHub."
        />
      </Head>

      <main style={styles.page}>
        <div style={styles.wrap}>
          {/* HEADER */}
          <section style={styles.header}>
            <h1 style={styles.h1}>Subscriptions</h1>
            <p style={styles.sub}>
              Manage your memberships and subscriptions on YardHub. Everything
              here is optional, transparent, and designed to help serious users
              succeed.
            </p>
          </section>

          <div style={styles.grid}>
            {/* HUBPASS */}
            <Card tone="blue">
              <CardTop
                title="HubPass"
                subtitle="Services membership"
                status={status.hubpass}
              />

              <p style={styles.p}>
                HubPass is for people who are serious about finding work. It
                connects you to real service requests at the right time — without
                noise or spam.
              </p>

              <MiniTitle>What you unlock</MiniTitle>
              <div style={styles.benefits}>
                <Benefit>
                  <strong>Instant alerts</strong> when nearby service requests
                  match your skills and availability
                </Benefit>
                <Benefit>
                  <strong>Early response window</strong> before standard users
                  can respond
                </Benefit>
                <Benefit>
                  <strong>Service profile auto-sharing</strong> when a request
                  fits your schedule
                </Benefit>
                <Benefit>
                  <strong>Visibility in Services browsing</strong>, so neighbors
                  can find and message you directly
                </Benefit>
              </div>

              <Divider />

              <MiniTitle>Availability-aware by design</MiniTitle>
              <div style={styles.benefits}>
                <Benefit>
                  <strong>Solid availability</strong> → automatic matching +
                  auto-send your service profile
                </Benefit>
                <Benefit>
                  <strong>Flexible (shaded) availability</strong> → we ask you
                  before sending your profile
                </Benefit>
                <Benefit>
                  <strong>Busy time</strong> (events, bookings, personal blocks)
                  → no notifications
                </Benefit>
              </div>

              <PriceLine
                primary="$7.99 / month"
                secondary="$76.70 / year (20% off)"
              />

              <ButtonRow>
                <PrimaryButton href={manageLinks.hubpass}>
                  Manage HubPass
                </PrimaryButton>
              </ButtonRow>
            </Card>

            {/* HUBPASS BUSINESS */}
            <Card tone="purple">
              <CardTop
                title="HubPass Business"
                subtitle="Business growth membership"
                status={status.hubpassBusiness}
              />

              <p style={styles.p}>
                For businesses that want to grow, stay visible, and connect with
                more local customers — whether you’re announcing something new,
                sharing specials, or promoting business events.
              </p>

              <MiniTitle>What you unlock</MiniTitle>
              <div style={styles.benefits}>
                <Benefit>
                  <strong>Business pins on the map (green)</strong> for
                  announcements, specials, and business events
                </Benefit>
                <Benefit>
                  <strong>Business browse filters</strong> so neighbors can
                  choose what they want to see
                </Benefit>
                <Benefit>
                  <strong>Storefront inside YardHub</strong> (photos, hours,
                  offerings, vibe)
                </Benefit>
                <Benefit>
                  <strong>Calendar + appointments</strong> for bookings and
                  scheduling
                </Benefit>
                <Benefit>
                  <strong>Customer messaging controls</strong> (opt-in, hours,
                  future auto-replies)
                </Benefit>
              </div>

              <HintBox>
                <strong>Note on map pins</strong>
                <br />
                Business pins appear as <strong>green</strong> by default.
                Separate paid event promotions may later use a distinct pin
                style, keeping the map clear and fair.
              </HintBox>

              <Divider />

              <MiniTitle>Reliability insights</MiniTitle>
              <div style={styles.benefits}>
                <Benefit>
                  View booking history: <strong>Completed</strong> and{" "}
                  <strong>Missed</strong> appointments
                </Benefit>
                <Benefit>
                  Optional label for <strong>new</strong> or{" "}
                  <strong>limited-history</strong> users
                </Benefit>
              </div>

              <PriceLine
                primary="$19.99 / month"
                secondary="$191.90 / year (20% off)"
              />

              <ButtonRow>
                <PrimaryButton href={manageLinks.hubpassBusiness}>
                  Manage HubPass Business
                </PrimaryButton>
              </ButtonRow>
            </Card>

            {/* GOLD */}
            <Card tone="gold">
              <CardTop
                title="YardHub Gold"
                subtitle="Power-user tools"
                status={status.gold}
              />

              <p style={styles.p}>
                Gold is for highly engaged users who want speed, clarity, and
                better awareness — without blocking anyone else.
              </p>

              <MiniTitle>What you unlock</MiniTitle>
              <div style={styles.benefits}>
                <Benefit>
                  <strong>Immediate notifications</strong> when new listings go
                  live
                </Benefit>
                <Benefit>
                  <strong>Expanded calendar space</strong> (save 10+ events)
                </Benefit>
                <Benefit>
                  <strong>Priority awareness</strong> for items and events you
                  care about
                </Benefit>
                <Benefit>
                  <strong>More tracked interests</strong> (more tags per seek)
                </Benefit>
              </div>

              <div style={styles.note}>
                Gold is optional and never hides listings from other users.
              </div>

              <PriceLine primary="$2.99 / month" />

              <ButtonRow>
                <PrimaryButton href={manageLinks.gold}>
                  Manage YardHub Gold
                </PrimaryButton>
              </ButtonRow>
            </Card>

            {/* FREE STUFF */}
            <Card>
              <CardTop
                title="Free Stuff viewing"
                subtitle="Annual access"
                status={status.freeStuff}
              />

              <p style={styles.p}>
                Posting Free Stuff is always free. Viewing everything requires
                annual access.
              </p>

              <MiniTitle>Without access</MiniTitle>
              <div style={styles.benefits}>
                <Benefit>Images remain blurred</Benefit>
                <Benefit>Only first 6 listings show title + description</Benefit>
                <Benefit>No messaging the giver</Benefit>
                <Benefit>No map pins or location visibility</Benefit>
              </div>

              <div style={styles.note}>
                Marketplace, Yard Sales, and Events remain free to browse.
              </div>

              <PriceLine primary="$2.99 / year" />

              <ButtonRow>
                <PrimaryButton href={manageLinks.freeStuff}>
                  Manage Free Stuff access
                </PrimaryButton>
              </ButtonRow>
            </Card>

            {/* CREDITS */}
            <Card>
              <CardTop title="Credits" subtitle="Optional" status="—" />
              <p style={styles.p}>
                Credits are used for expansion features like boosts. They are
                never required for basic participation.
              </p>
              <ButtonRow>
                <SecondaryButton href={manageLinks.credits}>
                  Go to Credits
                </SecondaryButton>
              </ButtonRow>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}


/* ---------------- UI bits ---------------- */

function Card({ children, tone = "neutral" }) {
  const t = tones[tone] || tones.neutral;
  return (
    <div
      style={{
        ...styles.card,
        border: `1px solid ${t.border}`,
        boxShadow: `0 18px 48px ${t.glow}`,
        background: t.bg,
      }}
    >
      {children}
    </div>
  );
}

function CardTop({ title, subtitle, status }) {
  return (
    <div style={styles.cardTop}>
      <div>
        <div style={styles.cardTitle}>{title}</div>
        <div style={styles.cardSub}>{subtitle}</div>
      </div>
      <StatusPill status={status} />
    </div>
  );
}

function StatusPill({ status }) {
  const isActive = String(status).toLowerCase() === "active";
  return (
    <span
      style={{
        ...styles.pill,
        background: isActive ? "rgba(76,175,80,0.14)" : "rgba(0,0,0,0.06)",
        border: isActive
          ? "1px solid rgba(76,175,80,0.25)"
          : "1px solid rgba(0,0,0,0.10)",
        color: isActive ? "#1B5E20" : "#333",
      }}
    >
      {status}
    </span>
  );
}

function MiniTitle({ children }) {
  return <div style={styles.miniTitle}>{children}</div>;
}

function Benefit({ children }) {
  return (
    <div style={styles.benefitRow}>
      <span style={styles.dot} />
      <div style={styles.benefitText}>{children}</div>
    </div>
  );
}

function Divider() {
  return <div style={styles.divider} />;
}

function PriceLine({ primary, secondary }) {
  return (
    <div style={styles.priceWrap}>
      <div style={styles.pricePrimary}>{primary}</div>
      {secondary ? <div style={styles.priceSecondary}>{secondary}</div> : null}
    </div>
  );
}

function ButtonRow({ children }) {
  return <div style={styles.btnRow}>{children}</div>;
}

function PrimaryButton({ href, children }) {
  return (
    <a href={href} style={styles.primaryBtn}>
      {children}
    </a>
  );
}

function SecondaryButton({ href, children }) {
  return (
    <a href={href} style={styles.secondaryBtn}>
      {children}
    </a>
  );
}

function HintBox({ children }) {
  return <div style={styles.hint}>{children}</div>;
}

/* ---------------- styles ---------------- */

const tones = {
  neutral: {
    bg: "#FFFFFF",
    border: "rgba(0,0,0,0.08)",
    glow: "rgba(0,0,0,0.06)",
  },
  blue: {
    bg: "linear-gradient(180deg, rgba(33,150,243,0.06) 0%, #FFFFFF 58%)",
    border: "rgba(33,150,243,0.18)",
    glow: "rgba(33,150,243,0.10)",
  },
  purple: {
    bg: "linear-gradient(180deg, rgba(156,39,176,0.06) 0%, #FFFFFF 58%)",
    border: "rgba(156,39,176,0.18)",
    glow: "rgba(156,39,176,0.10)",
  },
  gold: {
    bg: "linear-gradient(180deg, rgba(253,216,53,0.14) 0%, #FFFFFF 62%)",
    border: "rgba(253,216,53,0.32)",
    glow: "rgba(253,216,53,0.14)",
  },
};

const styles = {
  page: {
    background: "#FFFDF8",
    padding: "34px 18px 64px",
    minHeight: "100vh",
  },
  wrap: {
    maxWidth: 1120,
    margin: "0 auto",
  },
  header: {
    marginTop: 22,
    marginBottom: 18,
    padding: "10px 2px",
  },
  h1: {
    fontSize: 42,
    fontWeight: 800,
    letterSpacing: -0.6,
    margin: 0,
    color: "#111",
  },
  sub: {
    fontSize: 16.5,
    lineHeight: 1.55,
    color: "rgba(0,0,0,0.68)",
    marginTop: 10,
    maxWidth: 760,
    marginBottom: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: 16,
    marginTop: 18,
  },
  card: {
    borderRadius: 22,
    padding: 22,
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: -0.3,
    color: "#111",
    marginBottom: 2,
  },
  cardSub: {
    fontSize: 13.5,
    color: "rgba(0,0,0,0.62)",
    fontWeight: 650,
  },
  pill: {
    fontSize: 12.5,
    fontWeight: 850,
    padding: "7px 10px",
    borderRadius: 999,
    whiteSpace: "nowrap",
  },
  p: {
    fontSize: 14.5,
    lineHeight: 1.55,
    color: "rgba(0,0,0,0.78)",
    marginTop: 8,
    marginBottom: 0,
  },
  miniTitle: {
    marginTop: 14,
    fontSize: 12.5,
    fontWeight: 900,
    color: "rgba(0,0,0,0.72)",
    letterSpacing: 0.35,
    textTransform: "uppercase",
  },
  benefits: {
    marginTop: 10,
    display: "grid",
    gap: 9,
  },
  benefitRow: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    marginTop: 6,
    background: "rgba(0,0,0,0.22)",
    flex: "0 0 auto",
  },
  benefitText: {
    fontSize: 14,
    lineHeight: 1.5,
    color: "rgba(0,0,0,0.78)",
  },
  divider: {
    marginTop: 14,
    marginBottom: 2,
    height: 1,
    background: "rgba(0,0,0,0.08)",
  },
  hint: {
    marginTop: 12,
    padding: 12,
    borderRadius: 16,
    background: "rgba(76,175,80,0.10)",
    border: "1px solid rgba(76,175,80,0.20)",
    color: "rgba(0,0,0,0.78)",
    fontSize: 13.5,
  },
  note: {
    marginTop: 12,
    fontSize: 13.5,
    color: "rgba(0,0,0,0.62)",
    lineHeight: 1.45,
  },
  priceWrap: {
    marginTop: 14,
    display: "grid",
    gap: 3,
  },
  pricePrimary: {
    fontSize: 15.5,
    fontWeight: 900,
    color: "#111",
  },
  priceSecondary: {
    fontSize: 13.5,
    fontWeight: 750,
    color: "rgba(0,0,0,0.62)",
  },
  btnRow: {
    marginTop: 14,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  primaryBtn: {
    display: "inline-block",
    padding: "10px 12px",
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: 900,
    color: "#0B3A66",
    background: "rgba(33,150,243,0.12)",
    border: "1px solid rgba(33,150,243,0.22)",
  },
  secondaryBtn: {
    display: "inline-block",
    padding: "10px 12px",
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: 900,
    color: "#111",
    background: "rgba(0,0,0,0.05)",
    border: "1px solid rgba(0,0,0,0.10)",
  },
};
