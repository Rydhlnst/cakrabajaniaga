import {
  BoxesIcon,
  CloudRainIcon,
  FileCheckIcon,
  GlobeIcon,
  LayersIcon,
  MailIcon,
  MessageCircleIcon,
  MountainIcon,
  PlayIcon,
  ShieldCheckIcon,
  SproutIcon,
  type LucideProps,
} from "lucide-react";

const registry = {
  boxes: BoxesIcon,
  "cloud-rain": CloudRainIcon,
  "file-check": FileCheckIcon,
  globe: GlobeIcon,
  layers: LayersIcon,
  mail: MailIcon,
  "message-circle": MessageCircleIcon,
  mountain: MountainIcon,
  "shield-check": ShieldCheckIcon,
  sprout: SproutIcon,
  youtube: PlayIcon,
} as const;

export type IconName = keyof typeof registry;

/** Resolves a string key from site data into a lucide icon. */
export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = registry[name];
  return <Cmp {...props} />;
}
