import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = { title: "Sign In" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-12">
      <Logo markClassName="h-12 w-12" />
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
