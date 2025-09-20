import resources from "@/data/resources.json";
import Link from "next/link";

export default function CategoryPage({
  params,
}: {
  params: { branch: string; semester: string; category: string };
}) {
  const sem = Number(params.semester);
  const items = (resources as any[]).filter(
    (r) =>
      r.branch === params.branch &&
      Number(r.semester) === sem &&
      r.category === params.category
  );

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
      }}
    >
      {items.length === 0 ? (
        <div>
          <p>No items yet in this category.</p>
          <p>
            Want to contribute?{" "}
            <Link href={`/${params.branch}/sem/${params.semester}/upload?type=${params.category}`}>
              Upload here
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 16 }}>
          {items.map((it) => (
            <li key={it.id} style={{ marginBottom: 8 }}>
              <a href={it.file_url} target="_blank" rel="noopener noreferrer">
                {it.title}
              </a>{" "}
              <span style={{ color: "#6b7280", fontSize: 12 }}>
                ({it.subject})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
