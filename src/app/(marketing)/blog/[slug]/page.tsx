import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarBlank, Clock, Phone } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { estimateReadingTime, getPublishedPostBySlug } from "@/lib/blog-repository";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription || post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.metaDescription || post.excerpt,
      publishedTime: post.publishedAt ?? undefined,
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: siteConfig.legalName },
    publisher: { "@type": "Organization", name: siteConfig.legalName },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
        eyebrow={post.category}
        title={post.title}
      />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <article>
            {post.coverImage && (
              <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image src={post.coverImage} alt={post.title} fill unoptimized className="object-cover" />
              </div>
            )}
            <div className="mb-8 flex items-center gap-5 border-b border-border pb-6 text-sm text-ink-muted">
              <span className="flex items-center gap-1.5">
                <CalendarBlank size={16} />
                {formatDate(post.publishedAt ?? post.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} />
                {estimateReadingTime(post.contentMarkdown)}
              </span>
            </div>
            <MarkdownContent markdown={post.contentMarkdown} />
          </article>

          <aside className="card sticky top-28 h-fit bg-primary p-8 text-white">
            <h3 className="text-xl font-bold">Have an Electrical Question?</h3>
            <p className="mt-2.5 text-sm text-white/75">
              Our licensed electricians are happy to help — call now or request a free quote online.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a href={siteConfig.phoneHref} className="btn-primary">
                <Phone weight="fill" size={18} />
                {siteConfig.phone}
              </a>
              <Link href="/contact" className="btn-ghost-on-dark">
                Request a Free Quote
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
