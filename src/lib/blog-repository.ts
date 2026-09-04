import type { RowDataPacket } from "mysql2";
import { getPool, ensureSchema } from "@/lib/db";
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
  coverImage: string | null;
  status: PostStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

interface PostRow extends RowDataPacket {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  meta_description: string | null;
  category: string;
  content_markdown: string;
  cover_image: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

function mapRow(row: PostRow): PostRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    metaDescription: row.meta_description ?? "",
    category: row.category,
    contentMarkdown: row.content_markdown,
    coverImage: row.cover_image,
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

export async function getPublishedPosts(): Promise<PostRecord[]> {
  await ensureSchema();
  // Excludes content_markdown — the list view (and the sitemap) only ever
  // needs the excerpt/metadata, and that column can be tens of KB per post.
  const [rows] = await getPool().query<PostRow[]>(
    `SELECT id, slug, title, excerpt, meta_description, category, cover_image,
            status, published_at, created_at, updated_at
     FROM posts WHERE status = 'published' ORDER BY published_at DESC, created_at DESC`
  );
  return rows.map((row) => ({ ...mapRow(row as PostRow), contentMarkdown: "" }));
}

export async function getPublishedPostBySlug(slug: string): Promise<PostRecord | undefined> {
  await ensureSchema();
  const [rows] = await getPool().query<PostRow[]>(
    "SELECT * FROM posts WHERE status = 'published' AND slug = ? LIMIT 1",
    [slug]
  );
  return rows[0] ? mapRow(rows[0]) : undefined;
}

export async function getAllPostsForAdmin(): Promise<PostRecord[]> {
  await ensureSchema();
  const [rows] = await getPool().query<PostRow[]>("SELECT * FROM posts ORDER BY updated_at DESC");
  return rows.map(mapRow);
}

export async function getPostById(id: number): Promise<PostRecord | undefined> {
  await ensureSchema();
  const [rows] = await getPool().query<PostRow[]>("SELECT * FROM posts WHERE id = ? LIMIT 1", [id]);
  return rows[0] ? mapRow(rows[0]) : undefined;
}

export async function isSlugTaken(slug: string, excludeId?: number): Promise<boolean> {
  await ensureSchema();
  const [rows] = await getPool().query<RowDataPacket[]>(
    "SELECT id FROM posts WHERE slug = ? AND id != ? LIMIT 1",
    [slug, excludeId ?? -1]
  );
  return rows.length > 0;
}

export async function ensureUniqueSlug(baseSlug: string, excludeId?: number): Promise<string> {
  const base = slugify(baseSlug) || "post";
  let candidate = base;
  let suffix = 2;
  while (await isSlugTaken(candidate, excludeId)) {
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
  coverImage: string | null;
  status: PostStatus;
};

export async function createPost(input: PostInput): Promise<PostRecord> {
  await ensureSchema();
  const pool = getPool();
  const publishedAt = input.status === "published" ? new Date() : null;

  const [result] = await pool.query(
    `INSERT INTO posts
      (slug, title, excerpt, meta_description, category, content_markdown, cover_image, status, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.slug,
      input.title,
      input.excerpt,
      input.metaDescription,
      input.category,
      input.contentMarkdown,
      input.coverImage,
      input.status,
      publishedAt,
    ]
  );

  const insertId = (result as { insertId: number }).insertId;
  const post = await getPostById(insertId);
  if (!post) throw new Error("Failed to load post after insert.");
  return post;
}

export async function updatePost(id: number, input: PostInput): Promise<PostRecord | undefined> {
  await ensureSchema();
  const existing = await getPostById(id);
  if (!existing) return undefined;

  const publishedAt =
    input.status === "published" ? existing.publishedAt ?? new Date() : existing.publishedAt;

  await getPool().query(
    `UPDATE posts SET
      slug = ?, title = ?, excerpt = ?, meta_description = ?, category = ?,
      content_markdown = ?, cover_image = ?, status = ?, published_at = ?
     WHERE id = ?`,
    [
      input.slug,
      input.title,
      input.excerpt,
      input.metaDescription,
      input.category,
      input.contentMarkdown,
      input.coverImage,
      input.status,
      publishedAt,
      id,
    ]
  );

  return getPostById(id);
}

export async function deletePost(id: number): Promise<void> {
  await ensureSchema();
  await getPool().query("DELETE FROM posts WHERE id = ?", [id]);
}
