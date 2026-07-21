import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function EditorialSection() {
  return (
    <section className="bg-primary py-16 text-secondary lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-secondary/10 lg:order-2">
          <span className="font-editorial text-8xl text-secondary/20">Q</span>
        </div>
        <div className="flex flex-col gap-5 lg:order-1">
          <span className="w-fit rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-lime">
            Nuestra historia
          </span>
          <h2 className="font-editorial text-3xl leading-tight sm:text-4xl">
            No vendemos más productos saludables. Vendemos menos fricción.
          </h2>
          <p className="max-w-md leading-relaxed text-secondary/75">
            QuickBite nació para resolver la fragmentación de la compra
            saludable: snacks en una app, café de especialidad en otra,
            orgánicos en el supermercado de siempre. Centralizamos todo en
            una sola experiencia, curada y sin fricción.
          </p>
          <Button asChild variant="accent" size="md" className="w-fit">
            <Link href="/sobre-nosotros" className="flex items-center gap-1.5">
              Conoce nuestra curaduría <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export { EditorialSection };
