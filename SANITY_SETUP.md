# LEAD College — Sanity CMS Setup

This project uses **Sanity** (a headless CMS) so college staff can update content
without a developer. Four sections are being made editable:

1. **Events** (`/life-at-lead/events`)
2. **Social Media** (`/life-at-lead/social-media`)
3. **Gallery** — photos & videos (`/life-at-lead/gallery`)
4. **Exam Results / Notices / Schedules** — now with **working PDF downloads**

## Architecture

The setup is split in two, on purpose:

```
20261009_LEAD_WEB_NEXT/
├── src/            # the Next.js WEBSITE — only READS from Sanity
│   └── sanity/     # client.ts, image.ts, queries.ts, env.ts
└── studio/         # the Sanity STUDIO — the editor UI, its own app + node_modules
    ├── sanity.config.ts
    └── schemaTypes/
```

> **Why standalone (not embedded):** embedding the Studio inside the Next app crashed
> Turbopack's CSS compiler on Windows (`0xc0000142`). Keeping the Studio as its own
> Vite app avoids that entirely and is also Sanity's recommended pattern.

- **Project:** "Lead college website" — ID `8ltl696l`
- **Dataset:** `production` (public read — the website needs no token to read)

---

## Running locally

**Website** (from repo root):
```
npm run dev            # http://localhost:3000
```

**Studio / editor** (from the studio folder):
```
cd studio
npm run dev            # http://localhost:3333
```

The first time, log in: `cd studio && npx sanity login` (opens a browser).

## Deploying the Studio (so college staff can edit online)

```
cd studio
npx sanity login       # college Sanity account
npm run deploy         # pick a hostname, e.g. leadcollege -> leadcollege.sanity.studio
```

Staff then edit at **`https://<name>.sanity.studio`** — no developer needed.

## Website environment variables

`.env.local` (already filled, gitignored) and **Vercel → Settings → Environment Variables**
need:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=8ltl696l
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=<server-only token>   # for revalidation/drafts
SANITY_REVALIDATE_SECRET=<any long random string>
```

> **Security:** the read token was shared in chat once — **rotate it** after go-live
> (Sanity → API → Tokens: delete + recreate, then update `.env.local` + Vercel).

## CORS

Already added: `http://localhost:3000`. Before production, add your live domain
(e.g. `https://www.lead.ac.in`) in Sanity → API → CORS origins (allow credentials).

---

## How updates reach the live site

Each page caches its Sanity data for **60 seconds** (ISR), so any edit an editor
publishes appears within about a minute — no redeploy needed.

For **instant** updates, add a webhook (optional):
1. Pick a long random string and set it as `SANITY_REVALIDATE_SECRET` in `.env.local`
   **and** in Vercel env vars.
2. Sanity → API → **Webhooks** → Create:
   - URL: `https://<your-domain>/api/revalidate`
   - Dataset: `production`, Trigger: Create / Update / Delete
   - Secret: the same string
   - HTTP method: POST

## Status

**Done**
- [x] Standalone Studio (`studio/`) with schemas for all sections
- [x] Website Sanity client + image + query helpers (`src/sanity/`)
- [x] Existing content seeded into Sanity (12 events, 9 social channels, 24 gallery photos, 16 exam items)
- [x] Events, Social Media, Gallery, Photo Gallery, and Examinations pages read from Sanity
- [x] Exam **PDF downloads work** (upload a file in Studio → the Download button goes live)
- [x] **Events** + **Social Media** re-enabled in the nav
- [x] ISR (60s) + optional revalidation webhook (`/api/revalidate`)
- [x] Production build passes

**Remaining**
- [ ] Deploy the Studio (`cd studio && npx sanity login && npm run deploy`) so staff can edit online
- [ ] Set the Vercel env vars (see below) before the next deploy
- [ ] Replace placeholder content with real photos/PDFs, and add social card images
- [ ] (Optional) configure the webhook for instant updates
- [ ] Rotate the API token that was shared in chat

### Re-seeding
`SANITY_TOKEN=<editor-token> node scripts/seed.ts` — idempotent (skips anything already present).

### Note on cost
Sanity bills **per editor seat**. Free tier covers a small team; confirm current
limits at <https://www.sanity.io/pricing> and add seats as needed (college billing).
