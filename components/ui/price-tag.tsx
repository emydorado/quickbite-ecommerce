import { cn } from "@/lib/utils/cn";

export interface PriceTagProps {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
};

function PriceTag({ price, compareAtPrice, size = "md", className }: PriceTagProps) {
  const isOnSale = typeof compareAtPrice === "number" && compareAtPrice > price;

  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className={cn("font-semibold text-primary", sizeClasses[size])}>
        {formatter.format(price)}
      </span>
      {isOnSale && (
        <span className="text-sm text-neutral/50 line-through">
          {formatter.format(compareAtPrice)}
        </span>
      )}
    </span>
  );
}

export { PriceTag };
