import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium leading-none w-fit",
  {
    variants: {
      variant: {
        vegan: "bg-lime-subtle text-primary",
        "gluten-free": "bg-lime-subtle text-primary",
        organic: "bg-lime-subtle text-primary",
        "sugar-free": "bg-lime-subtle text-primary",
        bestseller: "bg-orange-subtle text-orange",
        new: "bg-orange text-secondary",
        neutral: "bg-primary-subtle text-primary",
        "out-of-stock": "bg-border text-neutral/60",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}

export { Badge, badgeVariants };
