// Lógica de la tienda: pinta el catálogo, controla la selección de producto
// y calcula el total en el panel de compra. Los datos viven en products.js.
(function () {
  const state = {
    selectedId: PRODUCTS[0].id,
    packages: 1,
  };

  const productGrid = document.getElementById("productGrid");
  const fichaTag = document.getElementById("fichaTag");
  const fichaTitle = document.getElementById("fichaTitle");
  const fichaList = document.getElementById("fichaList");
  const unitPriceLabel = document.getElementById("unitPriceLabel");
  const qtyInput = document.getElementById("qty");
  const unitsNote = document.getElementById("unitsNote");
  const totalEl = document.getElementById("total");
  const minus = document.getElementById("minus");
  const plus = document.getElementById("plus");
  const confirmBtn = document.getElementById("confirmBtn");
  const backBtn = document.getElementById("backBtn");
  const checkoutForm = document.getElementById("checkoutForm");
  const confirmPanel = document.getElementById("confirmPanel");
  const confirmDetail = document.getElementById("confirmDetail");
  const checkoutTitle = document.getElementById("checkoutTitle");

  function fmt(n) {
    return "L " + n.toLocaleString("es-HN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function getSelected() {
    return PRODUCTS.find((p) => p.id === state.selectedId);
  }

  function renderProductGrid() {
    productGrid.innerHTML = PRODUCTS.map((p) => {
      const aromaClass = p.aroma === "Limón" ? "limon" : "cafe";
      const perUnit = p.packagePrice / p.unitsPerPackage;
      const isSelected = p.id === state.selectedId;
      return `
        <article class="product-card">
          <div class="media">
            <img src="${p.image}" alt="${p.imageAlt}" loading="lazy">
          </div>
          <div class="body">
            <span class="aroma-badge ${aromaClass}">Aroma a ${p.aroma}</span>
            <h3>${p.name}</h3>
            <dl class="dl">
              <dt>Material</dt><dd>${p.material}</dd>
              <dt>Capacidad</dt><dd>${p.capacity}</dd>
              <dt>Medidas</dt><dd>${p.dimensions}</dd>
              <dt>Paquete</dt><dd>${p.unitsPerPackage} bolsas por paquete</dd>
            </dl>
            <p class="aroma-note">${p.aromaNote}</p>
            <div class="package-price">
              <div class="amount">${fmt(p.packagePrice)}</div>
              <div class="per-unit">paquete de ${p.unitsPerPackage} · ${fmt(perUnit)} por bolsa</div>
            </div>
            <button type="button" class="btn select-btn" data-id="${p.id}" aria-pressed="${isSelected}">
              ${isSelected ? "Seleccionado ✓" : "Elegir esta bolsa"}
            </button>
          </div>
        </article>
      `;
    }).join("");

    productGrid.querySelectorAll(".select-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedId = btn.dataset.id;
        renderProductGrid();
        renderFicha();
        updateTotal();
        document.getElementById("compra").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function renderFicha() {
    const p = getSelected();
    fichaTag.textContent = `Ficha técnica · Aroma a ${p.aroma}`;
    fichaTitle.textContent = p.name;
    fichaList.innerHTML = `
      <dt>Material</dt><dd>${p.material}</dd>
      <dt>Aroma</dt><dd>${p.aroma} — ${p.aromaNote}</dd>
      <dt>Capacidad</dt><dd>${p.capacity}</dd>
      <dt>Medidas</dt><dd>${p.dimensions}</dd>
      <dt>Contenido</dt><dd>${p.unitsPerPackage} bolsas por paquete</dd>
      <dt>Destino del aporte</dt><dd>Materia prima y producción de la siguiente tanda</dd>
    `;
    checkoutTitle.textContent = `Compra rápida — ${p.name}`;
    unitPriceLabel.textContent = `${fmt(p.packagePrice)} el paquete de ${p.unitsPerPackage}`;
  }

  function updateTotal() {
    const p = getSelected();
    let q = parseInt(qtyInput.value, 10);
    if (isNaN(q) || q < 1) q = 1;
    qtyInput.value = q;
    state.packages = q;
    const totalUnits = q * p.unitsPerPackage;
    totalEl.textContent = fmt(q * p.packagePrice);
    unitsNote.textContent = `${q} paquete${q > 1 ? "s" : ""} = ${totalUnits} bolsas en total`;
  }

  minus.addEventListener("click", () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value || "1", 10) - 1);
    updateTotal();
  });
  plus.addEventListener("click", () => {
    qtyInput.value = parseInt(qtyInput.value || "1", 10) + 1;
    updateTotal();
  });
  qtyInput.addEventListener("input", updateTotal);

  confirmBtn.addEventListener("click", () => {
    const p = getSelected();
    const q = parseInt(qtyInput.value, 10) || 1;
    const totalUnits = q * p.unitsPerPackage;
    const total = fmt(q * p.packagePrice);
    confirmDetail.innerHTML = `Reservamos <strong>${q} paquete${q > 1 ? "s" : ""}</strong> (${totalUnits} bolsas) de <strong>${p.name}</strong> por <strong>${total}</strong>. Te contactaremos para coordinar la entrega.`;
    checkoutForm.style.display = "none";
    confirmPanel.classList.add("show");
  });

  backBtn.addEventListener("click", () => {
    confirmPanel.classList.remove("show");
    checkoutForm.style.display = "block";
  });

  renderProductGrid();
  renderFicha();
  updateTotal();
})();
