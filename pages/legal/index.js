import Head from "next/head";
import Link from "next/link";

export default function LegalIndexPage() {
  return (
    <>
      <Head>
        <title>Legal | YardHub</title>
      </Head>

      <main style={styles.page}>
        <div style={styles.wrap}>
          <h1 style={styles.h1}>Legal</h1>
          <p style={styles.lead}>
            Clear, straightforward policies that explain how YardHub works.
          </p>

          <div style={styles.list}>
            <LegalLink
              href="/legal/terms"
              title="Terms of Service"
              description="How YardHub is used and what to expect as a member."
            />
            <LegalLink
              href="/legal/privacy"
              title="Privacy Policy"
              description="How we handle information and protect your privacy."
            />
            <LegalLink
              href="/legal/payments"
              title="Payments & Billing"
              description="Memberships, credits, and how payments work."
            />
            <LegalLink
              href="/legal/refunds"
              title="Refunds & Cancellations"
              description="How cancellations and refunds are handled."
            />
          </div>
        </div>
      </main>
    </>
  );
}

function LegalLink({ href, title, description }) {
  return (
    <Link href={href} style={styles.link}>
      <div>
        <h3 style={styles.linkTitle}>{title}</h3>
        <p style={styles.linkDesc}>{description}</p>
      </div>
    </Link>
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
  lead: {
    fontSize: 18,
    marginBottom: 36,
    color: "#444",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  link: {
    textDecoration: "none",
    padding: 20,
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#FFF",
  },
  linkTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 4,
    color: "#000",
  },
  linkDesc: {
    fontSize: 14.5,
    color: "#555",
  },
};
