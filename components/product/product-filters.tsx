"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import type { DietaryAttribute } from "@/lib/data/types";
import { cn } from "@/lib/utils/cn";

export interface PriceBucket {
  id: string;
  label: string;
  min: number;
  max: number;
}

export const priceBuckets: PriceBucket[] = [
  { id: "b1", label: "Menos de $10.000", min: 0, max: 10000 },
  { id: "b2", label: "$10.000 – $30.000", min: 10000, max: 30000 },
  { id: "b3", label: "$30.000 – $60.000", min: 30000, max: 60000 },
  { id: "b4", label: "Más de $60.000", min: 60000, max: Infinity },
];

const dietaryOptions: { id: DietaryAttribute; label: string }[] = [
  { id: "vegano", label: "Vegano" },
  { id: "sin-gluten", label: "Sin gluten" },
  { id: "sin-azucar", label: "Sin azúcar" },
  { id: "organico", label: "Orgánico" },
];

export interface ProductFiltersProps {
  selectedDietary: DietaryAttribute[];
  onDietaryChange: (value: DietaryAttribute[]) => void;
  selectedBuckets: string[];
  onBucketsChange: (value: string[]) => void;
  className?: string;
}

function FilterCheckbox({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-neutral/80">
      <Checkbox.Root
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-border bg-secondary transition-colors",
          checked && "border-primary bg-primary"
        )}
      >
        <Checkbox.Indicator>
          <Check size={13} strokeWidth={3} className="text-secondary" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label}
    </label>
  );
}

function ProductFilters({
  selectedDietary,
  onDietaryChange,
  selectedBuckets,
  onBucketsChange,
  className,
}: ProductFiltersProps) {
  const toggleDietary = (value: DietaryAttribute) => {
    onDietaryChange(
      selectedDietary.includes(value)
        ? selectedDietary.filter((v) => v !== value)
        : [...selectedDietary, value]
    );
  };

  const toggleBucket = (id: string) => {
    onBucketsChange(
      selectedBuckets.includes(id)
        ? selectedBuckets.filter((v) => v !== id)
        : [...selectedBuckets, id]
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-neutral">
          Estilo de vida
        </h3>
        <div className="flex flex-col">
          {dietaryOptions.map((option) => (
            <FilterCheckbox
              key={option.id}
              label={option.label}
              checked={selectedDietary.includes(option.id)}
              onCheckedChange={() => toggleDietary(option.id)}
            />
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-neutral">Precio</h3>
        <div className="flex flex-col">
          {priceBuckets.map((bucket) => (
            <FilterCheckbox
              key={bucket.id}
              label={bucket.label}
              checked={selectedBuckets.includes(bucket.id)}
              onCheckedChange={() => toggleBucket(bucket.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { ProductFilters, dietaryOptions };
