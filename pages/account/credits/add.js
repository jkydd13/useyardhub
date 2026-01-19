import AccountAuthGuard from "../../../components/AccountAuthGuard";

const isLoggedIn = false;

export default function AddCreditsPage() {
  return (
     <>
      {!isLoggedIn && <AccountAuthGuard />}
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "36px 24px 80px",
      }}
    >
      {/* HEADER */}
      <section style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 6 }}>
          Add credits
        </h1>
        <p style={{ fontSize: "1rem", color: "#555", maxWidth: 720 }}>
          Choose a credit pack below. Credits are added to your account instantly
          after checkout.
        </p>
      </section>

      {/* CREDIT PACKS */}
      <section>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: 20 }}>
          Select a credit pack
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 22,
          }}
        >
          {[
            { credits: 100, price: "$0.99" },
            { credits: 500, price: "$4.99" },
            { credits: 1000, price: "$9.99", highlight: true },
            { credits: 2000, price: "$19.99" },
            { credits: 5000, price: "$49.99" },
            { credits: 10000, price: "$99.99" },
          ].map((pack) => (
            <div
              key={pack.credits}
              style={{
                background: pack.highlight ? "#FFFBEA" : "#FFF",
                borderRadius: 18,
                padding: 26,
                border: pack.highlight
                  ? "2px solid #FDD835"
                  : "1px solid #EEE",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                {pack.credits.toLocaleString()} credits
              </p>

              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#333",
                  marginBottom: 16,
                }}
              >
                {pack.price}
              </p>

              {/* STRIPE PLACEHOLDER */}
              <button
                style={{
                  padding: "12px 22px",
                  borderRadius: 999,
                  background: "#FDD835",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                onClick={() =>
                  alert(
                    "Stripe checkout will be connected here in the next phase."
                  )
                }
              >
                Continue to checkout
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTNOTE */}
      <section style={{ marginTop: 40, maxWidth: 720 }}>
        <p style={{ fontSize: "0.85rem", color: "#777", lineHeight: 1.6 }}>
          Credits never expire and are optional. You’ll always see your balance
          and how credits are used before anything is applied.
        </p>
      </section>
    </main>
    </>
  );
}
