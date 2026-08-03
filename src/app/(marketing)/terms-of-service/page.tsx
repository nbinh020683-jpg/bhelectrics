import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/lib/site-config";

// NOTE: This is a starter terms-of-service template. Have it reviewed by an
// attorney before launch to ensure it reflects your actual business practices,
// warranty terms, and applicable Massachusetts consumer protection law.
export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for use of the ${siteConfig.name} website.`,
  alternates: { canonical: "/terms-of-service" },
  robots: { index: false, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated: January 2026"
      />

      <section className="section-y">
        <div className="container-page max-w-3xl space-y-8 leading-relaxed text-ink-muted">
          <div>
            <h2 className="text-xl font-bold text-ink">1. Acceptance of Terms</h2>
            <p className="mt-3">
              By accessing this website, you agree to these terms of service. If you do not agree,
              please discontinue use of the site.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">2. Website Content</h2>
            <p className="mt-3">
              Information on this website, including service descriptions and pricing indications, is
              provided for general informational purposes and does not constitute a binding quote.
              Final pricing is provided in writing following an on-site assessment.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">3. No Professional Advice</h2>
            <p className="mt-3">
              Blog content and educational materials on this site are provided for general
              informational purposes only and do not substitute for an on-site assessment by a
              licensed electrician.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">4. Service Agreements</h2>
            <p className="mt-3">
              Any electrical work performed by {siteConfig.legalName} is governed by a separate,
              signed service agreement or estimate provided directly to the customer, which takes
              precedence over any information presented on this website.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">5. Limitation of Liability</h2>
            <p className="mt-3">
              {siteConfig.legalName} is not liable for any indirect, incidental, or consequential
              damages arising from the use of this website.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">6. Contact Us</h2>
            <p className="mt-3">
              Questions about these terms can be directed to{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-semibold text-primary">
                {siteConfig.email}
              </a>{" "}
              or {siteConfig.phone}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
