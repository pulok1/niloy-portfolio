import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container" style={{ paddingBlock: "120px", display: "grid", gap: "16px", justifyItems: "start" }}>
      <span className="eyebrow">404</span>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>Page not found</h1>
      <p style={{ color: "var(--muted)" }}>This page doesn&apos;t exist. It may have moved.</p>
      <Link href="/" className="btn btn-primary">
        Back to the homepage
      </Link>
    </div>
  );
}
