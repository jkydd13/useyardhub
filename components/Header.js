import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header
      style={{
        background: "white",
        padding: "1rem 2rem",
        borderBottom: "3px solid #FDD835", // yellow underline
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 999,
        borderRadius: "0 0 12px 12px" // cozy curve
      }}
    >
      {/* LEFT SIDE: Logo & Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <Image
          src="/logo.png"
          width={40}
          height={40}
          alt="YardHub Logo"
          style={{ borderRadius: "8px" }}
        />
        <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700 }}>
          YardHub
        </h2>
      </div>

      {/* RIGHT SIDE: Category Pins */}
      <nav style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
        
        <Link href="/">
          <Image src="/pins/yellow.png" width={28} height={28} alt="Yard Sales" />
        </Link>

        <Link href="/">
          <Image src="/pins/red.png" width={28} height={28} alt="Marketplace" />
        </Link>

        <Link href="/">
          <Image src="/pins/blue.png" width={28} height={28} alt="Free Stuff" />
        </Link>

        <Link href="/">
          <Image src="/pins/green.png" width={28} height={28} alt="Businesses" />
        </Link>

        <Link href="/">
          <Image src="/pins/purple.png" width={28} height={28} alt="Events" />
        </Link>

        <Link href="/">
          <Image src="/pins/orange.png" width={28} height={28} alt="Bulletin Board" />
        </Link>

      </nav>
    </header>
  );
}
