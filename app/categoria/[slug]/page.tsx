import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { CategoryBanner } from "@/components/category/category-banner";
import { CategoryProductBrowser } from "@/components/category/category-product-browser";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.shortDescription,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);

  return (
    <>
      <CategoryBanner slides={category.banner} image={category.images[0]} />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <h1 className="font-editorial text-3xl text-primary sm:text-4xl">
          {category.name}
        </h1>
        <p className="mt-1 text-neutral/60">{category.shortDescription}</p>
      </div>
      <CategoryProductBrowser
        products={products}
        subcategories={category.subcategories}
      />
    </>
  );
}
