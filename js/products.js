// Catálogo de productos — única fuente de verdad para precios y datos técnicos.
// Cambia aquí los precios/capacidades y se actualizan solos en toda la página.
const PRODUCTS = [
  {
    id: "basica",
    name: "Bolsa Bio Bags Básica",
    tier: "Básica",
    aroma: "Limón",
    aromaNote: "El carbón activado neutraliza los malos olores y libera un aroma cítrico a limón.",
    material: "Carbón activado + neutralizador de olor a limón",
    capacity: "Hasta 50 L — basura de cocina y uso general pesado",
    dimensions: "70 × 90 cm aprox.",
    unitsPerPackage: 6,
    packagePrice: 180.00,
    image: "assets/bolsa-grande.png",
    imageAlt: "Bolsa Bio Bags Básica de color negro junto a un barril, mostrando su tamaño y amarre con cintas",
  },
  {
    id: "plus",
    name: "Bolsa Bio Bags Plus",
    tier: "Plus",
    aroma: "Café",
    aromaNote: "Hecha con residuos de cáscara de banano; su neutralizador libera un aroma suave a café.",
    material: "Residuos de cáscara de banano + neutralizador de olor a café",
    capacity: "Hasta 30 L — baños, oficinas y cestos pequeños",
    dimensions: "55 × 65 cm aprox.",
    unitsPerPackage: 6,
    packagePrice: 150.00,
    image: "assets/bolsa-mediana.png",
    imageAlt: "Bolsa Bio Bags Plus de color negro junto a un rollo de bolsas de repuesto",
  },
];

if (typeof module !== "undefined") {
  module.exports = { PRODUCTS };
}
