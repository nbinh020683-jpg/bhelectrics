import { getDb } from "@/lib/db";
import { slugify } from "@/lib/slugify-client";

export { slugify };

export type PostStatus = "draft" | "published";

export type PostRecord = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  category: string;
  contentMarkdown: string;
  coverImagePath: string | null;
  status: PostStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type PostRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  meta_description: string;
  category: string;
  content_markdown: string;
  cover_image_path: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

function mapRow(row: PostRow): PostRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    metaDescription: row.meta_description,
    category: row.category,
    contentMarkdown: row.content_markdown,
    coverImagePath: row.cover_image_path,
    status: row.status === "published" ? "published" : "draft",
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function estimateReadingTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function getPublishedPosts(): PostRecord[] {
  const rows = getDb()
    .prepare(
      "SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC, created_at DESC"
    )
    .all() as PostRow[];
  return rows.map(mapRow);
}

export function getPublishedPostBySlug(slug: string): PostRecord | undefined {
  const row = getDb()
    .prepare("SELECT * FROM posts WHERE status = 'published' AND slug = ?")
    .get(slug) as PostRow | undefined;
  return row ? mapRow(row) : undefined;
}

export function getAllPostsForAdmin(): PostRecord[] {
  const rows = getDb()
    .prepare("SELECT * FROM posts ORDER BY updated_at DESC")
    .all() as PostRow[];
  return rows.map(mapRow);
}

export function getPostById(id: number): PostRecord | undefined {
  const row = getDb().prepare("SELECT * FROM posts WHERE id = ?").get(id) as
    | PostRow
    | undefined;
  return row ? mapRow(row) : undefined;
}

export function isSlugTaken(slug: string, excludeId?: number): boolean {
  const row = getDb()
    .prepare("SELECT id FROM posts WHERE slug = ? AND id != ?")
    .get(slug, excludeId ?? -1) as { id: number } | undefined;
  return Boolean(row);
}

export function ensureUniqueSlug(baseSlug: string, excludeId?: number): string {
  const base = slugify(baseSlug) || "post";
  let candidate = base;
  let suffix = 2;
  while (isSlugTaken(candidate, excludeId)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

export type PostInput = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  category: string;
  contentMarkdown: string;
  coverImagePath: string | null;
  status: PostStatus;
};

export function createPost(input: PostInput): PostRecord {
  const db = getDb();
  const now = new Date().toISOString();
  const publishedAt = input.status === "published" ? now : null;

  const result = db
    .prepare(
      `INSERT INTO posts
        (slug, title, excerpt, meta_description, category, content_markdown, cover_image_path, status, published_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      input.slug,
      input.title,
      input.excerpt,
      input.metaDescription,
      input.category,
      input.contentMarkdown,
      input.coverImagePath,
      input.status,
      publishedAt,
      now,
      now
    );

  return getPostById(Number(result.lastInsertRowid))!;
}

export function updatePost(id: number, input: PostInput): PostRecord | undefined {
  const db = getDb();
  const existing = getPostById(id);
  if (!existing) return undefined;

  const now = new Date().toISOString();
  const publishedAt =
    input.status === "published" ? existing.publishedAt ?? now : existing.publishedAt;

  db.prepare(
    `UPDATE posts SET
      slug = ?, title = ?, excerpt = ?, meta_description = ?, category = ?,
      content_markdown = ?, cover_image_path = ?, status = ?, published_at = ?, updated_at = ?
     WHERE id = ?`
  ).run(
    input.slug,
    input.title,
    input.excerpt,
    input.metaDescription,
    input.category,
    input.contentMarkdown,
    input.coverImagePath,
    input.status,
    publishedAt,
    now,
    id
  );

  return getPostById(id);
}

export function deletePost(id: number): void {
  getDb().prepare("DELETE FROM posts WHERE id = ?").run(id);
}
