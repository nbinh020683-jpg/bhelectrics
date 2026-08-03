import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Images are stored as base64 data URLs directly in the database (see
// src/lib/blog-repository.ts) rather than on disk. Hostinger's managed
// Node.js app hosting rebuilds the app directory on every deploy, so
// anything written to the local filesystem at runtime would eventually be
// lost — storing images in the database keeps them safe across redeploys.

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxSizeBytes = 4 * 1024 * 1024; // 4MB — kept under MySQL's default max_allowed_packet

export async function POST(request: NextRequest) {
  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  if (!allowedTypes.has(file.type)) {
    return NextResponse.json(
      { error: "Unsupported file type. Use JPG, PNG, WEBP, or GIF." },
      { status: 400 }
    );
  }

  if (file.size > maxSizeBytes) {
    return NextResponse.json({ error: "File is too large (4MB max)." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;

  return NextResponse.json({ coverImage: dataUrl }, { status: 201 });
}
