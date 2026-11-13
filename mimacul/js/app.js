// Lógica de la app: pantallas, navegación, carrito, reseñas, etc.

/* =========================================================
   5. ESTADO DE LA APP
   Todo lo que puede cambiar mientras la usas.
   ========================================================= */
const state = {
  carrito: { "pan-masa-madre": 1, "hallullas": 2, "miel-natural": 1 }, // id → cantidad
  favoritos: new Set(["miel-natural"]),
  siguiendo: new Set(), // pymes que marcaste con el corazón
  entrega: "despacho",
  cupon: null,
  catInicio: "todo",
  catExplorar: "todo",
  busqueda: "",
  tabPyme: "productos",
  tabProducto: "detalle", // pestaña del producto: "detalle" o "resenas"
  estrellas: 0,    // estrellas elegidas en el formulario de reseña
  borrador: "",    // texto de la reseña mientras la escribes
  misResenas: {},  // reseñas que dejaste: id de producto → lista
  cantidad: 1,     // cantidad elegida en la pantalla de producto
  foto: 0,         // miniatura seleccionada en la galería
  slide: 0,        // noticia visible en el carrusel
  ultimaPestana: "inicio",
  logueado: false,   // ¿ya iniciaste sesión?
  usuario: "Kataffy", // nombre que aparece en el saludo
  avatar: 0,         // foto de perfil elegida (posición en AVATARES)
  logoPyme: 0        // logo elegido al registrar una pyme (posición en LOGOS_PYME)
};

/* =========================================================
   6. AYUDANTES
   ========================================================= */
const $ = (sel) => document.querySelector(sel);
const pesos = (n) => "$" + n.toLocaleString("es-CL");
const pyme = (id) => PYMES.find((p) => p.id === id);
const producto = (id) => PRODUCTOS.find((p) => p.id === id);
const grad = (g) => `background:linear-gradient(135deg, ${g[0]}, ${g[1]})`;
const descuento = (p) => p.antes ? "-" + Math.round((1 - p.precio / p.antes) * 100) + "%" : "";
// Imagen de un producto: su foto si tiene, si no, el emoji
const fotoProd = (p) => p.img ? `<img class="foto-img" src="${p.img}" alt="${p.nombre}">` : `<span class="e">${p.emoji}</span>`;
// Logo de una pyme: su imagen si tiene, si no, el emoji
const logoPyme = (y) => y.logo ? `<img class="foto-img ${y.logoLleno ? "" : "logo-img"}" src="${y.logo}" alt="Logo de ${y.nombre}">` : `<span class="e">${y.emoji}</span>`;
// Precio a mostrar: "A cotizar" para productos hechos a pedido
const precioTxt = (p, n = 1) => p.cotizar ? "A cotizar" : pesos(p.precio * n);
const cantidadCarrito = () => Object.values(state.carrito).reduce((a, b) => a + b, 0);

// Íconos SVG (estilo "lucide"), para no depender de imágenes externas
const ICONOS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  right: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  left: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4"/><path d="m15.4 6.5-6.8 4"/>',
  plus: '<path d="M5 12h14M12 5v14"/>',
  minus: '<path d="M5 12h14"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  store: '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M2 7h20v3a2 2 0 0 1-4 0 2 2 0 0 1-4 0 2 2 0 0 1-4 0 2 2 0 0 1-4 0V7"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  msg: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r="1"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  eye: '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="m2 2 20 20"/>',
  pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>'
};
function ic(nombre, tam = 20, color = "currentColor", relleno = "none") {
  return `<svg width="${tam}" height="${tam}" viewBox="0 0 24 24" fill="${relleno}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS[nombre]}</svg>`;
}

/* =========================================================
   7. COMPONENTES (piezas de HTML que se repiten)
   Cada función devuelve un pedazo de HTML como texto.
   ========================================================= */
function tarjetaProducto(p) {
  const fav = state.favoritos.has(p.id);
  return `
  <button class="pcard" data-go="producto-${p.id}" aria-label="${p.nombre}">
    <div class="img" style="${grad(p.grad)}">
      ${fotoProd(p)}
      ${p.antes ? `<span class="badge">${descuento(p)}</span>` : ""}
      <span class="fav" data-fav="${p.id}" role="button" aria-label="Favorito">${ic("heart", 16, "#d9502e", fav ? "#d9502e" : "none")}</span>
    </div>
    <div class="info">
      <span class="name">${p.nombre}</span>
      <span class="meta">${pyme(p.pyme).nombre}</span>
    </div>
    <div class="bottom">
      <div><div class="price num">${precioTxt(p)}</div>${p.antes ? `<div class="old num">${pesos(p.antes)}</div>` : `<div class="old" style="text-decoration:none">${p.det}</div>`}</div>
      <span class="add" data-add="${p.id}" role="button" aria-label="Añadir ${p.nombre} al carrito">${ic("plus", 18, "#fff")}</span>
    </div>
  </button>`;
}

function filaProducto(p) {
  return `
  <button class="prow" data-go="producto-${p.id}">
    <div class="img" style="${grad(p.grad)}">${fotoProd(p)}</div>
    <div class="info">
      <span class="name">${p.nombre}</span>
      <span class="meta">${pyme(p.pyme).nombre} · ${pyme(p.pyme).km} km</span>
      ${p.rating ? `<span class="rating">${ic("star", 13, "#f2a43a", "#f2a43a")} ${p.rating} (${p.n})</span>` : `<span class="meta">${p.det}</span>`}
      <span class="row" style="gap:8px"><span class="price num">${precioTxt(p)}</span>${p.antes ? `<span class="old num">${pesos(p.antes)}</span>` : ""}</span>
    </div>
    <span class="add round" data-add="${p.id}" role="button" aria-label="Añadir ${p.nombre} al carrito">${ic("plus", 18, "#fff")}</span>
  </button>`;
}

function avatarPyme(y) {
  return `
  <button class="avatar" data-go="pyme-${y.id}">
    <div class="img" style="${grad(y.grad)}">${logoPyme(y)}</div>
    <span>${y.corto}</span>
  </button>`;
}

function tarjetaPyme(y) {
  return `
  <button class="ycard" data-go="pyme-${y.id}">
    <div class="img" style="${grad(y.grad)}">${logoPyme(y)}${y.nueva ? '<span class="tag-new">Nuevo</span>' : ""}</div>
    <div class="info">
      <span class="name">${y.nombre}</span>
      <span class="meta">${y.rubroTxt}</span>
      <span class="addr">${ic("pin", 12)} ${y.dir}</span>
    </div>
  </button>`;
}

function encabezado(titulo, destino) {
  return `<div class="section-head"><h2>${titulo}</h2>${destino ? `<button class="link" data-go="${destino}">Ver todo ${ic("right", 14)}</button>` : ""}</div>`;
}

function chips(activa, tipo) {
  return `<div class="chips" role="tablist">${CATEGORIAS.map((c) =>
    `<button class="chip ${c.id === activa ? "on" : ""}" data-cat="${tipo}:${c.id}" role="tab" aria-selected="${c.id === activa}">${c.txt}</button>`).join("")}</div>`;
}

const porCategoria = (cat) => PRODUCTOS.filter((p) => cat === "todo" || pyme(p.pyme).rubro === cat);

/* =========================================================
   8. PANTALLAS
   ========================================================= */
