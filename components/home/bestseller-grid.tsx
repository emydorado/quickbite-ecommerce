import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBestsellers } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";

function BestsellerGrid() {
  const bestsellers = getBestsellers().slice(0, 8);

  return (
    <section className="bg-primary-subtle/40 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-editorial text-3xl text-primary sm:text-4xl">
              Los que más se repiten
            </h2>
            <p className="max-w-lg text-neutral/60">
              No es un catálogo infinito — es lo que la gente vuelve a pedir.
            </p>
          </div>
          <Link
            href="/categoria/marca-quickbite"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline sm:flex"
          >
            Ver todo <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { BestsellerGrid };
