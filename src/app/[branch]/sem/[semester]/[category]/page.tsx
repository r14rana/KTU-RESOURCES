// src/app/[branch]/sem/[semester]/[category]/page.tsx
import Link from "next/link";
import data from "@/data/resources.json";

type Category = "notes" | "question" | "solution" | "syllabus" | "lab";

type Resource = {
  id: string;
  title: string;
  branch: string;       // slug, e.g., "electronics"
  semester: number;     // 1..8
  subject: string;
  category: Category;
  tags?: string[];
  file_url: string;     // path under /public
};

export default function CategoryPage({
  params,
}: {
  params: { branch: string; semester: string; category: Category };
}) {
  const sem = Number(params.semester);
  const all = data as Resource[];
  const items = all.filter(
    (r) =>
      r.branch === params.branch &&
      r.semester === sem &&
      r.category === params.category
  );

  if (items.length === 0) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <p>No items yet in this category.</p>
        <p>
          Want to contribute?{" "}
          <Link
            href={`/${params.branch}/sem/${params.semester}/upload?type=${params.category}`}
          >
            Upload here
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <ul style={{ margin: 0, paddingLeft: 16 }}>
      {items.map((it) => (
        <li key={it.id} style={{ marginBottom: 8 }}>
          <a href={it.file_url} target="_blank" rel="noopener noreferrer">
            {it.title}
          </a>{" "}
          <span style={{ color: "#6b7280", fontSize: 12 }}>({it.subject})</span>
        </li>
      ))}
    </ul>
  );
}
