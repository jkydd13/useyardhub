import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
        <h1>Welcome to YardHub</h1>
        <p>Welcome to the neighborhood.</p>
      </main>
    </>
  );
}
