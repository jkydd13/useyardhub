import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const pinSlot = {
  width: "14px",
  height: "34px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const pinImage = {
  maxWidth: "30px",
  maxHeight: "30px",
  objectFit: "contain",
  display: "block",
};

export default function Header() {
  const router = useRouter();
  const { user, profile, loading, signOut } = useAuth();
  const [accountOpen, setAccountOpen] = useState(false);
  const [signOutError, setSignOutError] = useState("");
  const accountRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setAccountOpen(false);
  }, [router.asPath]);

  async function handleSignOut() {
    setSignOutError("");

    try {
      await signOut();
      setAccountOpen(false);
      await router.replace("/");
    } catch (error) {
      setSignOutError(error.message || "YardHub could not sign you out.");
    }
  }

  const accountLabel =
    profile?.display_name?.trim() || user?.email || "Your account";

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
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "inherit",
            flexShrink: 0,
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginLeft: "auto",
          }}
        >
          <div
            style={{
              maxWidth: "140px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <nav
              aria-label="YardHub category pins"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                whiteSpace: "nowrap",
              }}
            >
              <div style={pinSlot}>
                <img
                  src="/pins/urgent.png"
                  alt="Urgent"
                  style={{ ...pinImage, transform: "translateY(-3px)" }}
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

          <div ref={accountRef} style={{ position: "relative", flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => setAccountOpen((previous) => !previous)}
              title={accountLabel}
              aria-label={accountLabel}
              aria-expanded={accountOpen}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "999px",
                fontSize: "20px",
                background: user ? "#FFF8C6" : "none",
                border: user ? "1px solid #FDD835" : "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              👤
            </button>

            {accountOpen && (
              <div className="accountDropdown">
                {loading ? (
                  <span>Checking account…</span>
                ) : !user ? (
                  <>
                    <Link href="/login">Sign in</Link>
                    <Link href="/signup">Create an account</Link>
                  </>
                ) : (
                  <>
                    <div className="accountIdentity">
                      <strong>{profile?.display_name || "YardHub account"}</strong>
                      <span>{user.email}</span>
                    </div>

                    <div className="menuDivider" />

                    <Link href="/account">Account overview</Link>
                    <Link href="/account/profile">Profile</Link>
                    <Link href="/account/subscriptions">Subscriptions</Link>

                    <div className="menuDivider" />

                    <button
                      type="button"
                      className="menuButton"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>

                    {signOutError ? (
                      <span className="formError">{signOutError}</span>
                    ) : null}
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
