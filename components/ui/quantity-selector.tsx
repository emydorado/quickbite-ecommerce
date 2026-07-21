"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  const decrement = () => onChange(Math.max(min, quantity - 1));
  const increment = () => onChange(Math.min(max, quantity + 1));

  return (
    <div
      className={cn(
        "inline-flex h-11 items-center rounded-full border border-border bg-secondary",
        className
      )}
      role="group"
      aria-label="Cantidad"
    >
      <button
        type="button"
        onClick={decrement}
        disabled={quantity <= min}
        aria-label="Reducir cantidad"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary-subtle disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Minus size={16} strokeWidth={2.5} />
      </button>
      <span className="w-8 text-center text-base font-medium tabular-nums text-neutral">
        {quantity}
      </span>
      <button
        type="button"
        onClick={increment}
        disabled={quantity >= max}
        aria-label="Aumentar cantidad"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary-subtle disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Plus size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export { QuantitySelector };
