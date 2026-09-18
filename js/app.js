// Lógica de la tienda: pinta el selector de bolsa, la ficha técnica, la sección de
// precio y el panel de compra. Los datos viven en products.js; el carrusel, en carousel.js.
(function () {
  const state = { selectedId: PRODUCTS[0].id };

  const $ = (id) => document.getElementById(id);
  const picker = $("picker");
  const ficha = $("ficha");
  const priceGrid = $("priceGrid");
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

  /* ---------- selector de bolsa ---------- */
  function renderPicker() {
    picker.innerHTML = PRODUCTS.map((p) => {
      const selected = p.id === state.selectedId;
      return `
        <button type="button" class="pick-card" data-pick="${p.id}" aria-pressed="${selected}">
          <span class="pick-thumb"><img src="${p.image}" alt="" width="72" height="90" loading="lazy"></span>
          <span class="pick-text">
            <span class="pick-name">${p.name}</span>
            <span class="pick-meta">Aroma a ${p.aroma} · ${p.capacity}</span>
            <span class="pick-price">${fmt(p.packagePrice)} <small>paquete de ${p.unitsPerPackage}</small></span>
          </span>
          <span class="pick-check">${icon("check", 16)}</span>
        </button>`;
    }).join("");
  }

  /* ---------- ficha técnica ---------- */
  function specTile(iconName, label, value, note) {
    return `
      <div class="spec">
        <span class="spec-icon">${icon(iconName, 24)}</span>
        <div>
          <span class="spec-label">${label}</span>
          <span class="spec-value">${value}</span>
          <span class="spec-note">${note}</span>
        </div>
      </div>`;
  }

  function renderFicha() {
    const p = getSelected();
    const rows = [1, 2, 3].map((n) => `
      <li class="pack-row">
        <span class="pack-name">${n} ${plural(n, "paquete", "paquetes")}
          <small>${n * p.unitsPerPackage} bolsas</small></span>
        <span class="pack-price">${fmt(n * p.packagePrice)}</span>
        <button type="button" class="pack-btn" data-pack="${n}" aria-label="Pedir ${n} ${plural(n, "paquete", "paquetes")} de ${p.name}">Pedir</button>
      </li>`).join("");

    ficha.innerHTML = `
      <article class="ficha-card">
        <div class="ficha-hero">
          <div class="ficha-media">
            <img src="${p.image}" alt="${p.imageAlt}" width="1122" height="1402" decoding="async">
          </div>
          <div class="ficha-summary">
            <span class="tag">${icon("file", 16)} Ficha técnica</span>
            <h3>${p.name}</h3>
            <span class="aroma-badge ${aromaClass(p)}">${icon("sparkles", 16)} Aroma a ${p.aroma}</span>
            <p class="aroma-note">${p.aromaNote}</p>
            <div class="price-box">
              <span class="price-label">${icon("tag", 16)} Precio del paquete</span>
              <span class="price">${fmt(p.packagePrice)}</span>
              <span class="price-sub">${p.unitsPerPackage} bolsas · <strong>${fmt(perBag(p))} por bolsa</strong></span>
            </div>
            <a class="btn btn-lg" href="#compra">Comprar esta bolsa ${icon("arrow-right", 20)}</a>
          </div>
        </div>

        <div class="spec-grid">
          ${specTile("leaf", "Material", p.materialMain, p.materialNote)}
          ${specTile("bin", "Capacidad", p.capacity, p.usage)}
          ${specTile("ruler", "Medidas", p.dimensions, p.dimensionsNote)}
          ${specTile("sparkles", "Aroma", p.aroma, "Neutraliza los malos olores")}
          ${specTile("package", "Contenido", `${p.unitsPerPackage} bolsas`, "Por paquete")}
          ${specTile("pin", "Hecha en", "Honduras", "A mano y 100% compostable")}
        </div>

        <div class="ficha-split">
          <div class="block benefits">
            <h4>Beneficios ambientales</h4>
            <ul>
              ${p.benefits.map((b) => `<li><span class="tick">${icon("check", 16)}</span>${b}</li>`).join("")}
            </ul>
          </div>
          <div class="block presentations">
            <h4>Presentaciones disponibles</h4>
            <p class="block-note">Paquete de ${p.unitsPerPackage} bolsas. Combina los paquetes que necesites.</p>
            <ul class="pack-list">${rows}</ul>
          </div>
        </div>
      </article>`;
  }

  /* ---------- precio con contexto ---------- */
  function renderPrice() {
    const bagRows = PRODUCTS.map((p) => `
      <li class="bag-row">
        <span class="bag-name">${p.name}
          <small><span class="nowrap">${fmt(p.packagePrice)}</span> el paquete de ${p.unitsPerPackage} · ${p.capacity}</small></span>
        <span class="bag-price">${fmt(perBag(p))}</span>
      </li>`).join("");

    const bagPrices = PRODUCTS.map(perBag);
    const bioRange = Math.min(...bagPrices) === Math.max(...bagPrices)
      ? fmt(bagPrices[0])
      : `${fmt(Math.min(...bagPrices))} – ${fmt(Math.max(...bagPrices))}`;
    const priceRow = typeof CONVENTIONAL_BAG_PRICE === "number"
      ? `<div class="cmp-row"><span>Precio por bolsa</span><span>${fmt(CONVENTIONAL_BAG_PRICE)}</span><span>${bioRange}</span></div>`
      : "";

    priceGrid.innerHTML = `
      <article class="price-card highlight">
        <h3>${icon("tag", 22)} Tu precio, por bolsa</h3>
        <ul class="bag-list">${bagRows}</ul>
        <p class="card-foot">Las bolsas se venden en paquetes de ${PRODUCTS[0].unitsPerPackage}.</p>
      </article>

      <article class="price-card">
        <h3>${icon("heart", 22)} Qué paga tu aporte</h3>
        <ul class="funds">
          <li><span class="fund-icon">${icon("leaf", 20)}</span><div><strong>Materia prima</strong><span>Carbón activado y residuos de cáscara de banano.</span></div></li>
          <li><span class="fund-icon">${icon("factory", 20)}</span><div><strong>Maquila</strong><span>La elaboración de cada tanda, hecha a mano en Honduras.</span></div></li>
          <li><span class="fund-icon">${icon("truck", 20)}</span><div><strong>Logística</strong><span>La entrega de tu pedido.</span></div></li>
        </ul>
        <p class="card-foot">Cada compra financia la siguiente tanda de producción.</p>
      </article>

      <article class="price-card wide">
        <h3>${icon("sprout", 22)} Bio Bags vs. bolsa plástica común</h3>
        <div class="cmp">
          <div class="cmp-row cmp-head"><span></span><span>Plástico común</span><span>Bio Bags</span></div>
          <div class="cmp-row"><span>Material</span><span>Plástico</span><span>Carbón activado o residuos de cáscara de banano</span></div>
          <div class="cmp-row"><span>Descomposición</span><span class="bad">cientos de años</span><span class="good">meses, bajo compostaje</span></div>
          ${priceRow}
        </div>
        <p class="card-foot">Una bolsa común se usa ~15 min y se queda por generaciones.</p>
      </article>`;
  }

  /* ---------- compra ---------- */
  function renderCheckout() {
    const p = getSelected();
    checkoutSide.innerHTML = `
      <div class="side-photo"><img src="${p.image}" alt="${p.imageAlt}" width="1122" height="1402" loading="lazy" decoding="async"></div>
      <div class="side-info">
        <span class="side-tag">Tu selección</span>
        <h3>${p.name}</h3>
        <p>${p.materialMain} · Aroma a ${p.aroma}</p>
      </div>`;

    checkoutPick.innerHTML = PRODUCTS.map((q) => `
      <button type="button" class="pill" data-pick="${q.id}" aria-pressed="${q.id === p.id}">
        <span class="pill-name">${q.tier}</span>
        <span class="pill-meta">Aroma a ${q.aroma}</span>
      </button>`).join("");

    checkoutTitle.textContent = p.name;
    unitPriceLabel.innerHTML = `<strong>${fmt(p.packagePrice)}</strong> el paquete de ${p.unitsPerPackage} · ${fmt(perBag(p))} por bolsa`;
  }

  function updateTotal() {
    const p = getSelected();
    const q = currentQty();
    qtyInput.value = q;
    totalEl.textContent = fmt(q * p.packagePrice);
    unitsNote.textContent = `${q} ${plural(q, "paquete", "paquetes")} = ${q * p.unitsPerPackage} bolsas en total`;
    quickPacks.querySelectorAll("[data-pack-set]").forEach((b) => {
      b.setAttribute("aria-pressed", String(parseInt(b.dataset.packSet, 10) === q));
    });
  }

  function selectProduct(id) {
    state.selectedId = id;
    renderPicker();
    renderFicha();
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
      const container = pick.parentElement;
      selectProduct(pick.dataset.pick);
      const same = container.id && $(container.id).querySelector(`[data-pick="${pick.dataset.pick}"]`);
      if (same) same.focus();
      return;
    }

    const goProduct = e.target.closest("[data-select-product]");
    if (goProduct) {
      selectProduct(goProduct.dataset.selectProduct);
      return scrollToId("productos");
    }

    const pack = e.target.closest("[data-pack]");
    if (pack) {
      setQty(parseInt(pack.dataset.pack, 10));
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
    confirmDetail.innerHTML = `Reservamos <strong>${q} ${plural(q, "paquete", "paquetes")}</strong> (${q * p.unitsPerPackage} bolsas) de <strong>${p.name}</strong> por <strong>${fmt(q * p.packagePrice)}</strong>. Te contactaremos para coordinar la entrega.`;
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
  renderPicker();
  renderFicha();
  renderPrice();
  renderCheckout();
  updateTotal();
})();
