"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { PriceTag } from "@/components/ui/price-tag";

import teMatcha from "@/public/products/matcha/te-matcha.png";
import matchaHoja1 from "@/public/products/matcha/matcha-hoja-1.png";
import matchaHoja2 from "@/public/products/matcha/matcha-hoja-2.png";
import matchaHoja3 from "@/public/products/matcha/matcha-hoja-3.png";
import matchaHoja4 from "@/public/products/matcha/matcha-hoja-4.png";
import matchaHoja5 from "@/public/products/matcha/matcha-hoja-5.png";
import matchaPolvo1 from "@/public/products/matcha/matcha-polvo-1.png";
import matchaPolvo2 from "@/public/products/matcha/matcha-polvo-2.png";

import cerealBox from "@/public/products/granola/cereal.png";
import cereal1 from "@/public/products/granola/cereal-1.png";
import cereal2 from "@/public/products/granola/cereal-2.png";
import cereal3 from "@/public/products/granola/cereal-3.png";
import cereal4 from "@/public/products/granola/cereal-4.png";
import cereal6 from "@/public/products/granola/cereal-6.png";
import cereal7 from "@/public/products/granola/cereal-7.png";

import pineappleMain from "@/public/products/pineapple/pineapple.png";
import pineapple1 from "@/public/products/pineapple/pineapple-1.png";
import pineapple2 from "@/public/products/pineapple/pineapple-2.png";
import pineapple3 from "@/public/products/pineapple/pineapple-3.png";
import pineappleHoja1 from "@/public/products/pineapple/pineapple-hoja-1.png";
import pineappleHoja3 from "@/public/products/pineapple/pineapple-hoja-3.png";
import pineappleHoja5 from "@/public/products/pineapple/pineapple-hoja-5.png";

import supplementMain from "@/public/products/supplement/supplement.png";
import pill1 from "@/public/products/supplement/pill-1.png";
import pill2 from "@/public/products/supplement/pill-2.png";
import pill3 from "@/public/products/supplement/pill-3.png";
import pill4 from "@/public/products/supplement/pill-4.png";
import pill5 from "@/public/products/supplement/pill-5.png";

/** Premium expo-out easing — the "sensación" the reference brands share. */
const EASE = [0.16, 1, 0.3, 1] as const;
const AUTOPLAY_MS = 6000;
const TRANSITION_S = 0.8;

interface FloatingElement {
  src: StaticImageData;
  width: number;
  className: string;
  rotate: number;
  delay: number;
  floatDuration: number;
  soft?: boolean;
}

interface HeroProduct {
  id: string;
  name: string;
  price: number;
  bg: string;
  mainImage: StaticImageData;
  mainImageHeight: string;
  floating: FloatingElement[];
}

const products: HeroProduct[] = [
  {
    id: "matcha",
    name: "Té Matcha",
    price: 15900,
    bg: "bg-lime-subtle",
    mainImage: teMatcha,
    mainImageHeight: "h-[320px] sm:h-[380px] lg:h-[420px]",
    floating: [
      { src: matchaPolvo1, width: 108, className: "bottom-[8%] right-[6%]", rotate: -6, delay: 0.1, floatDuration: 5.5 },
      { src: matchaPolvo2, width: 88, className: "top-[14%] right-[4%]", rotate: 8, delay: 0.32, floatDuration: 4.5 },
      { src: matchaHoja1, width: 56, className: "top-[6%] left-[8%]", rotate: -18, delay: 0.18, floatDuration: 4 },
      { src: matchaHoja2, width: 60, className: "top-[30%] left-[2%]", rotate: 24, delay: 0.44, floatDuration: 5, soft: true },
      { src: matchaHoja3, width: 70, className: "bottom-[22%] left-[6%]", rotate: -10, delay: 0.06, floatDuration: 4.8 },
      { src: matchaHoja4, width: 50, className: "bottom-[4%] left-[26%]", rotate: 30, delay: 0.5, floatDuration: 4.2 },
      { src: matchaHoja5, width: 64, className: "top-[2%] right-[24%]", rotate: 12, delay: 0.26, floatDuration: 5.2, soft: true },
    ],
  },
  {
    id: "granola",
    name: "Cereal de Granola",
    price: 19900,
    bg: "bg-orange-subtle",
    mainImage: cerealBox,
    mainImageHeight: "h-[300px] sm:h-[360px] lg:h-[400px]",
    floating: [
      { src: cereal1, width: 90, className: "top-[4%] left-[4%]", rotate: -8, delay: 0.12, floatDuration: 5, soft: true },
      { src: cereal2, width: 54, className: "top-[10%] right-[8%]", rotate: 14, delay: 0.34, floatDuration: 4.2 },
      { src: cereal3, width: 46, className: "top-[38%] left-[0%]", rotate: -20, delay: 0.06, floatDuration: 4.6 },
      { src: cereal4, width: 50, className: "bottom-[30%] right-[2%]", rotate: 10, delay: 0.46, floatDuration: 5.4 },
      { src: cereal6, width: 78, className: "bottom-[6%] right-[10%]", rotate: -6, delay: 0.2, floatDuration: 4.8 },
      { src: cereal7, width: 48, className: "bottom-[10%] left-[10%]", rotate: 22, delay: 0.5, floatDuration: 4.4 },
    ],
  },
  {
    id: "pineapple",
    name: "Piña",
    price: 8900,
    bg: "bg-lime-subtle",
    mainImage: pineappleMain,
    mainImageHeight: "h-[340px] sm:h-[400px] lg:h-[440px]",
    floating: [
      { src: pineapple1, width: 74, className: "bottom-[10%] left-[4%]", rotate: -12, delay: 0.08, floatDuration: 5 },
      { src: pineapple2, width: 68, className: "bottom-[6%] right-[6%]", rotate: 16, delay: 0.36, floatDuration: 4.6 },
      { src: pineapple3, width: 54, className: "top-[36%] right-[2%]", rotate: -10, delay: 0.22, floatDuration: 4.9 },
      { src: pineappleHoja1, width: 40, className: "top-[4%] left-[10%]", rotate: 20, delay: 0.14, floatDuration: 4.3 },
      { src: pineappleHoja3, width: 36, className: "top-[2%] right-[20%]", rotate: -16, delay: 0.44, floatDuration: 5.1, soft: true },
      { src: pineappleHoja5, width: 44, className: "top-[20%] left-[0%]", rotate: 8, delay: 0.28, floatDuration: 4.7, soft: true },
    ],
  },
  {
    id: "supplement",
    name: "Suplementos",
    price: 58900,
    bg: "bg-primary-subtle",
    mainImage: supplementMain,
    mainImageHeight: "h-[280px] sm:h-[340px] lg:h-[380px]",
    floating: [
      { src: pill1, width: 44, className: "top-[6%] left-[6%]", rotate: -30, delay: 0.1, floatDuration: 4.4 },
      { src: pill2, width: 40, className: "top-[8%] right-[8%]", rotate: 24, delay: 0.4, floatDuration: 5 },
      { src: pill3, width: 34, className: "bottom-[28%] left-[0%]", rotate: 12, delay: 0.24, floatDuration: 4.6 },
      { src: pill4, width: 38, className: "bottom-[8%] right-[4%]", rotate: -18, delay: 0.5, floatDuration: 5.3 },
      { src: pill5, width: 32, className: "top-[36%] right-[0%]", rotate: 30, delay: 0.16, floatDuration: 4.2 },
    ],
  },
];

