import Link from "next/link";
import { MapPin, ArrowRight } from "@phosphor-icons/react/ssr";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceAreaTowns } from "@/lib/service-areas-data";

export function ServiceAreaTeaser() {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Where We Work"
              title="Proudly Serving Lynn & the North Shore"
              description="BH Electrics is based in Lynn and serves homeowners and businesses throughout Essex and Middlesex County. Don't see your town listed? Give us a call — we likely still cover it."
            />
            <Link href="/service-areas" className="btn-secondary mt-8">
              View All Service Areas
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            {serviceAreaTowns.map((town) => (
              <Link
                key={town.slug}
                href={`/service-areas/${town.slug}`}
                className="card card-hover flex items-center gap-3 px-5 py-4"
              >
                <MapPin size={20} weight="fill" className="shrink-0 text-accent" />
                <span className="text-sm font-semibold text-ink">{town.name}</span>
                {town.isHomeBase && (
                  <span className="ml-auto rounded-full bg-primary/8 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                    Home Base
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
