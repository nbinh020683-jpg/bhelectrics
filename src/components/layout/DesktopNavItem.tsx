"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { CaretDown } from "@phosphor-icons/react/ssr";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

export function DesktopNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openNow() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  }

  function closeSoon() {
    closeTimeout.current = setTimeout(() => setOpen(false), 120);
  }

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        className="rounded-md px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-primary/6 hover:text-primary"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={closeSoon}
    >
      <Link
        href={item.href}
        className="flex items-center gap-1 rounded-md px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-primary/6 hover:text-primary"
        aria-expanded={open}
      >
        {item.label}
        <CaretDown weight="bold" size={12} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </Link>

      {open && (
        <div className="absolute left-0 top-full w-64 pt-2">
          <div className="animate-fade-up rounded-xl border border-border bg-white p-2 shadow-card-hover">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block rounded-lg px-3.5 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-tint hover:text-primary"
              >
                {child.label}
              </Link>
            ))}
            <Link
              href={item.href}
              className="mt-1 block rounded-lg border-t border-border px-3.5 py-2.5 pt-3 text-sm font-bold text-primary"
            >
              View all {item.label.toLowerCase()} &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
