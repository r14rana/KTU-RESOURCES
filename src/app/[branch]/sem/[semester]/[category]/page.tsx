import data from '@/data/resources.json';
import type { Resource, Category } from '@/app/types/resource';


export default function CategoryPage({
params
}: {
params: { branch: string; semester: string; category: Category };
}) {
const all = data as Resource[];
const sem = Number(params.semester);
const items = all.filter(
r => r.branch === params.branch && r.semester === sem && r.category === params.category
);


if (items.length === 0) {
return (
<div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,padding:16}}>
<p style={{color:'#6b7280'}}>No items yet in this category.</p>
<p style={{marginTop:8}}>
Want to contribute?{' '}
<a href={`/${params.branch}/sem/${params.semester}/upload?type=${params.category}`}>Upload here</a>.
</p>
</div>
);
}


return (
<ul style={{display:'grid',gap:12,gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))'}}>
{items.map(it => (
<li key={it.id} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,padding:12}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'start',gap:12}}>
<div>
<div style={{fontWeight:600}}>{it.title}</div>
<div style={{fontSize:12,color:'#6b7280'}}>{it.subject} • {params.category}</div>
</div>
<a href={it.file_url} target="_blank" rel="noreferrer"
style={{border:'1px solid #e5e7eb',borderRadius:8,padding:'6px 10px',fontSize:14}}>
Open
</a>
</div>
{it.tags?.length ? (
<div style={{marginTop:8,display:'flex',flexWrap:'wrap',gap:8}}>
{it.tags.map(t => <span key={t} style={{fontSize:12,background:'#f3f4f6',borderRadius:999,padding:'2px 8px'}}>{t}</span>)}
</div>
) : null}
</li>
))}
</ul>
);
}