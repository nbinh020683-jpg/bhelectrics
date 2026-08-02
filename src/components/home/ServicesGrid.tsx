import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { services } from "@/lib/services-data";
import { ServiceIcon } from "@/lib/service-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServicesGrid() {
  return (
    <section className="section-y bg-surface-alt">
      <div className="container-page">
        <SectionHeading
          eyebrow="What We Do"
          title="Full-Service Electrical Solutions"
          description="Whatever the job, our licensed electricians bring the same standard of safety, code compliance, and craftsmanship."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="card card-hover group flex flex-col p-7"
            >
              <span className="flex h-13 w-13 items-center justify-center rounded-xl bg-primary/8 p-3 text-primary transition-colors group-hover:bg-accent group-hover:text-white">
                <ServiceIcon name={service.icon} size={28} weight="duotone" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{service.name}</h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">{service.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                Learn more
                <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
