import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import path from "node:path";
import fs from "node:fs/promises";
import fsSync from "node:fs";

export const runtime = "nodejs";

const uploadsDir = path.join(process.cwd(), "uploads", "blog");

const allowedTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const maxSizeBytes = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  const extension = allowedTypes[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: "Unsupported file type. Use JPG, PNG, WEBP, or GIF." },
      { status: 400 }
    );
  }

  if (file.size > maxSizeBytes) {
    return NextResponse.json({ error: "File is too large (5MB max)." }, { status: 400 });
  }

  if (!fsSync.existsSync(uploadsDir)) {
    await fs.mkdir(uploadsDir, { recursive: true });
  }

  const filename = `${Date.now()}-${randomBytes(6).toString("hex")}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadsDir, filename), buffer);

  return NextResponse.json({ path: `/api/uploads/blog/${filename}` }, { status: 201 });
}
