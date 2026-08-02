import { ShieldCheck, Clock, MapPinLine, FileText } from "@phosphor-icons/react/ssr";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceAreaTowns } from "@/lib/service-areas-data";
import { siteConfig } from "@/lib/site-config";

const yearsInBusiness = new Date().getFullYear() - siteConfig.founded;

const stats = [
  {
    icon: ShieldCheck,
    stat: `${yearsInBusiness}+ Years`,
    label: "Serving the North Shore",
  },
  {
    icon: MapPinLine,
    stat: `${serviceAreaTowns.length} Communities`,
    label: "Across Essex & Middlesex County",
  },
  {
    icon: Clock,
    stat: "24/7/365",
    label: "Emergency Availability",
  },
  {
    icon: FileText,
    stat: "100%",
    label: "Written, Upfront Estimates",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why BH Electrics"
          title="Local Electricians You Can Actually Trust"
          description="We're a Lynn-based team, not a call center. Every project is handled by a licensed electrician who lives and works in your community."
        />

        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map(({ icon: Icon, stat, label }) => (
            <div key={label} className="card p-6 text-center sm:p-8">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/8 text-primary">
                <Icon size={24} weight="fill" />
              </span>
              <p className="mt-4 text-2xl font-bold text-ink sm:text-3xl">{stat}</p>
              <p className="mt-1 text-sm font-medium text-ink-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
