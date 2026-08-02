import Link from "next/link";
import { Phone, ChatCircleText } from "@phosphor-icons/react/ssr";
import { siteConfig } from "@/lib/site-config";

export function MobileCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(15,23,42,0.08)] lg:hidden"
      role="navigation"
      aria-label="Quick contact"
    >
      <a
        href={siteConfig.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-bold text-white bg-accent active:bg-accent-dark"
      >
        <Phone weight="fill" size={18} />
        Call Now
      </a>
      <Link
        href="/contact"
        className="flex flex-1 items-center justify-center gap-2 border-l border-border py-3.5 text-sm font-bold text-primary active:bg-primary/5"
      >
        <ChatCircleText weight="fill" size={18} />
        Request a Quote
      </Link>
    </div>
  );
}
