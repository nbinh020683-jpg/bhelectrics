import { NextRequest, NextResponse } from "next/server";
import {
  createPost,
  ensureUniqueSlug,
  getAllPostsForAdmin,
  slugify,
} from "@/lib/blog-repository";

export const runtime = "nodejs";

// Machine-to-machine endpoint for scheduled/automated post creation (e.g. a
// daily Claude task). Deliberately separate from /api/admin/** — auth here is
// a static API key, not an admin session, and this route can ONLY create
// drafts. It can never publish, edit, or delete, so a leaked key or a bad
// AI-generated post can't put anything live without a human reviewing it in
// /admin/posts first.

function isAuthorized(request: NextRequest): boolean {
  const expectedKey = process.env.CONTENT_BOT_API_KEY;
  if (!expectedKey) return false;
  const providedKey = request.headers.get("x-api-key");
  return providedKey === expectedKey;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allPosts = await getAllPostsForAdmin();
  const posts = allPosts.map((post) => ({
    title: post.title,
    slug: post.slug,
    category: post.category,
    status: post.status,
    createdAt: post.createdAt,
  }));

  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const title = typeof b.title === "string" ? b.title.trim() : "";
  const contentMarkdown = typeof b.contentMarkdown === "string" ? b.contentMarkdown : "";

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (!contentMarkdown.trim()) {
    return NextResponse.json({ error: "Content is required." }, { status: 400 });
  }

  const rawSlug = typeof b.slug === "string" && b.slug.trim() ? b.slug : title;
  const uniqueSlug = await ensureUniqueSlug(slugify(rawSlug) || "post");

  const post = await createPost({
    slug: uniqueSlug,
    title,
    excerpt: typeof b.excerpt === "string" ? b.excerpt.trim() : "",
    metaDescription: typeof b.metaDescription === "string" ? b.metaDescription.trim() : "",
    category: typeof b.category === "string" && b.category.trim() ? b.category.trim() : "General",
    contentMarkdown,
    coverImage: null,
    // Always draft — this endpoint can never publish directly, by design.
    status: "draft",
  });

  return NextResponse.json({ post }, { status: 201 });
}
