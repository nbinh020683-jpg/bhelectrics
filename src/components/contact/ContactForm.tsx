"use client";

import { useState, type FormEvent } from "react";
import { PaperPlaneTilt, CheckCircle, WarningCircle, Spinner } from "@phosphor-icons/react/ssr";
import { services } from "@/lib/services-data";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center gap-3 bg-success/5 p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle size={28} weight="fill" />
        </span>
        <h3 className="text-lg font-bold text-ink">Request Received!</h3>
        <p className="max-w-sm text-sm text-ink-muted">
          Thanks for reaching out. A member of the BH Electrics team will contact you shortly. For
          urgent electrical issues, please call us directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-bold text-primary cursor-pointer"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-7 sm:p-8">
      {/* Honeypot field — hidden from real users, trips up simple bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-lg border border-border px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-ink">
            Phone Number <span className="text-accent">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="w-full rounded-lg border border-border px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-border px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-semibold text-ink">
            Service Needed
          </label>
          <select
            id="service"
            name="service"
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary"
          >
            <option value="">Select a service (optional)</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.shortName}
              </option>
            ))}
            <option value="Other">Other / Not Sure</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="address" className="mb-1.5 block text-sm font-semibold text-ink">
          Property Address / Town
        </label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="e.g. Lynn, MA"
          className="w-full rounded-lg border border-border px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
          Tell Us About the Job <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-lg border border-border px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary"
        />
      </div>

      <label className="flex items-start gap-2.5 text-xs text-ink-muted">
        <input type="checkbox" required name="consent" className="mt-0.5 h-4 w-4 shrink-0 rounded border-border" />
        I agree to be contacted by BH Electrics by phone, text, or email regarding my request.
      </label>

      {status === "error" && (
        <div className="flex items-center gap-2.5 rounded-lg bg-danger/8 px-4 py-3 text-sm text-danger">
          <WarningCircle size={18} weight="fill" className="shrink-0" />
          {errorMessage}
        </div>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        {status === "submitting" ? (
          <>
            <Spinner size={20} weight="bold" className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <PaperPlaneTilt weight="fill" size={20} />
            Request a Free Quote
          </>
        )}
      </button>
    </form>
  );
}
