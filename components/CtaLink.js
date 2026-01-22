import Link from "next/link";

export default function CtaLink({
  href,
  children,
  variant = "primary",
}) {
  return (
    <Link href={href} className={`ctaLink ${variant}`}>
      {children}
    </Link>
  );
}
