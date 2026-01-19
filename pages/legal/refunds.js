import Head from "next/head";

export default function RefundsPage() {
  return (
    <>
      <Head>
        <title>Refunds & Cancellations | YardHub</title>
      </Head>

      <main style={styles.page}>
        <div style={styles.wrap}>
          <h1 style={styles.h1}>Refunds & Cancellations</h1>
          <p style={styles.lead}>
            We aim to be fair, reasonable, and human.
          </p>

          <Section title="Subscriptions">
            You may cancel subscriptions at any time. Access continues through
            the current billing period.
          </Section>

          <Section title="Refunds">
            Refunds are reviewed case by case based on timing and usage. If
            something feels wrong, reach out.
          </Section>

          <Section title="Credits">
            Credits are generally non-refundable once used, but we review issues
            in good faith.
          </Section>

          <Section title="Free Stuff access">
            Annual Free Stuff access helps keep the system fair. If you run into
            an issue, contact us.
          </Section>

          <p style={styles.footerNote}>
            Long-term trust matters more than short-term wins.
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
