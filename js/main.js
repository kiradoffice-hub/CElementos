/* ============================================================
   CAFÉ ELEMENTOS - MAIN.JS FINAL (2025)
   ============================================================ */

/* ============================================================
   CONFIGURACIÓN EMAILJS
   ============================================================ */
const EMAILJS_SERVICE_ID = 'service_ez74agp';
const EMAILJS_TEMPLATE_ID = 'template_rv4qwdj';
const EMAILJS_PUBLIC_KEY = 'nb75RxYtqPNBOw3O2';

/* Inicializar EmailJS */
emailjs.init(EMAILJS_PUBLIC_KEY);

/* ============================================================
   VARIABLES GLOBALES
   ============================================================ */
let cart = [];
let selectedWeights = {};
let selectedMenuSizes = {};
let currentLanguage = localStorage.getItem("lang") || "es";

/* ============================================================
   DATOS DE PRODUCTOS
   ============================================================ */
const PRODUCT_IMAGE = "https://scontent.fvsa2-1.fna.fbcdn.net/v/t39.30808-6/495601645_1198908208917618_4324142393229895495_n.jpg?...";

const products = [
    {
        id: 1,
        name: 'Aldama, Chiapas',
        origin: 'Cafeología Natural',
        prices: { '1/4': 350, '1/2': 700, '1kg': 1400 },
        image: PRODUCT_IMAGE
    },
    {
        id: 2,
        name: 'Tatetela, Veracruz',
        origin: 'Lavado',
        prices: { '1/4': 120, '1/2': 240, '1kg': 480 },
        image: PRODUCT_IMAGE
    },
    {
        id: 3,
        name: 'Adelitas, Chiapas',
        origin: 'Lavado',
        prices: { '1/4': 120, '1/2': 240, '1kg': 480 },
        image: PRODUCT_IMAGE
    }
];

/* ============================================================
   DATOS DEL MENÚ (BEBIDAS)
   ============================================================ */
const menuItems = {
    frappes: [
        { id: 101, name: 'Frapuccino', price: 75 },
        { id: 102, name: 'Cajeta', price: 75 },
        { id: 103, name: 'Oreo', price: 75 },
        { id: 104, name: 'Moca', price: 75 }
    ],
    hotCoffee: [
        { id: 201, name: 'Espresso', prices: { 'Chico': 45, 'Grande': 48 } },
        { id: 202, name: 'Latte', prices: { 'Chico': 68, 'Grande': 72 } },
        { id: 203, name: 'Espresso cortado', price: 48 }
    ],
    teas: [
        { id: 301, name: 'Té Verde', price: 40 },
        { id: 302, name: 'Té Negro', price: 40 }
    ]
};

/* ============================================================
   RENDERIZADO DE PÁGINAS
   ============================================================ */
function showPage(page) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));
    document.getElementById(`page-${page}`).classList.remove('hidden');

    closeMobileMenu();
    window.scrollTo(0, 0);
}

/* ============================================================
   RENDERIZADO DE PRODUCTOS (TIENDA + PRODUCTOS)
   ============================================================ */
