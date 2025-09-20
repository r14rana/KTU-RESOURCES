import Link from "next/link";

export const metadata = {
  title: "KTU RESOURCES",
  description: "Pick branch → semester → category. Fast access to materials.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
          background: "#f7f7f8",
          color: "#111827",
        }}
      >
        <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
          <div
            style={{
              maxWidth: 1080,
              margin: "0 auto",
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link href="/" style={{ textDecoration: "none", color: "inherit", fontWeight: 700 }}>
              KTU RESOURCES
            </Link>
            <nav style={{ display: "flex", gap: 12, fontSize: 14 }}>
              <Link href="/" style={{ textDecoration: "none", color: "#111827" }}>
                Home
              </Link>
              <Link href="/about" style={{ textDecoration: "none", color: "#111827" }}>
                About
              </Link>
            </nav>
          </div>
        </header>
        <main style={{ maxWidth: 1080, margin: "0 auto", padding: "16px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
