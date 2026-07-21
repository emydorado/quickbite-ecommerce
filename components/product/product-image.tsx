import Image from "next/image";
import { ProductImagePlaceholder } from "./product-image-placeholder";
import { cn } from "@/lib/utils/cn";

export interface ProductImageProps {
  src?: string;
  alt: string;
  fallbackIcon: string;
  seed: number;
  className?: string;
  sizes?: string;
}

/**
 * Real product/category photography where we have it, falling back to the
 * on-brand gradient placeholder where we don't. Photos are shared per
 * category (not shot per-SKU), which is why several products show the same
 * image, until real product photography exists.
 */
function ProductImage({
  src,
  alt,
  fallbackIcon,
  seed,
  className,
  sizes = "(min-width: 1024px) 20vw, 45vw",
}: ProductImageProps) {
  if (!src) {
    return (
      <ProductImagePlaceholder
        accentIcon={fallbackIcon}
        seed={seed}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-lg bg-primary-subtle",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

export { ProductImage };
