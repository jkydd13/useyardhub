export default function LoginPage() {
  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h1>Sign in</h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        Welcome back. Sign in to manage your YardHub account.
      </p>

      <form>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          style={{ width: "100%", marginBottom: 16 }}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          style={{ width: "100%", marginBottom: 16 }}
        />

        <button disabled style={{ width: "100%", marginBottom: 12 }}>
          Sign in
        </button>

        <p style={{ fontSize: 14 }}>
          <a href="/forgot-password">Forgot your password?</a>
        </p>

        <p style={{ fontSize: 14, marginTop: 16 }}>
          Don’t have an account? <a href="/signup">Create one</a>
        </p>
      </form>
    </div>
  );
}
