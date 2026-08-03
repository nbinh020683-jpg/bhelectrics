import type { Metadata } from "next";
import { ShieldCheck, Certificate, HardHat, HeartStraight, Users } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about BH Electrics, a locally owned, licensed electrical contractor based in Lynn, MA serving the North Shore since ${siteConfig.founded}.`,
  alternates: { canonical: "/about" },
};

const values = [
  { icon: ShieldCheck, title: "Safety First", description: "Every job starts and ends with safety — for our crew, your family, and your property." },
  { icon: Certificate, title: "Code Compliance", description: "All work meets National Electrical Code standards and Massachusetts amendments." },
  { icon: HardHat, title: "Craftsmanship", description: "We treat every job, big or small, with the same attention to detail." },
  { icon: HeartStraight, title: "Honesty", description: "Clear pricing, honest recommendations, and no upselling work you don't need." },
];

const yearsInBusiness = new Date().getFullYear() - siteConfig.founded;

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow="About BH Electrics"
        title="A Local Electrical Team You Can Rely On"
        description={`For ${yearsInBusiness}+ years, BH Electrics has provided licensed, honest electrical work to homeowners and businesses across Lynn and the North Shore of Massachusetts.`}
      />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading align="left" eyebrow="Our Story" title="Built on Trust, One Job at a Time" />
            <div className="mt-5 space-y-4 text-ink-muted leading-relaxed">
              <p>
                BH Electrics was founded in Lynn, Massachusetts with a simple goal: bring honest,
                code-compliant electrical work to homeowners and business owners across the North
                Shore, without the runaround.
              </p>
              <p>
                Since {siteConfig.founded}, that mission hasn&apos;t changed. Whether it&apos;s a
                same-day repair, a full panel upgrade, or a ground-up commercial fit-out, our
                licensed electricians hold themselves to the same standard on every job: safe, clean,
                and done right the first time.
              </p>
              <p>
                We&apos;re proud to be based right here at {siteConfig.address.street} in{" "}
                {siteConfig.address.city} &mdash; not a call center, not a franchise. When you call
                BH Electrics, you&apos;re reaching your neighbors.
              </p>
            </div>
          </div>

          <div className="card flex flex-col items-center justify-center gap-4 bg-surface-alt p-10 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/8 text-primary">
              <Users size={40} weight="duotone" />
            </span>
            <p className="font-bold text-ink">Meet the Team</p>
            <p className="max-w-xs text-sm text-ink-muted">
              Team photos and bios coming soon. Every technician on our team is licensed, background
              checked, and trained to the highest safety standard.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface-alt">
        <div className="container-page">
          <SectionHeading eyebrow="Our Values" title="What Guides Every Job We Take On" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card p-7 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/8 text-primary">
                  <Icon size={24} weight="fill" />
                </span>
                <h3 className="mt-4 font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <div className="card grid gap-8 p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-caution/15 text-caution-dark lg:mx-0">
              <ShieldCheck size={32} weight="fill" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-ink">Licensed, Bonded &amp; Insured</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
                BH Electrics holds a valid Massachusetts electrical contractor license
                ({siteConfig.license.number}) and carries full general liability insurance. Certificates
                of insurance are available on request for property managers and general contractors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