function pantallaInicio() {
  const lista = porCategoria(state.catInicio);
  const ofertas = lista.filter((p) => p.antes);
  return `
  <header class="home-head">
    <h1 class="hello" style="margin:0">¡Hola, ${state.usuario}! 👋</h1>
    <button class="icon-btn" data-act="avisos" aria-label="Notificaciones">${ic("bell", 20)}<span class="dot"></span></button>
  </header>

  <div class="search">
    <button class="search-field" data-go="explorar">${ic("search", 20)} Busca productos o pymes…</button>  </div>

  <section class="carousel" aria-roledescription="carrusel" aria-label="Noticias del barrio">
    <div class="track" id="track" style="transform:translateX(-${state.slide * 100}%)">
      ${NOTICIAS.map((n, i) => `
      <article class="banner" style="${n.fondo ? `background: linear-gradient(90deg, rgba(${n.sombra || "46,31,14"},.95) 0%, rgba(${n.sombra || "46,31,14"},.82) 55%, rgba(${n.sombra || "46,31,14"},.15) 100%), url(${n.fondo}) right 30% / 62% auto no-repeat, rgb(${n.sombra || "46,31,14"})` : grad(n.grad)}" aria-label="Noticia ${i + 1} de ${NOTICIAS.length}">
        <div class="copy">
          <span class="tag">${n.tag}</span>
          <h2>${n.titulo}</h2>
          ${n.bajada ? `<p class="bajada">${n.bajada}</p>` : ""}
          <button class="cta" data-go="${n.destino}">${n.boton} ${ic("right", 14)}</button>
        </div>
        ${n.emoji ? `<span class="e">${n.emoji}</span>` : ""}
      </article>`).join("")}
    </div>
    <div class="cdots">${NOTICIAS.map((_, i) => `<button class="${i === state.slide ? "on" : ""}" data-act="slide-${i}" aria-label="Ver noticia ${i + 1}"></button>`).join("")}</div>
  </section>


  ${encabezado("Pymes destacadas", "explorar")}
  <div class="hscroll" style="gap:14px">${PYMES.filter((y) => !y.nueva).map(avatarPyme).join("")}</div>

  ${encabezado("Productos para ti ✨", "explorar")}
  <div class="hscroll">${lista.length ? lista.slice(0, 6).map(tarjetaProducto).join("") : '<p class="meta">Aún no hay productos en esta categoría.</p>'}</div>

  ${encabezado("Pymes nuevas en tu barrio")}
  <div class="hscroll">${PYMES.filter((y) => y.nueva).map(tarjetaPyme).join("")}</div>

  ${encabezado("Ofertas de la semana", "explorar")}
  <div class="stack pad" style="padding-bottom:24px">${ofertas.length ? ofertas.slice(0, 4).map(filaProducto).join("") : '<p class="meta">No hay ofertas en esta categoría esta semana.</p>'}</div>`;
}

function pantallaExplorar() {
  return `
  <div class="topbar" style="padding-top:14px"><h1 style="text-align:left;font-size:24px;font-weight:800">Explorar</h1></div>
  <div class="search">
    <label class="search-field" for="buscar">${ic("search", 20)}
      <input id="buscar" type="search" placeholder="Pan, palta, mantel…" value="${state.busqueda}" autocomplete="off">
    </label>
  </div>
  <div id="resultados">${resultadosExplorar()}</div>`;
}

// Tarjeta grande de categoría (mismo formato que las filas de producto)
function filaCategoria(c) {
  const nProd = porCategoria(c.id).length;
  const nPymes = PYMES.filter((y) => y.rubro === c.id).length;
  return `
  <button class="prow catrow" data-go="categoria-${c.id}">
    <div class="img" style="${grad(c.grad)}"><span class="e">${c.emoji}</span></div>
    <div class="info">
      <span class="name">${c.nombre}</span>
      <span class="meta">${c.desc}</span>
      <span class="link" style="font-size:12px">${nProd} ${nProd === 1 ? "producto" : "productos"} · ${nPymes} ${nPymes === 1 ? "pyme" : "pymes"}</span>
    </div>
    <span class="add round" style="background:var(--primary-soft)">${ic("right", 18, "#1f6f5b")}</span>
  </button>`;
}

function resultadosExplorar() {
  const q = state.busqueda.trim().toLowerCase();
  // Sin búsqueda: todas las pymes + las categorías en grande
  if (!q) {
    return `
    ${encabezado(`Pymes (${PYMES.length})`)}<div class="hscroll">${PYMES.map(tarjetaPyme).join("")}</div>
    ${encabezado("Categorías")}
    <div class="stack pad" style="padding-bottom:24px">${CATEGORIAS.filter((c) => c.id !== "todo").map(filaCategoria).join("")}</div>`;
  }
  // Con búsqueda: pymes y productos que coinciden
  const pymes = PYMES.filter((y) => (y.nombre + y.rubroTxt).toLowerCase().includes(q));
  const prods = PRODUCTOS.filter((p) => (p.nombre + pyme(p.pyme).nombre).toLowerCase().includes(q));
  if (!pymes.length && !prods.length) {
    return `<div class="empty"><span class="e">🔎</span><h2>Sin resultados</h2><p>No encontramos “${state.busqueda}”. Prueba con otra palabra.</p></div>`;
  }
  return `
  ${pymes.length ? `${encabezado(`Pymes (${pymes.length})`)}<div class="hscroll">${pymes.map(tarjetaPyme).join("")}</div>` : ""}
  ${prods.length ? `${encabezado(`Productos (${prods.length})`)}<div class="stack pad" style="padding-bottom:24px">${prods.map(filaProducto).join("")}</div>` : ""}`;
}

// Fila de pyme (listado vertical, mismo formato que las filas de producto)
function filaPyme(y) {
  const n = PRODUCTOS.filter((p) => p.pyme === y.id).length;
  return `
  <button class="prow catrow" data-go="pyme-${y.id}">
    <div class="img" style="${grad(y.grad)}">${logoPyme(y)}${y.nueva ? '<span class="tag-new">Nuevo</span>' : ""}</div>
    <div class="info">
      <span class="name">${y.nombre}</span>
      <span class="meta">${y.rubroTxt} · ${n} ${n === 1 ? "producto" : "productos"}</span>
      <span class="rating">${ic("star", 13, "#f2a43a", "#f2a43a")} ${y.rating} (${y.resenas}) · ${y.km} km</span>
      <span class="addr">${ic("pin", 12)} ${y.dir}</span>
    </div>
    <span class="add round" style="background:var(--primary-soft)">${ic("right", 18, "#1f6f5b")}</span>
  </button>`;
}

// Pantalla de una categoría: listado de sus pymes
function pantallaCategoria(c) {
  const pymes = PYMES.filter((y) => y.rubro === c.id);
  return `
  <div class="topbar">
    <button class="icon-btn" data-act="atras" aria-label="Volver">${ic("left", 20)}</button>
    <h1>${c.nombre}</h1>
    <span style="width:44px"></span>
  </div>
  <div class="banner" style="${grad(c.grad)};margin:0 16px 22px;border-radius:24px;min-height:120px;padding:20px;color:var(--ink)">
    <div class="copy"><span class="tag" style="background:rgba(255,255,255,.7)">${pymes.length} ${pymes.length === 1 ? "pyme" : "pymes"}</span><h2 style="font-size:18px">${c.desc}</h2></div>
    <span class="e" style="top:22px;font-size:64px">${c.emoji}</span>
  </div>
  ${encabezado(`Pymes (${pymes.length})`)}
  <div class="stack pad" style="padding-bottom:24px">${pymes.map(filaPyme).join("")}</div>`;
}

