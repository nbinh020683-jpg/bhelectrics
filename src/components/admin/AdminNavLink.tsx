"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-bold transition-colors ${
        isActive ? "bg-primary/8 text-primary" : "text-ink-muted hover:text-primary"
      }`}
    >
      {icon}
      {children}
    </Link>
  );
}
