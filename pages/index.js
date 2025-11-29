export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        backgroundColor: "#fffdf8",
      }}
    >
      {/* NAV BAR */}
      <nav
        style={{
          width: "100%",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#FDD835", // YardHub Yellow
          position: "sticky",
          top: 0,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          zIndex: 10,
        }}
      >
        {/* Logo Placeholder - replace later with <img src="/logo.png" /> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div
            style={{
              width: 45,
              height: 45,
              background: "#fff",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              color: "#F44336", // YardHub Red
              border: "2px solid #fff",
            }}
          >
            YH
          </div>
          <span style={{ fontSize: "1.4rem", fontWeight: "700" }}>YardHub</span>
        </div>

        {/* Nav links */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            fontSize: "1rem",
          }}
        >
          <a href="#" style={{ textDecoration: "none", color: "#000" }}>
            Home
          </a>
          <a href="#download" style={{ textDecoration: "none", color: "#000" }}>
            Download
          </a>
          <a href="#about" style={{ textDecoration: "none", color: "#000" }}>
            About
          </a>
          <a href="#contact" style={{ textDecoration: "none", color: "#000" }}>
            Contact
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        style={{
          textAlign: "center",
          marginTop: "3rem",
          padding: "0 2rem",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#F44336" }}>
          🌼 YardHub — Your Local Marketplace
        </h1>

        <p
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            fontSize: "1.15rem",
            marginBottom: "1.5rem",
            color: "#444",
          }}
        >
          YardHub connects neighbors with local deals, yard sales, free items,
          small businesses, events, and everything happening around your
          community — all without annoying ads.
        </p>

        <p style={{ fontSize: "1rem", opacity: 0.8 }}>
          Payments, credits, and member features are under construction. 💛
        </p>
      </section>

      {/* QR CODE DOWNLOAD SECTION */}
      <section id="download" style={{ textAlign: "center", marginTop: "4rem" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#2196F3" }}>
          Download YardHub
        </h2>

        <p style={{ opacity: 0.8, marginBottom: "1.5rem", fontSize: "1rem" }}>
          Scan a QR code to download the app (App Store & Google Play)
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {/* iOS QR Placeholder */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 140,
                height: 140,
                background: "#e0e0e0",
                borderRadius: 12,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "0.9rem",
                color: "#555",
              }}
            >
              iOS QR Coming Soon
            </div>
            <p style={{ marginTop: "0.5rem", color: "#000" }}>iOS App Store</p>
          </div>

          {/* Android QR Placeholder */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 140,
                height: 140,
                background: "#e0e0e0",
                borderRadius: 12,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "0.9rem",
                color: "#555",
              }}
            >
              Android QR Coming Soon
            </div>
            <p style={{ marginTop: "0.5rem", color: "#000" }}>
              Google Play Store
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

}
