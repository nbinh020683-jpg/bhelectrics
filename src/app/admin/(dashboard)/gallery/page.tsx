import type { Metadata } from "next";
import { getAllGalleryImages } from "@/lib/gallery-repository";
import { GalleryManager } from "@/components/admin/GalleryManager";

export const metadata: Metadata = { title: "Gallery" };
export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const images = await getAllGalleryImages();

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Gallery</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Photos uploaded here appear on the public{" "}
        <a href="/gallery" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary">
          /gallery
        </a>{" "}
        page.
      </p>

      <div className="mt-6">
        <GalleryManager images={images} />
      </div>
    </div>
  );
}
