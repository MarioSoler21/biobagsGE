# Bio Bags — tienda

Sitio de una página para vender las bolsas Bio Bags en dos líneas, empacadas de 6 en 6.

## Catálogo

| Producto | Material | Aroma | Capacidad | Contenido | Precio de paquete |
|---|---|---|---|---|---|
| Bolsa Básica | Carbón activado + neutralizador de olor | Limón | hasta 50 L | 6 bolsas | L 180.00 |
| Bolsa Plus | Residuos de cáscara de banano + neutralizador de olor | Café | hasta 30 L | 6 bolsas | L 150.00 |

Los precios son un punto de partida — ajústalos en `js/products.js` según tus costos reales.

## Arquitectura

Separación por responsabilidad, sin frameworks ni build step:

```
biobags/
├── index.html        # Estructura/markup de la página (sin lógica ni estilos inline)
├── css/
│   └── styles.css    # Todos los estilos (paleta y tipografía definidas como variables en :root)
├── js/
│   ├── utils.js      # Formato de moneda (fmt) e iconos SVG en línea (icon)
│   ├── products.js   # Datos del catálogo (única fuente de verdad: precios, material, capacidad, beneficios)
│   ├── carousel.js   # Carrusel de presentaciones (se genera desde products.js)
│   └── app.js        # Selector de bolsa, ficha técnica, sección de precio y checkout
├── assets/           # Fotos de producto, detalles del material, logo e iconos
├── server.js         # Servidor estático mínimo (sin dependencias) para correr en local
└── package.json
```

`products.js` es la única fuente de verdad: si cambias un precio, una capacidad o un beneficio ahí, se refleja automáticamente en el selector, la ficha técnica, el carrusel, la sección de precio y el total del checkout — no hay datos duplicados en el HTML.

## Secciones de la página (en orden)

1. **Portada** — mensaje principal, subtítulo ambiental y foto del producto.
2. **Impacto ambiental** ("¿Por qué importa este proyecto?").
3. **Presentaciones** — carrusel con la foto completa y el detalle del material de cada línea.
4. **Productos y ficha técnica** — selector de bolsa + ficha con material, capacidad, medidas, aroma, contenido, origen, beneficios ambientales, presentaciones y precio.
5. **Precio** — precio por bolsa, qué paga el aporte y comparación con la bolsa plástica común.
6. **Compra** — checkout rápido.
7. **Cómo funciona** — al final, después de todo el producto y el impacto.

## Contenido que puedes ajustar

- **Más fotos en el carrusel:** agrega imágenes a `assets/` y, en `js/carousel.js`, suma una entrada al arreglo `slides`.
- **Comparación de precio:** en `js/products.js`, pon el precio de una bolsa plástica convencional en `CONVENTIONAL_BAG_PRICE` (ej. `8.00`) y la fila "Precio por bolsa" aparece en la tabla comparativa de la sección de precio. Mientras sea `null`, la fila no se muestra.
- **Cantidades sugeridas:** `PACKAGE_OPTIONS` en `js/products.js`.

## Correr en local

Con Node.js instalado (no requiere `npm install`, el servidor no tiene dependencias):

```bash
cd biobags
node server.js
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

Alternativa con Python:

```bash
cd biobags
python -m http.server 3000
```

## Conectar pagos reales

El botón "Continuar mi aporte" hoy solo muestra una confirmación local (`js/app.js`). Para producción, reemplaza ese handler por tu pasarela de pago (ej. enlace de pago, WhatsApp con el resumen del pedido, o una pasarela como PayPal/Stripe).
