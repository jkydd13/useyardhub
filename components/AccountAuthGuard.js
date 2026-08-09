import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

export default function AccountAuthGuard() {
  const router = useRouter();
  const { user, loading, authError } = useAuth();

  if (loading) {
    return (
      <main className="authContainer">
        <div className="card">
          <h2>Checking your YardHub account…</h2>
          <p>Please wait while your saved website session is restored.</p>
        </div>
      </main>
    );
  }

  if (user) return null;

  const returnTo = router.asPath.startsWith("/") ? router.asPath : "/account";
  const loginHref = `/login?next=${encodeURIComponent(returnTo)}`;

  return (
    <main className="authContainer">
      <div className="card">
        <h2>Sign in required</h2>

        <p>
          Sign in with the same YardHub account you use in the mobile app.
        </p>

        {authError ? <p className="formError">{authError}</p> : null}

        <div className="buttonRow">
          <Link className="buttonLink buttonPrimary" href={loginHref}>
            Sign in
          </Link>

          <Link className="buttonLink buttonSecondary" href="/signup">
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}
