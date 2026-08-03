import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";

export const runtime = "nodejs";

const uploadsRoot = path.join(process.cwd(), "uploads");

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;

  // Resolve and confirm the final path stays inside uploadsRoot (blocks path traversal).
  const requestedPath = path.join(uploadsRoot, ...segments);
  const resolved = path.resolve(requestedPath);
  if (!resolved.startsWith(path.resolve(uploadsRoot) + path.sep)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const extension = path.extname(resolved).toLowerCase();
  const contentType = contentTypes[extension];
  if (!contentType) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const fileBuffer = await fs.readFile(resolved);
    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
