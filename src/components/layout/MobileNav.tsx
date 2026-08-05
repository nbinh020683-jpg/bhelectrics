"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { List, X, Phone, CaretDown } from "@phosphor-icons/react/ssr";
import { primaryNav } from "@/lib/nav-data";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/ui/Logo";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const drawer = (
    // Rendered via portal into <body> — the header uses backdrop-blur,
    // which creates a new containing block and would otherwise clip this
    // fixed-position overlay down to the header's own height.
    <div className="fixed inset-0 z-[60]">
      <button
        aria-label="Close menu"
        className="absolute inset-0 bg-ink/50 cursor-pointer"
        onClick={() => setOpen(false)}
      />
      <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-white shadow-2xl animate-fade-up">
        <div className="flex items-center justify-between border-b border-border px-5 py-5">
          <Logo markClassName="h-9 w-9" />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 px-3 py-4">
          {primaryNav.map((item) => (
            <div key={item.href} className="border-b border-border/70 last:border-none">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex-1 px-3 py-3.5 text-base font-semibold text-ink"
                >
                  {item.label}
                </Link>
                {item.children?.length ? (
                  <button
                    aria-label={`Toggle ${item.label} submenu`}
                    aria-expanded={expanded === item.href}
                    onClick={() => setExpanded(expanded === item.href ? null : item.href)}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center text-ink-muted"
                  >
                    <CaretDown
                      size={16}
                      weight="bold"
                      className={`transition-transform duration-200 ${expanded === item.href ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : null}
              </div>
              {item.children?.length && expanded === item.href && (
                <div className="pb-2 pl-5">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted hover:text-primary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-5">
          <a href={siteConfig.phoneHref} className="btn-primary w-full">
            <Phone weight="fill" size={18} />
            Call {siteConfig.phone}
          </a>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn-secondary mt-3 w-full"
          >
            Request a Free Quote
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-border text-ink"
      >
        <List size={22} weight="bold" />
      </button>

      {mounted && open && createPortal(drawer, document.body)}
    </div>
  );
}
