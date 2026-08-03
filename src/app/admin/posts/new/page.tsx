import type { Metadata } from "next";
import { PostForm } from "@/components/admin/PostForm";

export const metadata: Metadata = { title: "New Post" };

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">New Post</h1>
      <div className="mt-6">
        <PostForm />
      </div>
    </div>
  );
}
