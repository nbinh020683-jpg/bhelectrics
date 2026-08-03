# BH Electrics Website

A custom Next.js website for **BH Electrics**, a licensed electrical contractor based in Lynn, MA, serving the North Shore of Massachusetts.

Built with Next.js (App Router), TypeScript, and Tailwind CSS. SEO-optimized with per-page metadata, JSON-LD structured data (LocalBusiness, Service, Article), an auto-generated sitemap, and a dedicated landing page for every service and every town served — the standard structure for ranking a local service business in Google.

---

## 1. Before You Launch — Placeholder Content to Replace

This site was built with real business info you provided (name, address, phone) plus reasonable placeholders everywhere real content wasn't available yet. **Search for these and replace them before going live:**

| Placeholder | File | What to do |
|---|---|---|
| ~~Business email~~ | `src/lib/site-config.ts` | Done — `office@bhelectrics.com` |
| ~~Domain~~ | `src/lib/site-config.ts` | Done — `bhelectrics.com` |
| ~~License number~~ | `src/lib/site-config.ts` | Done — `License #24113-A` |
| Facebook / Instagram / Google links | `src/lib/site-config.ts` (`social`) | Replace with your real profile URLs |
| Business hours | `src/lib/site-config.ts` (`hours`) | Confirm these match your actual hours |
| Gallery photos | `src/app/gallery/page.tsx` | Currently uses styled placeholder cards — swap in real project photos when available |
| Team photos/bios | `src/app/about/page.tsx` | Currently a placeholder card — add real photos and bios when ready |
| Testimonials | *(intentionally not included)* | We did not fabricate customer reviews. Once you have real Google reviews, either link to them (already set up) or ask your developer to add a real testimonials section |
| Admin panel login | `.env.local` / production env | Not set up yet — see [Section 3](#3-blog-admin-panel) to generate a real password before anyone relies on `/admin` |

The Privacy Policy and Terms of Service pages are solid starting templates — **have a lawyer review them** before launch, especially around Massachusetts consumer protection requirements for home improvement contractors.

---

## 2. Editing Content

**Blog posts are managed through the admin panel** at `/admin` — no code changes or redeploys needed (see [Section 3](#3-blog-admin-panel)).

Everything else lives in a few data files under `src/lib/`, so most updates don't require touching page layouts:

- **`src/lib/site-config.ts`** — business name, address, phone, email, hours, license info, social links
- **`src/lib/services-data.ts`** — every service (adds/edits automatically create a new page at `/services/[slug]`)
- **`src/lib/service-areas-data.ts`** — every town served (adds/edits automatically create a new page at `/service-areas/[town]`)

Adding a new service or town is as simple as adding a new entry to the relevant array — the routing, metadata, and JSON-LD are generated automatically.

---

## 3. Blog Admin Panel

The blog has a lightweight WordPress-style admin panel at **`/admin`** — sign in, then create, edit, publish/unpublish, or delete posts with a live Markdown preview and cover-image upload. Changes appear on `/blog` immediately, with no rebuild or redeploy required.

### One-time setup: create your admin login

Nothing works until you generate credentials — there is no default password.

```bash
node scripts/generate-admin-credentials.mjs "choose-a-strong-password"
```

This prints three lines. Paste them into `.env.local` (local dev) and into your production environment (Hostinger's Node.js app environment variables — see [Section 6](#6-deploying-to-hostinger-business-web-hosting)):

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=\$2b\$12\$....................................
ADMIN_SESSION_SECRET=................................................
```

> **Important:** keep the backslashes before every `$` in `ADMIN_PASSWORD_HASH` exactly as printed. Next.js's env loader treats an unescaped `$` as the start of a variable reference and will silently corrupt the password hash without `\$`. The generator script already escapes this correctly — just paste its output as-is.

Then sign in at `http://localhost:3000/admin` (or `https://bhelectrics.com/admin` in production) with the username/password you chose (not the hash).

### What the admin panel stores, and where

- **Blog posts live in a MySQL database** — not a local file. This matters because Hostinger's Business Web Hosting Node.js app hosting rebuilds the app on every deploy, so anything written to the local disk at runtime would eventually be lost. A real database, hosted separately from the app code, survives every redeploy.
- **Uploaded cover images are stored inside the database too** (as base64 data), for the same reason — no separate file storage to worry about losing.
- See [Section 6](#6-deploying-to-hostinger-business-web-hosting) for how to create the MySQL database in hPanel and connect it.

### Changing the admin password later

Re-run the generator script with a new password and update the env vars — no code changes needed. If you ever suspect the session secret is compromised, generate a new `ADMIN_SESSION_SECRET` too; this immediately invalidates all existing login sessions.

### Daily auto-drafted posts (optional)

There's a second, separate API — `POST /api/content-bot/posts` — built specifically so a scheduled job (for example, a daily Claude Code task) can write and submit a new blog post automatically. It's intentionally limited:

- Auth is a single static key (`CONTENT_BOT_API_KEY`), sent as an `X-API-Key` header — not the admin login.
- Every post it creates is **forced to Draft**, no matter what status is sent in the request. It cannot publish, edit, or delete anything. A human still reviews and hits Publish in `/admin/posts` for every single post.
- `GET /api/content-bot/posts` (same key) lists existing post titles/slugs, so the scheduled job can avoid repeating topics.

Generate a key the same way as the other secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add it as `CONTENT_BOT_API_KEY` in your environment (see `.env.example`).

**This only runs once the site is deployed and reachable at a real URL** — a scheduled cloud job can't reach your local computer, only a live server. Once `bhelectrics.com` is live with `CONTENT_BOT_API_KEY` set, ask your developer to set up a recurring daily job that:
1. Calls `GET https://bhelectrics.com/api/content-bot/posts` with the key to see recent topics,
2. Writes a new, non-duplicate post in BH Electrics' voice,
3. `POST`s it to `https://bhelectrics.com/api/content-bot/posts` with the same key.

New drafts will appear in `/admin/posts` for you to review and publish whenever you're ready.

---

## 4. Local Development

**Requirements:** Node.js 18.18+ and npm, plus access to a MySQL database (see below).

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Pages that don't touch the blog (home, services, contact, etc.) work immediately. To use the blog or admin panel locally, you also need a MySQL database — either install MySQL/MariaDB locally, or point `DB_HOST`/`DB_USER`/`DB_PASSWORD`/`DB_NAME` at the same Hostinger MySQL database you'll use in production (only works if remote MySQL access is enabled for that database in hPanel). Then complete the one-time admin setup in [Section 3](#3-blog-admin-panel).

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # check code quality
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in real values:

```bash
cp .env.example .env.local
```

- SMTP vars enable the contact form's email delivery. Without them, the form still validates submissions correctly but returns a friendly error instead of sending an email — intentional, so the site never fails silently.
- `ADMIN_USERNAME` / `ADMIN_PASSWORD_HASH` / `ADMIN_SESSION_SECRET` enable `/admin` — see [Section 3](#3-blog-admin-panel) to generate these.

---

## 5. Pushing to GitHub

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

(Replace the URL with the repository you create on GitHub — see [github.com/new](https://github.com/new).)

---

## 6. Deploying to Hostinger (Business Web Hosting)

Business Web Hosting supports Node.js apps through hPanel's managed **Node.js Apps** feature — no SSH, no manual server setup, no PM2/Nginx. Hostinger auto-detects Next.js, runs the build, and keeps the app running, including a managed MySQL database.

### Step 1 — Create the MySQL database

1. In hPanel, go to **Databases → MySQL Databases**.
2. Create a new database (any name, e.g. `bhelectrics`) and a database user with a strong password.
3. Note the **host, port, database name, username, and password** hPanel gives you — you'll need all five.

### Step 2 — Deploy the Node.js app

1. In hPanel, go to **Websites → Add Website → Node.js Apps → Import Git Repository**.
2. Authorize Hostinger's access to GitHub (or paste the public repo URL directly: `https://github.com/nbinh020683-jpg/bhelectrics`).
3. Select the `bhelectrics` repository and the `main` branch.
4. Hostinger should auto-detect Next.js and pre-fill the build/start commands. If it asks you to confirm or enter them manually, use:
   - **Build command:** `npm run build`
   - **Start command:** `npm run start`
5. Choose a Node.js version — any of **18.x, 20.x, 22.x, 24.x** work; pick the newest available.

### Step 3 — Set environment variables

Still in the Node.js app's setup/settings screen, find **Environment Variables**. Hostinger supports importing an entire `.env` file at once — the fastest way is:

1. On your own computer, copy `.env.example` to a new file, fill in every value (the 5 database values from Step 1, your SMTP credentials, and the admin/content-bot secrets — generate those with `node scripts/generate-admin-credentials.mjs "your-password"` and the `crypto.randomBytes` command shown in `.env.example`).
2. Use hPanel's **"Import from .env file"** option to upload or paste that filled-in file.
3. Confirm, then deploy/restart the app so it picks up the new values.

### Step 4 — Connect your domain and SSL

1. In hPanel, connect the `bhelectrics.com` domain to this Node.js app (hPanel has a dedicated "Connect domain" option on the Node.js app's page — this also handles DNS if the domain is already on Hostinger).
2. Enable free SSL for the domain from hPanel's SSL section (Hostinger issues and renews this automatically).

### Deploying updates later

Hostinger's GitHub integration **automatically rebuilds and redeploys on every push to `main`** — so shipping an update is just:

```bash
git push
```

No manual redeploy step needed. Because blog posts and images live in MySQL (not on local disk — see [Section 3](#3-blog-admin-panel)), they're completely unaffected by these rebuilds.

### If something doesn't match this guide

Hostinger's hPanel UI changes over time, so exact button labels may differ slightly from what's described above. If a step doesn't look like what you see on screen, tell me what you're seeing (a screenshot helps) and I'll adjust the instructions — or check Hostinger's own [Node.js hosting help articles](https://www.hostinger.com/support/hpanel/node-js/).

---

## 7. Post-Launch SEO Checklist

1. **Google Business Profile** — create/claim one for BH Electrics at the exact address used on this site (`20 N Federal St, Lynn, MA 01905`) so Name/Address/Phone match exactly (critical for local SEO). Link it in `siteConfig.social.google`.
2. **Google Search Console** — verify the domain and submit `https://www.bhelectrics.com/sitemap.xml`.
3. **Bing Webmaster Tools** — same idea, smaller but free additional traffic source.
4. **Consistent NAP everywhere** — make sure your business Name, Address, and Phone number are written identically across Google, Facebook, Yelp, and any directories.
5. **Real photos** — replace the gallery/about placeholders with real project and team photos as soon as available; this measurably improves trust and conversion for local service businesses.
6. **Real reviews** — once you have Google reviews, they'll show up automatically wherever customers click "View Reviews on Google" on the site.
7. **Blog regularly** — use `/admin` to publish new posts targeting North Shore electrical topics; fresh, relevant content is one of the strongest ongoing local-SEO signals.

---

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **MySQL** (via `mysql2`) for the blog database — chosen specifically because Hostinger's managed Node.js app hosting rebuilds the app directory on every deploy, so blog content needs to live somewhere that survives that
- **jose** (JWT sessions) + **bcryptjs** for the `/admin` login
- **react-markdown** for rendering blog post content
- **Nodemailer** for contact form email delivery
- **Phosphor Icons** for all iconography (no emoji, no raster icons)
- File-based **sitemap.xml**, **robots.txt**, and dynamic **Open Graph image** generation
- JSON-LD structured data: `Electrician`/`LocalBusiness` sitewide, `Service` on every service and town page, `Article` on blog posts
