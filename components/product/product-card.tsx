"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/data/types";
import { categories } from "@/lib/data/categories";
import { ProductImage } from "./product-image";
import { Badge } from "@/components/ui/badge";
import { PriceTag } from "@/components/ui/price-tag";
import { useFavoritesStore } from "@/lib/store/favorites-store";
import { cn } from "@/lib/utils/cn";

const dietaryLabels: Record<string, string> = {
  vegano: "Vegano",
  "sin-gluten": "Sin gluten",
  "sin-azucar": "Sin azúcar",
  organico: "Orgánico",
};

export interface ProductCardProps {
  product: Product;
  className?: string;
}

function ProductCard({ product, className }: ProductCardProps) {
  const category = categories.find((c) => c.slug === product.categorySlug);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(product.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const baseVariant = product.variants[0];
  const primaryDietaryTag = product.dietaryAttributes[0];

  return (
    <div className={cn("group relative flex flex-col", className)}>
      <Link
        href={`/producto/${product.handle}`}
        className="relative block"
        aria-label={product.title}
      >
        <ProductImage
          src={product.image}
          alt={product.title}
          fallbackIcon={category?.accentIcon ?? "Leaf"}
          seed={product.imageSeed}
        />
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {product.tags.includes("nuevo") && (
            <Badge variant="new">Nuevo</Badge>
          )}
          {product.tags.includes("bestseller") && (
            <Badge variant="bestseller">Bestseller</Badge>
          )}
          {product.status === "out-of-stock" && (
            <Badge variant="out-of-stock">Agotado</Badge>
          )}
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggleFavorite(product.id)}
        aria-label={
          isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"
        }
        aria-pressed={isFavorite}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-secondary/90 text-primary shadow-sm transition-transform active:scale-90"
      >
        <Heart
          size={17}
          strokeWidth={2}
          className={cn(isFavorite && "fill-orange text-orange")}
        />
      </button>

      <div className="mt-3 flex flex-1 flex-col gap-1">
        {primaryDietaryTag && (
          <span className="text-xs font-medium text-primary/60">
            {dietaryLabels[primaryDietaryTag]}
          </span>
        )}
        <Link href={`/producto/${product.handle}`}>
          <h3 className="text-base font-medium leading-snug text-neutral">
            {product.title}
          </h3>
        </Link>
        <p className="line-clamp-1 text-sm text-neutral/55">
          {product.shortDescription}
        </p>
        <div className="mt-1 flex items-center justify-between">
          <PriceTag
            price={baseVariant.price}
            compareAtPrice={baseVariant.compareAtPrice}
          />
          <span className="text-xs text-neutral/45">
            ★ {product.rating} ({product.reviewCount})
          </span>
        </div>
      </div>
    </div>
  );
}

export { ProductCard };
