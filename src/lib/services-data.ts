import type { IconWeight } from "@phosphor-icons/react";
import { siteConfig } from "@/lib/site-config";

export type ServiceItem = {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  summary: string;
  metaDescription: string;
  heroDescription: string;
  benefits: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  featured: boolean;
};

export const iconWeight: IconWeight = "duotone";

export const services: ServiceItem[] = [
  {
    slug: "residential-electrical",
    name: "Residential Electrical Services",
    shortName: "Residential Electrical",
    icon: "House",
    summary: "Panel upgrades, rewiring, outlets, and lighting for North Shore homes.",
    metaDescription:
      "Licensed residential electricians in Lynn, MA. Panel upgrades, rewiring, outlet and lighting installation, and home safety inspections across the North Shore.",
    heroDescription:
      "From flickering lights to full home rewiring, our licensed electricians keep North Shore households safe, code-compliant, and running smoothly.",
    benefits: [
      { title: "Licensed & Insured", description: "Every job is performed by a Massachusetts-licensed electrician and backed by full liability coverage." },
      { title: "Upfront Pricing", description: "You'll get a clear, written estimate before any work begins — no surprise charges." },
      { title: "Code-Compliant Work", description: "All installations meet current National Electrical Code (NEC) and Massachusetts amendments." },
      { title: "Clean, Respectful Crews", description: "We protect your floors and furniture and leave the job site as clean as we found it." },
    ],
    process: [
      { step: "01", title: "Schedule a Visit", description: "Call or request a quote online and we'll set up a time that works for your household." },
      { step: "02", title: "On-Site Assessment", description: "Our electrician diagnoses the issue or scopes the project and explains your options in plain language." },
      { step: "03", title: "Written Estimate", description: "You approve a transparent, itemized quote before any work starts." },
      { step: "04", title: "Quality Workmanship", description: "We complete the job to code, test everything, and walk you through what was done." },
    ],
    faqs: [
      { question: "How do I know if my home needs a panel upgrade?", answer: "Signs include frequently tripped breakers, flickering lights, a fuse box instead of breakers, or a panel rated below 100 amps. We offer free panel assessments for North Shore homeowners." },
      { question: "Do you offer financing for larger electrical projects?", answer: "Yes, we offer flexible financing options for whole-home rewiring, panel upgrades, and other larger projects. Ask our team for current plans." },
      { question: "Are you licensed to work in Lynn and the surrounding towns?", answer: "Yes, BH Electrics is fully licensed and insured to perform residential electrical work throughout Lynn and the North Shore of Massachusetts." },
    ],
    featured: true,
  },
  {
    slug: "commercial-industrial-electrical",
    name: "Commercial & Industrial Electrical",
    shortName: "Commercial & Industrial",
    icon: "Buildings",
    summary: "Tenant fit-outs, three-phase power, and maintenance for businesses.",
    metaDescription:
      "Commercial and industrial electrical contractors serving Lynn, MA and the North Shore. Tenant build-outs, three-phase power, lighting retrofits, and preventive maintenance.",
    heroDescription:
      "We minimize downtime for offices, retail spaces, warehouses, and light-industrial facilities across the North Shore with reliable commercial electrical work.",
    benefits: [
      { title: "Minimal Business Disruption", description: "Flexible scheduling, including nights and weekends, to keep your operation running." },
      { title: "Three-Phase & High-Amperage Expertise", description: "Experienced with commercial panels, transformers, and industrial equipment hookups." },
      { title: "Preventive Maintenance Plans", description: "Scheduled inspections that catch problems before they cause costly downtime." },
      { title: "Certificate of Insurance on Request", description: "We provide COIs and comply with property management and general contractor requirements." },
    ],
    process: [
      { step: "01", title: "Site Walkthrough", description: "We assess your facility's electrical infrastructure and discuss your operational needs." },
      { step: "02", title: "Scope & Proposal", description: "A detailed proposal outlining timeline, cost, and any permitting requirements." },
      { step: "03", title: "Scheduled Execution", description: "Work is scheduled around your business hours to reduce disruption." },
      { step: "04", title: "Inspection & Sign-Off", description: "All work is tested, documented, and ready for any required municipal inspection." },
    ],
    faqs: [
      { question: "Can you work outside normal business hours?", answer: "Yes, we regularly schedule commercial electrical work during evenings and weekends to avoid disrupting your operations." },
      { question: "Do you handle tenant fit-out electrical work?", answer: "Yes, we work directly with property managers, general contractors, and business owners on tenant improvement electrical scopes." },
      { question: "Do you offer ongoing maintenance contracts?", answer: "We offer scheduled preventive maintenance plans tailored to your facility's equipment and usage." },
    ],
    featured: true,
  },
  {
    slug: "emergency-electrical-repair",
    name: "24/7 Emergency Electrical Repair",
    shortName: "Emergency Repair",
    icon: "Lightning",
    summary: "Fast, round-the-clock response for urgent electrical hazards.",
    metaDescription:
      "24/7 emergency electrician in Lynn, MA. Fast response for power outages, sparking outlets, burning smells, and electrical hazards across the North Shore.",
    heroDescription:
      "Electrical emergencies don't wait for business hours — neither do we. Call anytime for a fast, safe response to urgent electrical hazards.",
    benefits: [
      { title: "Available Around the Clock", description: "Our on-call electricians respond to emergencies day or night, including holidays." },
      { title: "Rapid Response Times", description: "We prioritize emergency calls and aim to be on-site as quickly as possible." },
      { title: "Safety-First Diagnostics", description: "We isolate hazards immediately and explain the safest path to a permanent fix." },
      { title: "Transparent Emergency Pricing", description: "We quote emergency rates upfront before starting any work." },
    ],
    process: [
      { step: "01", title: "Call Immediately", description: "For active hazards (sparks, burning smells, smoke) shut off power at the breaker if safe, then call us." },
      { step: "02", title: "Rapid Dispatch", description: "We dispatch the nearest available licensed electrician to your location." },
      { step: "03", title: "Hazard Containment", description: "We isolate the dangerous circuit and restore safe power where possible." },
      { step: "04", title: "Permanent Repair", description: "We schedule any follow-up work needed to fully resolve the underlying issue." },
    ],
    faqs: [
      { question: "What counts as an electrical emergency?", answer: "Sparking outlets, burning smells, smoke, exposed wiring, a downed power line, or a total loss of power are all situations that warrant an emergency call." },
      { question: "How fast can you respond?", answer: `Call ${siteConfig.phone} and we'll give you a real-time ETA on that call before you decide anything. Every emergency call jumps ahead of scheduled work, and we dispatch whichever licensed electrician is closest to you.` },
      { question: "Is emergency service more expensive?", answer: "Emergency and after-hours rates differ from standard scheduling, and we always quote pricing before beginning work." },
    ],
    featured: true,
  },
  {
    slug: "ev-charger-installation",
    name: "EV Charger Installation",
    shortName: "EV Chargers",
    icon: "Car",
    summary: "Level 2 home and commercial EV charging station installs.",
    metaDescription:
      "EV charger installation in Lynn, MA. Licensed electricians install Level 2 home and commercial EV charging stations across the North Shore of Massachusetts.",
    heroDescription:
      "Charge faster and safer at home or at your business with a professionally installed Level 2 EV charging station, sized correctly for your panel.",
    benefits: [
      { title: "Panel Capacity Assessment", description: "We evaluate your electrical panel to confirm safe charger sizing and placement." },
      { title: "All Major Charger Brands", description: "Experienced installing Tesla, ChargePoint, Emporia, and other major Level 2 chargers." },
      { title: "Permit-Handled Installs", description: "We pull required permits and coordinate inspections so you don't have to." },
      { title: "Future-Ready Wiring", description: "We plan for potential second-vehicle or panel-upgrade needs down the road." },
    ],
    process: [
      { step: "01", title: "Charger & Panel Review", description: "We confirm your charger model and assess whether your panel has available capacity." },
      { step: "02", title: "Placement Planning", description: "We recommend the best mounting location for cable reach and everyday convenience." },
      { step: "03", title: "Professional Installation", description: "Dedicated circuit installation with proper breaker sizing and grounding." },
      { step: "04", title: "Testing & Walkthrough", description: "We test the charger and walk you through safe operation." },
    ],
    faqs: [
      { question: "Will my electrical panel support an EV charger?", answer: "Many homes need a panel evaluation before adding a Level 2 charger. We check available capacity and recommend an upgrade only if truly necessary." },
      { question: "Do you install chargers for businesses and multi-family buildings?", answer: "Yes, we install commercial-grade and multi-unit EV charging solutions in addition to single-family home installs." },
      { question: "Do I need a permit for a home EV charger?", answer: "Most Massachusetts municipalities require an electrical permit for EV charger installation. We handle the permitting process for you." },
    ],
    featured: false,
  },
  {
    slug: "generator-installation",
    name: "Standby Generator Installation",
    shortName: "Generator Installs",
    icon: "PlugCharging",
    summary: "Whole-home and commercial backup power for New England storms.",
    metaDescription:
      "Standby generator installation in Lynn, MA. Licensed electricians install whole-home and commercial backup generators to keep the North Shore powered through outages.",
    heroDescription:
      "New England storms bring outages. A professionally installed standby generator keeps your home or business running when the grid goes down.",
    benefits: [
      { title: "Automatic Transfer Switches", description: "Seamless, code-compliant switchover from utility power to backup power." },
      { title: "Sized for Your Load", description: "We calculate the right generator size for your home or facility's actual needs." },
      { title: "Gas & Propane Options", description: "Coordination with fuel providers for natural gas or propane-fed systems." },
      { title: "Maintenance Plans Available", description: "Keep your generator ready with annual inspection and service plans." },
    ],
    process: [
      { step: "01", title: "Load Assessment", description: "We review your essential circuits and appliances to size the right system." },
      { step: "02", title: "Site & Fuel Planning", description: "We plan generator placement, clearances, and coordinate fuel line requirements." },
      { step: "03", title: "Installation & Permitting", description: "We install the transfer switch and generator, pulling all required permits." },
      { step: "04", title: "Test Run & Training", description: "We run a full test cycle and show you how the automatic system works." },
    ],
    faqs: [
      { question: "What size generator do I need?", answer: "It depends on which circuits you want backed up — from essentials like heat and refrigeration to whole-home coverage. We calculate this during a site visit." },
      { question: "How long does installation take?", answer: "Most residential standby generator installs take one to two days of on-site work, not including permit lead time." },
      { question: "Do you handle the required inspections?", answer: "Yes, we coordinate all electrical and, where applicable, gas inspections required by your municipality." },
    ],
    featured: false,
  },
  {
    slug: "solar-panel-installation",
    name: "Solar Panel Electrical Integration",
    shortName: "Solar Integration",
    icon: "SunHorizon",
    summary: "Electrical wiring, interconnection, and inspection for solar systems.",
    metaDescription:
      "Solar electrical integration in Lynn, MA. Licensed electricians handle wiring, panel upgrades, and utility interconnection for residential solar installations.",
    heroDescription:
      "We handle the critical electrical work behind your solar installation — from panel upgrades to utility interconnection — done right and to code.",
    benefits: [
      { title: "Utility Interconnection Experience", description: "We coordinate directly with National Grid and utility providers on interconnection applications." },
      { title: "Panel & Meter Coordination", description: "We upgrade service panels and coordinate meter work where solar capacity requires it." },
      { title: "Battery Backup Ready", description: "Electrical work planned to support battery storage systems now or in the future." },
      { title: "Works Alongside Your Solar Installer", description: "We partner with your solar company to deliver a compliant, coordinated install." },
    ],
    process: [
      { step: "01", title: "System Review", description: "We review your solar installer's plans and identify the required electrical scope." },
      { step: "02", title: "Panel & Wiring Prep", description: "Any needed panel upgrades or subpanel work is completed ahead of solar install day." },
      { step: "03", title: "Interconnection Wiring", description: "We complete the interconnection wiring per utility and code requirements." },
      { step: "04", title: "Inspection Support", description: "We support final inspection and utility sign-off so your system can be energized." },
    ],
    faqs: [
      { question: "Do you install the solar panels themselves?", answer: "We handle the electrical integration — panel upgrades, wiring, and interconnection. We're happy to coordinate directly with your solar panel installer." },
      { question: "Will I need a panel upgrade for solar?", answer: "Many homes need a panel upgrade or busbar rating increase to safely accommodate solar production. We assess this during our review." },
      { question: "Do you work with battery storage systems?", answer: "Yes, we wire homes for battery backup systems either alongside a new solar install or as a future-ready addition." },
    ],
    featured: false,
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
