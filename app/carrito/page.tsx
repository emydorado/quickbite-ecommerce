"use client";

import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import { useCartStore, type CartLine } from "@/lib/store/cart-store";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import type { Product, ProductVariant } from "@/lib/data/types";
import { ProductImage } from "@/components/product/product-image";
import { PriceTag } from "@/components/ui/price-tag";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { Button } from "@/components/ui/button";

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  interface ResolvedLine {
    line: CartLine;
    product: Product;
    variant: ProductVariant;
  }

  const resolvedLines: ResolvedLine[] = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      const variant = product?.variants.find((v) => v.id === line.variantId);
      if (!product || !variant) return null;
      return { line, product, variant };
    })
    .filter((l): l is ResolvedLine => l !== null);

  const subtotal = resolvedLines.reduce(
    (sum, l) => sum + l.variant.price * l.line.quantity,
    0
  );

  if (resolvedLines.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-24 text-center sm:px-6 lg:px-8">
        <ShoppingBag size={32} strokeWidth={1.5} className="text-primary/40" />
        <h1 className="font-editorial text-2xl text-primary">
          Tu carrito está vacío
        </h1>
        <p className="max-w-xs text-sm text-neutral/60">
          Todavía no has agregado nada. Vamos a resolver tu despensa.
        </p>
        <Button asChild size="md" className="mt-2">
          <Link href="/categoria/snacks-saludables">Explorar catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-editorial text-3xl text-primary sm:text-4xl">
        Tu carrito
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <ul className="flex flex-col divide-y divide-border">
          {resolvedLines.map(({ line, product, variant }) => {
            const category = categories.find(
              (c) => c.slug === product.categorySlug
            );
            return (
              <li
                key={`${line.productId}-${line.variantId}`}
                className="flex gap-4 py-6"
              >
                <Link
                  href={`/producto/${product.handle}`}
                  className="w-24 shrink-0"
                >
                  <ProductImage
                    src={product.image}
                    alt={product.title}
                    fallbackIcon={category?.accentIcon ?? "Leaf"}
                    seed={product.imageSeed}
                  />
                </Link>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/producto/${product.handle}`}
                        className="text-base font-medium text-neutral hover:underline"
                      >
                        {product.title}
                      </Link>
                      {variant.title !== "Único" && (
                        <p className="text-sm text-neutral/55">
                          {variant.title}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id, variant.id)}
                      aria-label={`Quitar ${product.title} del carrito`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral/40 hover:bg-primary-subtle hover:text-primary"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <QuantitySelector
                      quantity={line.quantity}
                      onChange={(q) => setQuantity(product.id, variant.id, q)}
                    />
                    <PriceTag price={variant.price * line.quantity} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="h-fit rounded-xl border border-border bg-white/50 p-6">
          <h2 className="text-lg font-semibold text-neutral">Resumen</h2>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-neutral/70">
              <span>Subtotal</span>
              <span>{currency.format(subtotal)}</span>
            </div>
            <div className="flex justify-between text-neutral/70">
              <span>Envío</span>
              <span>Se calcula en el checkout</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold text-neutral">
            <span>Total</span>
            <span>{currency.format(subtotal)}</span>
          </div>
          <Button asChild size="lg" className="mt-6 w-full">
            <Link href="/checkout">Ir a pagar</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
