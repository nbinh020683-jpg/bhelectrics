import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, Phone } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { serviceAreaTowns } from "@/lib/service-areas-data";
import { siteConfig } from "@/lib/site-config";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Electrical Service Areas | North Shore, Massachusetts",
  description:
    "BH Electrics proudly serves Lynn, Swampscott, Salem, Peabody, Saugus, Revere, Marblehead, Nahant, Malden, and Melrose, Massachusetts.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service Areas" }]}
        eyebrow="Where We Work"
        title="Electrical Services Across the North Shore"
        description="Based in Lynn, MA, BH Electrics provides licensed electrical services throughout Essex and Middlesex County. Select your town below to learn more."
      />

      <section className="section-y">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreaTowns.map((town) => (
              <Link
                key={town.slug}
                href={`/service-areas/${town.slug}`}
                className="card card-hover flex flex-col p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <MapPin size={22} weight="fill" />
                  </span>
                  <h2 className="text-lg font-bold text-ink">{town.name}, MA</h2>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">{town.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  View {town.name} electrician services
                  <ArrowRight size={16} weight="bold" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-surface-alt p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-lg font-bold text-ink">Don&apos;t see your town listed?</p>
              <p className="mt-1 text-sm text-ink-muted">We regularly serve nearby communities too — give us a call to check availability.</p>
            </div>
            <a href={siteConfig.phoneHref} className="btn-primary shrink-0">
              <Phone weight="fill" size={18} />
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
