import Link from "next/link";
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
import { categories } from "@/lib/data/categories";

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

function TickerTrack({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-3"
      aria-hidden={ariaHidden}
    >
      {categories.map((category) => {
        const Icon = iconMap[category.accentIcon] ?? Leaf;
        return (
          <Link
            key={category.slug}
            href={`/categoria/${category.slug}`}
            tabIndex={ariaHidden ? -1 : 0}
            className="group flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-white/60 px-5 py-3 transition-colors hover:border-primary/30 hover:bg-primary-subtle"
          >
            <Icon size={17} strokeWidth={1.75} className="text-primary" />
            <span className="whitespace-nowrap text-sm font-medium text-neutral">
              {category.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function CategoryTicker() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto mb-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-editorial text-3xl text-primary sm:text-4xl">
          Todo lo que necesitas, por categoría
        </h2>
        <p className="mt-2 max-w-lg text-neutral/60">
          Sin recorrer diez pestañas distintas. Navega por lo que realmente
          buscas.
        </p>
      </div>

      <div
        className="group/ticker relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div className="ticker-track flex w-max gap-3 group-hover/ticker:[animation-play-state:paused]">
          <TickerTrack />
          <TickerTrack ariaHidden />
        </div>
      </div>
    </section>
  );
}

export { CategoryTicker };
