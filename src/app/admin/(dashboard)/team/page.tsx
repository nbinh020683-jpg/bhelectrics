import type { Metadata } from "next";
import { getAllTeamMembers } from "@/lib/team-repository";
import { TeamManager } from "@/components/admin/TeamManager";

export const metadata: Metadata = { title: "Team" };
export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const members = await getAllTeamMembers();

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Team</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Team members added here appear on the public{" "}
        <a href="/about" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary">
          /about
        </a>{" "}
        page. If the list is empty, the About page shows a &ldquo;coming soon&rdquo; placeholder instead.
      </p>

      <div className="mt-6">
        <TeamManager members={members} />
      </div>
    </div>
  );
}
