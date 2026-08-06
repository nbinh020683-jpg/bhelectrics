import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, CheckCircle, ArrowRight } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { serviceAreaTowns, getTownBySlug } from "@/lib/service-areas-data";
import { services } from "@/lib/services-data";
import { ServiceIcon } from "@/lib/service-icons";
import { siteConfig } from "@/lib/site-config";
import { FinalCta } from "@/components/home/FinalCta";

export function generateStaticParams() {
  return serviceAreaTowns.map((town) => ({ town: town.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ town: string }>;
}): Promise<Metadata> {
  const { town: slug } = await params;
  const town = getTownBySlug(slug);
  if (!town) return {};

  return {
    title: `Electrician in ${town.name}, MA`,
    description: `Licensed electrician serving ${town.name}, Massachusetts. Residential, commercial, and 24/7 emergency electrical services from BH Electrics.`,
    alternates: { canonical: `/service-areas/${town.slug}` },
  };
}

export default async function TownPage({
  params,
}: {
  params: Promise<{ town: string }>;
}) {
  const { town: slug } = await params;
  const town = getTownBySlug(slug);
  if (!town) notFound();

  const faqs = [
    {
      question: `Is BH Electrics licensed to work in ${town.name}?`,
      answer: `Yes. BH Electrics is a licensed and insured Massachusetts electrical contractor, and we regularly serve homeowners and businesses throughout ${town.name} and the surrounding North Shore.`,
    },
    {
      question: `Do you offer emergency electrical service in ${town.name}?`,
      answer: `Yes, we provide 24/7 emergency electrical response for urgent hazards such as sparking outlets, burning smells, or total power loss anywhere in ${town.name}.`,
    },
    {
      question: `How far is ${town.name} from your office?`,
      answer:
        town.isHomeBase
          ? `${town.name} is our home base — our team is based right here in ${town.name}, MA.`
          : `${town.name} is ${town.distanceFromLynn.toLowerCase()} from our office in Lynn, MA, well within our standard service area.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Electrical Services",
    provider: {
      "@type": "Electrician",
      name: siteConfig.name,
      telephone: siteConfig.phone,
    },
    areaServed: {
      "@type": "City",
      name: `${town.name}, ${siteConfig.address.state}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqJsonLd items={faqs} />

      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Service Areas", href: "/service-areas" },
          { label: town.name },
        ]}
        eyebrow={`${town.county}, Massachusetts`}
        title={`Licensed Electrician in ${town.name}, MA`}
        description={town.description}
      />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Local Coverage"
              title={`Serving All of ${town.name}`}
            />
            <p className="mt-5 text-ink-muted leading-relaxed">
              We regularly work in {town.neighborhoods.join(", ")}, and every other corner of{" "}
              {town.name}. Wherever you are in town, our licensed electricians can get to you.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {town.neighborhoods.map((n) => (
                <div key={n} className="flex items-center gap-2.5 rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium text-ink">
                  <MapPin size={16} weight="fill" className="shrink-0 text-accent" />
                  {n}
                </div>
              ))}
            </div>

            <div className="mt-10">
              <SectionHeading align="left" eyebrow="Services Here" title={`Electrical Services in ${town.name}`} />
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="card card-hover flex items-center gap-3 p-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <ServiceIcon name={service.icon} size={20} weight="duotone" />
                    </span>
                    <span className="text-sm font-semibold text-ink">{service.shortName}</span>
                    <ArrowRight size={16} weight="bold" className="ml-auto text-ink-muted" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="card sticky top-28 h-fit p-8">
            <h3 className="text-lg font-bold text-ink">Why {town.name} Chooses BH Electrics</h3>
            <ul className="mt-5 space-y-4">
              {[
                "Licensed, insured Massachusetts electricians",
                "Upfront written estimates, every time",
                "24/7 availability for electrical emergencies",
                "Clean, respectful work on every job site",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted">
                  <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
            <a href={siteConfig.phoneHref} className="btn-primary mt-6 w-full">
              <Phone weight="fill" size={18} />
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface-alt">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${town.name} Electrician FAQs`} />
          <div className="mt-8">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
