"use strict"; // modo estricto: avisa de errores comunes (variables sin declarar, etc.)

/* ===== 1. DATOS =====
   Textos en dos idiomas. Cada clave coincide con un data-i18n del HTML. */
const T = {
  es: {
    skip: "Saltar al contenido", nav_inicio: "inicio", nav_tienda: "tienda", nav_donar: "¿quieres donar?",
    nav_locales: "locales", nav_contacto: "contáctanos",
    slogan: "Repostería con propósito, dulzura en cada calle",
    intro: "¿Cuál es tu próximo antojo? Aquí buscamos darle ese toque dulce a tu día y, al mismo tiempo, ayudar a una vida.",
    cta_tienda: "Ver la tienda", h_nosotros: "¿Qué es Calles Dulces?", h_historia: "Nuestra historia",
    p_historia: "Nace de la idea de que un postre no solo endulza el día: con tu compra ayudas a otros. Un pequeño detalle también genera impacto en la comunidad.",
    h_meta: "Nuestra meta", p_meta: "Con tu apoyo, compras y donaciones, jóvenes y personas en situación de calle tendrán una oportunidad en la vida.",
    h_compromiso: "Nuestro compromiso", p_compromiso: "Calidad, honestidad y solidaridad.",
    h_tienda: "Tienda", f_buscar: "Buscar", f_buscar_ph: "buscar postre...", f_tipo: "Tipo", f_ingrediente: "Ingrediente",
    f_region: "Región", f_limpiar: "Limpiar filtros", h_favoritos: "Favoritos de la semana", h_catalogo: "Todos los postres",
    vacio: "No encontramos postres con esos filtros.", reco: "¿Algún postre que no esté en el catálogo? ¡Dínoslo!",
    reco_ph: "recomendación...", reco_btn: "Enviar", h_donar: "¿Quieres donar?",
    p_donar: "Elige un monto. Esta es una demostración: no se hace ningún cobro real.", monto: "Monto", donar_btn: "Donar",
    h_locales: "Nuestros locales", locales_msg: "Pronto abriremos nuestro local. Síguenos en redes sociales para estar al pendiente.",
    h_contacto: "Contáctanos", c_nombre: "Nombre", c_correo: "Correo", c_mensaje: "Mensaje", c_enviar: "Enviar mensaje",
    footer: "Dulces cambian vidas.", h_carrito: "Mi carrito", carrito_vacio: "Tu carrito está vacío.", total: "Total",
    pagar: "Finalizar compra", vaciar: "Vaciar carrito",
    // textos que usa el propio JS
    anadir: "añadir al carrito", todos: "Todos", resultados: n => `${n} postre(s) encontrado(s)`,
    msg_anadido: n => `${n} añadido al carrito`, msg_pagar: "¡Gracias! (demo: no se hizo ningún cobro)",
    msg_donar: "¡Gracias por tu donación! (demo)", msg_elige: "Primero elige un monto", msg_enviado: "¡Mensaje enviado! (demo)",
    msg_reco: "¡Gracias por tu recomendación!", msg_vacio: "Tu carrito está vacío", quitar: "Quitar",
    tipo: { chocolate: "Chocolates", pastel: "Pasteles", galleta: "Galletas", muffin: "Muffins", crunch: "Postre crunch" },
    ing: { chocolate: "Chocolate", fruta: "Fruta", nueces: "Nueces", cafe: "Café", queso: "Queso crema" },
    region: { colombia: "Colombia", francia: "Francia", italia: "Italia", eeuu: "Estados Unidos" }
  },
  en: {
    skip: "Skip to content", nav_inicio: "home", nav_tienda: "shop", nav_donar: "want to donate?",
    nav_locales: "locations", nav_contacto: "contact us",
    slogan: "Pastries with purpose, sweetness on every street",
    intro: "What's your next craving? We bring a sweet touch to your day while helping change a life.",
    cta_tienda: "Visit the shop", h_nosotros: "What is Calles Dulces?", h_historia: "Our story",
    p_historia: "It started from the idea that a dessert does more than sweeten your day: your purchase helps others. A small gesture can make an impact on our community.",
    h_meta: "Our goal", p_meta: "With your support, purchases and donations, young people and people living on the street will get a chance in life.",
    h_compromiso: "Our commitment", p_compromiso: "Quality, honesty and solidarity.",
    h_tienda: "Shop", f_buscar: "Search", f_buscar_ph: "search dessert...", f_tipo: "Type", f_ingrediente: "Ingredient",
    f_region: "Region", f_limpiar: "Clear filters", h_favoritos: "Favorites of the week", h_catalogo: "All desserts",
    vacio: "We couldn't find desserts with those filters.", reco: "A dessert that's not in our catalog? Tell us!",
    reco_ph: "suggestion...", reco_btn: "Send", h_donar: "Want to donate?",
    p_donar: "Pick an amount. This is a demo: no real charge is made.", monto: "Amount", donar_btn: "Donate",
    h_locales: "Our locations", locales_msg: "Our first store is opening soon. Follow us on social media to stay tuned.",
    h_contacto: "Contact us", c_nombre: "Name", c_correo: "Email", c_mensaje: "Message", c_enviar: "Send message",
    footer: "Sweets change lives.", h_carrito: "My cart", carrito_vacio: "Your cart is empty.", total: "Total",
    pagar: "Checkout", vaciar: "Empty cart",
    anadir: "add to cart", todos: "All", resultados: n => `${n} dessert(s) found`,
    msg_anadido: n => `${n} added to cart`, msg_pagar: "Thank you! (demo: nothing was charged)",
    msg_donar: "Thank you for your donation! (demo)", msg_elige: "Pick an amount first", msg_enviado: "Message sent! (demo)",
    msg_reco: "Thanks for your suggestion!", msg_vacio: "Your cart is empty", quitar: "Remove",
    tipo: { chocolate: "Chocolates", pastel: "Cakes", galleta: "Cookies", muffin: "Muffins", crunch: "Crunchy desserts" },
    ing: { chocolate: "Chocolate", fruta: "Fruit", nueces: "Nuts", cafe: "Coffee", queso: "Cream cheese" },
    region: { colombia: "Colombia", francia: "France", italia: "Italy", eeuu: "United States" }
  }
};

