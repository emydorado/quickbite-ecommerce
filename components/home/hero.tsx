import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroProductSwiper } from "./hero-product-swiper";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-lime/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-orange/10 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-28">
        <div className="flex max-w-lg flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <span className="w-fit rounded-full bg-primary-subtle px-4 py-1.5 text-sm font-medium text-primary">
            Tu supermercado saludable, en un solo lugar
          </span>
          <h1 className="font-editorial text-4xl leading-[1.15] tracking-tight text-primary">
            Comer sano, tan fácil
            <br />
            como pedir a domicilio.
          </h1>
          <p className="max-w-md text-[17px] leading-relaxed text-neutral/70">
            Tu despensa saludable, curada y lista, en minutos. Snacks,
            despensa, suplementos y bebidas, sin recorrer diez tiendas
            distintas.
          </p>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button asChild size="lg">
              <Link href="/categoria/snacks-saludables">
                Explorar catálogo
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/sobre-nosotros">Conoce QuickBite</Link>
            </Button>
          </div>
        </div>

        <HeroProductSwiper />
      </div>
    </section>
  );
}

export { Hero };
