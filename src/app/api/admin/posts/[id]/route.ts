import { NextRequest, NextResponse } from "next/server";
import {
  deletePost,
  ensureUniqueSlug,
  getPostById,
  slugify,
  updatePost,
  type PostInput,
} from "@/lib/blog-repository";

export const runtime = "nodejs";

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
      coverImagePath: typeof b.coverImagePath === "string" && b.coverImagePath ? b.coverImagePath : null,
      status,
    },
  };
}

function parseId(idParam: string) {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (!id) return NextResponse.json({ error: "Invalid post id." }, { status: 400 });

  const post = getPostById(id);
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (!id) return NextResponse.json({ error: "Invalid post id." }, { status: 400 });

  const existing = getPostById(id);
  if (!existing) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  const body = await request.json().catch(() => null);
  const result = validateAndNormalize(body);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const uniqueSlug = ensureUniqueSlug(result.input.slug, id);
  const post = updatePost(id, { ...result.input, slug: uniqueSlug });
  return NextResponse.json({ post });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (!id) return NextResponse.json({ error: "Invalid post id." }, { status: 400 });

  const existing = getPostById(id);
  if (!existing) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  deletePost(id);
  return NextResponse.json({ success: true });
}
