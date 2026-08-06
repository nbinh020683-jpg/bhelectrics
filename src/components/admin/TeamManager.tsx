"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UploadSimple, Spinner, Trash, WarningCircle, User } from "@phosphor-icons/react/ssr";
import type { TeamMember } from "@/lib/team-repository";

export function TeamManager({ members }: { members: TeamMember[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [pendingPhoto, setPendingPhoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function handleFileSelect(file: File) {
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Upload failed.");
      setPendingPhoto(data.coverImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, bio, photoData: pendingPhoto }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to save team member.");

      setName("");
      setRole("");
      setBio("");
      setPendingPhoto(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save team member.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(member: TeamMember) {
    const confirmed = window.confirm(`Remove "${member.name}" from the team page? This can't be undone.`);
    if (!confirmed) return;

    setDeletingId(member.id);
    try {
      const response = await fetch(`/api/admin/team/${member.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to remove team member.");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to remove team member.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="card space-y-4 p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-ink-muted">Add a Team Member</h2>

        <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
          {pendingPhoto ? (
            <div className="relative aspect-square overflow-hidden rounded-full border border-border">
              <Image src={pendingPhoto} alt="Preview" fill unoptimized className="object-cover" />
            </div>
          ) : (
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-full border-2 border-dashed border-border text-center text-xs text-ink-muted hover:border-primary/40">
              {uploading ? <Spinner size={20} weight="bold" className="animate-spin" /> : <UploadSimple size={20} weight="bold" />}
              {uploading ? "Uploading..." : "Photo (optional)"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
              />
            </label>
          )}

          <div className="space-y-3">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">
                Name <span className="text-accent">*</span>
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Smith"
                className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="role" className="mb-1.5 block text-sm font-semibold text-ink">
                Role / Title
              </label>
              <input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Master Electrician, Owner"
                className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="bio" className="mb-1.5 block text-sm font-semibold text-ink">
                Short Bio (optional)
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
                placeholder="A sentence or two about this person"
                className="w-full resize-none rounded-lg border border-border px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2.5 rounded-lg bg-danger/8 px-4 py-3 text-sm text-danger">
                <WarningCircle size={18} weight="fill" className="shrink-0" />
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={submitting || uploading}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Spinner size={20} weight="bold" className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Add to Team Page"
              )}
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-ink-muted">
          {members.length} Team Member{members.length === 1 ? "" : "s"}
        </h2>

        {members.length === 0 ? (
          <div className="card flex flex-col items-center gap-2 p-14 text-center">
            <p className="font-bold text-ink">No team members yet</p>
            <p className="text-sm text-ink-muted">
              The About page will keep showing the &ldquo;coming soon&rdquo; placeholder until you add someone here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {members.map((member) => (
              <div key={member.id} className="card p-5 text-center">
                <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full bg-primary/8">
                  {member.photoData ? (
                    <Image src={member.photoData} alt={member.name} fill unoptimized className="object-cover" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-primary">
                      <User size={32} weight="fill" />
                    </span>
                  )}
                </div>
                <p className="mt-3 truncate text-sm font-bold text-ink">{member.name}</p>
                {member.role && <p className="truncate text-xs text-ink-muted">{member.role}</p>}
                <button
                  type="button"
                  onClick={() => handleDelete(member)}
                  disabled={deletingId === member.id}
                  className="mt-3 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-semibold text-ink-muted hover:border-danger/30 hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Trash size={14} weight="bold" />
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
