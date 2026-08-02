import Link from "next/link";
import { Phone, ShieldCheck, Clock, Star, CalendarCheck } from "@phosphor-icons/react/ssr";
import { siteConfig } from "@/lib/site-config";

const badges = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Clock, label: "24/7 Emergency Response" },
  { icon: Star, label: "Upfront, Honest Pricing" },
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
          <span className="eyebrow bg-white/10 text-caution">
            Serving Lynn &amp; the North Shore Since {siteConfig.founded}
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
            Electrical Work Done Right, <span className="text-caution">the First Time</span>
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

        <div className="relative hidden lg:block">
          <HeroIllustration />
          <div className="absolute -left-4 bottom-8 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 pr-6 backdrop-blur-md">
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-accent">
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

function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 420" className="w-full max-w-lg mx-auto drop-shadow-2xl" role="img" aria-label="Illustration of an electrical service panel with a technician's tools">
      <defs>
        <linearGradient id="panelBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0F1E52" />
        </linearGradient>
        <linearGradient id="boltGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#FACC15" />
        </linearGradient>
      </defs>

      <circle cx="240" cy="210" r="190" fill="#3B82F6" opacity="0.08" />
      <circle cx="240" cy="210" r="145" fill="#3B82F6" opacity="0.10" />

      <rect x="130" y="60" width="220" height="300" rx="18" fill="url(#panelBody)" stroke="#3B82F6" strokeOpacity="0.4" strokeWidth="2" />
      <rect x="150" y="84" width="180" height="30" rx="6" fill="#0B1220" />
      <circle cx="165" cy="99" r="4" fill="#22C55E" />
      <circle cx="180" cy="99" r="4" fill="#FACC15" />

      {Array.from({ length: 8 }).map((_, row) => (
        <g key={row}>
          {Array.from({ length: 2 }).map((_, col) => (
            <rect
              key={col}
              x={150 + col * 100}
              y={132 + row * 26}
              width="80"
              height="16"
              rx="3"
              fill={row === 3 && col === 1 ? "#EA580C" : "#1D3A8F"}
              stroke="#3B82F6"
              strokeOpacity="0.5"
            />
          ))}
        </g>
      ))}

      <path
        d="M256 150 210 232h34l-10 60 66-92h-34l10-50Z"
        fill="url(#boltGrad)"
        stroke="#0F1E52"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <g opacity="0.9">
        <rect x="60" y="290" width="70" height="14" rx="7" fill="#EA580C" transform="rotate(-18 60 290)" />
        <circle cx="55" cy="278" r="16" fill="#152B7A" stroke="#3B82F6" strokeWidth="2" />
      </g>
    </svg>
  );
}
