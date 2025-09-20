// src/app/[branch]/sem/[semester]/layout.tsx
import { BRANCHES, CATEGORIES } from '@/app/config/site';
import Link from 'next/link';

export default function SemLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { branch: string; semester: string };
}) {
  const branch = BRANCHES.find((b) => b.slug === params.branch);
  const sem = Number(params.semester);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{branch?.name || params.branch}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>Semester {sem}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CATEGORIES.map((c) => (
              <Link
                key={c.key}
                href={`/${params.branch}/sem/${params.semester}/${c.key}`}
                style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 999, textDecoration: 'none', color: '#111827', background: '#f9fafb' }}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
