import { NextRequest, NextResponse } from "next/server";
import { createGalleryImage, getAllGalleryImages } from "@/lib/gallery-repository";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ images: await getAllGalleryImages() });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const caption = typeof b.caption === "string" ? b.caption.trim() : "";
  const category = typeof b.category === "string" && b.category.trim() ? b.category.trim() : "General";
  const imageData = typeof b.imageData === "string" ? b.imageData : "";

  if (!caption) {
    return NextResponse.json({ error: "Caption is required." }, { status: 400 });
  }
  if (!imageData.startsWith("data:image/")) {
    return NextResponse.json({ error: "A valid uploaded image is required." }, { status: 400 });
  }

  const image = await createGalleryImage({ caption, category, imageData });
  return NextResponse.json({ image }, { status: 201 });
}
