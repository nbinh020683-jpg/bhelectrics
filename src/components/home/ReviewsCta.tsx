import { Star, ChatCircleDots, Handshake, Broom } from "@phosphor-icons/react/ssr";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";

const values = [
  { icon: ChatCircleDots, title: "Clear Communication", description: "We explain the work, the cost, and the timeline before we ever pick up a tool." },
  { icon: Handshake, title: "On-Time, Every Time", description: "We show up in our scheduled window and keep you posted if anything changes." },
  { icon: Broom, title: "Clean Job Sites", description: "We treat your home or business like our own — floors protected, mess cleaned up." },
];

export function ReviewsCta() {
  return (
    <section className="section-y bg-surface-alt">
      <div className="container-page">
        <SectionHeading
          eyebrow="Customer Experience"
          title="What You Can Expect Working With Us"
          description="These are the standards every BH Electrics technician is held to on every single job."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card p-7 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/8 text-primary">
                <Icon size={24} weight="fill" />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-white p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-caution/15 text-caution-dark">
              <Star size={24} weight="fill" />
            </span>
            <div>
              <p className="font-bold text-ink">See what North Shore customers are saying</p>
              <p className="text-sm text-ink-muted">Read verified reviews on our Google Business Profile.</p>
            </div>
          </div>
          <a href={siteConfig.social.google} target="_blank" rel="noopener noreferrer" className="btn-secondary shrink-0">
            View Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
