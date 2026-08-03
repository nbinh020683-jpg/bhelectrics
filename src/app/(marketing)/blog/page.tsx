import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarBlank, ArrowRight } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { getPublishedPosts } from "@/lib/blog-repository";

export const metadata: Metadata = {
  title: "Electrical Tips & Insights",
  description:
    "Electrical safety tips, home improvement guides, and industry insights from the licensed electricians at BH Electrics in Lynn, MA.",
  alternates: { canonical: "/blog" },
};

export const dynamic = "force-dynamic";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPublishedPosts().catch((error) => {
    console.error("Failed to load blog posts:", error);
    return [];
  });

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        eyebrow="Resources"
        title="Electrical Tips & Insights"
        description="Practical guidance from BH Electrics' licensed electricians — safety tips, home improvement guides, and what to know before your next project."
      />

      <section className="section-y">
        <div className="container-page">
          {posts.length === 0 ? (
            <p className="text-center text-ink-muted">New articles are on the way — check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="card card-hover flex flex-col overflow-hidden">
                  {post.coverImage && (
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    <span className="eyebrow w-fit">{post.category}</span>
                    <h2 className="mt-4 text-lg font-bold leading-snug text-ink">{post.title}</h2>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-ink-muted">
                      <span className="flex items-center gap-1.5">
                        <CalendarBlank size={14} />
                        {formatDate(post.publishedAt ?? post.createdAt)}
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-primary">
                        Read <ArrowRight size={12} weight="bold" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
