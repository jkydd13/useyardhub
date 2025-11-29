export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        🌼 YardHub — Local Deals, Yard Sales & Community
      </h1>
      <p style={{ maxWidth: "600px", fontSize: "1.1rem", marginBottom: "1.5rem" }}>
        Welcome to YardHub! This is the early preview of our official website.
        Soon you'll be able to buy credits, post yard sales, events, and
        connect with your neighbors — all without annoying ads. 💛
      </p>
      <p style={{ fontSize: "0.95rem", opacity: 0.8 }}>
        Payments & member features are under construction. Stay tuned!
      </p>
    </main>
  );
}
