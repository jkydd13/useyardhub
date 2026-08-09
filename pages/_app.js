import { useRouter } from "next/router";
import Header from "../components/Header";
import YardHubNav from "../components/YardHubNav";
import AccountNav from "../components/AccountNav";
import AccountRouteGuard from "../components/AccountRouteGuard";
import Footer from "../components/Footer";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAccountPage = router.pathname.startsWith("/account");

  return (
    <AuthProvider>
      <Header />

      {isAccountPage ? (
        <AccountRouteGuard>
          <AccountNav />
          <Component {...pageProps} />
        </AccountRouteGuard>
      ) : (
        <>
          <YardHubNav />
          <Component {...pageProps} />
        </>
      )}

      <Footer />
    </AuthProvider>
  );
}
