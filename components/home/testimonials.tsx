import { Star } from "lucide-react";
import { products } from "@/lib/data/products";

function pickTestimonials() {
  const picks = [
    { productIndex: 8, reviewIndex: 0 },
    { productIndex: 15, reviewIndex: 0 },
    { productIndex: 40, reviewIndex: 0 },
  ];
  return picks
    .map(({ productIndex, reviewIndex }) => {
      const product = products[productIndex];
      const review = product?.reviews[reviewIndex];
      return review ? { review, productTitle: product.title } : null;
    })
    .filter((t): t is { review: (typeof products)[number]["reviews"][number]; productTitle: string } => t !== null);
}

function Testimonials() {
  const testimonials = pickTestimonials();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-10 flex flex-col gap-2 text-center">
        <h2 className="font-editorial text-3xl text-primary sm:text-4xl">
          Gente que ya resolvió su despensa
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {testimonials.map(({ review, productTitle }) => (
          <figure
            key={review.id}
            className="flex flex-col gap-4 rounded-xl border border-border bg-white/50 p-6"
          >
            <div className="flex gap-0.5 text-orange">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <blockquote className="text-sm leading-relaxed text-neutral/75">
              “{review.comment}”
            </blockquote>
            <figcaption className="mt-auto text-sm font-medium text-neutral">
              {review.author}
              <span className="block text-xs font-normal text-neutral/50">
                Compró {productTitle}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export { Testimonials };
