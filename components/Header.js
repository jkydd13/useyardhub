export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        background: "white",
        padding: "16px 24px",
        borderBottom: "3px solid #FDD835", // thin yellow underline
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "0 0 12px 12px", // soft cozy curve
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      {/* LEFT SIDE — LOGO + TAGLINE */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2
          style={{
            margin: 0,
            fontWeight: "700",
            fontSize: "1.6rem",
            letterSpacing: "-0.5px",
          }}
        >
          YardHub
        </h2>

        <span
          style={{
            marginTop: "2px",
            fontSize: "0.9rem",
            opacity: 0.7,
            fontStyle: "italic",
          }}
        >
          Welcome to the neighborhood.
        </span>
      </div>

      {/* RIGHT SIDE — PIN NAV */}
      <nav style={{ display: "flex", gap: "16px" }}>
        <img src="/pins/yellow.png" alt="Yard Sales" style={{ width: 28 }} />
        <img src="/pins/red.png" alt="Marketplace" style={{ width: 28 }} />
        <img src="/pins/blue.png" alt="Free Stuff" style={{ width: 28 }} />
        <img src="/pins/green.png" alt="Businesses" style={{ width: 28 }} />
        <img src="/pins/purple.png" alt="Events" style={{ width: 28 }} />

        {/* Your bulletin pin (the orange one) */}
        <img src="/pins/orange.png" alt="Bulletin Board" style={{ width: 28 }} />
      </nav>
    </header>
  );
}
