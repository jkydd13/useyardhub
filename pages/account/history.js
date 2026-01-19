import AccountAuthGuard from "../../components/AccountAuthGuard";

const isLoggedIn = false;

export default function AccountHistoryPage() {
  return (
     <>
      {!isLoggedIn && <AccountAuthGuard />}

    <div style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
      <h1>History</h1>
      <p style={{ color: "#555", marginBottom: 32 }}>
        Review your account activity and past purchases.
      </p>

      {/* Credit History */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>
          Credit purchases
        </h2>

        <div
          style={{
            border: "1px solid #E6E6E6",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <p style={{ marginBottom: 8 }}>
            No credit purchases yet.
          </p>

          <p style={{ fontSize: 13, color: "#777" }}>
            When you purchase credits, they’ll appear here with dates and amounts.
          </p>
        </div>
      </section>

      {/* Subscription History */}
      <section>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>
          Subscription history
        </h2>

        <div
          style={{
            border: "1px solid #E6E6E6",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <p style={{ marginBottom: 8 }}>
            No subscription history available.
          </p>

          <p style={{ fontSize: 13, color: "#777" }}>
            Invoices and billing history will appear here once subscriptions are active.
          </p>
        </div>
      </section>
    </div>
    </>
  );
}
