import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!displayName.trim()) {
      setErrorMessage("Enter the display name you want to use on YardHub.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Use a password with at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("The passwords do not match.");
      return;
    }

    if (!agreed) {
      setErrorMessage("Please agree to the Terms and Privacy Policy.");
      return;
    }

    setSubmitting(true);

    try {
      const emailRedirectTo = `${window.location.origin}/login?confirmed=1`;
      const data = await signUp({
        displayName,
        email,
        password,
        emailRedirectTo,
      });

      if (data.session) {
        await router.replace("/account/profile");
        return;
      }

      setSuccessMessage(
        "Check your email to confirm your YardHub account, then sign in."
      );
    } catch (error) {
      setErrorMessage(error.message || "YardHub could not create the account.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Create account | YardHub</title>
      </Head>

      <main className="authContainer">
        <div className="card authCard">
          <h1>Create your account</h1>

          <p>
            This creates the same YardHub identity used by the website and mobile app.
          </p>

          {errorMessage ? <p className="formError">{errorMessage}</p> : null}
          {successMessage ? <p className="formSuccess">{successMessage}</p> : null}

          <form onSubmit={handleSubmit} className="formStack">
            <label htmlFor="displayName">Display name</label>
            <input
              id="displayName"
              type="text"
              name="displayName"
              autoComplete="nickname"
              maxLength={80}
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />

            <label className="checkboxRow" htmlFor="agree">
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
              />
              <span>
                I agree to the <Link href="/legal/terms">Terms</Link> and{" "}
                <Link href="/legal/privacy">Privacy Policy</Link>.
              </span>
            </label>

            <button type="submit" disabled={submitting}>
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="formLinkLine">
            Already have an account? <Link href="/login">Sign in</Link>
          </p>
        </div>
      </main>
    </>
  );
}
