// Idioma y moneda del sitio: español + lempiras (Honduras) o portugués + reales (Brasil).
// El texto en español vive en index.html; aquí van las traducciones al portugués
// (PAGE_PT) y los textos que arman app.js y carousel.js (UI).
// Los precios base están en lempiras (products.js); para reales se convierten con `rate`.
const LOCALES = {
  es: { htmlLang: "es-HN", number: "es-HN", symbol: "L", rate: 1 },
  // Tasa aproximada L → R$. Ajústala cuando cambie el tipo de cambio.
  pt: { htmlLang: "pt-BR", number: "pt-BR", symbol: "R$", rate: 0.21 },
};
const LANG_KEY = "biobags-lang";

// Textos que se generan desde JS. {x} se reemplaza con vars.x.
const UI = {
  es: {
    "cmp.feature": "Característica",
    "cmp.material": "Material",
    "cmp.capacity": "Capacidad",
    "cmp.dimensions": "Medidas",
    "cmp.aroma": "Aroma",
    "cmp.usage": "Uso recomendado",
    "cmp.benefit": "Beneficio principal",
    "cmp.perPackage": "Por paquete",
    "cmp.degradation": "Se degrada en",
    "cmp.price": "Precio",
    "cmp.choose": "Elegir {tier}",
    bags: "{n} bolsas",
    perBag: "{price} por bolsa",
    aromaOf: "Aroma a {aroma}",
    package: "paquete",
    packages: "paquetes",
    "checkout.selection": "Tu selección",
    "checkout.unitPrice": "<strong>{price}</strong> el paquete de {n} · {perBag}",
    "checkout.units": "{q} {packages} = {bags} bolsas",
    "checkout.confirm": "Reservamos <strong>{q} {packages}</strong> ({bags} bolsas) de <strong>{name}</strong> por <strong>{total}</strong>. Te contactaremos para coordinar el pago y la entrega.",
    "car.slide": "{i} de {n}: {name}",
    "car.detail": "Detalle: {material}",
    "car.perBags": "/ {n} bolsas",
    "car.dot": "Ver foto {i}: {tier}",
    "car.pause": "Pausar carrusel",
    "car.play": "Reproducir carrusel",
    "car.slideRole": "diapositiva",
  },
  pt: {
    "cmp.feature": "Característica",
    "cmp.material": "Material",
    "cmp.capacity": "Capacidade",
    "cmp.dimensions": "Medidas",
    "cmp.aroma": "Aroma",
    "cmp.usage": "Uso recomendado",
    "cmp.benefit": "Benefício principal",
    "cmp.perPackage": "Por pacote",
    "cmp.degradation": "Se degrada em",
    "cmp.price": "Preço",
    "cmp.choose": "Escolher {tier}",
    bags: "{n} sacos",
    perBag: "{price} por saco",
    aromaOf: "Aroma de {aroma}",
    package: "pacote",
    packages: "pacotes",
    "checkout.selection": "Sua seleção",
    "checkout.unitPrice": "<strong>{price}</strong> o pacote com {n} · {perBag}",
    "checkout.units": "{q} {packages} = {bags} sacos",
    "checkout.confirm": "Reservamos <strong>{q} {packages}</strong> ({bags} sacos) de <strong>{name}</strong> por <strong>{total}</strong>. Entraremos em contato para combinar o pagamento e a entrega.",
    "car.slide": "{i} de {n}: {name}",
    "car.detail": "Detalhe: {material}",
    "car.perBags": "/ {n} sacos",
    "car.dot": "Ver foto {i}: {tier}",
    "car.pause": "Pausar carrossel",
    "car.play": "Reproduzir carrossel",
    "car.slideRole": "slide",
  },
};