function createProductCard(product, containerId) {
    const weight = selectedWeights[product.id] || '1/4';
    const price = product.prices[weight];

    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}">
            </div>

            <h3>${product.name}</h3>
            <p class="origin">${product.origin}</p>

            <div class="product-weights">
                ${Object.keys(product.prices).map(w => `
                    <button class="weight-btn ${w === weight ? 'active' : ''}"
                        onclick="selectWeight(${product.id}, '${w}', '${containerId}')">${w}</button>
                `).join('')}
            </div>

            <p class="product-price" id="price-${containerId}-${product.id}">
                $${price}.00 MXN
            </p>

            <button class="add-btn" onclick="addToCart(${product.id})">Agregar al carrito</button>
        </div>
    `;
}

function renderProducts() {
    const container = document.getElementById('productsGrid');
    if (container) {
        container.innerHTML = products.map(p => createProductCard(p, 'productos')).join('');
    }
}

function renderStoreProducts() {
    const container = document.getElementById('storeProductsGrid');
    if (container) {
        container.innerHTML = products.map(p => createProductCard(p, 'tienda')).join('');
        document.getElementById('totalProducts').textContent = products.length;
    }
}

/* ============================================================
   SELECCIÓN DE PESO
   ============================================================ */
function selectWeight(productId, weight, containerId) {
    selectedWeights[productId] = weight;
    const product = products.find(p => p.id === productId);

    const priceEl = document.getElementById(`price-${containerId}-${productId}`);
    priceEl.textContent = `$${product.prices[weight]}.00 MXN`;

    document.querySelectorAll(`.product-card[data-product-id="${productId}"] .weight-btn`)
        .forEach(btn => {
            btn.classList.toggle('active', btn.textContent.includes(weight));
        });
}

/* ============================================================
   MENÚ (BEBIDAS)
   ============================================================ */
function createMenuItem(item) {
    const hasSizes = item.prices && typeof item.prices === "object";
    const selectedSize = selectedMenuSizes[item.id];
    const currentPrice = hasSizes ? item.prices[selectedSize] : item.price;

    return `
        <div class="menu-item" data-menu-id="${item.id}">
            <div class="menu-item-header">
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-price" id="menu-price-${item.id}">$${currentPrice}.00</div>
            </div>

            ${hasSizes ? `
                <div class="menu-item-sizes">
                    ${Object.keys(item.prices).map(size => `
                        <button class="size-btn ${selectedSize === size ? 'active' : ''}"
                                onclick="selectMenuSize(${item.id}, '${size}')">${size}</button>
                    `).join('')}
                </div>
            ` : ''}

            <button class="menu-item-add" onclick="addMenuToCart(${item.id})">+ Agregar al carrito</button>
        </div>
    `;
}

function renderMenuItems() {
    document.getElementById('menuFrappes').innerHTML =
        menuItems.frappes.map(item => createMenuItem(item)).join('');

    document.getElementById('menuHotCoffee').innerHTML =
        menuItems.hotCoffee.map(item => createMenuItem(item)).join('');

    document.getElementById('menuTeas').innerHTML =
        menuItems.teas.map(item => createMenuItem(item)).join('');
}

function selectMenuSize(itemId, size) {
    selectedMenuSizes[itemId] = size;

    const item = Object.values(menuItems).flat().find(i => i.id === itemId);
    document.getElementById(`menu-price-${itemId}`).textContent = `$${item.prices[size]}.00`;

    const buttons = document.querySelectorAll(`.menu-item[data-menu-id="${itemId}"] .size-btn`);
    buttons.forEach(btn => btn.classList.toggle('active', btn.textContent === size));
}

/* ============================================================
   CARRITO
   ============================================================ */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const weight = selectedWeights[productId] || '1/4';

    const existing = cart.find(i => i.id === productId && i.weight === weight && i.type === "product");

    if (existing) existing.quantity++;
    else {
        cart.push({
            id: productId,
            type: "product",
            name: product.name,
            origin: product.origin,
            weight,
            price: product.prices[weight],
            quantity: 1,
            image: product.image
        });
    }

    updateCart();
}

function addMenuToCart(itemId) {
    const item = Object.values(menuItems).flat().find(i => i.id === itemId);

    const size = selectedMenuSizes[itemId] || null;
    const price = item.prices ? item.prices[size] : item.price;

    const existing = cart.find(i =>
        i.id === itemId && i.size === size && i.type === "menu"
    );

    if (existing) existing.quantity++;
    else {
        cart.push({
            id: itemId,
            type: "menu",
            name: item.name,
            size: size,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}

function updateCart() {
    document.getElementById('cartCount').textContent =
        document.getElementById('cartCount2').textContent = cart.reduce((t, i) => t + i.quantity, 0);
}

/* ============================================================
   CHAT
   ============================================================ */
function toggleChat() {
    document.getElementById("chatWindow").classList.toggle("active");
}

/* ============================================================
   BÚSQUEDA PRINCIPAL
   ============================================================ */
function handleSearch(e) {
    if (e.key === "Enter") performSearch();
}

function performSearch() {
    const term = document.getElementById("searchInput").value.toLowerCase().trim();
    if (!term) return;

    showPage("productos");

    const container = document.getElementById("productsGrid");
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));

    container.innerHTML = filtered.length
        ? filtered.map(p => createProductCard(p, 'productos')).join('')
        : `<p class="no-results">No se encontraron productos.</p>`;
}

function handleMainSearch(e) {
    if (e.key === "Enter") performMainSearch();
}

function performMainSearch() {
    const term = document.getElementById("mainSearchInput").value.toLowerCase().trim();
    if (!term) return;

    showPage("productos");

    const container = document.getElementById("productsGrid");
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));

    container.innerHTML = filtered.length
        ? filtered.map(p => createProductCard(p, 'productos')).join('')
        : `<p class="no-results">No se encontraron productos.</p>`;
}

/* ============================================================
   MENÚ HAMBURGUESA (MÓVIL)
   ============================================================ */
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenuContainer = document.getElementById("mobileMenuContainer");

mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active");
    mobileMenuContainer.classList.toggle("active");

    document.body.style.overflow =
        mobileMenuContainer.classList.contains("active") ? "hidden" : "auto";
});

/* Cerrar al tocar un link */
document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => closeMobileMenu());
});

/* Cerrar al tocar afuera */
document.addEventListener("click", e => {
    if (
        mobileMenuContainer.classList.contains("active") &&
        !mobileMenuContainer.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
    ) {
        closeMobileMenu();
    }
});

function closeMobileMenu() {
    mobileMenuBtn.classList.remove("active");
    mobileMenuContainer.classList.remove("active");
    document.body.style.overflow = "auto";
}

/* ============================================================
   CAMBIO DE IDIOMA
   ============================================================ */
const languageSelect = document.getElementById("languageSelect");

languageSelect.value = currentLanguage;

languageSelect.addEventListener("change", function () {
    changeLanguage(this.value);
});

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem("lang", lang);

    /* Se pueden traducir textos aquí si deseas */

    location.reload(); // más simple y seguro para tu sitio actual
}

/* ============================================================
   INICIALIZACIÓN
   ============================================================ */
window.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    renderStoreProducts();
    renderMenuItems();
    updateCart();
    showPage('bienvenido');
});
