import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { getSupabaseBrowserClient } from "../lib/supabaseBrowser";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setSubmitting(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;

      setSuccessMessage(
        "Check your email for a YardHub password-reset link."
      );
    } catch (error) {
      setErrorMessage(
        error.message || "YardHub could not send the reset email."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Reset password | YardHub</title>
      </Head>

      <main className="authContainer">
        <div className="card authCard">
          <h1>Reset your password</h1>

          <p>Enter your email and we’ll send you a reset link.</p>

          {errorMessage ? <p className="formError">{errorMessage}</p> : null}
          {successMessage ? <p className="formSuccess">{successMessage}</p> : null}

          <form onSubmit={handleSubmit} className="formStack">
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

            <button type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send reset link"}
            </button>
          </form>

          <p className="formLinkLine">
            <Link href="/login">Back to sign in</Link>
          </p>
        </div>
      </main>
    </>
  );
}
