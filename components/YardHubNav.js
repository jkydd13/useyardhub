import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { label: "Home", href: "/" },
  { label: "Yard Sales", href: "/yard-sales" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Free Stuff", href: "/free-stuff" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "Bulletin Board", href: "/bulletin-board" },
  { label: "Urgent", href: "/urgent" },
  { label: "About", href: "/about" },
];

export default function YardHubNav() {
  const router = useRouter();

  return (
    <nav
      style={{
        borderBottom: "1px solid #EAEAEA",
        background: "#FFF",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          overflowX: "auto",
          padding: "10px 24px",
          gap: 0, // separators handle spacing
          WebkitOverflowScrolling: "touch",
        }}
      >
        {links.map((link, idx) => {
          const isActive = router.pathname === link.href;
          const isLast = idx === links.length - 1;

          return (
            <div
              key={link.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                whiteSpace: "nowrap", // 🔒 prevents breaking into multiple lines
                flex: "0 0 auto",
              }}
            >
              <Link
                href={link.href}
                style={{
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#000" : "#555",
                  borderBottom: isActive
                    ? "2px solid #FDD835"
                    : "2px solid transparent",
                  padding: "0 14px 6px",
                  whiteSpace: "nowrap", // 🔒 keeps “Bulletin Board” together
                }}
              >
                {link.label}
              </Link>

              {/* thin separator line */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  style={{
                    width: 1,
                    height: 16,
                    background: "#E6E6E6",
                    display: "inline-block",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
