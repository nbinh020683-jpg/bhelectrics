export type ServiceAreaTown = {
  name: string;
  slug: string;
  isHomeBase?: boolean;
  county: string;
  distanceFromLynn: string;
  description: string;
  neighborhoods: string[];
};

export const serviceAreaTowns: ServiceAreaTown[] = [
  {
    name: "Lynn",
    slug: "lynn-ma",
    isHomeBase: true,
    county: "Essex County",
    distanceFromLynn: "Home base",
    description:
      "Lynn is home base for BH Electrics. We serve homeowners, landlords, and businesses throughout Lynn's neighborhoods with same-day and emergency electrical service.",
    neighborhoods: ["Downtown Lynn", "West Lynn", "Diamond District", "Wyoma", "Ward 1"],
  },
  {
    name: "Swampscott",
    slug: "swampscott-ma",
    county: "Essex County",
    distanceFromLynn: "3 miles from Lynn",
    description:
      "From coastal cottages to larger colonial homes, our electricians handle residential upgrades, panel work, and outdoor lighting for Swampscott properties.",
    neighborhoods: ["Beach Bluff", "Phillips Beach", "Swampscott Center"],
  },
  {
    name: "Salem",
    slug: "salem-ma",
    county: "Essex County",
    distanceFromLynn: "6 miles from Lynn",
    description:
      "We support Salem's mix of historic homes and downtown commercial properties with electrical upgrades that respect older construction while meeting current code.",
    neighborhoods: ["Downtown Salem", "The Point", "North Salem", "South Salem"],
  },
  {
    name: "Peabody",
    slug: "peabody-ma",
    county: "Essex County",
    distanceFromLynn: "7 miles from Lynn",
    description:
      "Peabody homeowners and retail businesses rely on BH Electrics for panel upgrades, lighting retrofits, and commercial electrical maintenance.",
    neighborhoods: ["Downtown Peabody", "West Peabody", "South Peabody"],
  },
  {
    name: "Saugus",
    slug: "saugus-ma",
    county: "Essex County",
    distanceFromLynn: "5 miles from Lynn",
    description:
      "We provide residential and light-commercial electrical services throughout Saugus, including Route 1 corridor businesses and neighborhood homes.",
    neighborhoods: ["Cliftondale", "East Saugus", "Saugus Center"],
  },
  {
    name: "Revere",
    slug: "revere-ma",
    county: "Suffolk County",
    distanceFromLynn: "6 miles from Lynn",
    description:
      "From triple-deckers to beachfront properties, our electricians handle rewiring, panel upgrades, and emergency repairs across Revere.",
    neighborhoods: ["Revere Beach", "Beachmont", "Point of Pines"],
  },
  {
    name: "Marblehead",
    slug: "marblehead-ma",
    county: "Essex County",
    distanceFromLynn: "5 miles from Lynn",
    description:
      "We bring careful, code-compliant electrical work to Marblehead's historic and waterfront homes, including custom lighting and generator installs.",
    neighborhoods: ["Old Town", "Marblehead Neck", "Clifton"],
  },
  {
    name: "Nahant",
    slug: "nahant-ma",
    county: "Essex County",
    distanceFromLynn: "4 miles from Lynn",
    description:
      "BH Electrics serves Nahant's coastal homes with weather-resistant outdoor electrical work, panel upgrades, and standby generator installation.",
    neighborhoods: ["Nahant Center", "East Point"],
  },
  {
    name: "Malden",
    slug: "malden-ma",
    county: "Middlesex County",
    distanceFromLynn: "8 miles from Lynn",
    description:
      "Our electricians support Malden's dense residential and commercial buildings with panel upgrades, tenant fit-outs, and emergency electrical repair.",
    neighborhoods: ["Malden Center", "Edgeworth", "Linden"],
  },
  {
    name: "Melrose",
    slug: "melrose-ma",
    county: "Middlesex County",
    distanceFromLynn: "9 miles from Lynn",
    description:
      "We provide residential electrical upgrades and repairs for Melrose homeowners, from older single-families to newer construction.",
    neighborhoods: ["Melrose Highlands", "Downtown Melrose", "Cedar Park"],
  },
];

export function getTownBySlug(slug: string) {
  return serviceAreaTowns.find((town) => town.slug === slug);
}
