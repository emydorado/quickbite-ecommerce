import type { CategoryDefinition } from "./types";

export const categories: CategoryDefinition[] = [
  {
    slug: "frutas-y-verduras",
    name: "Frutas y verduras",
    shortDescription: "Frescura de temporada, seleccionada a mano.",
    accentIcon: "Apple",
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
