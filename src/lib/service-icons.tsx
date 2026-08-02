import {
  House,
  Buildings,
  Lightning,
  Car,
  PlugCharging,
  SunHorizon,
} from "@phosphor-icons/react/ssr";
import type { IconProps } from "@phosphor-icons/react";

export const serviceIconMap: Record<string, React.ComponentType<IconProps>> = {
  House,
  Buildings,
  Lightning,
  Car,
  PlugCharging,
  SunHorizon,
};

export function ServiceIcon({ name, ...props }: { name: string } & IconProps) {
  const Icon = serviceIconMap[name] ?? Lightning;
  return <Icon {...props} />;
}
