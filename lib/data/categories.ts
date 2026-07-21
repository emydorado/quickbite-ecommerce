import type { CategoryDefinition } from "./types";

export const categories: CategoryDefinition[] = [
  {
    slug: "frutas-y-verduras",
    name: "Frutas y verduras",
    shortDescription: "Frescura de temporada, seleccionada a mano.",
    accentIcon: "Apple",
    images: [
      "/images/categories/frutas-y-verduras-1.jpg",
      "/images/categories/frutas-y-verduras-2.jpg",
    ],
    subcategories: ["Frutas", "Verduras", "Hierbas frescas"],
    banner: [
      {
        headline: "Cosecha de la semana",
        subtext: "Frutas y verduras recién llegadas de finca, sin intermediarios.",
      },
      {
        headline: "15% OFF en tu primera caja",
        subtext: "Arma tu propia selección de frutas y verduras orgánicas.",
      },
    ],
  },
  {
    slug: "snacks-saludables",
    name: "Snacks saludables",
    shortDescription: "Para el antojo de las 4pm, sin culpa.",
    accentIcon: "Cookie",
    images: ["/images/categories/snacks-saludables-1.jpg"],
    subcategories: ["Chips y horneados", "Galletas", "Palomitas"],
    banner: [
      {
        headline: "Nuevo: Galletas de almendra sin azúcar",
        subtext: "El crocante de siempre, sin azúcar refinada.",
      },
      {
        headline: "20% OFF en snacks QuickBite",
        subtext: "Válido esta semana en nuestra línea propia.",
      },
    ],
  },
  {
    slug: "snacks-proteicos",
    name: "Snacks proteicos",
    shortDescription: "Proteína real, en formato de bolsillo.",
    accentIcon: "Beef",
    images: ["/images/categories/snacks-proteicos-1.jpg"],
    subcategories: ["Barras", "Bites", "Jerky"],
    banner: [
      {
        headline: "Bestseller: Jerky de res artesanal",
        subtext: "20g de proteína, cero azúcares añadidos.",
      },
      {
        headline: "Lleva 3, paga 2 en barras proteicas",
        subtext: "Combina sabores, misma promoción.",
      },
    ],
  },
  {
    slug: "bebidas-saludables",
    name: "Bebidas saludables",
    shortDescription: "Hidratación con propósito.",
    accentIcon: "GlassWater",
    images: ["/images/categories/bebidas-saludables-1.jpg"],
    subcategories: ["Smoothies y aguas", "Kombucha", "Funcionales"],
    banner: [
      {
        headline: "Nuevo: Limonada alcalina",
        subtext: "Prensada en frío, lista para llevar.",
      },
      {
        headline: "10% OFF en tu segunda bebida",
        subtext: "Mezcla y combina entre toda la categoría.",
      },
    ],
  },
  {
    slug: "cafe-y-te",
    name: "Café y té",
    shortDescription: "Rituales pequeños, de especialidad.",
    accentIcon: "Coffee",
    images: ["/images/categories/cafe-y-te-1.jpg"],
    subcategories: ["Café en grano", "Café molido", "Té e infusiones"],
    banner: [
      {
        headline: "Origen del mes: Finca Los Cerezos",
        subtext: "Notas a panela y cítricos, tueste medio.",
      },
      {
        headline: "25% OFF en tu primera bolsa",
        subtext: "Café o té de especialidad, tú eliges.",
      },
    ],
  },
  {
    slug: "granolas-y-cereales",
    name: "Granolas y cereales",
    shortDescription: "El desayuno resuelto, cada mañana.",
    accentIcon: "Wheat",
    images: ["/images/categories/granolas-y-cereales-1.jpg"],
    subcategories: ["Granolas", "Cereales", "Avenas"],
    banner: [
      {
        headline: "QuickBite Granola Signature",
        subtext: "Nuestra receta insignia, horneada en lotes pequeños.",
      },
      {
        headline: "20% OFF en tu segunda granola",
        subtext: "Ideal para armar tu desayuno de la semana.",
      },
    ],
  },
  {
    slug: "semillas-y-frutos-secos",
    name: "Semillas y frutos secos",
    shortDescription: "Energía concentrada, sin procesar.",
    accentIcon: "Nut",
    images: ["/images/categories/semillas-y-frutos-secos-1.jpg"],
    subcategories: ["Frutos secos", "Semillas", "Mixes"],
    banner: [
      {
        headline: "Nuevo: Nueces de macadamia",
        subtext: "Cremosas, tostadas al punto justo.",
      },
      {
        headline: "15% OFF en mixes premium",
        subtext: "El snack de energía concentrada, más económico.",
      },
    ],
  },
  {
    slug: "mantequillas-naturales",
    name: "Mantequillas naturales",
    shortDescription: "Untables honestos, sin azúcar oculta.",
    accentIcon: "Sandwich",
    images: ["/images/categories/mantequillas-naturales-1.jpg"],
    subcategories: ["Maní", "Almendra", "Otras semillas"],
    banner: [
      {
        headline: "Bestseller: Mantequilla de maní natural",
        subtext: "Solo maní y una pizca de sal.",
      },
      {
        headline: "10% OFF en tu segundo frasco",
        subtext: "Combina sabores para toda la semana.",
      },
    ],
  },
  {
    slug: "despensa-organica",
    name: "Despensa orgánica",
    shortDescription: "Ingredientes base, cultivados con cuidado.",
    accentIcon: "Leaf",
    images: ["/images/categories/despensa-organica-1.jpg"],
    subcategories: ["Aceites", "Granos", "Endulzantes"],
    banner: [
      {
        headline: "Nuevo: Aceite de oliva extra virgen",
        subtext: "Primera prensada en frío, notas herbales.",
      },
      {
        headline: "20% OFF en tu despensa base",
        subtext: "Quinua, arroz integral y más, en oferta.",
      },
    ],
  },
  {
    slug: "suplementos-y-vitaminas",
    name: "Suplementos y vitaminas",
    shortDescription: "Lo esencial, sin vitrina de farmacia.",
    accentIcon: "Pill",
    images: ["/images/categories/suplementos-y-vitaminas-1.jpg"],
    subcategories: ["Vitaminas", "Minerales", "Bienestar diario"],
    banner: [
      {
        headline: "Nuevo: Colágeno hidrolizado",
        subtext: "Sin sabor, se disuelve en frío o caliente.",
      },
      {
        headline: "15% OFF en tu primer suplemento",
        subtext: "Lo esencial, sin rellenos innecesarios.",
      },
    ],
  },
  {
    slug: "proteina",
    name: "Proteína",
    shortDescription: "Para después del entreno, y del resto del día.",
    accentIcon: "Dumbbell",
    images: ["/images/categories/proteina-1.jpg"],
    subcategories: ["Whey", "Vegana", "Rendimiento"],
    banner: [
      {
        headline: "Bestseller: Proteína whey chocolate",
        subtext: "24g de proteína, textura suave.",
      },
      {
        headline: "20% OFF en tu segundo pote",
        subtext: "Whey, vegana o rendimiento, tú eliges.",
      },
    ],
  },
  {
    slug: "congelados-y-meal-prep",
    name: "Congelados y meal prep",
    shortDescription: "Comida real, lista cuando la necesitas.",
    accentIcon: "Soup",
    images: ["/images/categories/congelados-y-meal-prep-1.jpg"],
    subcategories: ["Bowls", "Congelados", "Desayunos"],
    banner: [
      {
        headline: "Nuevo: Bowl vegano de garbanzos y quinua",
        subtext: "Proteína vegetal completa, lista en minutos.",
      },
      {
        headline: "15% OFF en tu primer meal prep",
        subtext: "Comida real, lista cuando la necesitas.",
      },
    ],
  },
  {
    slug: "marca-quickbite",
    name: "Marca QuickBite",
    shortDescription: "Nuestra propia curaduría, de punta a punta.",
    accentIcon: "BadgeCheck",
    images: ["/images/categories/marca-quickbite-1.jpg"],
    subcategories: ["Snacks", "Bebidas", "Despensa"],
    banner: [
      {
        headline: "La curaduría QuickBite",
        subtext: "Nuestras propias recetas, desde el día uno.",
      },
      {
        headline: "20% OFF en tu primera compra QuickBite",
        subtext: "Empieza por nuestra línea propia.",
      },
    ],
  },
];
