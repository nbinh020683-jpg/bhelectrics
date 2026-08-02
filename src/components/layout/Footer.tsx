import Link from "next/link";
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  Clock,
  FacebookLogo,
  InstagramLogo,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/services-data";
import { serviceAreaTowns } from "@/lib/service-areas-data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary-darker pb-24 text-white/80 lg:pb-0">
      <div className="container-page grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <Logo light markClassName="h-11 w-11" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            {siteConfig.description}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={siteConfig.social.facebook}
              aria-label="BH Electrics on Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
            >
              <FacebookLogo size={16} weight="fill" />
            </a>
            <a
              href={siteConfig.social.instagram}
              aria-label="BH Electrics on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
            >
              <InstagramLogo size={16} weight="fill" />
            </a>
          </div>
          <div className="mt-6 flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
            <ShieldCheck size={18} weight="fill" className="mt-0.5 shrink-0 text-caution" />
            <span>
              Fully licensed &amp; insured &mdash; {siteConfig.license.number}
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-white/70 transition-colors hover:text-white">
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Service Areas</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-2 gap-y-2.5 text-sm">
            {serviceAreaTowns.map((t) => (
              <li key={t.slug}>
                <Link href={`/service-areas/${t.slug}`} className="text-white/70 transition-colors hover:text-white">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin size={18} className="mt-0.5 shrink-0 text-white/50" />
              <span>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={18} className="shrink-0 text-white/50" />
              <a href={siteConfig.phoneHref} className="font-semibold text-white hover:text-caution">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <EnvelopeSimple size={18} className="shrink-0 text-white/50" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock size={18} className="mt-0.5 shrink-0 text-white/50" />
              <span>
                Mon&ndash;Fri: 7am&ndash;6pm
                <br />
                Sat: 8am&ndash;2pm &middot; 24/7 Emergency
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
