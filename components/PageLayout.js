import YardHubNav from "./YardHubNav";
import Footer from "./Footer";

export default function PageLayout({ children }) {
  return (
    <>
      <YardHubNav />
      <main>{children}</main>     
      <Footer />
    </>
  );
}