function pantallaPyme(y) {
  const prods = PRODUCTOS.filter((p) => p.pyme === y.id);
  const contenido = state.tabPyme === "productos"
    ? (prods.length
        ? `<div class="stack pad" style="padding-bottom:16px">${prods.map(filaProducto).join("")}</div>`
        : `<div class="empty" style="padding:24px 32px 40px"><span class="e" style="font-size:44px">📦</span><p>Esta pyme todavía no sube productos.</p></div>`)
    : `<div class="stack pad" style="padding-bottom:16px">
        ${RESENAS.map((r) => `
          <div class="review">
            <div class="who"><i>${r.quien[0]}</i>${r.quien}<span style="margin-left:auto;display:flex;gap:2px">${[0,1,2,3,4].map((i) => ic("star", 13, i < r.estrellas ? "#f2a43a" : "#e8e1d5", i < r.estrellas ? "#f2a43a" : "#e8e1d5")).join("")}</span></div>
            <p>${r.txt}</p>
          </div>`).join("")}
       </div>`;
  return `
  <div class="hero" style="${grad(y.grad)}">
    <div class="top">
      <button class="icon-btn" data-act="atras" aria-label="Volver">${ic("left", 20)}</button>
      <div class="row">
        <button class="icon-btn" data-act="compartir" aria-label="Compartir">${ic("share", 20)}</button>
        <button class="icon-btn" data-act="seguir" aria-label="Seguir" aria-pressed="${state.siguiendo.has(y.id)}">${ic("heart", 20, "#d9502e", state.siguiendo.has(y.id) ? "#d9502e" : "none")}</button>
      </div>
    </div>
    <div class="sheet-edge"></div>
    <div class="logo img" style="${grad(y.grad)}">${logoPyme(y)}</div>
  </div>

  <section class="pinfo">
    <div style="display:grid;gap:4px">
      <h1>${y.nombre} <span class="verified" title="Pyme verificada">${ic("check", 12, "#fff")}</span></h1>
      <div class="row between" style="gap:8px">
        <span class="meta" style="white-space:normal;min-width:0">${y.rubroTxt} · ${y.dir}</span>
        <span class="open"><i></i>${y.horarioTxt || "Abierto · " + (y.abre ? y.abre + " a " + y.cierra : "cierra " + y.cierra)}</span>
      </div>
    </div>
    <p class="bio">${y.bio}</p>
    ${y.horario ? `<div class="horario">${y.horario.map(([d, h]) => `<div><span>${d}</span><b class="${h === "Cerrado" ? "cerrado" : ""}">${h}</b></div>`).join("")}</div>` : ""}
    <div class="stats">
      <div class="stat"><b>${ic("star", 15, "#f2a43a", "#f2a43a")}${y.rating}</b><span>${y.resenas} reseñas${y.fuenteResenas ? " en " + y.fuenteResenas : ""}</span></div>
      <div class="stat"><b>${ic("box", 15, "#1f6f5b")}${prods.length}</b><span>productos</span></div>
      <div class="stat"><b>${ic("pin", 15, "#1f6f5b")}${y.km} km</b><span>de ti</span></div>
    </div>
    <div class="row" style="gap:10px">
      <button class="btn btn-wa" data-act="whatsapp">${ic("msg", 18, "#fff")} Chatear</button>
      <button class="btn btn-secondary" data-act="mapa">${ic("pin", 18)} Cómo llegar</button>
    </div>
  </section>

  <div class="tabs" role="tablist">
    <button class="${state.tabPyme === "productos" ? "on" : ""}" data-act="tab-productos" role="tab">Productos (${prods.length})</button>
    <button class="${state.tabPyme === "resenas" ? "on" : ""}" data-act="tab-resenas" role="tab">Reseñas (${y.resenas})</button>
  </div>
  ${contenido}`;
}

// Productos parecidos de OTRAS pymes (misma categoría). Si hay pocos, completa con otros.
function similares(p) {
  const rubro = pyme(p.pyme).rubro;
  const otros = PRODUCTOS.filter((o) => o.pyme !== p.pyme);
  const mismos = otros.filter((o) => pyme(o.pyme).rubro === rubro);
  const resto = otros.filter((o) => pyme(o.pyme).rubro !== rubro && o.antes);
  return [...mismos, ...resto].slice(0, 5);
}

// Todas las reseñas de un producto: primero las tuyas, después las de ejemplo
function resenasDe(p) {
  // Productos sin nota (ej. hechos a pedido) muestran solo las reseñas reales
  return [...(state.misResenas[p.id] || []), ...(p.rating ? RESENAS : [])];
}

function estrellas(n, tam = 14) {
  return [0, 1, 2, 3, 4].map((i) => ic("star", tam, i < n ? "#f2a43a" : "#e8e1d5", i < n ? "#f2a43a" : "#e8e1d5")).join("");
}

