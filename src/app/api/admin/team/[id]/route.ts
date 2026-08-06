import { NextRequest, NextResponse } from "next/server";
import { deleteTeamMember, getTeamMemberById } from "@/lib/team-repository";

export const runtime = "nodejs";

function parseId(idParam: string) {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (!id) return NextResponse.json({ error: "Invalid member id." }, { status: 400 });

  const existing = await getTeamMemberById(id);
  if (!existing) return NextResponse.json({ error: "Team member not found." }, { status: 404 });

  await deleteTeamMember(id);
  return NextResponse.json({ success: true });
}