function HeroProductSwiper() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const active = products[index];

  const goTo = useCallback((nextIndex: number, dir: 1 | -1) => {
    setDirection(dir);
    setIndex((nextIndex + products.length) % products.length);
  }, []);

  const restartAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % products.length);
    }, AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    restartAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartAutoplay]);

  const handleArrow = (dir: 1 | -1) => {
    goTo(index + dir, dir);
    restartAutoplay();
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6 lg:w-[28rem]">
      <div
        className={cn(
          "relative flex h-[380px] w-full items-center justify-center overflow-hidden rounded-2xl transition-colors duration-500 ease-out sm:h-[440px] lg:h-[500px]",
          active.bg
        )}
        style={{ perspective: "1400px" }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active.id}
            custom={direction}
            initial={{
              opacity: 0,
              rotateY: direction * 42,
              rotateZ: direction * -4,
              scale: 0.86,
              filter: "blur(10px)",
              x: direction * 36,
            }}
            animate={{
              opacity: 1,
              rotateY: 0,
              rotateZ: 0,
              scale: 1,
              filter: "blur(0px)",
              x: 0,
            }}
            exit={{
              opacity: 0,
              rotateY: direction * -42,
              rotateZ: direction * 4,
              scale: 0.86,
              filter: "blur(10px)",
              x: direction * -36,
            }}
            transition={{ duration: TRANSITION_S, ease: EASE }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Idle float/breathe loop, independent of the slide transition above */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, -1.2, 0, 1.2, 0],
                scale: [1, 1.015, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center"
            >
              <Image
                src={active.mainImage}
                alt={active.name}
                className={cn(
                  "w-auto object-contain drop-shadow-xl",
                  active.mainImageHeight
                )}
                priority={index === 0}
              />
            </motion.div>

            {active.floating.map((el, i) => (
              <motion.div
                key={`${active.id}-float-${i}`}
                initial={{ opacity: 0, scale: 0.4, rotate: el.rotate - 25 }}
                animate={{ opacity: el.soft ? 0.55 : 1, scale: 1, rotate: el.rotate }}
                exit={{ opacity: 0, scale: 0.4, rotate: el.rotate + 25 }}
                transition={{
                  duration: 0.6,
                  delay: el.delay,
                  ease: EASE,
                }}
                className={cn("absolute", el.className)}
              >
                <motion.div
                  animate={{
                    y: [0, -7, 0],
                    rotate: [el.rotate - 4, el.rotate + 4, el.rotate - 4],
                  }}
                  transition={{
                    duration: el.floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: el.delay,
                  }}
                >
                  <Image
                    src={el.src}
                    alt=""
                    width={el.width}
                    className={cn("h-auto object-contain", el.soft && "blur-[0.5px]")}
                    aria-hidden
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <p className="font-editorial text-2xl text-primary">{active.name}</p>
        <PriceTag price={active.price} size="lg" />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => handleArrow(-1)}
          aria-label="Producto anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary-subtle"
        >
          <ChevronLeft size={20} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={() => handleArrow(1)}
          aria-label="Producto siguiente"
          className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary-subtle"
        >
          <ChevronRight size={20} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}

export { HeroProductSwiper };
