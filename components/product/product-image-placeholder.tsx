import {
  Apple,
  Cookie,
  Beef,
  GlassWater,
  Coffee,
  Wheat,
  Nut,
  Sandwich,
  Leaf,
  Pill,
  Dumbbell,
  Soup,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const iconMap: Record<string, LucideIcon> = {
  Apple,
  Cookie,
  Beef,
  GlassWater,
  Coffee,
  Wheat,
  Nut,
  Sandwich,
  Leaf,
  Pill,
  Dumbbell,
  Soup,
  BadgeCheck,
};

const gradientVariants = [
  "from-primary-subtle to-secondary",
  "from-lime-subtle to-secondary",
  "from-orange-subtle to-secondary",
];

export interface ProductImagePlaceholderProps {
  accentIcon: string;
  seed: number;
  className?: string;
}

/**
 * Stand-in for product photography: a designed, on-brand tile (not a broken
 * image or lorem-ipsum box) until real photography is shot. Swap for
 * next/image once assets exist — signature stays the same.
 */
function ProductImagePlaceholder({
  accentIcon,
  seed,
  className,
}: ProductImagePlaceholderProps) {
  const Icon = iconMap[accentIcon] ?? Leaf;
  const gradient = gradientVariants[seed % gradientVariants.length];

  return (
    <div
      className={cn(
        "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br",
        gradient,
        className
      )}
    >
      <Icon
        className="text-primary/25"
        size={64}
        strokeWidth={1.25}
        aria-hidden
      />
    </div>
  );
}

export { ProductImagePlaceholder };
