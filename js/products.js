// Catálogo de productos — única fuente de verdad para precios y datos técnicos.
// Cambia aquí los precios/capacidades y se actualizan solos en toda la página
// (tarjetas, ficha técnica, carrusel, sección de precio y total del checkout).
const PRODUCTS = [
  {
    id: "basica",
    name: "Bolsa Bio Bags Básica",
    tier: "Básica",
    aroma: "Limón",
    aromaNote: "El carbón activado neutraliza los malos olores y libera un aroma cítrico a limón.",
    materialMain: "Carbón activado",
    materialNote: "Con neutralizador de olor a limón",
    capacity: "Hasta 50 L",
    usage: "Basura de cocina y uso general pesado",
    dimensions: "70 × 90 cm",
    dimensionsNote: "Medidas aproximadas",
    unitsPerPackage: 6,
    packagePrice: 180.00,
    benefits: [
      "Biodegradable: se descompone en meses bajo compostaje",
      "El carbón activado neutraliza los malos olores mientras la usas",
      "Reemplaza el plástico de un solo uso",
      "100% compostable y hecha a mano en Honduras",
    ],
    image: "assets/bolsa-basica-carbon-activado.jpg",
    imageAlt: "Bolsa Bio Bags Básica de carbón activado, color negro con el logo Biobags, junto a un barril de basura",
    detailImage: "assets/detalle-basica-carbon-activado.jpg",
    detailAlt: "Detalle de la textura de la bolsa Básica de carbón activado con el logo Biobags",
  },
  {
    id: "plus",
    name: "Bolsa Bio Bags Plus",
    tier: "Plus",
    aroma: "Café",
    aromaNote: "Hecha con residuos de cáscara de banano; su neutralizador libera un aroma suave a café.",
    materialMain: "Residuos de cáscara de banano",
    materialNote: "Con neutralizador de olor a café",
    capacity: "Hasta 30 L",
    usage: "Baños, oficinas y cestos pequeños",
    dimensions: "55 × 65 cm",
    dimensionsNote: "Medidas aproximadas",
    unitsPerPackage: 6,
    packagePrice: 150.00,
    benefits: [
      "Elaborada con residuos de cáscara de banano",
      "Biodegradable: se descompone en meses bajo compostaje",
      "Su neutralizador controla los malos olores con un aroma suave a café",
      "100% compostable y hecha a mano en Honduras",
    ],
    image: "assets/bolsa-plus-cascara-platano.jpg",
    imageAlt: "Bolsa Bio Bags Plus elaborada con residuos de cáscara de banano, color café claro con el logo Biobags, junto a un barril de basura",
    detailImage: "assets/detalle-plus-cascara-platano.jpg",
    detailAlt: "Detalle de la textura de la bolsa Plus hecha con residuos de cáscara de banano y el logo Biobags",
  },
];

// Cantidades sugeridas de paquetes (cada paquete = unitsPerPackage bolsas).
const PACKAGE_OPTIONS = [1, 2, 3, 5];

// Precio (en lempiras) de una bolsa plástica convencional, para la comparación
// en la sección de precio. Déjalo en null para ocultar esa fila hasta tener un
// dato real; ej: CONVENTIONAL_BAG_PRICE = 8.00
const CONVENTIONAL_BAG_PRICE = null;

if (typeof module !== "undefined") {
  module.exports = { PRODUCTS, PACKAGE_OPTIONS, CONVENTIONAL_BAG_PRICE };
}
