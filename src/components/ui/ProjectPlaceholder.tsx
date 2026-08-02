import { ServiceIcon } from "@/lib/service-icons";
import { Image as ImageIcon } from "@phosphor-icons/react/ssr";

const gradients = [
  "from-primary to-primary-darker",
  "from-primary-light to-primary",
  "from-accent to-accent-dark",
  "from-primary-darker to-ink",
];

export function ProjectPlaceholder({
  icon,
  label,
  index = 0,
}: {
  icon: string;
  label: string;
  index?: number;
}) {
  const gradient = gradients[index % gradients.length];

  return (
    <div
      className={`relative flex aspect-[4/3] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 text-center`}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
        <ServiceIcon name={icon} size={28} weight="duotone" />
      </span>
      <p className="relative text-sm font-bold text-white">{label}</p>
      <span className="relative flex items-center gap-1.5 rounded-full bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/80">
        <ImageIcon size={12} weight="fill" />
        Photo coming soon
      </span>
    </div>
  );
}
