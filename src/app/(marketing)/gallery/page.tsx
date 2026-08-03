import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectPlaceholder } from "@/components/ui/ProjectPlaceholder";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse a sample of the residential and commercial electrical projects BH Electrics completes across Lynn, MA and the North Shore.",
  alternates: { canonical: "/gallery" },
};

const projects = [
  { icon: "House", label: "Panel Upgrade — Residential" },
  { icon: "Car", label: "EV Charger Installation" },
  { icon: "Buildings", label: "Retail Fit-Out — Commercial" },
  { icon: "PlugCharging", label: "Standby Generator Install" },
  { icon: "SunHorizon", label: "Solar Interconnection Wiring" },
  { icon: "Lightning", label: "Emergency Panel Repair" },
  { icon: "House", label: "Whole-Home Rewiring" },
  { icon: "Buildings", label: "Office Lighting Retrofit" },
  { icon: "House", label: "Outdoor & Landscape Lighting" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        eyebrow="Our Work"
        title="A Sample of Our Recent Projects"
        description="We're building out our project photo gallery — check back soon to see real before-and-after results from jobs across the North Shore. In the meantime, here's a look at the type of work we do."
      />

      <section className="section-y">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectPlaceholder key={project.label} icon={project.icon} label={project.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
