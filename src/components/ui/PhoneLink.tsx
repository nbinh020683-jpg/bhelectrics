import { Phone } from "@phosphor-icons/react/ssr";
import { siteConfig } from "@/lib/site-config";

export function PhoneLink({
  className = "",
  showIcon = true,
  label,
}: {
  className?: string;
  showIcon?: boolean;
  label?: string;
}) {
  return (
    <a
      href={siteConfig.phoneHref}
      className={className}
      aria-label={`Call ${siteConfig.name} at ${siteConfig.phone}`}
    >
      {showIcon && <Phone weight="fill" className="shrink-0" />}
      {label ?? siteConfig.phone}
    </a>
  );
}
