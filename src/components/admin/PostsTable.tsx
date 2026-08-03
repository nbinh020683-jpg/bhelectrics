"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PencilSimple, Trash, Eye, EyeSlash } from "@phosphor-icons/react/ssr";
import type { PostRecord } from "@/lib/blog-repository";

export function PostsTable({ posts }: { posts: PostRecord[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleDelete(post: PostRecord) {
    const confirmed = window.confirm(`Delete "${post.title}"? This can't be undone.`);
    if (!confirmed) return;

    setDeletingId(post.id);
    try {
      const response = await fetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete post.");
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete post.");
    } finally {
      setDeletingId(null);
    }
  }

  if (posts.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-2 p-14 text-center">
        <p className="font-bold text-ink">No posts yet</p>
        <p className="text-sm text-ink-muted">Create your first blog post to get started.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-surface-alt text-xs font-bold uppercase tracking-wide text-ink-muted">
          <tr>
            <th className="px-5 py-3.5">Title</th>
            <th className="px-5 py-3.5">Status</th>
            <th className="px-5 py-3.5">Category</th>
            <th className="px-5 py-3.5">Updated</th>
            <th className="px-5 py-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-5 py-4 font-semibold text-ink">{post.title}</td>
              <td className="px-5 py-4">
                {post.status === "published" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-bold text-success">
                    <Eye size={12} weight="bold" />
                    Published
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/8 px-2.5 py-1 text-xs font-bold text-ink-muted">
                    <EyeSlash size={12} weight="bold" />
                    Draft
                  </span>
                )}
              </td>
              <td className="px-5 py-4 text-ink-muted">{post.category}</td>
              <td className="px-5 py-4 text-ink-muted">
                {new Date(post.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-muted hover:border-primary/30 hover:text-primary"
                    aria-label={`Edit ${post.title}`}
                  >
                    <PencilSimple size={16} weight="bold" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(post)}
                    disabled={deletingId === post.id}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border text-ink-muted hover:border-danger/30 hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label={`Delete ${post.title}`}
                  >
                    <Trash size={16} weight="bold" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
