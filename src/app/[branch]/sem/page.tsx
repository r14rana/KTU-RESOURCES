// src/app/[branch]/sem/page.tsx
import { notFound } from 'next/navigation';
import { BRANCHES, SEMESTERS } from '@/app/config/site';

export default function SemestersPage({ params }: { params: { branch: string } }) {
  const branch = BRANCHES.find((b) => b.slug === params.branch);
  if (!branch) return notFound();

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>Branch: {branch.name}</h2>
        <p style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>Pick a semester</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
          {SEMESTERS.map((s) => (
            <a
              key={s}
              href={`/${branch.slug}/sem/${s}`}
              style={{ padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 8, textDecoration: 'none', color: '#111827', background: '#fafafa' }}
            >
              Semester {s}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
