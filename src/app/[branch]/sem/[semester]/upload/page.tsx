'use client';

import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

const CATS = ['notes', 'question', 'solution', 'syllabus', 'lab'] as const;

export default function UploadPage() {
  const params = useParams<{ branch: string; semester: string }>();
  const sp = useSearchParams();
  const preType = sp.get('type') ?? '';
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setBusy(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set('branch', String(params.branch));
    fd.set('semester', String(params.semester));

    try {
      const res = await fetch('/api/submit', { method: 'POST', body: fd });
      const json: unknown = await res.json().catch(() => ({}));

      setBusy(false);
      if (typeof json === 'object' && json !== null && (json as { ok?: boolean }).ok) {
        setMsg('Submitted! Pending review.');
        form.reset();
      } else {
        const errMsg =
          typeof json === 'object' && json !== null && 'error' in (json as Record<string, unknown>)
            ? String((json as Record<string, unknown>).error)
            : 'failed';
        setMsg(`Error: ${errMsg}`);
      }
    } catch (err: unknown) {
      setBusy(false);
      const message = err instanceof Error ? err.message : 'network error';
      setMsg(`Error: ${message}`);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
      <h2>Submit material</h2>
      <p style={{ color: '#6b7280', fontSize: 14 }}>
        Branch: <b>{decodeURIComponent(String(params.branch))}</b> • Semester: <b>{params.semester}</b>
      </p>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        <input name="title" placeholder="Title (e.g., DSP Set A)" required style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }} />
        <input name="subject" placeholder="Subject (e.g., Signals & Systems)" required style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }} />

        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
          <select name="category" defaultValue={preType} required style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }}>
            <option value="" disabled>Category</option>
            {CATS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <input name="tags" placeholder="Tags (comma separated)" style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }} />
        </div>

        <input name="file" type="file" required style={{ padding: 6, border: '1px solid #e5e7eb', borderRadius: 8 }} />

        <button disabled={busy} style={{ padding: '10px 14px', borderRadius: 8, background: '#111827', color: '#fff' }}>
          {busy ? 'Uploading…' : 'Submit'}
        </button>

        {msg && <p style={{ color: msg.startsWith('Error') ? '#b91c1c' : '#065f46' }}>{msg}</p>}
      </form>
    </div>
  );
}
