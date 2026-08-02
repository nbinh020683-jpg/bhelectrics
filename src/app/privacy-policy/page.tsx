import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/lib/site-config";

// NOTE: This is a starter privacy policy template. Have it reviewed by an
// attorney before launch to ensure it fully reflects your data practices and
// complies with applicable law (e.g. Massachusetts data privacy requirements).
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}, describing how we collect, use, and protect your information.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: January 2026"
      />

      <section className="section-y">
        <div className="container-page max-w-3xl space-y-8 leading-relaxed text-ink-muted">
          <div>
            <h2 className="text-xl font-bold text-ink">1. Information We Collect</h2>
            <p className="mt-3">
              When you submit a form on this website, we collect the information you provide, which
              may include your name, phone number, email address, property address, and details about
              your service request. We do not knowingly collect information from children.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">2. How We Use Your Information</h2>
            <p className="mt-3">
              We use the information you submit solely to respond to your inquiry, schedule service,
              and provide you with quotes or updates related to your request. We do not sell your
              personal information to third parties.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">3. Cookies &amp; Analytics</h2>
            <p className="mt-3">
              This website may use cookies or similar technologies to understand site usage and
              improve the visitor experience. You can control cookie preferences through your browser
              settings.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">4. Data Security</h2>
            <p className="mt-3">
              We take reasonable measures to protect the information submitted through this site.
              However, no method of transmission over the internet is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">5. Third-Party Services</h2>
            <p className="mt-3">
              This site may embed third-party services such as Google Maps. These services have their
              own privacy policies governing the information they collect.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">6. Contact Us</h2>
            <p className="mt-3">
              If you have questions about this privacy policy, please contact us at{" "}
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
