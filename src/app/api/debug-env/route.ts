import { NextResponse } from "next/server";

export const runtime = "nodejs";

// TEMPORARY diagnostic endpoint — safe to leave public since it never
// reveals secret values, only their shape (length/format), to debug why
// admin login keeps failing on Hostinger. Delete this file once resolved.

function describe(value: string | undefined) {
  if (value === undefined) return { present: false };
  return {
    present: true,
    length: value.length,
    startsWithDollar2b: value.startsWith("$2b$"),
    first4: value.slice(0, 4),
    last4: value.slice(-4),
    hasLeadingOrTrailingWhitespace: value !== value.trim(),
  };
}

export async function GET() {
  return NextResponse.json({
    ADMIN_USERNAME: describe(process.env.ADMIN_USERNAME),
    ADMIN_PASSWORD_HASH: describe(process.env.ADMIN_PASSWORD_HASH),
    ADMIN_SESSION_SECRET: describe(process.env.ADMIN_SESSION_SECRET),
    DB_HOST: describe(process.env.DB_HOST),
    DB_NAME: describe(process.env.DB_NAME),
  });
}
