export default function ForgotPasswordPage() {
  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h1>Reset your password</h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        Enter your email and we’ll send a reset link.
      </p>

      <form>
        <label>Email</label>
        <input type="email" style={{ width: "100%", marginBottom: 16 }} />

        <button disabled style={{ width: "100%" }}>
          Send reset link
        </button>
      </form>
    </div>
  );
}
