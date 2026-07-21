"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useCartStore } from "@/lib/store/cart-store";
import { useAuthStore } from "@/lib/store/auth-store";
import { categories } from "@/lib/data/categories";
import { QIcon } from "@/components/shared/q-icon";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/shared/auth-modal";

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
  const [authOpen, setAuthOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const user = useAuthStore((s) => s.user);
  const logOut = useAuthStore((s) => s.logOut);

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
          <Link href="/" className="flex items-center" aria-label="Inicio de QuickBite">
            <QIcon size={40} />
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

          <div className="ml-1 hidden sm:block">
            {user ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-primary hover:bg-primary-subtle"
                  >
                    Hola, {user.name.split(" ")[0]}
                    <ChevronDown size={14} />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    align="end"
                    sideOffset={10}
                    className="z-50 w-64 rounded-xl border border-border bg-secondary p-2 shadow-lg"
                  >
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-neutral">{user.name}</p>
                      <p className="text-xs text-neutral/55">{user.email}</p>
                    </div>
                    <DropdownMenu.Separator className="my-1 h-px bg-border" />
                    <DropdownMenu.Item asChild>
                      <Link
                        href="/cuenta"
                        className="block cursor-pointer rounded-lg px-3 py-2 text-sm text-neutral outline-none hover:bg-primary-subtle"
                      >
                        Editar perfil
                      </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onSelect={() => logOut()}
                      className="cursor-pointer rounded-lg px-3 py-2 text-sm text-neutral outline-none hover:bg-primary-subtle"
                    >
                      Cerrar sesión
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              <Button size="sm" onClick={() => setAuthOpen(true)}>
                Registrarse
              </Button>
            )}
          </div>
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
          <div className="mt-2 border-t border-border pt-3">
            {user ? (
              <div className="flex flex-col gap-1">
                <p className="px-3 text-sm font-medium text-neutral">
                  Hola, {user.name.split(" ")[0]}
                </p>
                <Link
                  href="/cuenta"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-neutral/70 hover:bg-primary-subtle"
                >
                  Editar perfil
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logOut();
                    setMobileOpen(false);
                  }}
                  className="rounded-lg px-3 py-2.5 text-left text-sm text-neutral/70 hover:bg-primary-subtle"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Button
                size="sm"
                className="ml-3"
                onClick={() => {
                  setAuthOpen(true);
                  setMobileOpen(false);
                }}
              >
                Registrarse
              </Button>
            )}
          </div>
        </nav>
      )}

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </header>
  );
}

export { Navbar };
