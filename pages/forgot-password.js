export default function ResetPasswordPage() {
  return (
    <main className="authContainer">
      <div className="card">
        <h1>Reset your password</h1>

        <p style={{ color: "#555", marginBottom: 24 }}>
          Enter your email and we’ll send you a reset link.
        </p>

        <form>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            style={{ width: "100%", marginBottom: 16 }}
          />

          <button style={{ width: "100%" }}>
            Send reset link
          </button>
        </form>
      </div>
    </main>
  );
}
