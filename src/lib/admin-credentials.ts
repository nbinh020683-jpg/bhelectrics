import bcrypt from "bcryptjs";

// Node-only (bcrypt). Only import this from API routes / server actions, never from middleware.
export async function checkCredentials(username: string, password: string): Promise<boolean> {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !expectedHash) {
    console.error("Admin login is not configured: missing ADMIN_USERNAME or ADMIN_PASSWORD_HASH.");
    return false;
  }

  if (username !== expectedUsername) return false;
  return bcrypt.compare(password, expectedHash);
}
