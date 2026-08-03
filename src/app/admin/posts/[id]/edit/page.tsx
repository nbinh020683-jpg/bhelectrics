import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/blog-repository";
import { PostForm } from "@/components/admin/PostForm";

export const metadata: Metadata = { title: "Edit Post" };
export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getPostById(Number(id));
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Edit Post</h1>
      <div className="mt-6">
        <PostForm initialPost={post} />
      </div>
    </div>
  );
}
