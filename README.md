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

This prints three lines. Paste them into `.env.local` (local dev) and into your production environment (VPS):

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=\$2b\$12\$....................................
ADMIN_SESSION_SECRET=................................................
```

> **Important:** keep the backslashes before every `$` in `ADMIN_PASSWORD_HASH` exactly as printed. Next.js's env loader treats an unescaped `$` as the start of a variable reference and will silently corrupt the password hash without `\$`. The generator script already escapes this correctly — just paste its output as-is.

Then sign in at `http://localhost:3000/admin` (or `https://bhelectrics.com/admin` in production) with the username/password you chose (not the hash).

### What the admin panel stores, and where

- **Blog posts** live in a small SQLite database at `data/app.db` (created automatically on first run, using Node's built-in `node:sqlite` — no external database to install or pay for).
- **Uploaded cover images** are saved to `uploads/blog/` on the server's disk and served back through `/api/uploads/...`.
- Both `data/` and `uploads/` are gitignored on purpose — they're server state, not source code. **On your VPS, back these up periodically** (e.g. `tar -czf backup.tar.gz data uploads`) since they aren't stored in Git.

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

**Requirements:** Node.js **22.5+** (this project uses Node's built-in `node:sqlite`, which needs 22.5 or later — plain Node 20 will not work) and npm.

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. To use the admin panel locally, also complete the one-time setup in [Section 3](#3-blog-admin-panel) first.

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

## 6. Deploying to Hostinger (VPS / Cloud Hosting with Node.js)

This assumes a Hostinger **VPS** or **Cloud Hosting** plan with SSH access (required for a real Node.js server — standard shared hosting without Node.js support cannot run this site as-is).

### One-time server setup

1. **SSH into your VPS:**
   ```bash
   ssh root@your-server-ip
   ```
2. **Install Node.js 22+ (via NodeSource)** — required for the admin panel's built-in SQLite support:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
   apt-get install -y nodejs
   node --version   # confirm it reports v22.5.0 or higher
   ```
3. **Install PM2** (keeps the app running and restarts it on crash/reboot):
   ```bash
   npm install -g pm2
   ```
4. **Install Nginx** (reverse proxy from port 80/443 to the Node app):
   ```bash
   apt-get install -y nginx
   ```

### Deploying the app

1. **Clone your repo onto the server:**
   ```bash
   cd /var/www
   git clone https://github.com/<your-username>/<your-repo>.git bh-electrics
   cd bh-electrics
   ```
2. **Install dependencies and build:**
   ```bash
   npm install
   npm run build
   ```
3. **Create `/var/www/bh-electrics/.env.local`** with your real SMTP credentials and admin panel credentials (see `.env.example` and [Section 3](#3-blog-admin-panel) — run `node scripts/generate-admin-credentials.mjs "your-password"` on the server itself, or paste in values generated locally).
4. **Start the app with PM2**:
   ```bash
   pm2 start npm --name "bh-electrics" -- start
   pm2 save
   pm2 startup   # follow the printed instructions to enable startup-on-boot
   ```
   The app now runs on `http://localhost:3000` on the server.

5. **Configure Nginx as a reverse proxy** — create `/etc/nginx/sites-available/bhelectrics.com`:
   ```nginx
   server {
       listen 80;
       server_name bhelectrics.com www.bhelectrics.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   Enable it and restart Nginx:
   ```bash
   ln -s /etc/nginx/sites-available/bhelectrics.com /etc/nginx/sites-enabled/
   nginx -t && systemctl restart nginx
   ```
6. **Point your domain at the VPS.** In Hostinger's DNS settings for your domain, add an `A` record pointing `@` (and `www`) to your VPS's IP address.
7. **Enable free SSL with Certbot:**
   ```bash
   apt-get install -y certbot python3-certbot-nginx
   certbot --nginx -d bhelectrics.com -d www.bhelectrics.com
   ```

### Deploying updates later

```bash
cd /var/www/bh-electrics
git pull
npm install
npm run build
pm2 restart bh-electrics
```

Blog posts and uploaded images live in `data/` and `uploads/` on the server, not in Git — `git pull` never touches them, so redeploys never lose blog content. Back them up periodically anyway:

```bash
tar -czf ~/bh-electrics-backup-$(date +%F).tar.gz -C /var/www/bh-electrics data uploads
```

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
- **Node's built-in `node:sqlite`** for the blog database (zero external dependencies, zero hosting cost)
- **jose** (JWT sessions) + **bcryptjs** for the `/admin` login
- **react-markdown** for rendering blog post content
- **Nodemailer** for contact form email delivery
- **Phosphor Icons** for all iconography (no emoji, no raster icons)
- File-based **sitemap.xml**, **robots.txt**, and dynamic **Open Graph image** generation
- JSON-LD structured data: `Electrician`/`LocalBusiness` sitewide, `Service` on every service and town page, `Article` on blog posts
