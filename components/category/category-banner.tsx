"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface CategoryBannerProps {
  slides: { headline: string; subtext: string }[];
  image: string;
}

function CategoryBanner({ slides, image }: CategoryBannerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  const active = slides[index];

  return (
    <div className="relative overflow-hidden bg-primary">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-40 max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-1.5"
          >
            <p className="font-editorial text-2xl text-secondary sm:text-3xl">
              {active.headline}
            </p>
            <p className="text-sm text-secondary/70 sm:text-base">
              {active.subtext}
            </p>
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-1.5 sm:right-6 lg:right-8">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ver promoción ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-5 bg-lime" : "w-1.5 bg-secondary/30"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { CategoryBanner };
