import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { services } from "@/lib/services-data";
import { ServiceIcon } from "@/lib/service-icons";
import { EmergencyBanner } from "@/components/home/EmergencyBanner";
import { FinalCta } from "@/components/home/FinalCta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Electrical Services in Lynn, MA & the North Shore",
  description:
    "Explore BH Electrics' full range of residential, commercial, and emergency electrical services across Lynn, MA and the North Shore.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow="Our Services"
        title="Electrical Services Built Around Your Property's Needs"
        description="From a single flickering outlet to a full commercial fit-out, BH Electrics brings licensed expertise to every job across Lynn and the North Shore."
      />

      <section className="section-y">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.slug} className="card flex flex-col p-7">
                <span className="flex h-13 w-13 items-center justify-center rounded-xl bg-primary/8 p-3 text-primary">
                  <ServiceIcon name={service.icon} size={28} weight="duotone" />
                </span>
                <h2 className="mt-5 text-lg font-bold text-ink">{service.name}</h2>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">{service.heroDescription}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary"
                >
                  View service details
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-surface-alt p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-lg font-bold text-ink">Not sure which service you need?</p>
              <p className="mt-1 text-sm text-ink-muted">Call us and describe the issue — we&apos;ll point you in the right direction, free of charge.</p>
            </div>
            <a href={siteConfig.phoneHref} className="btn-primary shrink-0">
              <Phone weight="fill" size={18} />
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      <EmergencyBanner />
      <FinalCta />
    </>
  );
}
