import Head from "next/head";

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | YardHub</title>
      </Head>

      <main style={styles.page}>
        <div style={styles.wrap}>
          <h1 style={styles.h1}>Privacy Policy</h1>
          <p style={styles.lead}>
            YardHub is built with privacy and respect at its core.
          </p>

          <Section title="Information we collect">
            We collect only what’s needed to operate YardHub, such as account
            details, listings, messages, and basic usage data.
          </Section>

          <Section title="How we use information">
            Your information helps us run the platform, improve features, and
            keep the community safe. We do not sell personal data.
          </Section>

          <Section title="Location sharing">
            YardHub shows approximate locations, not exact addresses. You control
            what you share and when.
          </Section>

          <Section title="Messages">
            Messages stay within YardHub. You control who can contact you and
            when.
          </Section>

          <Section title="Your choices">
            You can update your account, manage visibility, or close your
            account at any time.
          </Section>

          <p style={styles.footerNote}>
            Trust matters to us — always.
          </p>
        </div>
      </main>
    </>
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
