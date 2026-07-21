import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { BestsellerGrid } from "@/components/home/bestseller-grid";
import { ValueProps } from "@/components/home/value-props";
import { EditorialSection } from "@/components/home/editorial-section";
import { Testimonials } from "@/components/home/testimonials";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <BestsellerGrid />
      <ValueProps />
      <EditorialSection />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}
