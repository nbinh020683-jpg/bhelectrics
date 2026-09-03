import Link from "next/link";
import { Phone, ShieldCheck, Clock, Star, CalendarCheck } from "@phosphor-icons/react/ssr";
import { siteConfig } from "@/lib/site-config";
import { serviceAreaTowns } from "@/lib/service-areas-data";

const badges = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Clock, label: "24/7 Emergency Response" },
  { icon: Star, label: "Upfront, Honest Pricing" },
];

const yearsInBusiness = new Date().getFullYear() - siteConfig.founded;

const specs = [
  { k: "Years", v: `${yearsInBusiness}+` },
  { k: "Communities", v: `${serviceAreaTowns.length}` },
  { k: "Emergency", v: "24/7/365" },
  { k: "Estimates", v: "100% written" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-darker">
      <div className="absolute inset-0 bg-grid-glow" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="animate-fade-up">
          <span className="eyebrow text-accent-light">
            Serving Lynn &amp; the North Shore Since {siteConfig.founded}
          </span>
          <h1 className="mt-5 font-heading text-4xl font-black leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
            Electrical Work Done Right, <span className="text-accent-light">the First Time</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            BH Electrics is a licensed, locally owned electrical contractor serving homes and
            businesses across Lynn and the North Shore &mdash; from same-day repairs to full panel
            upgrades and 24/7 emergency service.
          </p>

          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <a href={siteConfig.phoneHref} className="btn-primary">
              <Phone weight="fill" size={20} />
              Call {siteConfig.phone}
            </a>
            <Link href="/contact" className="btn-ghost-on-dark">
              <CalendarCheck weight="bold" size={20} />
              Request a Free Quote
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {badges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm font-semibold text-white/85">
                <Icon size={20} weight="fill" className="text-caution" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="corner-marks border border-white/15 bg-white/[0.03] p-8 backdrop-blur-sm">
            <p className="eyebrow text-white/50">Field Record &mdash; BH Electrics</p>
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6">
              {specs.map(({ k, v }) => (
                <div key={k}>
                  <p className="font-mono text-[0.7rem] uppercase tracking-widest text-white/45">{k}</p>
                  <p className="mt-1.5 font-mono text-2xl font-semibold tabular-nums text-white">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="font-mono text-xs tabular-nums text-white/50">
                {siteConfig.license.number} &middot; {siteConfig.address.city}, {siteConfig.address.state}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 border border-white/15 bg-white/[0.03] p-4 pr-6 backdrop-blur-sm">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full" />
              <Phone weight="fill" size={20} className="text-white" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">Emergency? We answer 24/7</p>
              <p className="text-xs text-white/60">Priority dispatch for urgent electrical hazards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
