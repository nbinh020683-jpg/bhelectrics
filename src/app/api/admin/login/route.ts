import { NextRequest, NextResponse } from "next/server";
import { checkCredentials } from "@/lib/admin-credentials";
import { createSessionToken, SESSION_COOKIE_NAME, sessionMaxAge } from "@/lib/session";

export const runtime = "nodejs";

const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 10;
const attempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > rateLimitMax;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many login attempts. Try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  try {
    const valid = await checkCredentials(username, password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const token = await createSessionToken(username);
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: sessionMaxAge,
    });
    return response;
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json(
      { error: "Login is not fully configured on the server yet." },
      { status: 500 }
    );
  }
}
