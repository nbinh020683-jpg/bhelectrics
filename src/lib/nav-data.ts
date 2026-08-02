import { services } from "@/lib/services-data";
import { serviceAreaTowns } from "@/lib/service-areas-data";

export const primaryNav = [
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.shortName, href: `/services/${s.slug}` })),
  },
  {
    label: "Service Areas",
    href: "/service-areas",
    children: serviceAreaTowns.map((t) => ({ label: t.name, href: `/service-areas/${t.slug}` })),
  },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
