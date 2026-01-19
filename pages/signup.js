export default function SignupPage() {
  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h1>Create your account</h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        YardHub is built around trust and community.
      </p>

      <form>
        <label>Name</label>
        <input type="text" name="name" style={{ width: "100%", marginBottom: 16 }} />

        <label>Email</label>
        <input type="email" name="email" style={{ width: "100%", marginBottom: 16 }} />

        <label>Password</label>
        <input type="password" name="password" style={{ width: "100%", marginBottom: 16 }} />

        <label>Confirm password</label>
        <input type="password" name="confirmPassword" style={{ width: "100%", marginBottom: 16 }} />

        <label style={{ fontSize: 14 }}>
          <input type="checkbox" disabled /> I agree to the Terms & Privacy Policy
        </label>

        <button disabled style={{ width: "100%", marginTop: 16 }}>
          Create account
        </button>
      </form>
    </div>
  );
}
