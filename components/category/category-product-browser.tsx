"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { DietaryAttribute, Product } from "@/lib/data/types";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters, priceBuckets } from "@/components/product/product-filters";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils/cn";

type SortKey = "relevancia" | "precio-asc" | "precio-desc" | "vendidos";

const sortOptions: { id: SortKey; label: string }[] = [
  { id: "relevancia", label: "Relevancia" },
  { id: "precio-asc", label: "Precio: menor a mayor" },
  { id: "precio-desc", label: "Precio: mayor a menor" },
  { id: "vendidos", label: "Más vendidos" },
];

export interface CategoryProductBrowserProps {
  products: Product[];
  subcategories: string[];
}

function CategoryProductBrowser({
  products,
  subcategories,
}: CategoryProductBrowserProps) {
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [selectedDietary, setSelectedDietary] = useState<DietaryAttribute[]>([]);
  const [selectedBuckets, setSelectedBuckets] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("relevancia");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = products;

    if (activeSubcategory) {
      result = result.filter((p) => p.subcategory === activeSubcategory);
    }

    if (selectedDietary.length > 0) {
      result = result.filter((p) =>
        selectedDietary.every((d) => p.dietaryAttributes.includes(d))
      );
    }

    if (selectedBuckets.length > 0) {
      const buckets = priceBuckets.filter((b) => selectedBuckets.includes(b.id));
      result = result.filter((p) => {
        const price = p.variants[0].price;
        return buckets.some((b) => price >= b.min && price < b.max);
      });
    }

    const sorted = [...result];
    if (sort === "precio-asc") {
      sorted.sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sort === "precio-desc") {
      sorted.sort((a, b) => b.variants[0].price - a.variants[0].price);
    } else if (sort === "vendidos") {
      sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return sorted;
  }, [products, activeSubcategory, selectedDietary, selectedBuckets, sort]);

  const activeFilterCount = selectedDietary.length + selectedBuckets.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveSubcategory(null)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            activeSubcategory === null
              ? "border-primary bg-primary text-secondary"
              : "border-border bg-secondary text-neutral/70 hover:border-primary/30"
          )}
        >
          Todo
        </button>
        {subcategories.map((sub) => (
          <button
            key={sub}
            type="button"
            onClick={() => setActiveSubcategory(sub)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              activeSubcategory === sub
                ? "border-primary bg-primary text-secondary"
                : "border-border bg-secondary text-neutral/70 hover:border-primary/30"
            )}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-56 shrink-0 lg:block">
          <ProductFilters
            selectedDietary={selectedDietary}
            onDietaryChange={setSelectedDietary}
            selectedBuckets={selectedBuckets}
            onBucketsChange={setSelectedBuckets}
          />
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="lg:hidden"
              onClick={() => setFiltersOpen(true)}
            >
              <SlidersHorizontal size={15} />
              Filtros
              {activeFilterCount > 0 && (
                <span className="ml-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange px-1 text-[10px] text-secondary">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            <p className="hidden text-sm text-neutral/55 lg:block">
              {filtered.length} producto{filtered.length !== 1 && "s"}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="ml-auto rounded-full border border-border bg-secondary px-4 py-2 text-sm text-neutral"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-white/50 py-20 text-center">
              <p className="text-lg font-medium text-neutral">
                Nada por aquí todavía.
              </p>
              <p className="max-w-xs text-sm text-neutral/60">
                Prueba quitando algún filtro, seguro encontramos algo que te
                guste.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent>
          <DialogTitle>Filtros</DialogTitle>
          <div className="mt-4">
            <ProductFilters
              selectedDietary={selectedDietary}
              onDietaryChange={setSelectedDietary}
              selectedBuckets={selectedBuckets}
              onBucketsChange={setSelectedBuckets}
            />
          </div>
          <Button className="mt-6 w-full" onClick={() => setFiltersOpen(false)}>
            Ver {filtered.length} resultado{filtered.length !== 1 && "s"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { CategoryProductBrowser };
