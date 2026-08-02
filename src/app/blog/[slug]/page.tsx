import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarBlank, Clock, Phone } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { RichParagraph } from "@/components/ui/RichParagraph";
import { blogPosts, getPostBySlug } from "@/lib/blog-data";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.metaDescription,
      publishedTime: post.publishedAt,
    },
  };
}

function formatDate(dateString: string) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
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
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
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
            <div className="mb-8 flex items-center gap-5 border-b border-border pb-6 text-sm text-ink-muted">
              <span className="flex items-center gap-1.5">
                <CalendarBlank size={16} />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} />
                {post.readingTime}
              </span>
            </div>
            <div className="space-y-5 leading-relaxed text-ink-muted">
              {post.content.map((paragraph, i) => (
                <RichParagraph key={i} text={paragraph} />
              ))}
            </div>
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
