import Link from "next/link";
import { useState } from "react";

const pinSlot = {
  width: "30px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const pinImage = {
  maxWidth: "32px",
  maxHeight: "32px",
  objectFit: "contain",
  display: "block",
};

export default function Header() {
  const [accountOpen, setAccountOpen] = useState(false);
  const isLoggedIn = false;

  return (
    <header
      style={{
        width: "100%",
        background: "white",
        padding: "16px 24px",
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
        }}
      >
        {/* LEFT — LOGO */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <img
            src="/logo.png"
            alt="YardHub Logo"
            style={{ width: "40px", height: "40px" }}
          />
          <h2 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 600 }}>
            YardHub
          </h2>
        </Link>

        {/* RIGHT — PINS + ACCOUNT ICON */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginLeft: "auto",
          }}
        >
          {/* PINS */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            <div style={pinSlot}>
              <img
                src="/pins/urgent.png"
                alt="Urgent"
                style={{
                  ...pinImage,
                  transform: "translateY(-2.5px)", // optical correction
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
              <img
                src="/pins/orange.png"
                alt="Bulletin Board"
                style={pinImage}
              />
            </div>
          </nav>

          {/* ACCOUNT ICON + DROPDOWN */}
          <div style={{ position: "relative" }}>
            <button
               onClick={() => setAccountOpen(!accountOpen)}
               title="Your account"
               style={{
                 fontSize: "22px",
                 background: "none",
                 border: "none",
                 cursor: "pointer",
               }}
            >
               👤
            </button>

            {accountOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                  borderRadius: 8,
                  padding: 12,
                  minWidth: 200,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  zIndex: 1000,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {!isLoggedIn ? (
                  <>
                    <Link href="/login">Sign in</Link>
                    <Link href="/signup">Create account</Link>

                    <div style={{ height: 1, background: "#EAEAEA", margin: "8px 0" }} />

                    <Link href="/account/credits">Credits</Link>
                    <Link href="/account/subscriptions">Subscriptions</Link>
                  </>
                ) : (
                  <>
                    <Link href="/account/profile">Profile</Link>
                    <Link href="/account/billing">Billing</Link>
                    <Link href="/account/history">History</Link>
                    <Link href="/account/credits">Credits</Link>
                    <Link href="/account/subscriptions">Subscriptions</Link>

                    <div style={{ height: 1, background: "#EAEAEA", margin: "8px 0" }} />

                    <button style={{ textAlign: "left" }}>Sign out</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
