import Head from "next/head";

export default function PaymentsPage() {
  return (
    <>
      <Head>
        <title>Payments & Billing | YardHub</title>
      </Head>

      <main style={styles.page}>
        <div style={styles.wrap}>
          <h1 style={styles.h1}>Payments & Billing</h1>
          <p style={styles.lead}>
            Payments on YardHub are simple, transparent, and secure.
          </p>

          <Section title="Memberships and subscriptions">
            Some features require a paid membership or subscription. Prices are
            always shown clearly before purchase.
          </Section>

          <Section title="Credits">
            Credits are optional and used for expansion features like boosts.
            They are never required for basic participation.
          </Section>

          <Section title="Payment processing">
            Payments are handled by trusted payment providers. YardHub does not
            store your full payment details.
          </Section>

          <Section title="Renewals and management">
            Subscriptions renew automatically unless canceled. You can manage or
            cancel anytime from your account.
          </Section>

          <p style={styles.footerNote}>
            No hidden fees. No surprises.
          </p>
        </div>
      </main>
    </>
  );
}

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 26 }}>
      <h2 style={styles.h2}>{title}</h2>
      <p style={styles.p}>{children}</p>
    </section>
  );
}

const styles = {
  page: {
    background: "#FFFDF8",
    padding: "48px 20px",
  },
  wrap: {
    maxWidth: 760,
    margin: "0 auto",
  },
  h1: {
    fontSize: 40,
    fontWeight: 800,
    marginBottom: 10,
  },
  h2: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 6,
  },
  lead: {
    fontSize: 18,
    marginBottom: 30,
    color: "#444",
  },
  p: {
    fontSize: 15.5,
    lineHeight: 1.6,
    color: "#444",
  },
  footerNote: {
    marginTop: 36,
    fontSize: 14,
    color: "#666",
  },
};
