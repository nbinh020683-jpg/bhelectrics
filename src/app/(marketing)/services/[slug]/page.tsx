import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Phone, CalendarCheck, ArrowRight } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { services, getServiceBySlug } from "@/lib/services-data";
import { ServiceIcon } from "@/lib/service-icons";
import { EmergencyBanner } from "@/components/home/EmergencyBanner";
import { FinalCta } from "@/components/home/FinalCta";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | ${siteConfig.name}`,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.metaDescription,
    provider: {
      "@type": "Electrician",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
        postalCode: siteConfig.address.zip,
        addressCountry: siteConfig.address.country,
      },
    },
    areaServed: { "@type": "State", name: siteConfig.address.stateFull },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <FaqJsonLd items={service.faqs} />

      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.shortName },
        ]}
        eyebrow="Electrical Service"
        title={service.name}
        description={service.heroDescription}
      />

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Why It Matters" title="What You Get With BH Electrics" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <div key={benefit.title} className="card flex gap-4 p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary">
                  <CheckCircle size={20} weight="fill" />
                </span>
                <div>
                  <h3 className="font-bold text-ink">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface-alt">
        <div className="container-page">
          <SectionHeading eyebrow="Our Process" title={`How We Handle Your ${service.shortName} Project`} />
          <div className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-0 right-0 top-[26px] hidden h-px bg-border lg:block" />
            {service.process.map((step) => (
              <div key={step.step} className="relative text-center">
                <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-card">
                  {step.step}
                </span>
                <h3 className="mt-4 text-base font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading align="left" eyebrow="FAQ" title="Common Questions" />
            <div className="mt-8">
              <FaqAccordion items={service.faqs} />
            </div>
          </div>

          <div className="card sticky top-28 h-fit bg-primary p-8 text-white">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
              <ServiceIcon name={service.icon} size={24} weight="duotone" />
            </span>
            <h3 className="mt-5 text-xl font-bold">Ready to schedule your {service.shortName.toLowerCase()}?</h3>
            <p className="mt-2.5 text-sm text-white/75">
              Call now to speak with a licensed electrician, or request a free written quote online.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a href={siteConfig.phoneHref} className="btn-primary">
                <Phone weight="fill" size={18} />
                {siteConfig.phone}
              </a>
              <Link href="/contact" className="btn-ghost-on-dark">
                <CalendarCheck weight="bold" size={18} />
                Request a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EmergencyBanner />

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Explore More" title="Other Ways We Can Help" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card card-hover flex flex-col p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <ServiceIcon name={s.icon} size={22} weight="duotone" />
                </span>
                <h3 className="mt-4 font-bold text-ink">{s.shortName}</h3>
                <p className="mt-1.5 flex-1 text-sm text-ink-muted">{s.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  Learn more <ArrowRight size={14} weight="bold" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
