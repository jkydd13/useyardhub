export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        background: "#ffffff",
        borderRadius: "0 0 16px 16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "4px solid #FDD835",
      }}
    >
      {/* Left: Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="/logo.png"
          alt="YardHub Logo"
          style={{ width: "50px", height: "50px", borderRadius: "10px" }}
        />
        <h1 style={{ fontSize: "1.4rem", margin: 0 }}>YardHub</h1>
      </div>

      {/* Right: 6 glossy mini pins */}
      <div style={{ display: "flex", gap: "12px" }}>
        <img src="/pin-yellow.png"  style={{ width: 24, height: 24 }} />
        <img src="/pin-red.png"     style={{ width: 24, height: 24 }} />
        <img src="/pin-blue.png"    style={{ width: 24, height: 24 }} />
        <img src="/pin-green.png"   style={{ width: 24, height: 24 }} />
        <img src="/pin-purple.png"  style={{ width: 24, height: 24 }} />
        <img src="/pin-orange.png"  style={{ width: 24, height: 24 }} />
      </div>
    </header>
  );
}
