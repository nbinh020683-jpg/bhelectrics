import type { Metadata } from "next";
import { getAllTeamMembers } from "@/lib/team-repository";
import { getTeamPlaceholderImage } from "@/lib/about-settings";
import { TeamManager } from "@/components/admin/TeamManager";
import { AboutPlaceholderImageManager } from "@/components/admin/AboutPlaceholderImageManager";

export const metadata: Metadata = { title: "Team" };
export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const [members, placeholderImage] = await Promise.all([
    getAllTeamMembers(),
    getTeamPlaceholderImage(),
  ]);

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
        <AboutPlaceholderImageManager image={placeholderImage} />
      </div>

      <div className="mt-8">
        <TeamManager members={members} />
      </div>
    </div>
  );
}