// Traducción de los elementos con data-i18n / data-i18n-attr en index.html.
const PAGE_PT = {
  "meta.title": "Bio Bags — Sacos que vão embora, não que ficam",
  "meta.description": "Sacos de lixo biodegradáveis Bio Bags, feitos em Honduras. Básico (carvão ativado, aroma de limão) e Plus (casca de banana, aroma de café). Se degradam em meses, não em séculos.",
  "header.home": "Bio Bags — início",
  "nav.main": "Principal",
  "nav.bags": "Sacos",
  "nav.deposit": "O que descartar?",
  "nav.cause": "Nossa causa",
  "nav.faq": "Perguntas",
  "nav.faqFull": "Perguntas frequentes",
  "nav.buy": "Comprar",
  "nav.footer": "Rodapé",
  "lang.group": "Idioma e moeda",
  cta: "Comprar agora",

  "hero.kicker": "Sacos de lixo biodegradáveis",
  "hero.title": "Sacos que <em>vão embora</em>, não que ficam",
  "hero.sub": "Se degradam em meses, não em séculos. E prendem o mau cheiro enquanto você usa.",
  "hero.compare": "Comparar sacos",
  "hero.trust1": "Feitos em Honduras",
  "hero.trust2": "Pacote com 6",
  "hero.trust3": "Se degradam em meses",
  "car.role": "carrossel",
  "car.label": "Fotos dos sacos Bio Bags",
  "car.prev": "Foto anterior",
  "car.next": "Próxima foto",

  "vp1.title": "Se degrada em meses",
  "vp1.text": "O plástico comum dura centenas de anos. Bio Bags, só meses na compostagem.",
  "vp2.title": "Adeus ao mau cheiro",
  "vp2.text": "Seu material prende os odores e deixa um aroma suave de limão ou de café.",
  "vp3.title": "Pronto para o dia a dia",
  "vp3.text": "Para a cozinha, o banheiro, o escritório ou o seu negócio.",
  "vp4.title": "Feito em Honduras",
  "vp4.text": "Feito à mão, com materiais naturais. Cada compra apoia o projeto.",

  "cmp.eyebrow": "Nossos sacos",
  "cmp.title": "Básico ou Plus?",
  "cmp.lead": "Os dois se degradam em meses. Mudam o tamanho, o material e o aroma.",
  "cmp.tableLabel": "Comparação entre o Saco Básico e o Saco Plus",

  "dep.eyebrow": "Guia rápido",
  "dep.title": "O que você pode descartar?",
  "dep.lead": "Use para o lixo de todos os dias. Aqui vão alguns exemplos.",
  "dep.kitchen": "Cozinha",
  "dep.k1": "Cascas de frutas e verduras",
  "dep.k2": "Restos de comida",
  "dep.k3": "Pó de café e saquinhos de chá",
  "dep.k4": "Cascas de ovo",
  "dep.k5": "Guardanapos e papel-toalha",
  "dep.home": "Casa",
  "dep.h1": "Poeira e lixo de varrer",
  "dep.h2": "Lenços e papel higiênico",
  "dep.h3": "Folhas e restos do jardim",
  "dep.h4": "Embalagens pequenas de papel ou papelão",
  "dep.business": "Negócios e escritórios",
  "dep.b1": "Papel de escritório",
  "dep.b2": "Copos e pratos de papel",
  "dep.b3": "Restos de comida da equipe",
  "dep.b4": "Guardanapos e toalhas de papel",
  "avoid.title": "Não é recomendado",
  "avoid.lead": "Estes resíduos podem rasgar o saco ou prejudicar a compostagem.",
  "avoid.1": "<strong>Óleo de cozinha ou de carro</strong><span>Mancha e enfraquece o material. Guarde-o em uma garrafa fechada.</span>",
  "avoid.2": "<strong>Líquidos</strong><span>Molham o saco e o rasgam. Escorra os restos antes de jogá-los fora.</span>",
  "avoid.3": "<strong>Objetos cortantes</strong><span>Vidro quebrado, latas abertas ou agulhas furam o saco. Embrulhe-os à parte.</span>",
  "avoid.4": "<strong>Produtos químicos e pilhas</strong><span>São resíduos perigosos. Leve-os a um ponto de coleta.</span>",
  "avoid.5": "<strong>Cinzas ou brasas quentes</strong><span>O calor danifica o saco. Espere esfriarem por completo.</span>",

  "use.eyebrow": "De perto",
  "use.title": "Assim fica no seu dia a dia",
  "use.lead": "Veja a textura do material e onde usar cada saco.",
  "use.basicaAlt": "Close da textura do saco Básico de carvão ativado",
  "use.basicaCap": "<strong>Básico</strong> Textura de carvão ativado",
  "use.plusAlt": "Close da textura do saco Plus feito com casca de banana",
  "use.plusCap": "<strong>Plus</strong> Fibras de casca de banana",
  "use.kitchenAlt": "Lixeira de cozinha com um saco Bio Bags Básico",
  "use.kitchenCap": "<strong>Na cozinha</strong> Básico · restos de comida",
  "use.officeAlt": "Mesa de escritório com uma lixeira e um saco Bio Bags Plus",
  "use.officeCap": "<strong>No escritório</strong> Plus · papel e lixo seco",
  "use.shopAlt": "Balcão de um pequeno negócio com uma lixeira e um saco Bio Bags",
  "use.shopCap": "<strong>No seu negócio</strong> Básico · uso diário",

  "cause.eyebrow": "Nossa causa",
  "cause.title": "Menos plástico que dura para sempre",
  "cause.p1": "Uma sacola plástica é usada por alguns minutos, mas fica no ambiente por centenas de anos.",
  "cause.p2": "A Bio Bags nasce para mudar isso: sacos que cumprem sua função e depois voltam para a terra.",
  "cause.chip1": "Saco plástico comum",
  "cause.chip1v": "centenas de anos",
  "cause.chip2": "Saco Bio Bags, na compostagem",
  "cause.chip2v": "meses",
  "cause.cardTitle": "Para onde vai o seu dinheiro?",
  "cause.cardLead": "Cada compra paga o próximo lote de sacos.",
  "cause.f1": "<strong>Matéria-prima</strong><span>Carvão ativado e casca de banana.</span>",
  "cause.f2": "<strong>Fabricação</strong><span>Cada lote é feito à mão em Honduras.</span>",
  "cause.f3": "<strong>Entrega</strong><span>Para que o seu pedido chegue até você.</span>",

  "faq.eyebrow": "Perguntas frequentes",
  "faq.title": "Tiramos suas dúvidas",
  "faq.q1": "Quanto tempo leva para se degradar?",
  "faq.a1": "<p>Alguns meses na compostagem. Uma sacola plástica comum leva centenas de anos. O tempo exato depende do calor, da umidade e do lugar onde ela terminar.</p>",
  "faq.q2": "Quão resistente ele é?",
  "faq.a2": "<p>Aguenta o lixo de todos os dias. O Básico é o maior (até 50 L) e funciona melhor com restos de comida e lixo pesado. O Plus (até 30 L) é ideal para lixo leve e seco. Para durar mais, não encha demais e evite líquidos e objetos cortantes.</p>",
  "faq.q3": "Qual é a diferença entre o Básico e o Plus?",
  "faq.a3": "<p><strong>Básico:</strong> de carvão ativado, até 50 L, aroma de limão. Para a cozinha e lixeiras grandes.</p><p><strong>Plus:</strong> de casca de banana, até 30 L, aroma de café. Para o banheiro, o escritório e lixeiras pequenas.</p><p><a class=\"btn-link\" href=\"#comparar\">Ver a comparação completa</a></p>",
  "faq.q4": "Como faço um pedido?",
  "faq.a4": "<ol class=\"faq-steps\"><li>Escolha seu saco: Básico ou Plus.</li><li>Escolha quantos pacotes você quer (6 sacos cada).</li><li>Confirme seu pedido e entraremos em contato para combinar o pagamento e a entrega.</li></ol><p><a class=\"btn-link\" href=\"#compra\">Ir para a compra</a></p>",
  "faq.q5": "Vocês fazem entregas? Para onde?",
  "faq.a5": "<p>Sim, entregamos em Honduras. Ao receber seu pedido, entramos em contato para combinar o local, o dia e o custo do frete conforme a sua região.</p>",
  "faq.q6": "Como posso pagar?",
  "faq.a6": "<p>Quando confirmamos seu pedido, enviamos as formas de pagamento disponíveis. Você não precisa pagar nada nesta página.</p>",
  "faq.q7": "Para onde vai o meu dinheiro?",
  "faq.a7": "<p>Para produzir mais sacos: a matéria-prima, a fabricação à mão e a entrega. Assim, cada compra ajuda a tirar mais plástico descartável das casas e dos negócios.</p><p><a class=\"btn-link\" href=\"#causa\">Conheça nossa causa</a></p>",

  "buy.eyebrow": "Compra",
  "buy.title": "Faça seu pedido",
  "buy.lead": "Escolha seu saco e quantos pacotes. Entraremos em contato para combinar a entrega.",
  "buy.step1": "1. Escolha seu saco",
  "buy.pick": "Escolha seu saco",
  "buy.step2": "2. Quantos pacotes? (6 sacos cada)",
  "buy.minus": "Remover um pacote",
  "buy.qty": "Quantidade de pacotes",
  "buy.plus": "Adicionar um pacote",
  "buy.quick": "Quantidades sugeridas",
  "buy.total": "Total",
  "buy.submit": "Fazer meu pedido",
  "buy.micro": "Página de demonstração — conecte aqui seu gateway de pagamento ou link de contato.",
  "buy.thanks": "Obrigado pelo seu pedido!",
  "buy.again": "Fazer outro pedido",

  "foot.slogan": "Sacos que vão embora, não que ficam.",
  "foot.text": "Sacos de lixo biodegradáveis feitos à mão em Honduras.",
};

