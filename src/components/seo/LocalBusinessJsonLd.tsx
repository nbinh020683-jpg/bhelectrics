import { siteConfig } from "@/lib/site-config";
import { serviceAreaTowns } from "@/lib/service-areas-data";
import { services } from "@/lib/services-data";

function dayToSchema(day: string) {
  const map: Record<string, string> = {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
  };
  return map[day];
}

export function LocalBusinessJsonLd() {
  const openingHours = siteConfig.hours
    .filter((h) => h.open !== "Closed")
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayToSchema(h.day),
      opens: h.open,
      closes: h.close,
    }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$",
    image: `${siteConfig.url}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: openingHours,
    areaServed: serviceAreaTowns.map((t) => ({
      "@type": "City",
      name: `${t.name}, ${siteConfig.address.state}`,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Electrical Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.summary,
        },
      })),
    },
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
