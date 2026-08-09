import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function safeReturnPath(value) {
  if (typeof value !== "string") return "/account";
  if (!value.startsWith("/") || value.startsWith("//")) return "/account";
  return value;
}

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const returnPath = useMemo(
    () => safeReturnPath(router.query.next),
    [router.query.next]
  );

  useEffect(() => {
    if (!authLoading && user) {
      void router.replace(returnPath);
    }
  }, [authLoading, returnPath, router, user]);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    try {
      await signIn({ email, password });
      await router.replace(returnPath);
    } catch (error) {
      setErrorMessage(error.message || "YardHub could not sign you in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Sign in | YardHub</title>
      </Head>

      <main className="authContainer">
        <div className="card authCard">
          <h1>Sign in</h1>

          <p>
            Use the same email and password as your YardHub mobile app account.
          </p>

          {router.query.confirmed ? (
            <p className="formSuccess">
              Your email is confirmed. You may sign in now.
            </p>
          ) : null}

          {errorMessage ? <p className="formError">{errorMessage}</p> : null}

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

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button type="submit" disabled={submitting || authLoading}>
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="formLinkLine">
            <Link href="/forgot-password">Forgot your password?</Link>
          </p>

          <p className="formLinkLine">
            Don’t have an account? <Link href="/signup">Create one</Link>
          </p>
        </div>
      </main>
    </>
  );
}
