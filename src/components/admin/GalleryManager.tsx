"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UploadSimple, Spinner, Trash, WarningCircle } from "@phosphor-icons/react/ssr";
import type { GalleryImage } from "@/lib/gallery-repository";

export function GalleryManager({ images }: { images: GalleryImage[] }) {
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Residential");
  const [pendingImage, setPendingImage] = useState<string | null>(null);
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
      setPendingImage(data.coverImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!pendingImage) {
      setError("Choose a photo first.");
      return;
    }
    if (!caption.trim()) {
      setError("Add a caption for this photo.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caption, category, imageData: pendingImage }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to save photo.");

      setCaption("");
      setPendingImage(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save photo.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(image: GalleryImage) {
    const confirmed = window.confirm(`Delete "${image.caption}"? This can't be undone.`);
    if (!confirmed) return;

    setDeletingId(image.id);
    try {
      const response = await fetch(`/api/admin/gallery/${image.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete photo.");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete photo.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="card space-y-4 p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-ink-muted">Upload a Photo</h2>

        <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
          {pendingImage ? (
            <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
              <Image src={pendingImage} alt="Preview" fill unoptimized className="object-cover" />
            </div>
          ) : (
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border text-center text-xs text-ink-muted hover:border-primary/40">
              {uploading ? <Spinner size={22} weight="bold" className="animate-spin" /> : <UploadSimple size={22} weight="bold" />}
              {uploading ? "Uploading..." : "Choose photo (4MB max)"}
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
              <label htmlFor="caption" className="mb-1.5 block text-sm font-semibold text-ink">
                Caption
              </label>
              <input
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Panel Upgrade — Residential"
                className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="category" className="mb-1.5 block text-sm font-semibold text-ink">
                Category
              </label>
              <input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Residential, Commercial, EV Chargers"
                className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
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
                "Add to Gallery"
              )}
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-ink-muted">
          {images.length} Photo{images.length === 1 ? "" : "s"}
        </h2>

        {images.length === 0 ? (
          <div className="card flex flex-col items-center gap-2 p-14 text-center">
            <p className="font-bold text-ink">No photos yet</p>
            <p className="text-sm text-ink-muted">Upload your first project photo above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((image) => (
              <div key={image.id} className="card overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={image.imageData} alt={image.caption} fill unoptimized className="object-cover" />
                  <button
                    type="button"
                    onClick={() => handleDelete(image)}
                    disabled={deletingId === image.id}
                    className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-ink/70 text-white hover:bg-danger disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label={`Delete ${image.caption}`}
                  >
                    <Trash size={16} weight="bold" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-semibold text-ink">{image.caption}</p>
                  <p className="text-xs text-ink-muted">{image.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
