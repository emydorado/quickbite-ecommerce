import Link from "next/link";
import { Button } from "@/components/ui/button";

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

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-32">
        <div className="flex max-w-xl flex-col gap-6">
          <span className="w-fit rounded-full bg-primary-subtle px-4 py-1.5 text-sm font-medium text-primary">
            Tu supermercado saludable, en un solo lugar
          </span>
          <h1 className="font-editorial text-4xl leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Comer saludable debería ser tan fácil como pedir a domicilio.
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-neutral/70">
            Tu despensa saludable, curada y lista, en minutos. Snacks,
            despensa, suplementos y bebidas — sin recorrer diez tiendas
            distintas.
          </p>
          <div className="flex flex-wrap gap-3">
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

        <div className="grid w-full max-w-md grid-cols-2 gap-4 lg:w-auto">
          {[
            { label: "Productos curados", value: "48+" },
            { label: "Categorías", value: "13" },
            { label: "Entrega estimada", value: "24h" },
            { label: "Recompra", value: "1 clic" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-white/60 p-5"
            >
              <p className="font-editorial text-3xl text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-neutral/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Hero };
