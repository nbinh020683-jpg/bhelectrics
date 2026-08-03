import bcrypt from "bcryptjs";

// Some hosting panels' environment-variable storage silently inserts a
// backslash before every `$` (observed on Hostinger hPanel), which corrupts
// a bcrypt hash's `$2b$12$...` delimiters. Stripping `\$` back to `$` is a
// no-op for a value that was never escaped, so this is safe everywhere.
function normalizeBcryptHash(value: string): string {
  return value.replace(/\\\$/g, "$");
}

// Node-only (bcrypt). Only import this from API routes / server actions, never from middleware.
export async function checkCredentials(username: string, password: string): Promise<boolean> {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const rawExpectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !rawExpectedHash) {
    console.error("Admin login is not configured: missing ADMIN_USERNAME or ADMIN_PASSWORD_HASH.");
    return false;
  }

  if (username !== expectedUsername) return false;
  return bcrypt.compare(password, normalizeBcryptHash(rawExpectedHash));
}
