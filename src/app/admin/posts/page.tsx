import Link from "next/link";
import type { Metadata } from "next";
import { Plus } from "@phosphor-icons/react/ssr";
import { getAllPostsForAdmin } from "@/lib/blog-repository";
import { PostsTable } from "@/components/admin/PostsTable";

export const metadata: Metadata = { title: "Blog Posts" };
export const dynamic = "force-dynamic";

export default function AdminPostsPage() {
  const posts = getAllPostsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Blog Posts</h1>
          <p className="mt-1 text-sm text-ink-muted">{posts.length} total</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary !px-5 !py-2.5 text-sm">
          <Plus weight="bold" size={18} />
          New Post
        </Link>
      </div>

      <div className="mt-6">
        <PostsTable posts={posts} />
      </div>
    </div>
  );
}
