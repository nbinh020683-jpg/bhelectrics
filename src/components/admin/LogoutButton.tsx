"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignOut, Spinner } from "@phosphor-icons/react/ssr";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-semibold text-ink-muted transition-colors hover:border-danger/30 hover:bg-danger/5 hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? <Spinner size={16} weight="bold" className="animate-spin" /> : <SignOut size={16} weight="bold" />}
      Sign Out
    </button>
  );
}
