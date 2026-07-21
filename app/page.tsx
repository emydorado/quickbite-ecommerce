import { Hero } from "@/components/home/hero";
import { CategoryTicker } from "@/components/home/category-ticker";
import { BestsellerGrid } from "@/components/home/bestseller-grid";
import { ValueProps } from "@/components/home/value-props";
import { EditorialSection } from "@/components/home/editorial-section";
import { Testimonials } from "@/components/home/testimonials";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryTicker />
      <BestsellerGrid />
      <ValueProps />
      <EditorialSection />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}
