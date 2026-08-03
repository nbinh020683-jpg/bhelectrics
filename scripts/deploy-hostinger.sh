#!/usr/bin/env bash
# Run this ON THE HOSTINGER VPS after you SSH in (as root or a sudo user).
# Usage: bash deploy-hostinger.sh
#
# What it does, in order:
#   1. Installs Node.js 22, PM2, and Nginx (skips anything already installed)
#   2. Clones the BH Electrics repo to /var/www/bh-electrics
#   3. Installs dependencies and builds the app
#   4. Prompts you to fill in secrets (SMTP + admin login) interactively
#   5. Starts the app under PM2 (auto-restarts on crash/reboot)
#   6. Configures Nginx as a reverse proxy for bhelectrics.com

set -euo pipefail

REPO_URL="https://github.com/nbinh020683-jpg/bhelectrics.git"
APP_DIR="/var/www/bh-electrics"
DOMAIN="bhelectrics.com"

echo "== 1. Installing Node.js 22 (if needed) =="
if ! command -v node >/dev/null || [[ "$(node -v | sed 's/v//' | cut -d. -f1)" -lt 22 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
node -v

echo "== 2. Installing PM2 (if needed) =="
command -v pm2 >/dev/null || npm install -g pm2

echo "== 3. Installing Nginx (if needed) =="
command -v nginx >/dev/null || apt-get install -y nginx

echo "== 4. Cloning/updating the repo =="
mkdir -p /var/www
if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR" && git pull
else
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

echo "== 5. Installing dependencies and building =="
npm install
npm run build

echo "== 6. Environment variables =="
if [ ! -f "$APP_DIR/.env.local" ]; then
  echo "No .env.local found — let's create one now."
  echo "(Press Enter to skip a value and fill it in later by editing .env.local directly.)"
  read -rp "SMTP host (e.g. smtp.hostinger.com): " SMTP_HOST
  read -rp "SMTP port (e.g. 587): " SMTP_PORT
  read -rp "SMTP user (e.g. office@bhelectrics.com): " SMTP_USER
  read -rsp "SMTP password: " SMTP_PASS; echo
  read -rp "Contact form recipient email [default: same as SMTP user]: " CONTACT_TO_EMAIL
  CONTACT_TO_EMAIL=${CONTACT_TO_EMAIL:-$SMTP_USER}

  ADMIN_SESSION_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
  CONTENT_BOT_API_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

  read -rp "Choose an admin panel password (min 8 chars): " ADMIN_PASSWORD
  ADMIN_PASSWORD_HASH=$(node scripts/generate-admin-credentials.mjs "$ADMIN_PASSWORD" | grep ADMIN_PASSWORD_HASH | cut -d= -f2)

  cat > "$APP_DIR/.env.local" <<EOF
SMTP_HOST=$SMTP_HOST
SMTP_PORT=$SMTP_PORT
SMTP_USER=$SMTP_USER
SMTP_PASS=$SMTP_PASS
CONTACT_TO_EMAIL=$CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL=$SMTP_USER
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$ADMIN_PASSWORD_HASH
ADMIN_SESSION_SECRET=$ADMIN_SESSION_SECRET
CONTENT_BOT_API_KEY=$CONTENT_BOT_API_KEY
EOF
  echo ".env.local created. Admin username: admin"
else
  echo ".env.local already exists — leaving it as-is."
fi

echo "== 7. Starting the app with PM2 =="
pm2 describe bh-electrics >/dev/null 2>&1 && pm2 restart bh-electrics || pm2 start npm --name "bh-electrics" --cwd "$APP_DIR" -- start
pm2 save

echo "== 8. Configuring Nginx reverse proxy =="
cat > "/etc/nginx/sites-available/$DOMAIN" <<NGINX
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX
ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
nginx -t && systemctl restart nginx

echo ""
echo "== Done =="
echo "App is running under PM2 as 'bh-electrics' and proxied through Nginx."
echo ""
echo "Remaining manual steps:"
echo "  1. In Hostinger's DNS settings for $DOMAIN, point an A record for @ and www to this server's IP."
echo "  2. Once DNS has propagated, run: apt-get install -y certbot python3-certbot-nginx && certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "  3. Run 'pm2 startup' and follow its printed instructions so the app restarts after a server reboot."
