import Link from "next/link";
import Image from "next/image";
import { Share2, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const columns = [
  {
    title: "Comprar",
    links: [
      { href: "/categoria/snacks-saludables", label: "Snacks saludables" },
      { href: "/categoria/bebidas-saludables", label: "Bebidas saludables" },
      { href: "/categoria/despensa-organica", label: "Despensa orgánica" },
      { href: "/categoria/suplementos-y-vitaminas", label: "Suplementos" },
    ],
  },
  {
    title: "QuickBite",
    links: [
      { href: "/sobre-nosotros", label: "Sobre nosotros" },
      { href: "/contacto", label: "Contacto y ayuda" },
      { href: "/cuenta", label: "Mi cuenta" },
      { href: "/cuenta/pedidos", label: "Mis pedidos" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { href: "/contacto", label: "Preguntas frecuentes" },
      { href: "/contacto", label: "Envíos y devoluciones" },
      { href: "/contacto", label: "Escríbenos" },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-secondary">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-4 lg:col-span-2">
            <Image
              src="/logo/quickbite-wordmark-light-green.svg"
              alt="QuickBite"
              width={112}
              height={64}
              className="h-10 w-auto"
            />
            <p className="max-w-xs text-sm leading-relaxed text-secondary/70">
              Tu despensa saludable, curada y lista, en minutos.
            </p>
            <div className="flex gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="QuickBite en Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/20 text-secondary transition-colors hover:bg-secondary/10"
              >
                <Share2 size={17} strokeWidth={1.75} />
              </a>
              <a
                href="mailto:hola@quickbite.com"
                aria-label="Escríbenos por correo"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/20 text-secondary transition-colors hover:bg-secondary/10"
              >
                <Mail size={17} strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-secondary/50">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary/85 transition-colors hover:text-lime"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 flex flex-col gap-3 lg:col-span-2">
            <h3 className="text-sm font-semibold text-secondary/50">
              Newsletter
            </h3>
            <p className="text-sm text-secondary/70">
              Novedades del catálogo, sin spam. Una vez al mes, como mucho.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="tu@correo.com"
                required
                className="border-secondary/20 bg-transparent text-secondary placeholder:text-secondary/40 focus-visible:border-lime"
              />
              <Button type="submit" variant="accent" size="md" className="shrink-0">
                Unirme
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-secondary/15 pt-6 text-xs text-secondary/50 sm:flex-row">
          <p>© {new Date().getFullYear()} QuickBite. Proyecto conceptual de portafolio.</p>
          <p>Envíos simulados · Sin pasarela de pago real</p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
