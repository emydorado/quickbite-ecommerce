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

function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-10 flex flex-col gap-2">
        <h2 className="font-editorial text-3xl text-primary sm:text-4xl">
          Todo lo que necesitas, por categoría
        </h2>
        <p className="max-w-lg text-neutral/60">
          Sin recorrer diez pestañas distintas. Navega por lo que realmente
          buscas.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = iconMap[category.accentIcon] ?? Leaf;
          return (
            <Link
              key={category.slug}
              href={`/categoria/${category.slug}`}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-white/50 p-5 transition-colors hover:border-primary/30 hover:bg-primary-subtle"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-subtle text-primary transition-colors group-hover:bg-primary group-hover:text-secondary">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-base font-medium text-neutral">
                  {category.name}
                </span>
                <span className="mt-0.5 block text-xs text-neutral/55">
                  {category.shortDescription}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export { CategoryGrid };
