"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UploadSimple, Spinner, Trash, WarningCircle, Users } from "@phosphor-icons/react/ssr";

export function AboutPlaceholderImageManager({ image }: { image: string | null }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState("");

  async function handleFileSelect(file: File) {
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData?.error || "Upload failed.");

      const saveRes = await fetch("/api/admin/about-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: uploadData.coverImage }),
      });
      const saveData = await saveRes.json();
      if (!saveRes.ok) throw new Error(saveData?.error || "Failed to save image.");

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    const confirmed = window.confirm("Remove this image and go back to the default icon?");
    if (!confirmed) return;

    setRemoving(true);
    try {
      const res = await fetch("/api/admin/about-settings", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove image.");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to remove image.");
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div className="card space-y-4 p-6">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide text-ink-muted">
          &ldquo;Meet the Team&rdquo; Placeholder Image
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Shown on the About page instead of the default icon while no team members have been added
          yet below (e.g. a company photo or logo). Has no effect once real team members exist.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/8">
          {image ? (
            <Image src={image} alt="About placeholder" fill unoptimized className="object-cover" />
          ) : (
            <Users size={36} weight="duotone" className="text-primary" />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="btn-secondary cursor-pointer">
            {uploading ? (
              <Spinner size={18} weight="bold" className="animate-spin" />
            ) : (
              <UploadSimple size={18} weight="bold" />
            )}
            {uploading ? "Uploading..." : image ? "Replace Image" : "Upload Image"}
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
          {image && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={removing}
              className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-ink-muted hover:border-danger/30 hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash size={14} weight="bold" />
              Remove
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-lg bg-danger/8 px-4 py-3 text-sm text-danger">
          <WarningCircle size={18} weight="fill" className="shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}
