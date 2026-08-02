import Link from "next/link";
import { Phone, CalendarCheck } from "@phosphor-icons/react/ssr";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site-config";
import { primaryNav } from "@/lib/nav-data";
import { MobileNav } from "@/components/layout/MobileNav";
import { DesktopNavItem } from "@/components/layout/DesktopNavItem";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="hidden bg-primary-darker text-white lg:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="font-medium tracking-wide">
            Serving Lynn &amp; the North Shore &mdash; 24/7 Emergency Electrical Service
          </p>
          <div className="flex items-center gap-6">
            <span>{siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state}</span>
            <a href={siteConfig.phoneHref} className="flex items-center gap-1.5 font-semibold hover:text-accent-light transition-colors">
              <Phone weight="fill" size={14} />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <DesktopNavItem key={item.href} item={item} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contact" className="btn-secondary !px-5 !py-2.5 text-sm">
            <CalendarCheck weight="bold" size={18} />
            Request a Quote
          </Link>
          <a href={siteConfig.phoneHref} className="btn-primary !px-5 !py-2.5 text-sm">
            <Phone weight="fill" size={18} />
            {siteConfig.phone}
          </a>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