// Catálogo de ejemplo. precio en COP. fav:true => aparece en "favoritos de la semana"
const PRODUCTOS = [
  { id: 1, emoji: "🍰", nombre: { es: "Tiramisú", en: "Tiramisu" }, precio: 10000, tipo: "pastel", ing: ["cafe", "queso"], region: "italia", fav: true },
  { id: 2, emoji: "🍫", nombre: { es: "Brownie", en: "Brownie" }, precio: 3000, tipo: "chocolate", ing: ["chocolate", "nueces"], region: "eeuu", fav: true },
  { id: 3, emoji: "🍪", nombre: { es: "Galleta con chips", en: "Chocolate chip cookie" }, precio: 2500, tipo: "galleta", ing: ["chocolate"], region: "eeuu", fav: true },
  { id: 4, emoji: "🧁", nombre: { es: "Muffin de arándanos", en: "Blueberry muffin" }, precio: 3500, tipo: "muffin", ing: ["fruta"], region: "eeuu", fav: false },
  { id: 5, emoji: "🥐", nombre: { es: "Croissant de chocolate", en: "Chocolate croissant" }, precio: 4500, tipo: "chocolate", ing: ["chocolate"], region: "francia", fav: false },
  { id: 6, emoji: "🍮", nombre: { es: "Crunch de arequipe", en: "Dulce de leche crunch" }, precio: 5000, tipo: "crunch", ing: ["nueces"], region: "colombia", fav: false },
  { id: 7, emoji: "🎂", nombre: { es: "Torta de queso y guayaba", en: "Guava cheesecake" }, precio: 9000, tipo: "pastel", ing: ["fruta", "queso"], region: "colombia", fav: false },
  { id: 8, emoji: "🍩", nombre: { es: "Dona glaseada", en: "Glazed donut" }, precio: 3000, tipo: "crunch", ing: ["chocolate"], region: "eeuu", fav: false }
];

/* ===== 2. ESTADO =====
   Variables que cambian mientras se usa la página. Se guardan en localStorage
   (memoria del navegador) para que sobrevivan al recargar. */
const guardado = clave => { try { return JSON.parse(localStorage.getItem(clave)); } catch { return null; } };
let idioma = guardado("cd-idioma") || (navigator.language.startsWith("en") ? "en" : "es");
let tema = guardado("cd-tema") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
let carrito = guardado("cd-carrito") || [];          // [{id, cant}]
let montoElegido = 0;

