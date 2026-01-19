import AccountAuthGuard from "../../components/AccountAuthGuard";

const isLoggedIn = false;

export default function AccountProfilePage() {
  return (
    <>
    {!isLoggedIn && <AccountAuthGuard />}

    <div style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
      {/* Header */}
      <h1>Profile</h1>
      <p style={{ color: "#555", marginBottom: 32 }}>
        Manage your personal information and account settings.
      </p>

      {/* Profile Info */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>Personal information</h2>

        <div style={{ display: "grid", gap: 16 }}>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="Your name"
              disabled
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              disabled
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <p style={{ fontSize: 13, color: "#777", marginTop: 8 }}>
          Editing profile details will be available once accounts are fully enabled.
        </p>
      </section>

      {/* Security */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>Security</h2>

        <div
          style={{
            border: "1px solid #E6E6E6",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <p style={{ marginBottom: 12 }}>
            Password
          </p>

          <button disabled>
            Change password
          </button>

          <p style={{ fontSize: 13, color: "#777", marginTop: 8 }}>
            Password management will be available soon.
          </p>
        </div>
      </section>

      {/* Danger Zone */}
      <section>
        <h2 style={{ fontSize: 18, marginBottom: 12, color: "#B00020" }}>
          Danger zone
        </h2>

        <div
          style={{
            border: "1px solid #F2CACA",
            background: "#FFF7F7",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <p style={{ marginBottom: 12 }}>
            Deleting your account is permanent and cannot be undone.
          </p>

          <button disabled style={{ background: "#E53935", color: "#FFF" }}>
            Delete account
          </button>

          <p style={{ fontSize: 13, color: "#777", marginTop: 8 }}>
            Account deletion will be available once accounts are fully enabled.
          </p>
        </div>
      </section>
    </div>
   </>
  );
}
