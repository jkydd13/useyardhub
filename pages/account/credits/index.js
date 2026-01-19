import AccountAuthGuard from "../../../components/AccountAuthGuard";

const isLoggedIn = false;

export default function CreditsPage() {
  return (
     <>
      {!isLoggedIn && <AccountAuthGuard />}
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "36px 24px 80px",
      }}
    >
      {/* PAGE HEADER */}
      <section style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 6 }}>
          Credits
        </h1>
        <p style={{ fontSize: "1rem", color: "#555", maxWidth: 720 }}>
          Credits are used for optional actions on YardHub — like posting,
          boosting visibility, or accessing expanded tools when you need them.
        </p>
      </section>

      {/* CENTERED BALANCE CARD */}
      <section
        style={{
          maxWidth: 520,
          margin: "0 auto 48px",
          background: "#FFF",
          borderRadius: 20,
          padding: "32px 28px",
          boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "0.9rem", color: "#777", marginBottom: 8 }}>
          Your current balance
        </p>

        <div
          style={{
            fontSize: "3.2rem",
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          0
          <span
            style={{
              fontSize: "1.1rem",
              fontWeight: 500,
              marginLeft: 8,
              color: "#666",
            }}
          >
            credits
          </span>
        </div>

        <a
          href="/account/credits/add"
          style={{
            display: "inline-block",
            padding: "12px 28px",
            borderRadius: 999,
            background: "#FDD835",
            color: "#000",
            fontWeight: 600,
            fontSize: "1rem",
            textDecoration: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          Add credits
        </a>
      </section>

      {/* FIRST-TIME BONUS (INDEX ONLY) */}
      <section
        style={{
          background: "#F7F7F7",
          borderRadius: 14,
          padding: "14px 18px",
          marginBottom: 40,
          maxWidth: 720,
        }}
      >
        <p style={{ fontSize: "0.95rem", color: "#444" }}>
          🎁 <strong>First-time bonus available:</strong> Your first credit
          purchase includes extra credits.
        </p>
      </section>

      {/* HOW CREDITS ARE TYPICALLY USED */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: 18 }}>
          Typical credit usage
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 22,
          }}
        >
          {[
            {
              title: "Bulletin Board post",
              cost: "50 credits",
              note: "Lost & found, community notices, requests",
            },
            {
              title: "Yard Sale post",
              cost: "100 credits",
              note: "One-time local yard sale listing",
            },
            {
              title: "Event post",
              cost: "300 credits",
              note: "Public events and meetups",
            },
            {
              title: "Post boost",
              cost: "Varies",
              note: "Optional visibility boost for eligible posts",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "#FFF",
                borderRadius: 16,
                padding: 22,
                border: "1px solid #EEE",
              }}
            >
              <p style={{ fontSize: "1rem", fontWeight: 600 }}>
                {item.title}
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginTop: 4,
                }}
              >
                {item.cost}
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#777",
                  marginTop: 6,
                }}
              >
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTNOTE */}
      <section style={{ maxWidth: 720 }}>
        <p style={{ fontSize: "0.85rem", color: "#777", lineHeight: 1.6 }}>
          Credits never expire and are only used when you choose to use them.
          You’ll always see how many credits are required before anything is
          applied.
        </p>
      </section>
    </main>
    </>
  );
}
