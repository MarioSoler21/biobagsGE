// Lógica de la tienda: pinta la comparación Básica vs Plus y el panel de compra.
// Los datos viven en products.js; el carrusel de la portada, en carousel.js.
(function () {
  const state = { selectedId: PRODUCTS[0].id };

  const $ = (id) => document.getElementById(id);
  const compareTable = $("compareTable");
  const checkoutSide = $("checkoutSide");
  const checkoutPick = $("checkoutPick");
  const checkoutTitle = $("checkoutTitle");
  const unitPriceLabel = $("unitPriceLabel");
  const qtyInput = $("qty");
  const quickPacks = $("quickPacks");
  const unitsNote = $("unitsNote");
  const totalEl = $("total");
  const minus = $("minus");
  const plus = $("plus");
  const confirmBtn = $("confirmBtn");
  const backBtn = $("backBtn");
  const checkoutForm = $("checkoutForm");
  const confirmPanel = $("confirmPanel");
  const confirmDetail = $("confirmDetail");

  const getSelected = () => PRODUCTS.find((p) => p.id === state.selectedId);
  const perBag = (p) => p.packagePrice / p.unitsPerPackage;
  const aromaClass = (p) => (p.aroma === "Limón" ? "limon" : "cafe");
  const plural = (n, one, many) => (n === 1 ? one : many);
  const currentQty = () => Math.max(1, parseInt(qtyInput.value, 10) || 1);

  function scrollToId(id) {
    $(id).scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------- comparación Básica vs Plus ---------- */
  // Cada fila: ícono + etiqueta corta + el valor de cada bolsa, para leerla en segundos.
  const COMPARE_ROWS = [
    { icon: "leaf", label: "Material", value: (p) => p.materialShort },
    { icon: "bin", label: "Capacidad", value: (p) => `<strong>${p.capacity}</strong>` },
    { icon: "ruler", label: "Medidas", value: (p) => p.dimensions },
    { icon: "sparkles", label: "Aroma", value: (p) => `<span class="aroma-badge ${aromaClass(p)}">${p.aroma}</span>` },
    { icon: "home", label: "Uso recomendado", value: (p) => p.usage },
    { icon: "star", label: "Beneficio principal", value: (p) => p.mainBenefit },
    { icon: "package", label: "Por paquete", value: (p) => `${p.unitsPerPackage} bolsas` },
    { icon: "clock", label: "Se degrada en", value: (p) => p.degradation },
    { icon: "tag", label: "Precio", value: (p) => `<span class="cmp-price">${fmt(p.packagePrice)}</span><small>${fmt(perBag(p))} por bolsa</small>` },
  ];

  function renderCompare() {
    const head = `
      <div class="cmp-row cmp-head" role="row">
        <span class="cmp-label" role="columnheader"><span class="sr-only">Característica</span></span>
        ${PRODUCTS.map((p) => `
          <div class="cmp-cell cmp-product stage-${p.stage}" role="columnheader">
            <img src="${p.image}" alt="" width="850" height="1196" loading="lazy" decoding="async">
            <span class="cmp-name">${p.tier}</span>
            <span class="cmp-tagline">${p.tagline}</span>
          </div>`).join("")}
      </div>`;

    const rows = COMPARE_ROWS.map((r) => `
      <div class="cmp-row" role="row">
        <span class="cmp-label" role="rowheader">${icon(r.icon, 20)} ${r.label}</span>
        ${PRODUCTS.map((p) => `<span class="cmp-cell" role="cell">${r.value(p)}</span>`).join("")}
      </div>`).join("");

    const foot = `
      <div class="cmp-row cmp-foot" role="row">
        <span class="cmp-label" role="cell"></span>
        ${PRODUCTS.map((p) => `
          <span class="cmp-cell" role="cell">
            <button type="button" class="btn" data-select-product="${p.id}">Elegir ${p.tier}</button>
          </span>`).join("")}
      </div>`;

    compareTable.innerHTML = head + rows + foot;
  }

  /* ---------- compra ---------- */
  function renderCheckout() {
    const p = getSelected();
    checkoutSide.innerHTML = `
      <div class="side-photo stage-${p.stage}"><img src="${p.image}" alt="${p.imageAlt}" width="850" height="1196" loading="lazy" decoding="async"></div>
      <div class="side-info">
        <span class="side-tag">Tu selección</span>
        <h3>${p.name}</h3>
        <p>${p.capacity} · ${p.dimensions} · Aroma a ${p.aroma}</p>
      </div>`;

    checkoutPick.innerHTML = PRODUCTS.map((q) => `
      <button type="button" class="pill" data-pick="${q.id}" aria-pressed="${q.id === p.id}">
        <span class="pill-name">${q.tier}</span>
        <span class="pill-meta">${q.capacity} · ${q.aroma}</span>
      </button>`).join("");

    checkoutTitle.textContent = p.name;
    unitPriceLabel.innerHTML = `<strong>${fmt(p.packagePrice)}</strong> el paquete de ${p.unitsPerPackage} · ${fmt(perBag(p))} por bolsa`;
  }

  function updateTotal() {
    const p = getSelected();
    const q = currentQty();
    qtyInput.value = q;
    totalEl.textContent = fmt(q * p.packagePrice);
    unitsNote.textContent = `${q} ${plural(q, "paquete", "paquetes")} = ${q * p.unitsPerPackage} bolsas`;
    quickPacks.querySelectorAll("[data-pack-set]").forEach((b) => {
      b.setAttribute("aria-pressed", String(parseInt(b.dataset.packSet, 10) === q));
    });
  }

  function selectProduct(id) {
    state.selectedId = id;
    renderCheckout();
    updateTotal();
  }

  function setQty(n) {
    qtyInput.value = n;
    updateTotal();
  }

  /* ---------- eventos ---------- */
  document.addEventListener("click", (e) => {
    const pick = e.target.closest("[data-pick]");
    if (pick) {
      // Los botones se vuelven a pintar; devolvemos el foco al equivalente para el teclado.
      selectProduct(pick.dataset.pick);
      const same = checkoutPick.querySelector(`[data-pick="${pick.dataset.pick}"]`);
      if (same) same.focus();
      return;
    }

    const goProduct = e.target.closest("[data-select-product]");
    if (goProduct) {
      selectProduct(goProduct.dataset.selectProduct);
      return scrollToId("compra");
    }

    const packSet = e.target.closest("[data-pack-set]");
    if (packSet) setQty(parseInt(packSet.dataset.packSet, 10));
  });

  minus.addEventListener("click", () => setQty(Math.max(1, currentQty() - 1)));
  plus.addEventListener("click", () => setQty(currentQty() + 1));
  qtyInput.addEventListener("input", updateTotal);

  confirmBtn.addEventListener("click", () => {
    const p = getSelected();
    const q = currentQty();
    confirmDetail.innerHTML = `Reservamos <strong>${q} ${plural(q, "paquete", "paquetes")}</strong> (${q * p.unitsPerPackage} bolsas) de <strong>${p.name}</strong> por <strong>${fmt(q * p.packagePrice)}</strong>. Te contactaremos para coordinar el pago y la entrega.`;
    checkoutForm.style.display = "none";
    confirmPanel.classList.add("show");
  });

  backBtn.addEventListener("click", () => {
    confirmPanel.classList.remove("show");
    checkoutForm.style.display = "block";
  });

  /* ---------- arranque ---------- */
  document.querySelectorAll("[data-icon]").forEach((el) => {
    el.innerHTML = icon(el.dataset.icon, el.dataset.size ? parseInt(el.dataset.size, 10) : 22);
  });
  quickPacks.innerHTML = PACKAGE_OPTIONS.map((n) => `
    <button type="button" class="quick" data-pack-set="${n}" aria-pressed="false">${n} ${plural(n, "paquete", "paquetes")}</button>`).join("");
  renderCompare();
  renderCheckout();
  updateTotal();
})();
