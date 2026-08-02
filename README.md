# BH Electrics Website

A custom Next.js website for **BH Electrics**, a licensed electrical contractor based in Lynn, MA, serving the North Shore of Massachusetts.

Built with Next.js (App Router), TypeScript, and Tailwind CSS. SEO-optimized with per-page metadata, JSON-LD structured data (LocalBusiness, Service, Article), an auto-generated sitemap, and a dedicated landing page for every service and every town served — the standard structure for ranking a local service business in Google.

---

## 1. Before You Launch — Placeholder Content to Replace

This site was built with real business info you provided (name, address, phone) plus reasonable placeholders everywhere real content wasn't available yet. **Search for these and replace them before going live:**

| Placeholder | File | What to do |
|---|---|---|
| `info@bhelectrics.com` | `src/lib/site-config.ts` | Replace with your real business email |
| `https://www.bhelectrics.com` | `src/lib/site-config.ts` | Replace with your real domain once confirmed |
| `License #A-XXXXX` | `src/lib/site-config.ts` | Replace with your actual MA electrical contractor license number |
| Facebook / Instagram / Google links | `src/lib/site-config.ts` (`social`) | Replace with your real profile URLs |
| Business hours | `src/lib/site-config.ts` (`hours`) | Confirm these match your actual hours |
| Gallery photos | `src/app/gallery/page.tsx` | Currently uses styled placeholder cards — swap in real project photos when available |
| Team photos/bios | `src/app/about/page.tsx` | Currently a placeholder card — add real photos and bios when ready |
| Testimonials | *(intentionally not included)* | We did not fabricate customer reviews. Once you have real Google reviews, either link to them (already set up) or ask your developer to add a real testimonials section |

The Privacy Policy and Terms of Service pages are solid starting templates — **have a lawyer review them** before launch, especially around Massachusetts consumer protection requirements for home improvement contractors.

---

## 2. Editing Content (No Code Changes Needed for Most Updates)

Almost all business content lives in a few data files under `src/lib/`, so most updates don't require touching page layouts:

- **`src/lib/site-config.ts`** — business name, address, phone, email, hours, license info, social links
- **`src/lib/services-data.ts`** — every service (adds/edits automatically create a new page at `/services/[slug]`)
- **`src/lib/service-areas-data.ts`** — every town served (adds/edits automatically create a new page at `/service-areas/[town]`)
- **`src/lib/blog-data.ts`** — blog posts (add a new object to the array to publish a new post at `/blog/[slug]`)

Adding a new service or town is as simple as adding a new entry to the relevant array — the routing, metadata, and JSON-LD are generated automatically.

---

## 3. Local Development

**Requirements:** Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # check code quality
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in real values to enable the contact form's email delivery locally:

```bash
cp .env.example .env.local
```

Without these set, the contact form will still validate submissions correctly but will return a friendly error instead of sending an email — this is intentional so the site never fails silently.

---

## 4. Pushing to GitHub

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

(Replace the URL with the repository you create on GitHub — see [github.com/new](https://github.com/new).)

---

## 5. Deploying to Hostinger (VPS / Cloud Hosting with Node.js)

This assumes a Hostinger **VPS** or **Cloud Hosting** plan with SSH access (required for a real Node.js server — standard shared hosting without Node.js support cannot run this site as-is).

### One-time server setup

1. **SSH into your VPS:**
   ```bash
   ssh root@your-server-ip
   ```
2. **Install Node.js 20+ (via NodeSource):**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt-get install -y nodejs
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
3. **Create `/var/www/bh-electrics/.env.local`** with your real SMTP credentials (see `.env.example`).
4. **Start the app with PM2** (this project uses `output: "standalone"` in `next.config.ts`, which produces a minimal self-contained server):
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

---

## 6. Post-Launch SEO Checklist

1. **Google Business Profile** — create/claim one for BH Electrics at the exact address used on this site (`20 N Federal St, Lynn, MA 01905`) so Name/Address/Phone match exactly (critical for local SEO). Link it in `siteConfig.social.google`.
2. **Google Search Console** — verify the domain and submit `https://www.bhelectrics.com/sitemap.xml`.
3. **Bing Webmaster Tools** — same idea, smaller but free additional traffic source.
4. **Consistent NAP everywhere** — make sure your business Name, Address, and Phone number are written identically across Google, Facebook, Yelp, and any directories.
5. **Real photos** — replace the gallery/about placeholders with real project and team photos as soon as available; this measurably improves trust and conversion for local service businesses.
6. **Real reviews** — once you have Google reviews, they'll show up automatically wherever customers click "View Reviews on Google" on the site.

---

## Tech Stack

- **Next.js 15** (App Router, TypeScript, `output: "standalone"` for VPS deployment)
- **Tailwind CSS** for styling
- **Nodemailer** for contact form email delivery
- **Phosphor Icons** for all iconography (no emoji, no raster icons)
- File-based **sitemap.xml**, **robots.txt**, and dynamic **Open Graph image** generation
- JSON-LD structured data: `Electrician`/`LocalBusiness` sitewide, `Service` on every service and town page, `Article` on blog posts
