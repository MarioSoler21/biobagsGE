# Bio Bags — tienda

Sitio de una página para vender las bolsas Bio Bags en dos líneas, empacadas de 6 en 6.

## Catálogo

| Producto | Material | Aroma | Capacidad | Contenido | Precio de paquete |
|---|---|---|---|---|---|
| Bolsa Básica | Carbón activado + neutralizador de olor | Limón | hasta 50 L (70 × 90 cm) | 6 bolsas | L 180.00 |
| Bolsa Plus | Residuos de cáscara de banano + neutralizador de olor | Café | hasta 30 L (55 × 65 cm) | 6 bolsas | L 150.00 |

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
│   ├── carousel.js   # Carrusel de la portada (se genera desde products.js)
│   └── app.js        # Tabla comparativa Básica vs Plus y checkout
├── assets/           # Fotos de producto, detalles del material, logo e iconos
├── server.js         # Servidor estático mínimo (sin dependencias) para correr en local
└── package.json
```

`products.js` es la única fuente de verdad: si cambias un precio, una capacidad o una medida ahí, se refleja automáticamente en el carrusel de portada, la tabla comparativa y el total del checkout.

## Secciones de la página (en orden)

1. **Header** — logo a color (fondo claro), enlaces y botón "Comprar ahora".
2. **Hero con carrusel** — eslogan + fotos de las bolsas (autoplay suave, flechas, puntos, swipe).
3. **Propuesta de valor** — 4 beneficios con íconos.
4. **¿Básica o Plus?** — tabla comparativa lado a lado (se genera desde `products.js`).
5. **¿Qué puedes depositar?** — ejemplos por categoría (cocina, hogar, negocios) y lista de lo que no se recomienda.
6. **Así se ve en tu día a día** — fotos de detalle del material + escenas de uso.
7. **Nuestra causa** — logo en blanco (fondo oscuro), impacto y a dónde va el dinero.
8. **Preguntas frecuentes** — acordeón (`<details>`), editable directamente en `index.html`.
9. **Haz tu pedido** — checkout rápido.
10. **Footer** — logo en blanco.

## Logo y fotos

- `assets/biobags-logo.png` — logo a color, para fondos claros (header).
- `assets/biobags-logo-blanco.png` — palabra en blanco + hojas lima, para fondos oscuros (causa, footer).
- `assets/biobags-logo-mono-blanco.png` — 100% blanco, para usar sobre fotos.
- `assets/bolsa-basica.webp` / `assets/bolsa-plus.webp` — bolsas sin el barril, con fondo transparente. En la Plus se oscurecieron las hojas del isotipo para que contrasten con la bolsa clara.
- `assets/ilustraciones/uso-*.svg` — escenas de uso (cocina, oficina, negocio). **Cámbialas por fotos reales** en la sección "Así se ve en tu día a día" de `index.html`.

## Datos por confirmar

- **Tiempo de degradación:** hoy dice "Meses, en compostaje". Si tienes el dato exacto, cámbialo en `degradation` (`js/products.js`) y en la pregunta frecuente.
- **Resistencia, envíos y métodos de pago:** las respuestas del FAQ están escritas de forma general; ajústalas en `index.html`.

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

El botón "Hacer mi pedido" hoy solo muestra una confirmación local (`js/app.js`). Para producción, reemplaza ese handler por tu pasarela de pago (ej. enlace de pago, WhatsApp con el resumen del pedido, o una pasarela como PayPal/Stripe).