function pantallaProducto(p) {
  const y = pyme(p.pyme);
  const fav = state.favoritos.has(p.id);
  const totalResenas = (p.n || 0) + (state.misResenas[p.id] || []).length;
  // Las miniaturas cambian la foto grande (en una app real serían fotos distintas)
  const fotos = [[fotoProd(p), p.grad], [logoPyme(y), y.grad], ['<span class="e">🌿</span>', ["#e3f0c8", "#a9cf6b"]], ['<span class="e">📦</span>', ["#efe6d8", "#d3b98f"]]];
  const [emo, g] = fotos[state.foto];
  const otros = PRODUCTOS.filter((o) => o.pyme === p.pyme && o.id !== p.id);
  const sim = similares(p);

  // ---- Parte de arriba: siempre visible (fotos, nombre, estrellas, precio) ----
  const cabecera = `
  <div class="topbar">
    <button class="icon-btn" data-act="atras" aria-label="Volver">${ic("left", 20)}</button>
    <h1>Detalle del producto</h1>
    <button class="icon-btn" data-act="compartir" aria-label="Compartir">${ic("share", 20)}</button>
    <button class="icon-btn" data-fav="${p.id}" aria-label="Favorito">${ic("heart", 20, "#d9502e", fav ? "#d9502e" : "none")}</button>
  </div>

  <div class="gallery img" style="${grad(g)}">
    ${emo}
    ${p.antes ? `<span class="badge">${descuento(p)} esta semana</span>` : ""}
    <div class="dots">${fotos.map((_, i) => `<i class="${i === state.foto ? "on" : ""}"></i>`).join("")}</div>
  </div>
  <div class="thumbs">${fotos.map(([e, gg], i) => `<button class="thumb img ${i === state.foto ? "on" : ""}" style="${grad(gg)}" data-act="foto-${i}" aria-label="Foto ${i + 1}">${e}</button>`).join("")}</div>

  <section class="pdetail">
    <span class="cat">${y.rubroTxt}</span>
    <h2>${p.nombre}</h2>
    ${p.rating ? `<span class="rating">${estrellas(4, 16)} <span class="meta">${p.rating} · ${totalResenas} reseñas · ${p.det}</span></span>` : `<span class="meta">${p.det} · ${totalResenas ? totalResenas + " reseñas" : "Sin reseñas aún"}</span>`}
    <button class="write-btn" data-act="escribir-resena">${ic("star", 15, "#1f6f5b")} Dejar una reseña</button>
    <div class="big-price"><span class="price num">${precioTxt(p)}</span>${p.antes ? `<span class="old num">${pesos(p.antes)}</span>` : ""}</div>
  </section>

  <div class="tabs" role="tablist" id="tabs-producto" style="margin-top:4px">
    <button class="${state.tabProducto === "detalle" ? "on" : ""}" data-act="ptab-detalle" role="tab">Detalle</button>
    <button class="${state.tabProducto === "resenas" ? "on" : ""}" data-act="ptab-resenas" role="tab">Reseñas (${totalResenas})</button>
  </div>`;

  // ---- Pestaña "Reseñas": resumen + formulario + lista ----
  if (state.tabProducto === "resenas") {
    const reparto = [78, 15, 4, 2, 1]; // % de reseñas con 5, 4, 3, 2 y 1 estrellas (ejemplo)
    return cabecera + `
    ${!p.rating ? "" : `<section class="group">
      <div class="rsum">
        <div class="rsum-num"><b>${p.rating}</b><span>${estrellas(5, 13)}</span><small>${totalResenas} reseñas</small></div>
        <div class="bars">${reparto.map((pct, i) => `<div class="bar"><span>${5 - i}</span><i><em style="width:${pct}%"></em></i></div>`).join("")}</div>
      </div>
    </section>`}

    <section class="group">
      <form class="review-form" id="form-resena">
        <b style="font-size:15px">Tu reseña</b>
        <div class="picker" role="radiogroup" aria-label="Cuántas estrellas">
          ${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-act="estrella-${n}" role="radio" aria-checked="${state.estrellas === n}" aria-label="${n} estrellas">${ic("star", 30, n <= state.estrellas ? "#f2a43a" : "#d8cfc0", n <= state.estrellas ? "#f2a43a" : "none")}</button>`).join("")}
          <span class="meta" style="margin-left:6px">${["Toca las estrellas", "Malo", "Regular", "Bueno", "Muy bueno", "¡Excelente!"][state.estrellas]}</span>
        </div>
        <textarea id="resena-txt" rows="3" maxlength="300" placeholder="¿Qué te pareció ${p.nombre.toLowerCase()}?">${state.borrador}</textarea>
        <div id="resena-msg"></div>
        <button class="btn btn-primary" type="submit">Publicar reseña</button>
      </form>
    </section>

    <section class="stack pad" style="padding-bottom:24px">
      ${resenasDe(p).map((r) => `
        <div class="review">
          <div class="who"><i>${r.quien[0]}</i>${r.quien}${r.mia ? '<span class="cat" style="font-size:10px;padding:2px 8px">Tu reseña</span>' : ""}<span style="margin-left:auto;display:flex;gap:2px">${estrellas(r.estrellas, 13)}</span></div>
          <p>${r.txt}</p>
          ${r.mia ? '<span class="meta">Hoy</span>' : ""}
        </div>`).join("")}
      ${p.rating ? "" : (resenasDe(p).length ? "" : `<div class="empty" style="padding:16px 24px"><span class="e" style="font-size:40px">💬</span><p>Aún no hay reseñas. ¡Sé el primero en opinar!</p></div>`)}
    </section>`;
  }

  // ---- Pestaña "Detalle" ----
  return cabecera + `
  <button class="mini-pyme" data-go="pyme-${y.id}">
    <div class="img" style="${grad(y.grad)}">${logoPyme(y)}</div>
    <div style="flex:1;min-width:0;display:grid;gap:2px">
      <b style="font-size:14px">${y.nombre}</b>
      <span class="link">Ver tienda ${ic("right", 12)}</span>
    </div>
    <span class="icon-btn sq" style="background:var(--wa);border:0" data-act="whatsapp" role="button" aria-label="WhatsApp">${ic("msg", 20, "#fff")}</span>
  </button>

  <section class="desc">
    <h3>Descripción</h3>
    <p>${p.desc}</p>
    <div class="perk">${ic("truck", 18)} Despacho en Macul en 24 h o retiro en tienda</div>
    <div class="perk">${ic("leaf", 18)} Producto 100% local y artesanal</div>
  </section>

  ${p.cotizar ? `<section class="buybox">
    <div style="display:grid;gap:4px"><b>Producto hecho a pedido</b><span class="meta" style="white-space:normal">El precio depende del tamaño y la personalización. Escríbele a ${y.nombre} para cotizar.</span></div>
    <button class="btn btn-wa" data-act="whatsapp">${ic("msg", 18, "#fff")} Cotizar por WhatsApp</button>
  </section>` : `<section class="buybox">
    <div class="row between">
      <b>Cantidad</b>
      <div class="stepper light">
        <button data-act="menos" aria-label="Quitar uno">${ic("minus", 16)}</button>
        <b class="num">${state.cantidad}</b>
        <button class="plus" data-act="mas" aria-label="Agregar uno">${ic("plus", 16, "#fff")}</button>
      </div>
    </div>
    <div class="btns">
      <button class="btn btn-secondary" data-act="agregar" data-id="${p.id}">Añadir</button>
      <button class="btn btn-primary" data-act="comprar" data-id="${p.id}">Comprar · ${pesos(p.precio * state.cantidad)}</button>
    </div>
  </section>`}

  ${sim.length ? `${encabezado("Similares en otras pymes")}<div class="hscroll">${sim.map(tarjetaProducto).join("")}</div>` : ""}
  ${otros.length ? `${encabezado("Más de " + y.corto, "pyme-" + y.id)}<div class="hscroll">${otros.map(tarjetaProducto).join("")}</div>` : ""}`;
}

function pantallaCarrito() {
  const items = Object.entries(state.carrito).map(([id, n]) => ({ p: producto(id), n }));
  if (!items.length) {
    return `
    <div class="cart-head"><h1>Mi carrito 🛒</h1></div>
    <div class="empty">
      <span class="e">🧺</span>
      <h2>Tu carrito está vacío</h2>
      <p>Agrega productos de las pymes de Macul con el botón +.</p>
      <button class="btn btn-primary" style="width:auto;margin-top:8px" data-go="inicio">Ver productos</button>
    </div>`;
  }
  // Agrupar los productos por pyme
  const grupos = {};
  items.forEach((it) => { (grupos[it.p.pyme] ||= []).push(it); });
  const subtotal = items.reduce((s, it) => s + it.p.precio * it.n, 0);
  const envio = state.entrega === "despacho" ? DESPACHO : 0;
  const rebaja = state.cupon ? CUPONES[state.cupon] : 0;
  const total = Math.max(0, subtotal + envio - rebaja);
  const nPymes = Object.keys(grupos).length;

  return `
  <div class="cart-head">
    <div style="display:grid">
      <h1>Mi carrito 🛒</h1>
      <span class="meta">${cantidadCarrito()} productos · ${nPymes} ${nPymes === 1 ? "pyme" : "pymes"} de Macul</span>
    </div>
    <button class="clear" data-act="vaciar">${ic("trash", 14)} Vaciar</button>
  </div>

  ${Object.entries(grupos).map(([pid, lista]) => {
    const y = pyme(pid);
    return `
    <section class="group">
      <button class="group-title" data-go="pyme-${y.id}"><i class="img">${logoPyme(y)}</i>${y.nombre} ${ic("store", 14, "#6b7a74")}</button>
      ${lista.map(({ p, n }) => `
        <div class="crow">
          <button class="img" style="${grad(p.grad)}" data-go="producto-${p.id}" aria-label="${p.nombre}">${fotoProd(p)}</button>
          <div class="info">
            <div><div class="name">${p.nombre}</div><div class="meta">${p.det}</div></div>
            <div class="row between">
              <div class="stepper">
                <button data-qty="${p.id}:-1" aria-label="Quitar uno">${ic("minus", 14)}</button>
                <b class="num">${n}</b>
                <button class="plus" data-qty="${p.id}:1" aria-label="Agregar uno">${ic("plus", 14, "#fff")}</button>
              </div>
              <span class="price num" style="font-size:15px">${pesos(p.precio * n)}</span>
            </div>
          </div>
        </div>`).join("")}
    </section>`;
  }).join("")}

  <section class="group">
    <b style="font-size:15px">¿Cómo lo quieres recibir?</b>
    <div class="options">
      <button class="opt ${state.entrega === "despacho" ? "on" : ""}" data-act="entrega-despacho">${ic("truck", 20)}<span><b>Despacho</b><small>Hoy · ${pesos(DESPACHO)}</small></span></button>
      <button class="opt ${state.entrega === "retiro" ? "on" : ""}" data-act="entrega-retiro">${ic("store", 20)}<span><b>Retiro en tienda</b><small>Gratis</small></span></button>
    </div>
  </section>

  <section class="group">
    <form class="coupon" id="form-cupon">
      ${ic("tag", 18, "#f2a43a")}
      <input id="cupon" placeholder="Código de descuento" value="${state.cupon || ""}" aria-label="Código de descuento" autocomplete="off">
      <button type="submit">${state.cupon ? "Quitar" : "Aplicar"}</button>
    </form>
    <div id="cupon-msg">${state.cupon ? `<p class="coupon-msg" style="color:var(--primary)">🎉 Cupón ${state.cupon} aplicado: ${pesos(rebaja)} de descuento</p>` : `<p class="coupon-msg" style="color:var(--muted)">Prueba con BARRIOMACUL</p>`}</div>
  </section>

  <section class="group">
    <div class="summary num">
      <div class="row between"><span>Subtotal</span><b>${pesos(subtotal)}</b></div>
      <div class="row between"><span>Despacho</span><b>${envio ? pesos(envio) : "Gratis"}</b></div>
      ${rebaja ? `<div class="row between"><span>Descuento ${state.cupon}</span><b style="color:var(--primary)">-${pesos(rebaja)}</b></div>` : ""}
      <hr>
      <div class="row between total"><span>Total</span><b>${pesos(total)}</b></div>
    </div>
  </section>

  <section class="group" style="padding-bottom:8px">
    <button class="btn btn-primary" data-act="pagar">Ir a pagar · ${pesos(total)}</button>
    <button class="btn btn-wa" data-act="whatsapp">${ic("msg", 18, "#fff")} Coordinar por WhatsApp</button>
  </section>
  <p class="meta" style="text-align:center;padding:4px 16px 24px;white-space:normal">💚 Tu compra apoya directamente a emprendedores de Macul</p>`;
}

function pantallaIngresar() {
  // Burbujas decorativas: [emoji, izquierda, arriba, giro, retraso de la animación]
  const burbujas = [["🥖", "8%", "14%", -10, 0], ["🍯", "78%", "10%", 12, 1.2], ["🧶", "84%", "56%", -6, .6], ["🥬", "4%", "60%", 8, 1.8], ["☕", "60%", "70%", -12, 2.4], ["🕯️", "26%", "76%", 10, 3]];
  return `
  <div class="login">
    <div class="login-top">
      ${burbujas.map(([e, x, y, giro, d]) => `<span class="bubble" style="left:${x};top:${y};rotate:${giro}deg;animation-delay:${d}s" aria-hidden="true">${e}</span>`).join("")}
      <div class="brand">
        <h1 style="margin:0;font-size:34px">MiMacul</h1>
      </div>
    </div>

    <form class="login-form" id="form-login" novalidate>
      <h2>Inicia sesión</h2>
      <label class="field" for="correo">Correo
        <span class="input">${ic("mail", 18)}<input id="correo" type="email" value="kataffy@correo.cl" autocomplete="email"></span>
      </label>
      <label class="field" for="clave">Contraseña
        <span class="input">${ic("lock", 18)}<input id="clave" type="password" value="macul123" autocomplete="current-password">
          <button type="button" data-act="ver-clave" aria-label="Mostrar contraseña">${ic("eye", 18)}</button>
        </span>
      </label>
      <button type="button" class="link" data-act="olvide" style="justify-self:end">¿Olvidaste tu contraseña?</button>
      <div id="login-msg"></div>
      <button class="btn btn-primary" type="submit">Ingresar</button>
      <div class="divider">o</div>
      <button type="button" class="btn btn-secondary" data-act="invitado">Entrar como invitado</button>
      <p class="meta" style="text-align:center;margin:0;white-space:normal">¿No tienes cuenta? <button type="button" class="link" data-act="registro">Regístrate</button></p>
    </form>
  </div>`;
}

// Muestra un avatar: si tiene "img" usa la imagen, si no, el emoji
function fotoPerfil(a) {
  return a.img ? `<img class="foto-img" src="${a.img}" alt="Foto de perfil">` : a.emoji;
}

// Hoja para elegir la foto de perfil
function elegirFoto() {
  $("#sheet").innerHTML = `
  <div class="sheet-bg" data-act="cerrar">
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="foto-titulo">
      <h3 id="foto-titulo">Elige tu foto de perfil</h3>
      <div class="avatar-grid">
        ${AVATARES.map((a, i) => `<button class="avatar-opt img ${i === state.avatar ? "on" : ""}" style="${grad(a.grad)}" data-act="avatar-${i}" aria-label="Foto ${i + 1}">${fotoPerfil(a)}</button>`).join("")}
      </div>
      <button class="btn btn-secondary" data-act="cerrar-hoja">Cancelar</button>
    </div>
  </div>`;
}

// Logos para elegir al registrar una pyme (emoji + colores del degradado)
const LOGOS_PYME = [
  ["🏪", ["#d6eedd", "#8cc7a8"]], ["🥖", ["#f6d7a8", "#e39a48"]], ["🍰", ["#fde3ec", "#f2a6c0"]],
  ["🥬", ["#e3f0c8", "#a9cf6b"]], ["🧶", ["#f9d9e0", "#e79bb0"]], ["☕", ["#ead8c8", "#b98a63"]],
  ["🍯", ["#fff1c6", "#f5c14e"]], ["👕", ["#dfe8f6", "#9bb4dc"]], [IMAGENES.gatoPan, ["#fbe2c8", "#eaa86c"]], [IMAGENES.gatoBusiness, ["#2d3140", "#1b1e28"]]
];
// ¿El logo es una imagen (y no un emoji)?
const esImagen = (e) => e.startsWith("data:") || e.startsWith("img/");
const verLogo = (e) => esImagen(e) ? `<img class="foto-img" src="${e}" alt="">` : e;

// Pantalla de prueba para registrar una pyme
function pantallaVender() {
  return `
  <div class="topbar">
    <button class="icon-btn" data-act="atras" aria-label="Volver">${ic("left", 20)}</button>
    <h1>Registra tu pyme</h1>
    <span style="width:44px"></span>
  </div>

  <div class="reg-intro">
    <span class="e">🏪</span>
    <div><b>Vende a tus vecinos</b><p>Completa los datos de tu emprendimiento y empieza a vender en MiMacul.</p></div>
  </div>

  <form class="reg-form" id="form-pyme" novalidate>
    <div style="display:grid;gap:8px">
      <h3>Logo de tu pyme</h3>
      <div class="logos" role="radiogroup" aria-label="Logo">
        ${LOGOS_PYME.map(([e, g], i) => `<button type="button" class="logo-opt img ${i === state.logoPyme ? "on" : ""}" style="${grad(g)}" data-act="logo-${i}" role="radio" aria-checked="${i === state.logoPyme}" aria-label="Logo ${i + 1}">${verLogo(e)}</button>`).join("")}
      </div>
    </div>

    <label class="field" for="reg-nombre">Nombre de la pyme
      <span class="input">${ic("store", 18)}<input id="reg-nombre" placeholder="Ej: Empanadas La Tía" autocomplete="organization"></span>
    </label>

    <label class="field" for="reg-rubro">Rubro
      <span class="input">${ic("tag", 18)}
        <select id="reg-rubro">
          ${CATEGORIAS.filter((c) => c.id !== "todo").map((c) => `<option value="${c.id}">${c.nombre}</option>`).join("")}
        </select>
      </span>
    </label>

    <label class="field" for="reg-desc"><span>Cuéntanos de tu pyme <span class="opcional">(opcional)</span></span>
      <textarea id="reg-desc" rows="3" maxlength="200" placeholder="¿Qué vendes? ¿Qué la hace especial?"></textarea>
    </label>

    <label class="field" for="reg-dir">Dirección en Macul
      <span class="input">${ic("pin", 18)}<input id="reg-dir" placeholder="Ej: Av. Macul 1234" autocomplete="street-address"></span>
    </label>

    <label class="field" for="reg-wsp">WhatsApp
      <span class="input">${ic("msg", 18)}<span class="prefix">+56 9</span><input id="reg-wsp" inputmode="numeric" maxlength="8" placeholder="1234 5678" autocomplete="tel-local"></span>
    </label>

    <div class="two">
      <label class="field" for="reg-abre">Abre
        <span class="input" style="padding:0 10px"><input id="reg-abre" type="time" value="09:00"></span>
      </label>
      <label class="field" for="reg-cierra">Cierra
        <span class="input" style="padding:0 10px"><input id="reg-cierra" type="time" value="19:00"></span>
      </label>
    </div>

    <label class="check" for="reg-acepto">
      <input id="reg-acepto" type="checkbox">
      <span>Acepto los términos de MiMacul y confirmo que mi pyme está en la comuna de Macul.</span>
    </label>

    <div id="reg-msg"></div>
    <button class="btn btn-primary" type="submit">Registrar mi pyme</button>
  </form>`;
}

function pantallaPerfil() {
  return `
  <div class="me">
    <button class="img me-photo" style="${grad(AVATARES[state.avatar].grad)}" data-act="cambiar-foto" aria-label="Cambiar foto de perfil">
      ${fotoPerfil(AVATARES[state.avatar])}
      <span class="edit">${ic("pencil", 12, "#fff")}</span>
    </button>
    <div style="display:grid;gap:2px">
      <h1 style="margin:0;font-size:22px;font-weight:800">${state.usuario}</h1>
      <span class="loc">${ic("pin", 14)} Macul, Santiago</span>
    </div>
  </div>
  <div class="menu">
    <button data-act="pronto">${ic("box", 20, "#1f6f5b")}<span class="grow">Mis pedidos</span>${ic("right", 16, "#6b7a74")}</button>
    <button data-act="pronto">${ic("heart", 20, "#d9502e")}<span class="grow">Favoritos</span><span class="meta">${state.favoritos.size}</span>${ic("right", 16, "#6b7a74")}</button>
    <button data-act="pronto">${ic("pin", 20, "#1f6f5b")}<span class="grow">Mis direcciones</span>${ic("right", 16, "#6b7a74")}</button>
    <button data-act="pronto">${ic("bell", 20, "#1f6f5b")}<span class="grow">Notificaciones</span>${ic("right", 16, "#6b7a74")}</button>
    <button data-act="salir" style="color:var(--danger)">${ic("logout", 20, "#d9502e")}<span class="grow">Cerrar sesión</span></button>
  </div>
  <div class="join">
    <h3>¿Tienes una pyme en Macul? 🏪</h3>
    <p>Súmate gratis y vende a tus vecinos. Te ayudamos a subir tus productos.</p>
    <button class="btn btn-primary" style="width:auto;justify-self:start;height:42px" data-go="vender">Quiero vender</button>
  </div>`;
}

/* =========================================================
   9. NAVEGACIÓN ENTRE PANTALLAS
   Usamos el "#" de la dirección: #inicio, #carrito,
   #producto-miel-natural, #pyme-panem, etc.
   ========================================================= */
const pila = []; // historial propio para el botón "atrás"

function rutaActual() { return location.hash.slice(1) || "inicio"; }

function ir(destino) {
  if (destino === rutaActual()) { render(); return; }
  location.hash = destino; // esto dispara el evento "hashchange"
}

function atras() {
  pila.pop(); // sacamos la pantalla actual
  const anterior = pila.pop() || state.ultimaPestana;
  location.hash = anterior;
}

window.addEventListener("hashchange", () => {
  const r = rutaActual();
  if (r.startsWith("producto-")) { state.cantidad = 1; state.foto = 0; state.tabProducto = "detalle"; state.estrellas = 0; state.borrador = ""; }
  if (r.startsWith("pyme-")) state.tabPyme = "productos";
  render(true);
});

function render(nuevaPantalla = false) {
  const r = rutaActual();
  // Si no has iniciado sesión, siempre te manda a la pantalla de ingreso
  if (!state.logueado && r !== "ingresar") { location.hash = "ingresar"; return; }
  $("#nav").hidden = r === "ingresar"; // sin barra de abajo en el inicio de sesión
  if (nuevaPantalla && pila[pila.length - 1] !== r) pila.push(r);
  const pestanas = ["inicio", "explorar", "carrito", "perfil"];
  if (pestanas.includes(r)) state.ultimaPestana = r;

  let html;
  if (r === "ingresar") html = pantallaIngresar();
  else if (r === "explorar") html = pantallaExplorar();
  else if (r === "vender") html = pantallaVender();
  else if (r === "carrito") html = pantallaCarrito();
  else if (r === "perfil") html = pantallaPerfil();
  else if (r.startsWith("producto-") && producto(r.slice(9))) html = pantallaProducto(producto(r.slice(9)));
  else if (r.startsWith("pyme-") && pyme(r.slice(5))) html = pantallaPyme(pyme(r.slice(5)));
  else if (r.startsWith("categoria-") && CATEGORIAS.find((c) => c.id === r.slice(10))) html = pantallaCategoria(CATEGORIAS.find((c) => c.id === r.slice(10)));
  else html = pantallaInicio();

  const screen = $("#screen");
  const scroll = screen.scrollTop;
  screen.innerHTML = html;
  screen.scrollTop = nuevaPantalla ? 0 : scroll; // al cambiar de pantalla, volvemos arriba

  // Animación de entrada: solo cuando cambias de pantalla
  // (no cuando, por ejemplo, agregas algo al carrito).
  screen.classList.remove("entra");
  if (nuevaPantalla) {
    [...screen.children].forEach((hijo, i) => hijo.style.setProperty("--i", Math.min(i, 8)));
    void screen.offsetWidth; // truco: obliga al navegador a "reiniciar" la animación
    screen.classList.add("entra");
  }
  renderNav();
}

function renderNav() {
  const tabs = [["inicio", "home", "Inicio"], ["explorar", "search", "Explorar"], ["carrito", "cart", "Carrito"], ["perfil", "user", "Perfil"]];
  const n = cantidadCarrito();
  $("#nav").innerHTML = tabs.map(([id, icono, txt]) => `
    <button class="${state.ultimaPestana === id ? "on" : ""}" data-go="${id}" aria-label="${txt}">
      <span class="ico">${ic(icono, 22)}</span>${txt}
      ${id === "carrito" && n ? `<span class="count num">${n}</span>` : ""}
    </button>`).join("");
}

/* =========================================================
   10. AVISOS (toast) Y HOJA DE CONFIRMACIÓN
   ========================================================= */
// Hace "latir" los corazones recién tocados
function latido(selector) {
  document.querySelectorAll(selector).forEach((n) => n.classList.add("latido"));
}

let timerToast;
function aviso(texto) {
  const t = $("#toast");
  t.textContent = texto;
  t.classList.remove("off");
  clearTimeout(timerToast);
  timerToast = setTimeout(() => t.classList.add("off"), 2200);
}

function confirmarPedido() {
  const nPymes = new Set(Object.keys(state.carrito).map((id) => producto(id).pyme)).size;
  $("#sheet").innerHTML = `
  <div class="sheet-bg" data-act="cerrar">
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="ok-titulo">
      <span class="big">🎉</span>
      <h3 id="ok-titulo">¡Pedido enviado!</h3>
      <p>Tu pedido llegó a ${nPymes} ${nPymes === 1 ? "pyme" : "pymes"} de Macul. Te avisarán por WhatsApp cuando esté listo.</p>
      <button class="btn btn-primary" data-act="terminar">Volver al inicio</button>
    </div>
  </div>`;
}

/* =========================================================
   11. CLICS
   Un solo "escuchador" para toda la app. Revisa qué tipo
   de botón se tocó usando los atributos data-*.
   ========================================================= */
$("#app").addEventListener("click", (ev) => {
  const el = (sel) => ev.target.closest(sel);

  // 1) Favorito (va primero porque está dentro de una tarjeta)
  const fav = el("[data-fav]");
  if (fav) {
    const id = fav.dataset.fav;
    if (state.favoritos.has(id)) { state.favoritos.delete(id); aviso("Quitado de favoritos"); }
    else { state.favoritos.add(id); aviso("❤️ Guardado en favoritos"); }
    render();
    latido(`[data-fav="${id}"]`);
    return;
  }

  // 2) Botón "+" de una tarjeta: añade 1 al carrito
  const add = el("[data-add]");
  if (add) {
    const id = add.dataset.add;
    if (producto(id).cotizar) return ir("producto-" + id); // se cotiza: abre el detalle
    state.carrito[id] = (state.carrito[id] || 0) + 1;
    aviso(`🛒 ${producto(id).nombre} añadido al carrito`);
    render(); return;
  }

  // 3) Cambiar cantidad dentro del carrito
  const qty = el("[data-qty]");
  if (qty) {
    const [id, delta] = qty.dataset.qty.split(":");
    state.carrito[id] += Number(delta);
    if (state.carrito[id] <= 0) { delete state.carrito[id]; aviso("Producto quitado del carrito"); }
    render(); return;
  }

  // 4) Categorías
  const cat = el("[data-cat]");
  if (cat) {
    const [donde, id] = cat.dataset.cat.split(":");
    if (donde === "inicio") state.catInicio = id; else state.catExplorar = id;
    render(); return;
  }

  // 5) Acciones especiales
  const act = el("[data-act]");
  if (act) {
    const a = act.dataset.act;
    const r = rutaActual();
    const y = r.startsWith("pyme-") ? pyme(r.slice(5)) : r.startsWith("producto-") ? pyme(producto(r.slice(9)).pyme) : null;

    if (a === "cerrar" && ev.target !== act) return; // clic dentro de la hoja: no cerrar
    if (a === "atras") return atras();
    if (a === "avisos") return aviso("🔔 El Menú publicó Palta Hass a $3.990");
    if (a === "compartir") return aviso("Enlace listo para compartir");
    if (a === "seguir") {
      if (state.siguiendo.has(y.id)) { state.siguiendo.delete(y.id); aviso(`Dejaste de seguir a ${y.nombre}`); }
      else { state.siguiendo.add(y.id); aviso(`❤️ Sigues a ${y.nombre}`); }
      render();
      latido('[data-act="seguir"]');
      return;
    }
    if (a === "whatsapp") return aviso("Abriendo WhatsApp…");
    if (a === "mapa") return aviso(`📍 ${y.dir}, Macul`);
    if (a === "pronto") return aviso("Esta sección viene en la próxima versión");
    if (a === "ver-clave") {
      // Mostrar/ocultar la contraseña sin redibujar (así no se borra lo escrito)
      const campo = $("#clave");
      const ver = campo.type === "password";
      campo.type = ver ? "text" : "password";
      act.innerHTML = ic(ver ? "eyeOff" : "eye", 18);
      act.setAttribute("aria-label", ver ? "Ocultar contraseña" : "Mostrar contraseña");
      return;
    }
    if (a === "olvide") return aviso("Te enviaríamos un correo para crear una contraseña nueva");
    if (a === "registro") return aviso("El registro viene en la próxima versión");
    if (a === "invitado") return entrar("Vecino");
    if (a.startsWith("logo-")) {
      state.logoPyme = Number(a.slice(5));
      document.querySelectorAll(".logo-opt").forEach((b, i) => {
        b.classList.toggle("on", i === state.logoPyme);
        b.setAttribute("aria-checked", i === state.logoPyme);
      });
      return;
    }
    if (a === "salir") { state.logueado = false; pila.length = 0; aviso("Cerraste sesión"); return ir("ingresar"); }
    if (a.startsWith("tab-")) { state.tabPyme = a.slice(4); return render(); }
    if (a.startsWith("ptab-")) { state.tabProducto = a.slice(5); return render(); }
    if (a === "escribir-resena") {
      state.tabProducto = "resenas"; render();
      $("#tabs-producto").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (a.startsWith("estrella-")) { state.estrellas = Number(a.slice(9)); return render(); }
    if (a.startsWith("foto-")) { state.foto = Number(a.slice(5)); return render(); }
    if (a.startsWith("slide-")) { mostrarNoticia(Number(a.slice(6))); return reiniciarCarrusel(); }
    if (a === "mas") { state.cantidad++; return render(); }
    if (a === "menos") { state.cantidad = Math.max(1, state.cantidad - 1); return render(); }
    if (a === "agregar" || a === "comprar") {
      const id = act.dataset.id;
      state.carrito[id] = (state.carrito[id] || 0) + state.cantidad;
      if (a === "comprar") return ir("carrito");
      aviso(`🛒 ${state.cantidad} × ${producto(id).nombre} en tu carrito`);
      return render();
    }
    if (a.startsWith("entrega-")) { state.entrega = a.slice(8); return render(); }
    if (a === "vaciar") { state.carrito = {}; aviso("Carrito vaciado"); return render(); }
    if (a === "pagar") return confirmarPedido();
    if (a === "cerrar" || a === "cerrar-hoja") { $("#sheet").innerHTML = ""; return; }
    if (a === "cambiar-foto") return elegirFoto();
    if (a === "ver-mi-pyme") { $("#sheet").innerHTML = ""; return ir("pyme-" + act.dataset.id); }
    if (a === "reg-listo") { $("#sheet").innerHTML = ""; return ir("perfil"); }
    if (a.startsWith("avatar-")) {
      state.avatar = Number(a.slice(7));
      $("#sheet").innerHTML = "";
      aviso("📸 Foto de perfil actualizada");
      return render();
    }
    if (a === "terminar") { state.carrito = {}; state.cupon = null; $("#sheet").innerHTML = ""; return ir("inicio"); }
  }

  // 6) Navegar a otra pantalla
  const go = el("[data-go]");
  if (go) ir(go.dataset.go);
});

// Buscador de Explorar: filtra mientras escribes (sin perder el foco)
$("#app").addEventListener("input", (ev) => {
  if (ev.target.id === "buscar") {
    state.busqueda = ev.target.value;
    $("#resultados").innerHTML = resultadosExplorar();
  }
});

// Registrar pyme (prueba): la agrega a "Pymes nuevas"
$("#app").addEventListener("submit", (ev) => {
  if (ev.target.id !== "form-pyme") return;
  ev.preventDefault();
  const val = (id) => $("#" + id).value.trim();
  // Si dejas algo vacío, se usan datos genéricos (así siempre se crea la pyme)
  const nombre = val("reg-nombre") || "Katas and fy";
  const dir = val("reg-dir") || "Av. Macul s/n";

  // Escapamos los textos para que nadie pueda meter HTML
  const limpio = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const [emoji, colores] = LOGOS_PYME[state.logoPyme];
  const rubro = val("reg-rubro");
  const cat = CATEGORIAS.find((c) => c.id === rubro);
  const id = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now() % 1000;
  PYMES.push({
    id, nombre: limpio(nombre), corto: limpio(nombre.split(" ").slice(0, 2).join(" ")),
    emoji: esImagen(emoji) ? "🏪" : emoji, logo: esImagen(emoji) ? emoji : undefined, logoLleno: true, grad: colores,
    rubro, rubroTxt: cat.nombre, dir: limpio(dir), km: "0,5", rating: "5,0", resenas: 0, cierra: val("reg-cierra") || "19:00",
    nueva: true, bio: limpio(val("reg-desc")) || (val("reg-nombre") ? "Pyme nueva en MiMacul. ¡Pronto subiremos nuestros productos!" : "Katas and fy hace los mejores diseños que disain")
  });
  state.logoPyme = 0;
  $("#reg-msg").innerHTML = "";

  $("#sheet").innerHTML = `
  <div class="sheet-bg" data-act="cerrar">
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="reg-ok">
      ${esImagen(emoji) ? `<img src="${emoji}" alt="" style="width:84px;height:84px;border-radius:99px;object-fit:cover;justify-self:center">` : `<span class="big">${emoji}</span>`}
      <h3 id="reg-ok">¡${limpio(nombre)} está registrada!</h3>
      <p>Ya aparece en "Pymes nuevas" y en Explorar.</p>
      <button class="btn btn-primary" data-act="ver-mi-pyme" data-id="${id}">Ver mi pyme</button>
      <button class="btn btn-secondary" data-act="reg-listo">Listo</button>
    </div>
  </div>`;
});

// Iniciar sesión (prototipo: acepta cualquier correo válido)
function entrar(nombre) {
  state.logueado = true;
  state.usuario = nombre;
  pila.length = 0; // así el botón "atrás" no te devuelve al inicio de sesión
  ir("inicio");
  aviso(`👋 ¡Bienvenido/a, ${nombre}!`);
}

$("#app").addEventListener("submit", (ev) => {
  if (ev.target.id !== "form-login") return;
  ev.preventDefault();
  const correo = $("#correo").value.trim();
  const clave = $("#clave").value;
  const error = (t) => { $("#login-msg").innerHTML = `<p class="coupon-msg" style="color:var(--danger);margin:0">${t}</p>`; };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) return error("Escribe un correo válido, por ejemplo nombre@correo.cl");
  if (clave.length < 4) return error("La contraseña debe tener al menos 4 caracteres.");
  // El nombre sale de lo que está antes del @ y de cualquier punto o número
  // (kataffy@... → Kataffy, paula.triat@... → Paula)
  const base = correo.split("@")[0].split(/[._\-+0-9]/)[0].replace(/[^a-záéíóúñ]/gi, "");
  entrar(base ? base[0].toUpperCase() + base.slice(1).toLowerCase() : "Vecino");
});

// Guardar lo que escribes en la reseña (para no perderlo al tocar las estrellas)
$("#app").addEventListener("input", (ev) => {
  if (ev.target.id === "resena-txt") state.borrador = ev.target.value;
});

// Publicar una reseña
$("#app").addEventListener("submit", (ev) => {
  if (ev.target.id !== "form-resena") return;
  ev.preventDefault();
  const texto = state.borrador.trim();
  const msg = (t) => { $("#resena-msg").innerHTML = `<p class="coupon-msg" style="color:var(--danger);margin:0">${t}</p>`; };
  if (!state.estrellas) return msg("Elige cuántas estrellas le das.");
  if (texto.length < 5) return msg("Escribe un poco más sobre el producto.");
  const id = rutaActual().slice(9);
  // Escapamos el texto para que nadie pueda meter HTML en la reseña
  const seguro = texto.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  (state.misResenas[id] ||= []).unshift({ quien: state.usuario, estrellas: state.estrellas, txt: seguro, mia: true });
  state.estrellas = 0; state.borrador = "";
  aviso("⭐ ¡Gracias por tu reseña!");
  render();
});

// Cupón de descuento
$("#app").addEventListener("submit", (ev) => {
  if (ev.target.id !== "form-cupon") return;
  ev.preventDefault();
  const codigo = $("#cupon").value.trim().toUpperCase();
  if (state.cupon && codigo === state.cupon) { state.cupon = null; return render(); }
  if (CUPONES[codigo]) { state.cupon = codigo; aviso("🎉 Cupón aplicado"); render(); }
  else $("#cupon-msg").innerHTML = `<p class="coupon-msg" style="color:var(--danger)">El código “${codigo || "vacío"}” no existe. Prueba con BARRIOMACUL.</p>`;
});

/* =========================================================
   12. CARRUSEL AUTOMÁTICO
   Cada SEGUNDOS_CARRUSEL segundos pasa a la siguiente noticia.
   Solo movemos la cinta (no redibujamos toda la pantalla).
   ========================================================= */
function mostrarNoticia(i) {
  state.slide = (i + NOTICIAS.length) % NOTICIAS.length; // al llegar al final, vuelve a la primera
  const track = $("#track");
  if (!track) return; // no estamos en Inicio
  track.style.transform = `translateX(-${state.slide * 100}%)`;
  document.querySelectorAll(".cdots button").forEach((b, k) => b.classList.toggle("on", k === state.slide));
}

let timerCarrusel;
function reiniciarCarrusel() {
  clearInterval(timerCarrusel);
  timerCarrusel = setInterval(() => {
    if (rutaActual() === "inicio") mostrarNoticia(state.slide + 1);
  }, SEGUNDOS_CARRUSEL * 1000);
}

// Deslizar con el dedo (o el mouse) para cambiar de noticia
let inicioX = null;
$("#app").addEventListener("pointerdown", (ev) => { if (ev.target.closest("#track")) inicioX = ev.clientX; });
$("#app").addEventListener("pointerup", (ev) => {
  if (inicioX === null) return;
  const dx = ev.clientX - inicioX;
  inicioX = null;
  if (Math.abs(dx) > 40) { mostrarNoticia(state.slide + (dx < 0 ? 1 : -1)); reiniciarCarrusel(); }
});

// ¡Arrancamos!
render(true);
reiniciarCarrusel();
