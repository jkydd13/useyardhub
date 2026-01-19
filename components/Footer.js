import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.wrap}>
        {/* LEFT — BRAND */}
        <div style={styles.brand}>
          <div style={styles.logo}>YardHub</div>
          <p style={styles.tagline}>
            A neighbor-first marketplace built on trust, kindness, and community.
          </p>
        </div>

        {/* RIGHT — LINKS */}
        <div style={styles.links}>
          <div style={styles.linkGroup}>
            <span style={styles.groupTitle}>Account</span>
            <Link href="/account">Account</Link>
            <Link href="/account/subscriptions">Subscriptions</Link>
            <Link href="/account/credits">Credits</Link>
          </div>

          <div style={styles.linkGroup}>
            <span style={styles.groupTitle}>Legal</span>
            <Link href="/legal">Legal</Link>
            <Link href="/legal/terms">Terms</Link>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/payments">Payments</Link>
            <Link href="/legal/refunds">Refunds</Link>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div style={styles.bottom}>
        © {new Date().getFullYear()} YardHub. All rights reserved.
      </div>
    </footer>
  );
}

/* ---------------- styles ---------------- */

const styles = {
  footer: {
    background: "#FFFDF8",
    borderTop: "1px solid rgba(0,0,0,0.08)",
    marginTop: 64,
  },
  wrap: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "space-between",
    gap: 40,
    flexWrap: "wrap",
  },
  brand: {
    maxWidth: 420,
  },
  logo: {
    fontSize: 20,
    fontWeight: 900,
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "rgba(0,0,0,0.65)",
  },
  links: {
    display: "flex",
    gap: 48,
    flexWrap: "wrap",
  },
  linkGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    fontSize: 14,
  },
  groupTitle: {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    color: "rgba(0,0,0,0.45)",
    marginBottom: 6,
  },
  bottom: {
    textAlign: "center",
    padding: "16px 20px",
    fontSize: 12.5,
    color: "rgba(0,0,0,0.5)",
    borderTop: "1px solid rgba(0,0,0,0.06)",
  },
};
