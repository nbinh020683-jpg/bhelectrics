import { NextRequest, NextResponse } from "next/server";
import { createTeamMember, getAllTeamMembers } from "@/lib/team-repository";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ members: await getAllTeamMembers() });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const role = typeof b.role === "string" ? b.role.trim() : "";
  const bio = typeof b.bio === "string" ? b.bio.trim() : "";
  const photoData = typeof b.photoData === "string" && b.photoData ? b.photoData : null;

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (photoData && !photoData.startsWith("data:image/")) {
    return NextResponse.json({ error: "Invalid uploaded photo." }, { status: 400 });
  }

  const member = await createTeamMember({ name, role, bio, photoData });
  return NextResponse.json({ member }, { status: 201 });
}
