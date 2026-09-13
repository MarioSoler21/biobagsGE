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
│   └── styles.css    # Todos los estilos
├── js/
│   ├── products.js   # Datos del catálogo (única fuente de verdad: precios, material, capacidad)
│   └── app.js         # Lógica: pinta las tarjetas de producto, maneja selección y calcula el total
├── assets/
│   ├── bolsa-grande.png
│   └── bolsa-mediana.png
├── server.js          # Servidor estático mínimo (sin dependencias) para correr en local
└── package.json
```

`products.js` es la única fuente de verdad: si cambias un precio o una capacidad ahí, se refleja automáticamente en las tarjetas de producto, la ficha técnica y el total del checkout — no hay datos duplicados en el HTML.

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
