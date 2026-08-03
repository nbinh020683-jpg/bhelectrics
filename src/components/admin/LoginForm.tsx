"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, WarningCircle, Spinner } from "@phosphor-icons/react/ssr";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") || "");
    const password = String(formData.get("password") || "");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Login failed.");
      }

      const redirectTo = searchParams.get("from") || "/admin/posts";
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card w-full max-w-sm space-y-5 p-8">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/8 text-primary">
          <Lock size={22} weight="fill" />
        </span>
        <h1 className="mt-4 text-xl font-bold text-ink">Admin Sign In</h1>
        <p className="mt-1 text-sm text-ink-muted">Manage blog content for BH Electrics</p>
      </div>

      <div>
        <label htmlFor="username" className="mb-1.5 block text-sm font-semibold text-ink">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          autoFocus
          className="w-full rounded-lg border border-border px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-border px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-lg bg-danger/8 px-4 py-3 text-sm text-danger">
          <WarningCircle size={18} weight="fill" className="shrink-0" />
          {error}
        </div>
      )}

      <button type="submit" disabled={submitting} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        {submitting ? (
          <>
            <Spinner size={20} weight="bold" className="animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
