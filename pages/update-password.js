import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getSupabaseBrowserClient } from "../lib/supabaseBrowser";

export default function UpdatePasswordPage() {
  const { user, loading } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 8) {
      setErrorMessage("Use a password with at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("The passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      setSuccessMessage("Your YardHub password has been updated.");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setErrorMessage(error.message || "YardHub could not update the password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Choose a new password | YardHub</title>
      </Head>

      <main className="authContainer">
        <div className="card authCard">
          <h1>Choose a new password</h1>

          {loading ? <p>Opening your secure reset session…</p> : null}

          {!loading && !user ? (
            <>
              <p className="formError">
                This reset session is missing or expired. Request a new link.
              </p>
              <Link href="/forgot-password">Request another reset link</Link>
            </>
          ) : null}

          {!loading && user ? (
            <>
              {errorMessage ? <p className="formError">{errorMessage}</p> : null}
              {successMessage ? <p className="formSuccess">{successMessage}</p> : null}

              <form onSubmit={handleSubmit} className="formStack">
                <label htmlFor="password">New password</label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <label htmlFor="confirmPassword">Confirm new password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />

                <button type="submit" disabled={submitting}>
                  {submitting ? "Updating…" : "Update password"}
                </button>
              </form>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}
