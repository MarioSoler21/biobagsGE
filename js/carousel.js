// Carrusel de la portada. Las diapositivas se generan desde PRODUCTS
// (foto completa de cada bolsa + detalle de su material), así que agregar un
// producto en products.js agrega sus fotos automáticamente.
// Transición por fundido (suave) con autoplay; se pausa al pasar el mouse,
// al enfocar con teclado, con la pestaña oculta o con "reducir movimiento".
(function () {
  const AUTOPLAY_MS = 5000;
  const SWIPE_PX = 45;

  const viewport = document.getElementById("carouselViewport");
  const track = document.getElementById("carouselTrack");
  const dotsEl = document.getElementById("carDots");
  const prevBtn = document.getElementById("carPrev");
  const nextBtn = document.getElementById("carNext");
  const toggleBtn = document.getElementById("carToggle");
  const root = document.getElementById("carousel");

  let slides = [];
  let dots = [];
  let slideEls = [];

  // Se vuelve a pintar al cambiar de idioma (textos y moneda), sin mover la foto actual.
  function render() {
    const products = PRODUCTS.map(loc);
    // Primero las dos bolsas completas (lo que más se quiere ver), luego los detalles.
    slides = [
      ...products.map((p) => ({ product: p, image: p.image, alt: p.imageAlt, cover: false, note: `${p.capacity} · ${t("aromaOf", { aroma: p.aroma })}` })),
      ...products.map((p) => ({ product: p, image: p.detailImage, alt: p.detailAlt, cover: true, note: t("car.detail", { material: p.materialShort.toLowerCase() }) })),
    ];

    track.innerHTML = slides.map((s, i) => {
      const p = s.product;
      return `
        <article class="slide ${s.cover ? "is-cover" : `stage-${p.stage}`}" role="group" aria-roledescription="${t("car.slideRole")}" aria-label="${t("car.slide", { i: i + 1, n: slides.length, name: p.name })}">
          <img src="${s.image}" alt="${s.alt}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" draggable="false">
          <div class="slide-caption">
            <span class="slide-name">${p.tier}</span>
            <span class="slide-note">${s.note}</span>
            <span class="slide-price">${fmt(p.packagePrice)} <small>${t("car.perBags", { n: p.unitsPerPackage })}</small></span>
          </div>
        </article>`;
    }).join("");

    dotsEl.innerHTML = slides.map((s, i) =>
      `<button type="button" class="car-dot" aria-label="${t("car.dot", { i: i + 1, tier: s.product.tier })}"></button>`
    ).join("");
    dots = Array.from(dotsEl.children);
    slideEls = Array.from(track.children);
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0;
  let playing = !reducedMotion.matches;
  let hovering = false;
  let timer = null;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    slideEls.forEach((el, n) => {
      const active = n === index;
      el.classList.toggle("is-active", active);
      el.toggleAttribute("inert", !active);
      el.setAttribute("aria-hidden", active ? "false" : "true");
    });
    dots.forEach((d, n) => {
      if (n === index) d.setAttribute("aria-current", "true");
      else d.removeAttribute("aria-current");
    });
  }

  function schedule() {
    clearInterval(timer);
    if (playing && !hovering && !document.hidden) {
      timer = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    }
  }

  function renderToggle() {
    toggleBtn.innerHTML = icon(playing ? "pause" : "play", 16);
    toggleBtn.setAttribute("aria-label", t(playing ? "car.pause" : "car.play"));
    track.setAttribute("aria-live", playing ? "off" : "polite");
  }

  function move(delta) {
    goTo(index + delta);
    schedule();
  }

  prevBtn.addEventListener("click", () => move(-1));
  nextBtn.addEventListener("click", () => move(1));
  dotsEl.addEventListener("click", (e) => {
    const n = dots.indexOf(e.target.closest(".car-dot"));
    if (n >= 0) { goTo(n); schedule(); }
  });
  toggleBtn.addEventListener("click", () => { playing = !playing; renderToggle(); schedule(); });

  root.addEventListener("mouseenter", () => { hovering = true; schedule(); });
  root.addEventListener("mouseleave", () => { hovering = false; schedule(); });
  root.addEventListener("focusin", () => { hovering = true; schedule(); });
  root.addEventListener("focusout", () => { hovering = false; schedule(); });
  document.addEventListener("visibilitychange", schedule);
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") move(-1);
    else if (e.key === "ArrowRight") move(1);
  });

  // Deslizar con el dedo / arrastrar con el mouse.
  let startX = null;
  viewport.addEventListener("pointerdown", (e) => { startX = e.clientX; });
  viewport.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > SWIPE_PX) move(dx < 0 ? 1 : -1);
  });
  viewport.addEventListener("pointercancel", () => { startX = null; });

  document.addEventListener("langchange", () => {
    render();
    renderToggle();
    goTo(index);
  });

  render();
  renderToggle();
  goTo(0);
  schedule();
})();
