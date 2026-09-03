import { Phone, WarningCircle } from "@phosphor-icons/react/ssr";
import { siteConfig } from "@/lib/site-config";

export function EmergencyBanner() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        className="absolute inset-x-0 top-0 h-2"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #DB8A46 0 16px, #14171A 16px 32px)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #DB8A46 0 16px, #14171A 16px 32px)",
        }}
      />
      <div className="container-page flex flex-col items-center gap-6 py-14 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent sm:flex">
            <WarningCircle size={28} weight="fill" className="text-white" />
          </span>
          <div>
            <p className="text-xl font-bold text-white sm:text-2xl">Electrical Emergency?</p>
            <p className="mt-1 text-sm text-white/70">
              Sparking outlets, burning smells, or a total power loss can&apos;t wait. We&apos;re on call around the clock.
            </p>
          </div>
        </div>
        <a href={siteConfig.phoneHref} className="btn-primary shrink-0">
          <Phone weight="fill" size={20} />
          Call {siteConfig.phone} Now
        </a>
      </div>
    </section>
  );
}