let currentLang = "es";

function t(key, vars) {
  const s = UI[currentLang][key] ?? UI.es[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => (vars && k in vars ? vars[k] : ""));
}

function fmt(n) {
  const l = LOCALES[currentLang];
  return l.symbol + " " + (n * l.rate).toLocaleString(l.number, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Producto con sus textos en el idioma actual (p.pt sobrescribe los campos en español).
function loc(p) {
  return currentLang === "es" || !p.pt ? p : { ...p, ...p.pt };
}

(function () {
  // Guardamos el español original de cada elemento la primera vez que se traduce.
  const originalHtml = new WeakMap();
  const originalAttrs = new WeakMap();

  function applyPage() {
    const es = currentLang === "es";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      if (!originalHtml.has(el)) originalHtml.set(el, el.innerHTML);
      el.innerHTML = es ? originalHtml.get(el) : PAGE_PT[el.dataset.i18n] ?? originalHtml.get(el);
    });
    // data-i18n-attr="aria-label:clave; alt:otra-clave"
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      if (!originalAttrs.has(el)) originalAttrs.set(el, {});
      const saved = originalAttrs.get(el);
      el.dataset.i18nAttr.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        if (!(attr in saved)) saved[attr] = el.getAttribute(attr);
        el.setAttribute(attr, es ? saved[attr] : PAGE_PT[key] ?? saved[attr]);
      });
    });
  }

  function setLang(lang, save) {
    if (!LOCALES[lang]) return;
    currentLang = lang;
    document.documentElement.lang = LOCALES[lang].htmlLang;
    applyPage();
    document.querySelectorAll("[data-lang]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    if (save) {
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* sin almacenamiento: solo esta visita */ }
    }
    document.dispatchEvent(new CustomEvent("langchange"));
  }

  // Idioma inicial: ?lang=pt en la URL, luego la última elección, luego el idioma del navegador.
  function initialLang() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (LOCALES[fromUrl]) return fromUrl;
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (LOCALES[saved]) return saved;
    } catch (e) { /* ignorar */ }
    return (navigator.language || "").toLowerCase().startsWith("pt") ? "pt" : "es";
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (btn && btn.dataset.lang !== currentLang) setLang(btn.dataset.lang, true);
  });

  setLang(initialLang(), false);
})();
