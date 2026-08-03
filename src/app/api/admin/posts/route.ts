import { NextRequest, NextResponse } from "next/server";
import {
  createPost,
  ensureUniqueSlug,
  getAllPostsForAdmin,
  slugify,
  type PostInput,
} from "@/lib/blog-repository";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ posts: await getAllPostsForAdmin() });
}

function validateAndNormalize(body: unknown): { input: PostInput } | { error: string } {
  if (typeof body !== "object" || body === null) return { error: "Invalid request body." };
  const b = body as Record<string, unknown>;

  const title = typeof b.title === "string" ? b.title.trim() : "";
  const contentMarkdown = typeof b.contentMarkdown === "string" ? b.contentMarkdown : "";

  if (!title) return { error: "Title is required." };
  if (!contentMarkdown.trim()) return { error: "Content is required." };

  const status = b.status === "published" ? "published" : "draft";
  const rawSlug = typeof b.slug === "string" && b.slug.trim() ? b.slug : title;

  return {
    input: {
      slug: slugify(rawSlug) || "post",
      title,
      excerpt: typeof b.excerpt === "string" ? b.excerpt.trim() : "",
      metaDescription: typeof b.metaDescription === "string" ? b.metaDescription.trim() : "",
      category: typeof b.category === "string" && b.category.trim() ? b.category.trim() : "General",
      contentMarkdown,
      coverImage: typeof b.coverImage === "string" && b.coverImage ? b.coverImage : null,
      status,
    },
  };
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const result = validateAndNormalize(body);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const uniqueSlug = await ensureUniqueSlug(result.input.slug);
  const post = await createPost({ ...result.input, slug: uniqueSlug });
  return NextResponse.json({ post }, { status: 201 });
}
