import { BRANCHES } from "@/app/config/site";

export default function HomePage() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Choose your branch</h2>
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          }}
        >
          {BRANCHES.map((b) => (
            <a
              key={b.slug}
              href={`/${encodeURIComponent(b.slug)}/sem`}
              style={{
                display: "block",
                padding: 16,
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                textDecoration: "none",
                color: "#111827",
                background: "#fafafa",
              }}
            >
              <div style={{ fontWeight: 600 }}>{b.name}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>{b.slug}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
