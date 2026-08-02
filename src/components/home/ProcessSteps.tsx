import { Phone, ClipboardText, FileText, CheckCircle } from "@phosphor-icons/react/ssr";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { icon: Phone, title: "Call or Request Online", description: "Reach us by phone or submit a quote request — we respond quickly, every time." },
  { icon: ClipboardText, title: "On-Site Assessment", description: "A licensed electrician evaluates the job and explains your options in plain language." },
  { icon: FileText, title: "Upfront Written Quote", description: "You approve a clear, itemized estimate before any work begins. No surprises." },
  { icon: CheckCircle, title: "Quality Work, Guaranteed", description: "We complete the job to code, test everything, and clean up after ourselves." },
];

export function ProcessSteps() {
  return (
    <section className="section-y bg-surface-alt">
      <div className="container-page">
        <SectionHeading eyebrow="How It Works" title="Simple, Transparent, No Surprises" />

        <div className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-[26px] hidden h-px bg-border lg:block" />
          {steps.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className="relative text-center">
              <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-card">
                <Icon size={24} weight="fill" />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-accent">Step {i + 1}</p>
              <h3 className="mt-1.5 text-base font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
