import Link from "next/link";
import { Phone, CalendarCheck } from "@phosphor-icons/react/ssr";
import { siteConfig } from "@/lib/site-config";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-grid-glow opacity-60" />
      <div className="container-page relative flex flex-col items-center gap-6 py-16 text-center sm:py-20">
        <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl">
          Ready to Get Started? Let&apos;s Talk About Your Project.
        </h2>
        <p className="max-w-xl text-lg text-white/80">
          Whether it&apos;s a quick repair or a full electrical upgrade, BH Electrics is ready to help
          &mdash; call now or request a free, no-obligation quote online.
        </p>
        <div className="mt-2 flex flex-col gap-3.5 sm:flex-row">
          <a href={siteConfig.phoneHref} className="btn-primary">
            <Phone weight="fill" size={20} />
            Call {siteConfig.phone}
          </a>
          <Link href="/contact" className="btn-ghost-on-dark">
            <CalendarCheck weight="bold" size={20} />
            Request a Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
