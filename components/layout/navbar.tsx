"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useCartStore } from "@/lib/store/cart-store";
import { categories } from "@/lib/data/categories";

const primaryLinks = [
  { href: "/categoria/snacks-saludables", label: "Snacks" },
  { href: "/categoria/bebidas-saludables", label: "Bebidas" },
  { href: "/categoria/despensa-organica", label: "Despensa" },
  { href: "/categoria/suplementos-y-vitaminas", label: "Suplementos" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled
          ? "border-border bg-secondary/90 backdrop-blur-md"
          : "border-transparent bg-secondary"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-primary-subtle lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/" className="flex items-center" aria-label="QuickBite — inicio">
            <Image
              src="/logo/quickbite-wordmark-dark-green.svg"
              alt="QuickBite"
              width={112}
              height={64}
              priority
              className="h-9 w-auto"
            />
          </Link>
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/buscar"
            aria-label="Buscar"
            className="flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-primary-subtle"
          >
            <Search size={19} strokeWidth={2} />
          </Link>
          <Link
            href="/cuenta/favoritos"
            aria-label="Favoritos"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-primary-subtle sm:flex"
          >
            <Heart size={19} strokeWidth={2} />
          </Link>
          <Link
            href="/carrito"
            aria-label={`Carrito, ${totalItems} productos`}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-primary-subtle"
          >
            <ShoppingBag size={19} strokeWidth={2} />
            {totalItems > 0 && (
              <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange px-1 text-[10px] font-semibold leading-none text-secondary">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 lg:hidden">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral/80 hover:bg-primary-subtle hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-border pt-2">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.slug}
                href={`/categoria/${category.slug}`}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-neutral/60 hover:bg-primary-subtle hover:text-primary"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export { Navbar };
