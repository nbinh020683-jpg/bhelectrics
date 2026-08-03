import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectPlaceholder } from "@/components/ui/ProjectPlaceholder";
import { FinalCta } from "@/components/home/FinalCta";
import { getAllGalleryImages } from "@/lib/gallery-repository";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse a sample of the residential and commercial electrical projects BH Electrics completes across Lynn, MA and the North Shore.",
  alternates: { canonical: "/gallery" },
};

export const dynamic = "force-dynamic";

const placeholderProjects = [
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

export default async function GalleryPage() {
  const images = await getAllGalleryImages().catch((error) => {
    console.error("Failed to load gallery images:", error);
    return [];
  });
  const hasRealPhotos = images.length > 0;

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        eyebrow="Our Work"
        title="A Sample of Our Recent Projects"
        description={
          hasRealPhotos
            ? "A look at recent residential and commercial electrical projects completed across Lynn and the North Shore."
            : "We're building out our project photo gallery — check back soon to see real before-and-after results from jobs across the North Shore. In the meantime, here's a look at the type of work we do."
        }
      />

      <section className="section-y">
        <div className="container-page">
          {hasRealPhotos ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <div key={image.id} className="card overflow-hidden">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={image.imageData}
                      alt={image.caption}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <span className="eyebrow">{image.category}</span>
                    <p className="mt-2 font-bold text-ink">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {placeholderProjects.map((project, i) => (
                <ProjectPlaceholder key={project.label} icon={project.icon} label={project.label} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
