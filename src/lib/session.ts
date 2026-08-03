import { SignJWT, jwtVerify } from "jose";

// Edge-safe session helpers (used by middleware). No bcrypt/node-only deps here.
export const SESSION_COOKIE_NAME = "bh_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const sessionMaxAge = SESSION_DURATION_SECONDS;

function getSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set (or too short). Set a long random string as an env var."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(username: string): Promise<string> {
  return new SignJWT({ sub: username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<{ sub: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.sub !== "string") return null;
    return { sub: payload.sub };
  } catch {
    return null;
  }
}
