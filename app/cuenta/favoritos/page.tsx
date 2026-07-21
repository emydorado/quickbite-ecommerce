"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites-store";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const favoriteIds = useFavoritesStore((s) => s.productIds);
  const favorites = products.filter((p) => favoriteIds.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-editorial text-3xl text-primary sm:text-4xl">
        Tus favoritos
      </h1>
      <p className="mt-1 text-neutral/60">
        Lo que has ido guardando para más adelante.
      </p>

      {favorites.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-border bg-white/50 py-20 text-center">
          <Heart size={32} strokeWidth={1.5} className="text-primary/40" />
          <p className="text-lg font-medium text-neutral">
            Todavía no guardas nada aquí.
          </p>
          <p className="max-w-xs text-sm text-neutral/60">
            Toca el corazón en cualquier producto para guardarlo para después.
          </p>
          <Button asChild size="md" className="mt-2">
            <Link href="/categoria/snacks-saludables">Explorar catálogo</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
