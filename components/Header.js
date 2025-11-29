export default function Header() {
  return (
    <header style={{
      width: "100%",
      background: "white",
      padding: "18px 24px",
      borderRadius: "0 0 12px 12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      borderBottom: "3px solid #FDD835"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        
        {/* LEFT SIDE — LOGO */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/logo.png"
            alt="YardHub Logo"
            style={{ width: "42px", height: "42px" }}
          />
          <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "600" }}>
            YardHub
          </h2>
        </div>

        {/* RIGHT SIDE — CATEGORY PIN ICONS */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "0.2rem"
        }}>
          <img src="/pins/yellow.png" alt="Yard Sales" style={{ width: "28px" }} />
          <img src="/pins/red.png" alt="Marketplace" style={{ width: "28px" }} />
          <img src="/pins/blue.png" alt="Free Stuff" style={{ width: "28px" }} />
          <img src="/pins/green.png" alt="Businesses" style={{ width: "28px" }} />
          <img src="/pins/purple.png" alt="Events" style={{ width: "28px" }} />
          <img src="/pins/orange.png" alt="Bulletin Board" style={{ width: "28px" }} />
        </nav>

      </div>
    </header>
  );
}