/* ===== 3. UTILIDADES ===== */
const $ = sel => document.querySelector(sel);               // atajo para buscar un elemento
const $$ = sel => document.querySelectorAll(sel);           // atajo para buscar varios
const guardar = (clave, valor) => localStorage.setItem(clave, JSON.stringify(valor));
const dinero = n => new Intl.NumberFormat(idioma === "es" ? "es-CO" : "en-US",
  { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

let temporizador;
function avisar(texto) {                                     // muestra el aviso 2.5 segundos
  const a = $("#aviso");
  a.textContent = texto;
  a.classList.add("ver");
  clearTimeout(temporizador);
  temporizador = setTimeout(() => a.classList.remove("ver"), 2500);
}

/* ===== 4. TEMA ===== */
function aplicarTema() {
  document.documentElement.dataset.theme = tema;             // el CSS reacciona a [data-theme]
  $("#btn-tema").textContent = tema === "dark" ? "☀️" : "🌙";
  guardar("cd-tema", tema);
}

/* ===== 5. IDIOMA ===== */
function aplicarIdioma() {
  document.documentElement.lang = idioma;
  $$("[data-i18n]").forEach(el => { el.textContent = T[idioma][el.dataset.i18n]; });
  $$("[data-i18n-ph]").forEach(el => { el.placeholder = T[idioma][el.dataset.i18nPh]; });
  $("#btn-idioma").textContent = idioma === "es" ? "EN" : "ES";
  llenarSelects();
  renderProductos();
  renderCarrito();
  guardar("cd-idioma", idioma);
}

/* ===== 6. FILTROS ===== */
function llenarSelects() {
  const t = T[idioma];
  // Conserva la opción elegida al cambiar de idioma
  const llenar = (sel, mapa) => {
    const previo = sel.value || "";
    sel.innerHTML = `<option value="">${t.todos}</option>` +
      Object.entries(mapa).map(([k, v]) => `<option value="${k}">${v}</option>`).join("");
    sel.value = previo;
  };
  llenar($("#f-tipo"), t.tipo);
  llenar($("#f-ing"), t.ing);
  llenar($("#f-region"), t.region);
}

function filtrados() {
  const texto = $("#f-texto").value.trim().toLowerCase();
  const tipo = $("#f-tipo").value, ing = $("#f-ing").value, region = $("#f-region").value;
  return PRODUCTOS.filter(p =>
    p.nombre[idioma].toLowerCase().includes(texto) &&
    (!tipo || p.tipo === tipo) &&
    (!ing || p.ing.includes(ing)) &&
    (!region || p.region === region));
}

function tarjeta(p) {
  const t = T[idioma];
  return `<article class="producto">
    <div class="emoji" aria-hidden="true">${p.emoji}</div>
    <h4>${p.nombre[idioma]}</h4>
    <p class="etiquetas">${t.tipo[p.tipo]} · ${t.region[p.region]}</p>
    <p class="precio">${dinero(p.precio)}</p>
    <button class="boton" type="button" data-id="${p.id}">${t.anadir}</button>
  </article>`;
}

function renderProductos() {
  const lista = filtrados();
  const favs = lista.filter(p => p.fav);
  $("#grid-favoritos").innerHTML = favs.map(tarjeta).join("");
  $("#grid-catalogo").innerHTML = lista.map(tarjeta).join("");
  $("#vacio").hidden = lista.length > 0;
  $("#resultados").textContent = T[idioma].resultados(lista.length);
}

/* ===== 7. CARRITO ===== */
const buscar = id => PRODUCTOS.find(p => p.id === id);

function agregar(id) {
  const item = carrito.find(i => i.id === id);
  item ? item.cant++ : carrito.push({ id, cant: 1 });
  actualizarCarrito();
  avisar(T[idioma].msg_anadido(buscar(id).nombre[idioma]));
  const c = $("#contador");                                  // reinicia la animación del globito
  c.classList.remove("salto"); void c.offsetWidth; c.classList.add("salto");
}

function cambiarCantidad(id, delta) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;
  item.cant += delta;
  if (item.cant <= 0) carrito = carrito.filter(i => i.id !== id);   // si llega a 0, se quita
  actualizarCarrito();
}

function actualizarCarrito() { guardar("cd-carrito", carrito); renderCarrito(); }

function renderCarrito() {
  const t = T[idioma];
  $("#lista-carrito").innerHTML = carrito.map(i => {
    const p = buscar(i.id);
    return `<li>
      <strong>${p.emoji} ${p.nombre[idioma]}</strong>
      <span>${dinero(p.precio * i.cant)}</span>
      <div class="cantidad">
        <button type="button" data-menos="${i.id}" aria-label="-1">−</button>
        <span>${i.cant}</span>
        <button type="button" data-mas="${i.id}" aria-label="+1">+</button>
      </div>
      <button type="button" class="boton secundario" data-quitar="${i.id}">${t.quitar}</button>
    </li>`;
  }).join("");
  $("#carrito-vacio").hidden = carrito.length > 0;
  $("#contador").textContent = carrito.reduce((s, i) => s + i.cant, 0);
  $("#total").textContent = dinero(carrito.reduce((s, i) => s + buscar(i.id).precio * i.cant, 0));
}

function abrirCarrito(abrir) {
  $("#carrito").classList.toggle("abierto", abrir);
  $("#carrito").setAttribute("aria-hidden", String(!abrir));
  $("#velo").hidden = !abrir;
}

/* ===== 8. EVENTOS ===== */
$("#btn-tema").addEventListener("click", () => { tema = tema === "dark" ? "light" : "dark"; aplicarTema(); });
$("#btn-idioma").addEventListener("click", () => { idioma = idioma === "es" ? "en" : "es"; aplicarIdioma(); });
$("#btn-carrito").addEventListener("click", () => abrirCarrito(true));
$("#cerrar-carrito").addEventListener("click", () => abrirCarrito(false));
$("#velo").addEventListener("click", () => abrirCarrito(false));
document.addEventListener("keydown", e => { if (e.key === "Escape") abrirCarrito(false); });

// Delegación de eventos: un solo "click" en el contenedor sirve para todos los botones,
// incluso los creados después por el JS.
$("#tienda").addEventListener("click", e => {
  const b = e.target.closest("[data-id]");
  if (b) agregar(Number(b.dataset.id));
});
$("#lista-carrito").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.mas) cambiarCantidad(Number(b.dataset.mas), 1);
  if (b.dataset.menos) cambiarCantidad(Number(b.dataset.menos), -1);
  if (b.dataset.quitar) cambiarCantidad(Number(b.dataset.quitar), -999);
});
$("#btn-vaciar").addEventListener("click", () => { carrito = []; actualizarCarrito(); });
$("#btn-pagar").addEventListener("click", () => {
  if (!carrito.length) return avisar(T[idioma].msg_vacio);
  carrito = []; actualizarCarrito(); abrirCarrito(false); avisar(T[idioma].msg_pagar);
});

