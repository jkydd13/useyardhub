import Head from "next/head";

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service | YardHub</title>
      </Head>

      <main style={styles.page}>
        <div style={styles.wrap}>
          <h1 style={styles.h1}>Terms of Service</h1>
          <p style={styles.lead}>
            These terms exist to keep YardHub safe, fair, and useful for everyone.
          </p>

          <Section title="Using YardHub">
            YardHub helps neighbors connect through local sales, services, events,
            and community requests. By using YardHub, you agree to use the
            platform responsibly and lawfully.
          </Section>

          <Section title="Community expectations">
            Be honest. Be respectful. Don’t spam, scam, mislead, or misuse the
            platform. We may remove content or accounts that violate these
            expectations.
          </Section>

          <Section title="Listings and services">
            YardHub does not guarantee outcomes. All transactions, services, and
            arrangements happen directly between users. Use your best judgment
            when communicating or meeting in person.
          </Section>

          <Section title="Memberships and subscriptions">
            Some features require an active membership or subscription. Pricing
            and access details are always shown clearly before you subscribe.
          </Section>

          <Section title="Changes to YardHub">
            YardHub is evolving. We may update features or policies as we grow,
            while staying transparent and user-focused.
          </Section>

          <p style={styles.footerNote}>
            Questions? We’re here and happy to help.
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
  page: { background: "#FFFDF8", padding: "48px 20px" },
  wrap: { maxWidth: 760, margin: "0 auto" },
  h1: { fontSize: 40, fontWeight: 800, marginBottom: 10 },
  h2: { fontSize: 22, fontWeight: 700, marginBottom: 6 },
  lead: { fontSize: 18, marginBottom: 30, color: "#444" },
  p: { fontSize: 15.5, lineHeight: 1.6, color: "#444" },
  footerNote: { marginTop: 36, fontSize: 14, color: "#666" },
};