import type { DietaryAttribute, Product, ProductTag } from "./types";
import { makeReviews, averageRating } from "./review-pool";

interface RawProduct {
  title: string;
  brand: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  dietaryAttributes?: DietaryAttribute[];
  tags?: ProductTag[];
  price: number;
  compareAtPrice?: number;
  sizes?: string[];
  status?: "available" | "out-of-stock";
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function defineProduct(raw: RawProduct, seed: number): Product {
  const handle = slugify(raw.title);
  const sizes = raw.sizes ?? ["Único"];
  const variants = sizes.map((size, i) => ({
    id: `${handle}-v${i}`,
    title: size,
    price: raw.price + i * Math.round(raw.price * 0.35),
    compareAtPrice: raw.compareAtPrice ? raw.compareAtPrice + i * Math.round(raw.price * 0.35) : undefined,
    sku: `QB-${handle.toUpperCase().slice(0, 8)}-${i}`,
    available: raw.status !== "out-of-stock",
    inventory: raw.status === "out-of-stock" ? 0 : 24 + (seed % 40),
  }));
  const reviews = makeReviews(raw.title, seed);

  return {
    id: handle,
    handle,
    title: raw.title,
    brand: raw.brand,
    categorySlug: raw.categorySlug,
    shortDescription: raw.shortDescription,
    description: raw.description,
    dietaryAttributes: raw.dietaryAttributes ?? [],
    tags: raw.tags ?? [],
    variants,
    rating: averageRating(reviews),
    reviewCount: reviews.length,
    reviews,
    status: raw.status ?? "available",
    imageSeed: seed,
  };
}

const rawProducts: RawProduct[] = [
  // Frutas y verduras
  {
    title: "Aguacates Hass",
    brand: "Finca La Esperanza",
    categorySlug: "frutas-y-verduras",
    shortDescription: "Punto perfecto para hoy o para en dos días.",
    description:
      "Seleccionados uno por uno según su punto de maduración, para que siempre tengas uno listo. De fincas pequeñas del Eje Cafetero.",
    dietaryAttributes: ["vegano", "organico"],
    tags: ["bestseller"],
    price: 9900,
    sizes: ["Malla x4"],
  },
  {
    title: "Banano orgánico",
    brand: "Finca La Esperanza",
    categorySlug: "frutas-y-verduras",
    shortDescription: "Dulce, firme, sin químicos de maduración.",
    description:
      "Cultivado sin pesticidas y cosechado en su punto justo. El snack más simple que existe, resuelto bien.",
    dietaryAttributes: ["vegano", "sin-gluten", "organico"],
    price: 4900,
    sizes: ["Kg"],
  },
  {
    title: "Espinaca baby orgánica",
    brand: "Huerta Verde",
    categorySlug: "frutas-y-verduras",
    shortDescription: "Hojas tiernas, lavadas y listas para usar.",
    description:
      "Ideal para ensaladas, batidos o salteados rápidos. Cultivada en invernadero controlado, sin residuos que lavar dos veces.",
    dietaryAttributes: ["vegano", "sin-gluten", "organico"],
    price: 7500,
    sizes: ["Bolsa 200g"],
  },
  {
    title: "Tomates cherry orgánicos",
    brand: "Huerta Verde",
    categorySlug: "frutas-y-verduras",
    shortDescription: "Dulces, jugosos, de racimo.",
    description:
      "Cosechados en racimo para conservar frescura por más tiempo. Perfectos para picar solos o para tus bowls de la semana.",
    dietaryAttributes: ["vegano", "sin-gluten", "organico"],
    price: 8900,
    sizes: ["Bandeja 250g"],
  },

  // Snacks saludables
  {
    title: "Chips de plátano horneados",
    brand: "QuickBite",
    categorySlug: "snacks-saludables",
    shortDescription: "Crocantes, horneados, sin freír.",
    description:
      "Rodajas finas de plátano verde horneadas hasta el punto crocante justo, con una pizca de sal marina. Cero aceite añadido.",
    dietaryAttributes: ["vegano", "sin-gluten"],
    tags: ["bestseller"],
    price: 11900,
    sizes: ["120g"],
  },
  {
    title: "Barras de avena y coco",
    brand: "Campo Dulce",
    categorySlug: "snacks-saludables",
    shortDescription: "El snack de las 4pm, resuelto.",
    description:
      "Avena en hojuelas, coco tostado y miel, prensados en una barra que no se desmorona en la cartera. Endulzada de forma natural.",
    dietaryAttributes: ["vegano"],
    price: 9500,
    sizes: ["Caja x6"],
  },
  {
    title: "Palomitas de maíz orgánicas",
    brand: "Campo Dulce",
    categorySlug: "snacks-saludables",
    shortDescription: "Explotadas con aire, no con aceite.",
    description:
      "Maíz orgánico expandido por aire caliente, con mantequilla clarificada y sal marina en proporción justa. Sin glutamato ni saborizantes.",
    dietaryAttributes: ["sin-gluten", "organico"],
    price: 8900,
    sizes: ["90g"],
  },
  {
    title: "Galletas de almendra sin azúcar",
    brand: "Campo Dulce",
    categorySlug: "snacks-saludables",
    shortDescription: "Crujientes, con dulzor de dátil.",
    description:
      "Harina de almendra, mantequilla de coco y dátil como único endulzante. La textura crocante de una galleta clásica, sin azúcar refinada.",
    dietaryAttributes: ["vegano", "sin-gluten", "sin-azucar"],
    price: 13900,
    sizes: ["Paquete x8"],
  },

  // Snacks proteicos
  {
    title: "Jerky de res artesanal",
    brand: "Rancho Norte",
    categorySlug: "snacks-proteicos",
    shortDescription: "20g de proteína, cero azúcares añadidos.",
    description:
      "Res magra marinada y deshidratada lentamente, sin nitritos ni azúcar añadida. El snack de proteína que no sabe a suplemento.",
    dietaryAttributes: ["sin-gluten", "sin-azucar"],
    tags: ["bestseller"],
    price: 15900,
    sizes: ["50g"],
  },
  {
    title: "Barra proteica doble chocolate",
    brand: "QuickBite",
    categorySlug: "snacks-proteicos",
    shortDescription: "18g de proteína, textura de brownie.",
    description:
      "Proteína de suero, cacao real y un toque de sal marina. Se siente como postre, no como suplemento del gimnasio.",
    dietaryAttributes: ["sin-gluten"],
    tags: ["bestseller"],
    price: 10900,
    compareAtPrice: 12900,
    sizes: ["Unidad", "Caja x12"],
  },
  {
    title: "Bites proteicos de mantequilla de maní",
    brand: "Rancho Norte",
    categorySlug: "snacks-proteicos",
    shortDescription: "Bocados pequeños, 8g de proteína cada uno.",
    description:
      "Mantequilla de maní, proteína vegetal y avena, enrollados en bocados del tamaño justo para el antojo de media tarde.",
    dietaryAttributes: ["vegano", "sin-gluten"],
    price: 12500,
    sizes: ["Bolsa x8"],
  },
  {
    title: "Snack mix proteico picante",
    brand: "Rancho Norte",
    categorySlug: "snacks-proteicos",
    shortDescription: "Garbanzos y edamame tostados con especias.",
    description:
      "Garbanzos y edamame horneados con una mezcla de especias ahumadas. Crocante, picante, con 11g de proteína por porción.",
    dietaryAttributes: ["vegano", "sin-gluten"],
    price: 11500,
    sizes: ["100g"],
  },

  // Bebidas saludables
  {
    title: "Kombucha de jengibre",
    brand: "Fermenta",
    categorySlug: "bebidas-saludables",
    shortDescription: "Fermentada en pequeños lotes.",
    description:
      "Té fermentado con cultivo vivo, jengibre fresco y una carbonatación natural suave. Baja en azúcar, sin pasteurizar.",
    dietaryAttributes: ["vegano", "sin-gluten"],
    price: 8900,
    sizes: ["330ml"],
  },
  {
    title: "Agua de coco natural",
    brand: "Isla Verde",
    categorySlug: "bebidas-saludables",
    shortDescription: "100% fruta, sin azúcar añadida.",
    description:
      "Extraída de coco fresco, sin concentrados ni conservantes. Electrolitos naturales para reponer después de entrenar.",
    dietaryAttributes: ["vegano", "sin-gluten", "sin-azucar"],
    tags: ["bestseller"],
    price: 6900,
    sizes: ["500ml"],
  },
  {
    title: "Limonada alcalina",
    brand: "Fermenta",
    categorySlug: "bebidas-saludables",
    shortDescription: "Limón, jengibre y un toque de menta.",
    description:
      "Prensada en frío el mismo día del envío. Limón, jengibre y menta fresca, endulzada apenas con agave.",
    dietaryAttributes: ["vegano", "sin-gluten"],
    price: 9900,
    sizes: ["400ml"],
  },

  // Café y té
  {
    title: "Café de especialidad en grano",
    brand: "Finca Los Cerezos",
    categorySlug: "cafe-y-te",
    shortDescription: "Tueste medio, notas a panela y cítricos.",
    description:
      "Café de origen único, cultivado a más de 1,700 msnm y tostado en lotes pequeños cada semana. Perfecto para prensa francesa o V60.",
    dietaryAttributes: ["vegano", "sin-gluten"],
    tags: ["bestseller"],
    price: 28900,
    sizes: ["340g"],
  },
  {
    title: "Café de especialidad molido",
    brand: "Finca Los Cerezos",
    categorySlug: "cafe-y-te",
    shortDescription: "El mismo grano, listo para tu cafetera.",
    description:
      "Molienda media pensada para cafeteras de goteo. Mismo origen y tueste que nuestro café en grano, sin el paso extra.",
    dietaryAttributes: ["vegano", "sin-gluten"],
    price: 26900,
    sizes: ["340g"],
  },
  {
    title: "Té verde matcha ceremonial",
    brand: "Casa Matcha",
    categorySlug: "cafe-y-te",
    shortDescription: "Molido en piedra, grado ceremonial.",
    description:
      "Cultivado a la sombra y molido en piedra para conservar su color y dulzor natural. Ideal para batir tradicionalmente o en latte.",
    dietaryAttributes: ["vegano", "sin-gluten", "organico"],
    price: 34900,
    sizes: ["30g"],
  },
  {
    title: "Té de manzanilla orgánico",
    brand: "Casa Matcha",
    categorySlug: "cafe-y-te",
    shortDescription: "Flores enteras, sin aromatizantes.",
    description:
      "Flor de manzanilla entera, cultivada de forma orgánica y secada al aire. Sin aromatizantes artificiales ni polvo de relleno.",
    dietaryAttributes: ["vegano", "sin-gluten", "organico"],
    price: 16900,
    sizes: ["Caja x20 filtros"],
  },

  // Granolas y cereales
  {
    title: "Granola artesanal de cacao y almendra",
    brand: "QuickBite",
    categorySlug: "granolas-y-cereales",
    shortDescription: "Horneada en lotes pequeños, cada semana.",
    description:
      "Avena, almendra tostada y cacao real, horneados juntos hasta lograr grumos crocantes de verdad. Endulzada con miel de abeja.",
    dietaryAttributes: ["vegano"],
    tags: ["bestseller"],
    price: 19900,
    sizes: ["350g"],
  },
  {
    title: "Granola clásica de miel y nueces",
    brand: "Campo Dulce",
    categorySlug: "granolas-y-cereales",
    shortDescription: "La receta de toda la vida, bien hecha.",
    description:
      "Avena integral, nueces del país y miel de abeja pura. Sin aceites de palma ni jarabes de maíz.",
    dietaryAttributes: ["vegano"],
    price: 17900,
    sizes: ["350g"],
  },
  {
    title: "Cereal inflado de quinua",
    brand: "Huerta Verde",
    categorySlug: "granolas-y-cereales",
    shortDescription: "Ligero, crocante, sin azúcar añadida.",
    description:
      "Quinua real inflada por calor seco, sin jarabes ni glaseados. Un cereal que se sostiene crocante incluso con leche.",
    dietaryAttributes: ["vegano", "sin-gluten", "sin-azucar"],
    price: 15900,
    sizes: ["300g"],
  },

  // Semillas y frutos secos
  {
    title: "Mix de frutos secos premium",
    brand: "Rancho Norte",
    categorySlug: "semillas-y-frutos-secos",
    shortDescription: "Almendra, marañón, nuez y avellana.",
    description:
      "Una selección curada de los cuatro frutos secos que más se repiten en nuestro carrito. Tostados en seco, sin aceite ni sal añadida.",
    dietaryAttributes: ["vegano", "sin-gluten"],
    tags: ["bestseller"],
    price: 21900,
    sizes: ["250g"],
  },
  {
    title: "Almendras tostadas sin sal",
    brand: "Rancho Norte",
    categorySlug: "semillas-y-frutos-secos",
    shortDescription: "Tostadas en seco, así de simple.",
    description:
      "Almendras enteras tostadas sin aceite ni sal, para quien prefiere el sabor del fruto sin nada más encima.",
    dietaryAttributes: ["vegano", "sin-gluten", "sin-azucar"],
    price: 16900,
    sizes: ["200g"],
  },
  {
    title: "Semillas de chía orgánicas",
    brand: "Huerta Verde",
    categorySlug: "semillas-y-frutos-secos",
    shortDescription: "Para batidos, yogures o pudines.",
    description:
      "Semillas enteras, cultivadas de forma orgánica y empacadas al vacío para conservar sus ácidos grasos intactos.",
    dietaryAttributes: ["vegano", "sin-gluten", "organico"],
    price: 12900,
    sizes: ["300g"],
  },
  {
    title: "Nueces de macadamia",
    brand: "Rancho Norte",
    categorySlug: "semillas-y-frutos-secos",
    shortDescription: "Cremosas, tostadas al punto.",
    description:
      "Una de las nueces más difíciles de conseguir bien tostadas. Nosotros las probamos hasta encontrar el punto justo.",
    dietaryAttributes: ["vegano", "sin-gluten"],
    price: 27900,
    sizes: ["150g"],
  },

  // Mantequillas naturales
  {
    title: "Mantequilla de maní natural",
    brand: "Campo Dulce",
    categorySlug: "mantequillas-naturales",
    shortDescription: "Solo maní y una pizca de sal.",
    description:
      "Maní tostado y molido hasta lograr una textura cremosa, sin azúcar ni aceites hidrogenados añadidos. Se separa un poco, así de real es.",
    dietaryAttributes: ["vegano", "sin-gluten", "sin-azucar"],
    tags: ["bestseller"],
    price: 14900,
    sizes: ["Frasco 300g"],
  },
  {
    title: "Mantequilla de almendra cruda",
    brand: "Campo Dulce",
    categorySlug: "mantequillas-naturales",
    shortDescription: "Molida en frío, sabor limpio.",
    description:
      "Almendras crudas molidas en frío para conservar sus nutrientes. Un untable versátil, de tostadas a batidos.",
    dietaryAttributes: ["vegano", "sin-gluten", "sin-azucar"],
    price: 22900,
    sizes: ["Frasco 250g"],
  },
  {
    title: "Mantequilla de marañón",
    brand: "Campo Dulce",
    categorySlug: "mantequillas-naturales",
    shortDescription: "Suave, ligeramente dulce por naturaleza.",
    description:
      "Marañón tostado y molido despacio hasta lograr una textura sedosa, sin necesidad de azúcar añadida.",
    dietaryAttributes: ["vegano", "sin-gluten", "sin-azucar"],
    price: 24900,
    sizes: ["Frasco 250g"],
  },

  // Despensa orgánica
  {
    title: "Aceite de oliva extra virgen",
    brand: "Finca Mediterránea",
    categorySlug: "despensa-organica",
    shortDescription: "Primera prensada en frío.",
    description:
      "Aceituna cosechada y prensada el mismo día, sin refinar. Notas herbales, ideal para aderezar en crudo.",
    dietaryAttributes: ["vegano", "sin-gluten", "organico"],
    price: 32900,
    sizes: ["500ml"],
  },
  {
    title: "Quinua orgánica",
    brand: "Huerta Verde",
    categorySlug: "despensa-organica",
    shortDescription: "Grano completo, cultivo certificado.",
    description:
      "Quinua real de altiplano, lavada y lista para cocinar. La base perfecta para tus bowls de la semana.",
    dietaryAttributes: ["vegano", "sin-gluten", "organico"],
    price: 13900,
    sizes: ["500g"],
  },
  {
    title: "Miel de abeja pura",
    brand: "Finca La Esperanza",
    categorySlug: "despensa-organica",
    shortDescription: "Sin pasteurizar, sin mezclar.",
    description:
      "Miel cruda de apiarios pequeños, extraída en frío para conservar sus enzimas naturales. Un solo ingrediente: miel.",
    dietaryAttributes: ["sin-gluten", "organico"],
    tags: ["bestseller"],
    price: 19900,
    sizes: ["Frasco 400g"],
  },
  {
    title: "Arroz integral orgánico",
    brand: "Huerta Verde",
    categorySlug: "despensa-organica",
    shortDescription: "Grano entero, cultivo certificado.",
    description:
      "Arroz integral de cultivo orgánico certificado, con más fibra y sabor que el arroz blanco de siempre.",
    dietaryAttributes: ["vegano", "sin-gluten", "organico"],
    price: 11900,
    sizes: ["1kg"],
  },

  // Suplementos y vitaminas
  {
    title: "Multivitamínico diario",
    brand: "QuickBite Wellness",
    categorySlug: "suplementos-y-vitaminas",
    shortDescription: "Una cápsula, lo esencial del día.",
    description:
      "Una fórmula completa pensada para complementar (no reemplazar) una alimentación balanceada. Sin rellenos innecesarios.",
    dietaryAttributes: ["sin-gluten"],
    price: 58900,
    sizes: ["Caja x60 cápsulas"],
  },
  {
    title: "Omega-3 de algas",
    brand: "QuickBite Wellness",
    categorySlug: "suplementos-y-vitaminas",
    shortDescription: "Alternativa vegana al aceite de pescado.",
    description:
      "DHA y EPA extraídos de algas marinas, sin sabor a pescado ni eructos. Apto para quienes no consumen productos animales.",
    dietaryAttributes: ["vegano", "sin-gluten"],
    price: 74900,
    sizes: ["Caja x60 cápsulas"],
  },
  {
    title: "Magnesio bisglicinato",
    brand: "QuickBite Wellness",
    categorySlug: "suplementos-y-vitaminas",
    shortDescription: "Una forma de magnesio de fácil absorción.",
    description:
      "Magnesio quelado para mejor absorción y sin el efecto laxante de otras formas más económicas.",
    dietaryAttributes: ["sin-gluten"],
    price: 49900,
    sizes: ["Caja x90 cápsulas"],
  },
  {
    title: "Colágeno hidrolizado",
    brand: "QuickBite Wellness",
    categorySlug: "suplementos-y-vitaminas",
    shortDescription: "Sin sabor, se disuelve en frío o caliente.",
    description:
      "Péptidos de colágeno hidrolizado, sin sabor ni olor. Se mezcla en café, batidos o agua sin dejar grumos.",
    dietaryAttributes: ["sin-gluten", "sin-azucar"],
    tags: ["bestseller"],
    price: 68900,
    sizes: ["300g"],
  },

  // Proteína
  {
    title: "Proteína whey chocolate",
    brand: "QuickBite Wellness",
    categorySlug: "proteina",
    shortDescription: "24g de proteína, textura suave.",
    description:
      "Aislado de proteína de suero con cacao real, endulzado con stevia. Se disuelve bien incluso solo en agua.",
    dietaryAttributes: ["sin-gluten", "sin-azucar"],
    tags: ["bestseller"],
    price: 129900,
    compareAtPrice: 149900,
    sizes: ["900g"],
  },
  {
    title: "Proteína vegana vainilla",
    brand: "QuickBite Wellness",
    categorySlug: "proteina",
    shortDescription: "Mezcla de guisante y arroz.",
    description:
      "Proteína vegetal de guisante y arroz integral, con perfil completo de aminoácidos. Sabor suave a vainilla real.",
    dietaryAttributes: ["vegano", "sin-gluten", "sin-azucar"],
    price: 119900,
    sizes: ["900g"],
  },
  {
    title: "Creatina monohidratada",
    brand: "QuickBite Wellness",
    categorySlug: "proteina",
    shortDescription: "Micronizada, sin sabor.",
    description:
      "Creatina monohidratada micronizada para mejor disolución. Una cucharada al día, sin ceremonias.",
    dietaryAttributes: ["vegano", "sin-gluten", "sin-azucar"],
    price: 54900,
    sizes: ["300g"],
  },

  // Congelados y meal prep
  {
    title: "Bowl de pollo y vegetales",
    brand: "QuickBite Kitchen",
    categorySlug: "congelados-y-meal-prep",
    shortDescription: "Listo en 4 minutos de microondas.",
    description:
      "Pechuga de pollo, vegetales salteados y arroz integral, cocinados el mismo día y congelados en su punto. Sin conservantes.",
    dietaryAttributes: ["sin-gluten"],
    tags: ["bestseller"],
    price: 22900,
    sizes: ["400g"],
  },
  {
    title: "Bowl vegano de garbanzos y quinua",
    brand: "QuickBite Kitchen",
    categorySlug: "congelados-y-meal-prep",
    shortDescription: "Proteína vegetal completa, lista.",
    description:
      "Garbanzos, quinua y vegetales de temporada en una salsa ligera de tahini. Se calienta directo del congelador.",
    dietaryAttributes: ["vegano", "sin-gluten"],
    price: 21900,
    sizes: ["400g"],
  },
  {
    title: "Mix de frutos rojos congelados",
    brand: "QuickBite Kitchen",
    categorySlug: "congelados-y-meal-prep",
    shortDescription: "Fresa, mora y arándano, congelados en pico.",
    description:
      "Congelados en su punto máximo de maduración para conservar sabor y nutrientes. Perfectos para batidos instantáneos.",
    dietaryAttributes: ["vegano", "sin-gluten", "sin-azucar"],
    price: 16900,
    sizes: ["500g"],
  },
  {
    title: "Waffles proteicos congelados",
    brand: "QuickBite Kitchen",
    categorySlug: "congelados-y-meal-prep",
    shortDescription: "15g de proteína, directo del tostador.",
    description:
      "Waffles horneados con avena y proteína de suero, listos en dos minutos de tostador. El desayuno de los días sin tiempo.",
    dietaryAttributes: ["sin-gluten"],
    price: 18900,
    sizes: ["Caja x8"],
  },

  // Marca QuickBite
  {
    title: "QuickBite Granola Signature",
    brand: "QuickBite",
    categorySlug: "marca-quickbite",
    shortDescription: "Nuestra receta insignia, desde el día uno.",
    description:
      "La primera receta que desarrollamos como marca: avena, cacao, almendra y un toque de canela. La que probamos más veces hasta que quedó bien.",
    dietaryAttributes: ["vegano"],
    tags: ["bestseller", "nuevo"],
    price: 21900,
    sizes: ["350g"],
  },
  {
    title: "QuickBite Snack Mix de la casa",
    brand: "QuickBite",
    categorySlug: "marca-quickbite",
    shortDescription: "La mezcla que más se repite en los carritos.",
    description:
      "Una combinación curada de frutos secos, chips de plátano y semillas de calabaza tostadas. Ideal para tener siempre a la mano.",
    dietaryAttributes: ["vegano", "sin-gluten"],
    tags: ["nuevo"],
    price: 17900,
    sizes: ["200g"],
  },
  {
    title: "QuickBite Agua saborizada",
    brand: "QuickBite",
    categorySlug: "marca-quickbite",
    shortDescription: "Pepino y menta, sin azúcar.",
    description:
      "Agua infusionada con pepino y menta reales, sin azúcar ni edulcorantes artificiales. Refrescante de verdad.",
    dietaryAttributes: ["vegano", "sin-gluten", "sin-azucar"],
    tags: ["nuevo"],
    price: 5900,
    sizes: ["500ml"],
  },
  {
    title: "QuickBite Barra energética de dátil",
    brand: "QuickBite",
    categorySlug: "marca-quickbite",
    shortDescription: "Tres ingredientes, mucha energía.",
    description:
      "Dátiles, almendras y un toque de sal marina, prensados en una barra que se siente más a comida real que a suplemento.",
    dietaryAttributes: ["vegano", "sin-gluten", "organico"],
    tags: ["bestseller"],
    price: 8900,
    sizes: ["Unidad", "Caja x8"],
  },
];

export const products: Product[] = rawProducts.map((raw, index) =>
  defineProduct(raw, index + 1)
);

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((product) => product.handle === handle);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getBestsellers(): Product[] {
  return products.filter((product) => product.tags.includes("bestseller"));
}

export function getNewArrivals(): Product[] {
  return products.filter((product) => product.tags.includes("nuevo"));
}
