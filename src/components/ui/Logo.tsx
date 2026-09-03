export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="BH Electrics logomark"
    >
      <defs>
        <linearGradient id="bh-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A3136" />
          <stop offset="100%" stopColor="#14171A" />
        </linearGradient>
      </defs>
      <path
        d="M24 2 44 12v14c0 12.5-8.4 18.6-20 20C12.4 44.6 4 38.5 4 26V12L24 2Z"
        fill="url(#bh-logo-grad)"
      />
      <path
        d="M24 2 44 12v14c0 12.5-8.4 18.6-20 20C12.4 44.6 4 38.5 4 26V12L24 2Z"
        fill="none"
        stroke="#A8571F"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M26 10 15 26h7l-2 12 13-18h-7l2-10Z"
        fill="#DB8A46"
        stroke="#14171A"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  markClassName = "h-10 w-10",
  light = false,
}: {
  className?: string;
  markClassName?: string;
  light?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-heading text-lg font-bold tracking-tight ${
            light ? "text-white" : "text-ink"
          }`}
        >
          BH Electrics
        </span>
        <span
          className={`text-[10px] font-semibold uppercase tracking-widest ${
            light ? "text-white/70" : "text-ink-muted"
          }`}
        >
          Licensed &amp; Insured
        </span>
      </span>
    </span>
  );
}