// Filtros: cualquier cambio vuelve a pintar los productos
["#f-texto", "#f-tipo", "#f-ing", "#f-region"].forEach(s => $(s).addEventListener("input", renderProductos));
$("#f-limpiar").addEventListener("click", () => {
  ["#f-texto", "#f-tipo", "#f-ing", "#f-region"].forEach(s => { $(s).value = ""; });
  renderProductos();
});

// Donaciones: marca el monto elegido
$$(".monto").forEach(b => b.addEventListener("click", () => {
  montoElegido = Number(b.dataset.monto);
  $$(".monto").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
}));
$("#btn-donar").addEventListener("click", () => avisar(montoElegido ? T[idioma].msg_donar : T[idioma].msg_elige));

// Formularios: preventDefault evita que la página se recargue al enviar
$("#form-contacto").addEventListener("submit", e => { e.preventDefault(); e.target.reset(); avisar(T[idioma].msg_enviado); });
$("#form-reco").addEventListener("submit", e => { e.preventDefault(); e.target.reset(); avisar(T[idioma].msg_reco); });

// Menú móvil
$("#btn-menu").addEventListener("click", e => {
  const abierto = $("#menu").classList.toggle("abierto");
  e.currentTarget.setAttribute("aria-expanded", String(abierto));
});
$$("#menu a").forEach(a => a.addEventListener("click", () => $("#menu").classList.remove("abierto")));

// Animación de scroll: IntersectionObserver avisa cuándo un elemento entra en pantalla
const observador = new IntersectionObserver(entradas => {
  entradas.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); observador.unobserve(en.target); } });
}, { threshold: 0.15 });
$$(".revelar").forEach(el => observador.observe(el));

/* ===== 9. INICIO ===== */
aplicarTema();
aplicarIdioma();   // también pinta productos y carrito
