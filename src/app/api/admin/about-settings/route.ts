import { NextRequest, NextResponse } from "next/server";
import {
  getTeamPlaceholderImage,
  setTeamPlaceholderImage,
  clearTeamPlaceholderImage,
} from "@/lib/about-settings";

export const runtime = "nodejs";

export async function GET() {
  const image = await getTeamPlaceholderImage();
  return NextResponse.json({ image });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const image = body?.image;

  if (typeof image !== "string" || !image.startsWith("data:image/")) {
    return NextResponse.json({ error: "A valid image is required." }, { status: 400 });
  }

  await setTeamPlaceholderImage(image);
  return NextResponse.json({ success: true });
}

export async function DELETE() {
  await clearTeamPlaceholderImage();
  return NextResponse.json({ success: true });
}
