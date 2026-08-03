// Run with: node scripts/generate-admin-credentials.mjs "your-chosen-password"
// Prints the env vars to paste into .env.local (dev) or your VPS environment (production).
import bcrypt from "bcryptjs";
import crypto from "node:crypto";

const password = process.argv[2];

if (!password || password.length < 8) {
  console.error("Usage: node scripts/generate-admin-credentials.mjs <password (min 8 chars)>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
// IMPORTANT: Next.js's env loader (dotenv-expand) treats unescaped `$` as the
// start of a variable reference (e.g. `$2b` -> tries to expand a var named
// "2b"), which silently corrupts bcrypt hashes. Escaping every `$` as `\$`
// in the .env file makes it load as a literal character instead.
const escapedHash = hash.replaceAll("$", "\\$");
const sessionSecret = crypto.randomBytes(32).toString("hex");

console.log("\nAdd these to your .env.local (or production environment):\n");
console.log(`ADMIN_USERNAME=admin`);
console.log(`ADMIN_PASSWORD_HASH=${escapedHash}`);
console.log(`ADMIN_SESSION_SECRET=${sessionSecret}`);
console.log(
  "\nThe password hash above has its $ signs escaped (\\$) on purpose — this is required for it to load correctly from a .env file. Keep these secret and do not commit .env.local to git.\n"
);
