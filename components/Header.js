const pinSlot = {
  width: "30px",
  height: "40px",        // IMPORTANT: slot height
  display: "flex",
  alignItems: "flex-end", // pins sit on the same baseline
  justifyContent: "center",
};

const pinImage = {
  maxWidth: "32px",
  maxHeight: "32px",
  objectFit: "contain",
  display: "block",
};

export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        background: "white",
        padding: "16px 24px 18px 24px",
        borderRadius: "0 0 12px 12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        borderBottom: "3px solid #FDD835",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT SIDE — LOGO */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/logo.png"
            alt="YardHub Logo"
            style={{ width: "40px", height: "40px", marginTop: "1px" }}
          />
          <h2
            style={{
              margin: 0,
              fontSize: "1.35rem",
              fontWeight: "600",
              marginTop: "1px",
            }}
          >
            YardHub
          </h2>
        </div>

        {/* RIGHT SIDE — CATEGORY PIN ICONS */}
<nav
  style={{
    display: "flex",
    alignItems: "center",
    gap: "0.2rem",
    paddingRight: "8px",
  }}
>
  {/* URGENT */}
  <div style={pinSlot}>
    <img
      src="/pins/urgent.png"
      alt="Urgent"
      title="Urgent"
      style={{
        ...pinImage,
        marginBottom: "2px", // optical adjustment
      }}
    />
  </div>

  <div style={pinSlot}>
    <img src="/pins/yellow.png" alt="Yard Sales" style={pinImage} />
  </div>

  <div style={pinSlot}>
    <img src="/pins/red.png" alt="Marketplace" style={pinImage} />
  </div>

  <div style={pinSlot}>
    <img src="/pins/blue.png" alt="Free Stuff" style={pinImage} />
  </div>

  <div style={pinSlot}>
    <img src="/pins/green.png" alt="Businesses" style={pinImage} />
  </div>

  <div style={pinSlot}>
    <img src="/pins/purple.png" alt="Events" style={pinImage} />
  </div>

  <div style={pinSlot}>
    <img src="/pins/orange.png" alt="Bulletin Board" style={pinImage} />
  </div>
</nav>

      </div>
    </header>
  );
}
