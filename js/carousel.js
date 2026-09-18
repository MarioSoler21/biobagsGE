// Carrusel de presentaciones. Las diapositivas se generan desde PRODUCTS
// (foto completa + detalle del material de cada línea), así que agregar un
// producto en products.js agrega sus diapositivas automáticamente.
// Los botones con data-select-product los atiende app.js.
(function () {
  const AUTOPLAY_MS = 6500;
  const SWIPE_PX = 50;

  const viewport = document.getElementById("carouselViewport");
  const track = document.getElementById("carouselTrack");
  const dotsEl = document.getElementById("carDots");
  const prevBtn = document.getElementById("carPrev");
  const nextBtn = document.getElementById("carNext");
  const toggleBtn = document.getElementById("carToggle");
  const root = document.getElementById("carousel");

  const slides = [];
  PRODUCTS.forEach((p) => {
    slides.push({ product: p, kind: "Vista general", image: p.image, alt: p.imageAlt, text: p.aromaNote, cover: false });
    slides.push({ product: p, kind: "Detalle del material", image: p.detailImage, alt: p.detailAlt, text: `${p.materialMain}. ${p.materialNote}.`, cover: true });
  });

  track.innerHTML = slides.map((s, i) => {
    const p = s.product;
    const perBag = p.packagePrice / p.unitsPerPackage;
    const aromaClass = p.aroma === "Limón" ? "limon" : "cafe";
    return `
      <article class="slide" role="group" aria-roledescription="diapositiva" aria-label="${i + 1} de ${slides.length}">
        <div class="slide-media${s.cover ? " is-cover" : ""}">
          <img src="${s.image}" alt="${s.alt}" loading="${i === 0 ? "eager" : "lazy"}" decoding="async" draggable="false">
        </div>
        <div class="slide-copy">
          <span class="slide-kind">${s.kind}</span>
          <h3>${p.name}</h3>
          <span class="aroma-badge ${aromaClass}">${icon("sparkles", 16)} Aroma a ${p.aroma}</span>
          <p>${s.text}</p>
          <ul class="slide-facts">
            <li>${icon("bin", 18)} <span>${p.capacity}</span></li>
            <li>${icon("ruler", 18)} <span>${p.dimensions}</span></li>
            <li>${icon("package", 18)} <span>${p.unitsPerPackage} por paquete</span></li>
          </ul>
          <div class="slide-price"><strong>${fmt(p.packagePrice)}</strong> <span>el paquete · ${fmt(perBag)} por bolsa</span></div>
          <button type="button" class="btn" data-select-product="${p.id}">Ver ficha técnica ${icon("arrow-right", 18)}</button>
        </div>
      </article>`;
  }).join("");

  dotsEl.innerHTML = slides.map((_, i) =>
    `<button type="button" class="car-dot" aria-label="Ir a la diapositiva ${i + 1}"></button>`
  ).join("");
  const dots = Array.from(dotsEl.children);
  const slideEls = Array.from(track.children);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0;
  let playing = !reducedMotion.matches;
  let hovering = false;
  let timer = null;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
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
    toggleBtn.innerHTML = icon(playing ? "pause" : "play", 18);
    toggleBtn.setAttribute("aria-label", playing ? "Pausar carrusel" : "Reproducir carrusel");
    track.setAttribute("aria-live", playing ? "off" : "polite");
  }

  function move(delta) {
    goTo(index + delta);
    schedule();
  }

  prevBtn.addEventListener("click", () => move(-1));
  nextBtn.addEventListener("click", () => move(1));
  dots.forEach((d, n) => d.addEventListener("click", () => { goTo(n); schedule(); }));
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

  renderToggle();
  goTo(0);
  schedule();
})();
