// Catálogo de productos — única fuente de verdad para precios y datos técnicos.
// Cambia aquí los precios/capacidades y se actualizan solos en toda la página
// (carrusel de portada, comparación Básica vs Plus y total del checkout).
const PRODUCTS = [
  {
    id: "basica",
    name: "Bolsa Bio Bags Básica",
    tier: "Básica",
    tagline: "Para la basura pesada de todos los días",
    aroma: "Limón",
    aromaNote: "El carbón activado atrapa el mal olor y deja un aroma suave a limón.",
    materialMain: "Carbón activado",
    materialShort: "Carbón activado",
    capacity: "Hasta 50 L",
    usage: "Cocina y botes grandes",
    mainBenefit: "Más grande y controla el mal olor",
    strength: "Aguanta restos de comida y basura pesada",
    dimensions: "70 × 90 cm",
    degradation: "Meses, en compostaje",
    unitsPerPackage: 6,
    packagePrice: 180.00,
    stage: "lime",
    image: "assets/bolsa-basica.webp",
    imageAlt: "Bolsa Bio Bags Básica de carbón activado, color negro, con su rollo y el logo Biobags",
    detailImage: "assets/detalle-basica-carbon-activado.jpg",
    detailAlt: "Acercamiento a la textura de la bolsa Básica de carbón activado",
  },
  {
    id: "plus",
    name: "Bolsa Bio Bags Plus",
    tier: "Plus",
    tagline: "Hecha con cáscara de banano",
    aroma: "Café",
    aromaNote: "Hecha con residuos de cáscara de banano. Deja un aroma suave a café.",
    materialMain: "Residuos de cáscara de banano",
    materialShort: "Cáscara de banano",
    capacity: "Hasta 30 L",
    usage: "Baño, oficina y botes pequeños",
    mainBenefit: "Aprovecha un residuo agrícola",
    strength: "Para basura ligera y seca",
    dimensions: "55 × 65 cm",
    degradation: "Meses, en compostaje",
    unitsPerPackage: 6,
    packagePrice: 150.00,
    stage: "cream",
    image: "assets/bolsa-plus.webp",
    imageAlt: "Bolsa Bio Bags Plus de cáscara de banano, color amarillo, con su rollo y el logo Biobags",
    detailImage: "assets/detalle-plus.jpg",
    detailAlt: "Acercamiento a la textura de la bolsa Plus hecha con cáscara de banano",
  },
];

// Cantidades sugeridas de paquetes (cada paquete = unitsPerPackage bolsas).
const PACKAGE_OPTIONS = [1, 2, 3, 5];

if (typeof module !== "undefined") {
  module.exports = { PRODUCTS, PACKAGE_OPTIONS };
}
