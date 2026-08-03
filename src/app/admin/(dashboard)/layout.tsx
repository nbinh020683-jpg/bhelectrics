import Link from "next/link";
import { ArrowSquareOut, Newspaper, Images } from "@phosphor-icons/react/ssr";
import { Logo } from "@/components/ui/Logo";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { AdminNavLink } from "@/components/admin/AdminNavLink";

export default function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-8">
            <Link href="/admin/posts">
              <Logo markClassName="h-9 w-9" />
            </Link>
            <nav className="hidden items-center gap-1 sm:flex">
              <AdminNavLink href="/admin/posts" icon={<Newspaper size={16} weight="fill" />}>
                Blog Posts
              </AdminNavLink>
              <AdminNavLink href="/admin/gallery" icon={<Images size={16} weight="fill" />}>
                Gallery
              </AdminNavLink>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 text-sm font-semibold text-ink-muted hover:text-primary sm:flex"
            >
              View Site
              <ArrowSquareOut size={14} weight="bold" />
            </a>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">{children}</main>
    </div>
  );
}
