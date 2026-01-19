import { useRouter } from "next/router";
import Header from "../components/Header";
import YardHubNav from "../components/YardHubNav";
import AccountNav from "../components/AccountNav";
import Footer from "../components/Footer";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAccountPage = router.pathname.startsWith("/account");

  return (
    <>
      <Header />

      {isAccountPage ? <AccountNav /> : <YardHubNav />}

      <Component {...pageProps} />

      <Footer />
    </>
  );
}
