"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FloppyDisk,
  Spinner,
  WarningCircle,
  UploadSimple,
  X,
  Eye,
  PencilSimple,
} from "@phosphor-icons/react/ssr";
import type { PostRecord, PostStatus } from "@/lib/blog-repository";
import { slugify } from "@/lib/slugify-client";
import { MarkdownContent } from "@/components/ui/MarkdownContent";

export function PostForm({ initialPost }: { initialPost?: PostRecord }) {
  const router = useRouter();
  const isEdit = Boolean(initialPost);

  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [category, setCategory] = useState(initialPost?.category ?? "Residential");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
  const [metaDescription, setMetaDescription] = useState(initialPost?.metaDescription ?? "");
  const [contentMarkdown, setContentMarkdown] = useState(initialPost?.contentMarkdown ?? "");
  const [coverImagePath, setCoverImagePath] = useState<string | null>(
    initialPost?.coverImagePath ?? null
  );
  const [status, setStatus] = useState<PostStatus>(initialPost?.status ?? "draft");
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Upload failed.");
      setCoverImagePath(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>, nextStatus: PostStatus) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = {
      title,
      slug,
      category,
      excerpt,
      metaDescription,
      contentMarkdown,
      coverImagePath,
      status: nextStatus,
    };

    try {
      const url = isEdit ? `/api/admin/posts/${initialPost!.id}` : "/api/admin/posts";
      const method = isEdit ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to save post.");

      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post.");
      setSubmitting(false);
    }
  }

  return (
    <form className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]" onSubmit={(e) => handleSubmit(e, status)}>
      <div className="space-y-5">
        <div className="card p-6">
          <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-ink">
            Title <span className="text-accent">*</span>
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full rounded-lg border border-border px-4 py-3 text-base font-semibold text-ink outline-none transition-colors focus:border-primary"
            placeholder="e.g. 5 Signs You Need an Electrical Panel Upgrade"
          />

          <label htmlFor="slug" className="mb-1.5 mt-4 block text-sm font-semibold text-ink">
            URL Slug
          </label>
          <div className="flex items-center rounded-lg border border-border px-4 py-3 text-sm text-ink-muted focus-within:border-primary">
            <span className="shrink-0 text-ink-muted">/blog/</span>
            <input
              id="slug"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
              className="w-full bg-transparent text-ink outline-none"
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <label className="text-sm font-semibold text-ink">Content (Markdown supported)</label>
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              className="flex cursor-pointer items-center gap-1.5 text-xs font-bold text-primary"
            >
              {showPreview ? <PencilSimple size={14} weight="bold" /> : <Eye size={14} weight="bold" />}
              {showPreview ? "Edit" : "Preview"}
            </button>
          </div>

          {showPreview ? (
            <div className="min-h-[320px] rounded-lg border border-border bg-surface-alt p-5">
              {contentMarkdown.trim() ? (
                <MarkdownContent markdown={contentMarkdown} />
              ) : (
                <p className="text-sm text-ink-muted">Nothing to preview yet.</p>
              )}
            </div>
          ) : (
            <textarea
              value={contentMarkdown}
              onChange={(e) => setContentMarkdown(e.target.value)}
              required
              rows={16}
              className="w-full resize-y rounded-lg border border-border px-4 py-3 font-mono text-sm text-ink outline-none transition-colors focus:border-primary"
              placeholder={"Write your post here. Use **bold**, ## Headings, - lists, and [links](https://example.com)."}
            />
          )}
        </div>
      </div>

      <div className="space-y-5">
        <div className="card p-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-ink-muted">Publish</h3>
          <div className="mt-4 flex rounded-lg border border-border p-1">
            <button
              type="button"
              onClick={() => setStatus("draft")}
              className={`flex-1 cursor-pointer rounded-md py-2 text-sm font-bold transition-colors ${
                status === "draft" ? "bg-ink/8 text-ink" : "text-ink-muted"
              }`}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => setStatus("published")}
              className={`flex-1 cursor-pointer rounded-md py-2 text-sm font-bold transition-colors ${
                status === "published" ? "bg-success/15 text-success" : "text-ink-muted"
              }`}
            >
              Published
            </button>
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-danger/8 px-4 py-3 text-sm text-danger">
              <WarningCircle size={18} weight="fill" className="shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || uploading}
            className="btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Spinner size={20} weight="bold" className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FloppyDisk weight="fill" size={20} />
                {status === "published" ? "Publish" : "Save Draft"}
              </>
            )}
          </button>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-ink-muted">Cover Image</h3>
          {coverImagePath ? (
            <div className="relative mt-4 overflow-hidden rounded-lg border border-border">
              <Image
                src={coverImagePath}
                alt="Cover"
                width={400}
                height={225}
                className="h-auto w-full object-cover"
                unoptimized
              />
              <button
                type="button"
                onClick={() => setCoverImagePath(null)}
                className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-ink/70 text-white hover:bg-ink"
                aria-label="Remove cover image"
              >
                <X size={16} weight="bold" />
              </button>
            </div>
          ) : (
            <label className="mt-4 flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-8 text-center text-sm text-ink-muted hover:border-primary/40">
              {uploading ? <Spinner size={22} weight="bold" className="animate-spin" /> : <UploadSimple size={22} weight="bold" />}
              {uploading ? "Uploading..." : "Click to upload (JPG, PNG, WEBP — 5MB max)"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />
            </label>
          )}
        </div>

        <div className="card space-y-4 p-6">
          <div>
            <label htmlFor="category" className="mb-1.5 block text-sm font-semibold text-ink">
              Category
            </label>
            <input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
              placeholder="e.g. Residential, Safety, EV Chargers"
            />
          </div>
          <div>
            <label htmlFor="excerpt" className="mb-1.5 block text-sm font-semibold text-ink">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-border px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
              placeholder="Short summary shown on the blog list page"
            />
          </div>
          <div>
            <label htmlFor="metaDescription" className="mb-1.5 block text-sm font-semibold text-ink">
              Meta Description (SEO)
            </label>
            <textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-border px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
              placeholder="Shown in Google search results (150-160 characters)"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
