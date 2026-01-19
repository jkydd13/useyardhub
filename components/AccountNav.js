import Link from "next/link";
import { useRouter } from "next/router";

const tabs = [
  { label: "Overview", href: "/account" },
  { label: "Credits", href: "/account/credits" },
  { label: "Subscriptions", href: "/account/subscriptions" },
];

export default function AccountNav() {
  const router = useRouter();

  return (
    <nav
      style={{
        borderBottom: "1px solid #E6E6E6",
        background: "#FFF",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 32,
          padding: "12px 16px 6px",
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = router.pathname === tab.href;
          const isLast = index === tabs.length - 1;

          return (
           <Link
             key={tab.href}
             href={tab.href}
             style={{
               textDecoration: "none",
               paddingRight: 32,
               borderRight: isLast ? "none" : "1px solid #EAEAEA",
            }}
           >
            <span
              style={{
                display: "inline-block",
                fontSize: 15,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "#000" : "#555",
                paddingBottom: 10,
                borderBottom: isActive
                  ? "2px solid #FDD835"
                  : "2px solid transparent",
              }}
            >
              {tab.label}
            </span>
          </Link>

          );
        })}
      </div>
    </nav>
  );
}
