import { Layers, Sparkles, Zap, Wind } from "lucide-react";

const pillars = [
  {
    icon: Layers,
    title: "Centralización",
    description:
      "Todo el universo de alimentación saludable, en un solo carrito.",
  },
  {
    icon: Sparkles,
    title: "Curaduría",
    description:
      "No es un catálogo infinito. Es una selección de calidad, revisada por nosotros.",
  },
  {
    icon: Zap,
    title: "Velocidad",
    description:
      "De la necesidad a la compra, en el menor número de pasos posible.",
  },
  {
    icon: Wind,
    title: "Calma",
    description:
      "Una experiencia que no abruma. Nada de sellos gritando por atención.",
  },
];

function ValueProps() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="flex flex-col gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-subtle text-primary">
              <pillar.icon size={22} strokeWidth={1.75} />
            </span>
            <h3 className="text-lg font-semibold text-neutral">
              {pillar.title}
            </h3>
            <p className="text-sm leading-relaxed text-neutral/60">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export { ValueProps };
