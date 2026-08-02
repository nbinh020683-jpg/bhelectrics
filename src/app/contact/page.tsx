import type { Metadata } from "next";
import { Phone, EnvelopeSimple, MapPin, Clock } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact BH Electrics for a free quote or 24/7 emergency electrical service in Lynn, MA and the North Shore.",
  alternates: { canonical: "/contact" },
};

const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`;
const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Get In Touch"
        title="Request a Free Quote"
        description="Fill out the form below or call us directly — we're happy to answer questions and provide honest, upfront pricing before any work begins."
      />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="card space-y-5 p-7">
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <Phone size={20} weight="fill" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-muted">Call or Text</p>
                  <a href={siteConfig.phoneHref} className="text-lg font-bold text-ink hover:text-primary">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <EnvelopeSimple size={20} weight="fill" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-muted">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-lg font-bold text-ink hover:text-primary">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <MapPin size={20} weight="fill" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-muted">Office</p>
                  <p className="font-bold text-ink">
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <Clock size={20} weight="fill" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-muted">Hours</p>
                  <p className="font-bold text-ink">Mon&ndash;Fri: 7am&ndash;6pm</p>
                  <p className="font-bold text-ink">Sat: 8am&ndash;2pm</p>
                  <p className="text-sm text-accent font-bold">24/7 Emergency Service</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title={`Map showing ${siteConfig.name} location in ${siteConfig.address.city}, ${siteConfig.address.state}`}
                src={mapEmbedSrc}
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
