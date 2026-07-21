"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  GlassWater,
  Wheat,
  Pill,
  Apple,
  Coffee,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { PriceTag } from "@/components/ui/price-tag";

interface SwiperSlide {
  title: string;
  price: number;
  icon: LucideIcon;
  bg: string;
}

const slides: SwiperSlide[] = [
  {
    title: "Agua de coco natural",
    price: 6900,
    icon: GlassWater,
    bg: "bg-lime-subtle",
  },
  {
    title: "Granola artesanal",
    price: 21900,
    icon: Wheat,
    bg: "bg-orange-subtle",
  },
  {
    title: "Colágeno hidrolizado",
    price: 68900,
    icon: Pill,
    bg: "bg-primary-subtle",
  },
  {
    title: "Aguacates Hass",
    price: 9900,
    icon: Apple,
    bg: "bg-lime-subtle",
  },
  {
    title: "Café de especialidad",
    price: 28900,
    icon: Coffee,
    bg: "bg-orange-subtle",
  },
];

function HeroProductSwiper() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const active = slides[index];

  const goTo = (next: number, dir: 1 | -1) => {
    setDirection(dir);
    setIndex((next + slides.length) % slides.length);
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-5 lg:w-[26rem]">
      <div
        className={cn(
          "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl transition-colors duration-500 ease-out",
          active.bg
        )}
        style={{ perspective: "1200px" }}
      >
        <button
          type="button"
          onClick={() => goTo(index - 1, -1)}
          aria-label="Producto anterior"
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-secondary/80 text-primary shadow-sm hover:bg-secondary"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1, 1)}
          aria-label="Producto siguiente"
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-secondary/80 text-primary shadow-sm hover:bg-secondary"
        >
          ›
        </button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ rotateY: direction * 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: direction * -90, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="flex flex-col items-center gap-4"
          >
            <active.icon
              size={96}
              strokeWidth={1.1}
              className="text-primary/70"
              aria-hidden
            />
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="font-editorial text-2xl text-primary">
                {active.title}
              </p>
              <PriceTag price={active.price} size="lg" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-2" role="tablist" aria-label="Productos destacados">
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={slide.title}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index ? "w-6 bg-primary" : "w-2 bg-primary/25"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export { HeroProductSwiper };
