export type DietaryAttribute = "vegano" | "sin-gluten" | "sin-azucar" | "organico";

export type ProductTag = "bestseller" | "nuevo";

export interface CategoryDefinition {
  slug: string;
  name: string;
  shortDescription: string;
  accentIcon: string;
  subcategories: string[];
  banner: {
    headline: string;
    subtext: string;
  }[];
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  available: boolean;
  inventory: number;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  brand: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  dietaryAttributes: DietaryAttribute[];
  tags: ProductTag[];
  subcategory: string;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  status: "available" | "out-of-stock";
  imageSeed: number;
}
