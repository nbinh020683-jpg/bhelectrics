export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <span className={light ? "eyebrow text-accent-light" : "eyebrow"}>
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 font-heading text-3xl font-black tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/70" : "text-ink-muted"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
