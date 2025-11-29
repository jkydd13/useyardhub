export default function About() {
  return (
    <main style={{ 
      maxWidth: "900px",
      margin: "0 auto",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
      color: "#333",
    }}>
      
      <h1 style={{
        fontSize: "2rem",
        fontWeight: "700",
        marginBottom: "1rem"
      }}>
        About YardHub
      </h1>

      <div style={{
        background: "#f7f7f7",
        padding: "20px",
        borderRadius: "12px",
        lineHeight: "1.6"
      }}>
        <p>
          YardHub connects neighbors to share local deals, yard sales, free items,
          small businesses, services, and local events — all on one clean,
          friendly map.
        </p>
        <p>
          Founded in 2025, YardHub’s mission is simple:  
          <strong>help communities become more connected, more supportive, and more sustainable.</strong>
        </p>
        <p>
          Whether you’re hosting a yard sale, giving away items, promoting a service,
          or planning a neighborhood event — YardHub is here to make it easy.
        </p>
      </div>
    </main>
  );
}
