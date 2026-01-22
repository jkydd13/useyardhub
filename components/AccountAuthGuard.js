export default function AccountAuthGuard() {
  return (
    <div
      style={{
        border: "1px solid #E6E6E6",
        background: "#FAFAFA",
        borderRadius: 8,
        padding: 24,
        marginBottom: 32,
      }}
    >
      <h2 style={{ marginBottom: 8 }}>
        Sign in required
      </h2>

      <p style={{ color: "#555", marginBottom: 16 }}>
        You’ll need an account to view and manage your YardHub information.
      </p>

      <div style={{ display: "flex", gap: 12 }}>
        <a href="/login">
          <button>Sign in</button>
        </a>

        <a href="/signup">
          <button style={{ background: "#FDD835" }}>
            Create an account
          </button>
        </a>
      </div>
    </div>
  );
}
