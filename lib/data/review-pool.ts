import type { ProductReview } from "./types";

interface ReviewTemplate {
  author: string;
  rating: 4 | 5;
  comment: (productTitle: string) => string;
  date: string;
}

/**
 * A rotating pool of review voices. Templates are combined per-product via
 * makeReviews() so copy stays on-brand (warm, specific, never clinical)
 * without hand-authoring hundreds of one-off reviews.
 */
const pool: ReviewTemplate[] = [
  {
    author: "Mariana R.",
    rating: 5,
    comment: (p) => `Pedí ${p} sin muchas expectativas y ahora es parte fija de mi carrito. Llega rapidísimo.`,
    date: "2026-06-02",
  },
  {
    author: "Santiago M.",
    rating: 5,
    comment: (p) => `${p} sabe a lo que promete la descripción, nada de sorpresas raras. Voy a repetir.`,
    date: "2026-05-18",
  },
  {
    author: "Camila V.",
    rating: 4,
    comment: (p) => `Buena relación calidad-precio. ${p} no es perfecto pero cumple bien para el día a día.`,
    date: "2026-04-27",
  },
  {
    author: "Andrés F.",
    rating: 5,
    comment: (p) => `Ya va mi tercera compra de ${p}. Se nota que hay curaduría real detrás del catálogo.`,
    date: "2026-06-11",
  },
  {
    author: "Valentina G.",
    rating: 4,
    comment: (p) => `Me gustó mucho ${p}, el empaque llegó perfecto y el sabor es honesto.`,
    date: "2026-03-30",
  },
  {
    author: "Juan Pablo T.",
    rating: 5,
    comment: (p) => `Entreno seguido y ${p} se volvió parte de mi rutina semanal. Recompra en un clic, como prometen.`,
    date: "2026-05-05",
  },
  {
    author: "Laura D.",
    rating: 5,
    comment: (p) => `Lo que más valoro es que ${p} no viene con quince sellos gritando. La info justa y clara.`,
    date: "2026-02-14",
  },
  {
    author: "Felipe A.",
    rating: 4,
    comment: (p) => `${p} llegó un día después de lo esperado, pero el producto en sí vale la pena.`,
    date: "2026-01-22",
  },
  {
    author: "Isabella C.",
    rating: 5,
    comment: (p) => `Reemplazó algo que compraba en tres tiendas distintas. ${p} es justo lo que buscaba.`,
    date: "2026-06-19",
  },
  {
    author: "Daniel O.",
    rating: 4,
    comment: (p) => `Buen producto. ${p} podría venir en presentación más grande, pero seguro vuelvo a pedir.`,
    date: "2026-03-08",
  },
];

export function makeReviews(productTitle: string, seed: number): ProductReview[] {
  const count = 3 + (seed % 2); // 3 or 4 reviews per product
  const reviews: ProductReview[] = [];
  for (let i = 0; i < count; i++) {
    const template = pool[(seed + i * 3) % pool.length];
    reviews.push({
      id: `rev-${seed}-${i}`,
      author: template.author,
      rating: template.rating,
      comment: template.comment(productTitle),
      date: template.date,
    });
  }
  return reviews;
}

export function averageRating(reviews: ProductReview[]): number {
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return Math.round(avg * 10) / 10;
}
