import Link from "next/link";
import { Phone, House, MagnifyingGlass } from "@phosphor-icons/react/ssr";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <section className="section-y">
      <div className="container-page flex flex-col items-center text-center">
        <span className="font-heading text-8xl font-bold text-primary/15">404</span>
        <h1 className="mt-4 text-3xl font-bold text-ink">Page Not Found</h1>
        <p className="mt-3 max-w-md text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you
          back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
          <Link href="/" className="btn-primary">
            <House weight="fill" size={20} />
            Back to Home
          </Link>
          <Link href="/services" className="btn-secondary">
            <MagnifyingGlass weight="bold" size={20} />
            Browse Services
          </Link>
        </div>
        <a href={siteConfig.phoneHref} className="mt-6 flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-primary">
          <Phone weight="fill" size={16} />
          Or call us directly at {siteConfig.phone}
        </a>
      </div>
    </section>
  );
}
