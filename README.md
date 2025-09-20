# Uni Hub (Next.js, no external DB)


## Install & run
npm install
npm run dev


## Add content
- Put PDFs under `public/resources/...`
- Add entries to `data/resources.json` with { branch, semester, subject, category, file_url }


## Open submissions
- Users go to `/<branch>/sem/<n>/upload?type=question|solution|notes|syllabus|lab`
- Files are saved under `public/uploads/<branch>/<sem>/<category>/...`
- Metadata added to `data/pending.json`
- Review `data/pending.json`; if approved, move the file under `public/resources/...` and copy the entry into `data/resources.json`.


## Email notifications (optional)
- Copy `.env.local.example` → `.env.local` and fill values.
- Works only in self-hosted environments (Node server with writable FS).


## Deploy
- Self-host: `npm run build && npm run start` behind Nginx/Caddy.
- Vercel (read-only): listing works, upload route won’t persist files. Use S3/Supabase instead if you need uploads on Vercel.