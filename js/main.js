/* ============================================
   CAFÉ ELEMENTOS - JAVASCRIPT PRINCIPAL
   ============================================ */

// ============================================
// CONFIGURACIÓN EMAILJS
// ============================================
const EMAILJS_SERVICE_ID = 'service_ez74agp';
const EMAILJS_TEMPLATE_ID = 'template_rv4qwdj';
const EMAILJS_PUBLIC_KEY = 'nb75RxYtqPNBOw3O2';

// Inicializar EmailJS
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// ============================================
// DATOS DE PRODUCTOS
// ============================================
const PRODUCT_IMAGE = 'images/logo.jpeg';

const products = [
    {
        id: 1,
        name: 'Aldama, Chiapas',
        origin: 'Cafeología Natural',
        prices: { '1/4': 350, '1/2': 700, '1kg': 1400 },
        image: 'images/cafe_normal.jpeg',
        category: 'coffee'
    },
    {
        id: 2,
        name: 'Tatetela, Veracruz',
        origin: 'Lavado',
        prices: { '1/4': 120, '1/2': 240, '1kg': 480 },
        image: 'images/cafe_normal.jpeg',
        category: 'coffee'
    },
    {
        id: 3,
        name: 'Adelitas, Chiapas',
        origin: 'Lavado',
        prices: { '1/4': 120, '1/2': 240, '1kg': 480 },
        image: 'images/cafe_cafeologia.jpeg',
        category: 'coffee'
    }
];

// ============================================
// DATOS DEL MENÚ
// ============================================
const menuItems = {
    frappes: [
        { id: 101, name: 'Frapuccino', price: 75, category: 'drinks', type: 'frappe' },
        { id: 102, name: 'Cajeta', price: 75, category: 'drinks', type: 'frappe' },
        { id: 103, name: 'Oreo', price: 75, category: 'drinks', type: 'frappe' },
        { id: 104, name: 'Moca', price: 75, category: 'drinks', type: 'frappe' }
    ],
    hotCoffee: [
        { id: 201, name: 'Espresso', prices: { 'Chico': 45, 'Grande': 48 }, category: 'drinks', type: 'hot-coffee' },
        { id: 202, name: 'Latte', prices: { 'Chico': 68, 'Grande': 72 }, category: 'drinks', type: 'hot-coffee' },
        { id: 203, name: 'Espresso cortado', price: 48, category: 'drinks', type: 'hot-coffee' },
        { id: 204, name: 'Capuchino', price: 65, category: 'drinks', type: 'hot-coffee' },
        { id: 205, name: 'Americano', price: 48, category: 'drinks', type: 'hot-coffee' },
        { id: 206, name: 'Moca', prices: { 'Chico': 68, 'Grande': 72 }, category: 'drinks', type: 'hot-coffee' },
        { id: 207, name: 'Latte caramelo', price: 72, category: 'drinks', type: 'hot-coffee' },
        { id: 208, name: 'Choco-latte', prices: { 'Chico': 68, 'Grande': 72 }, category: 'drinks', type: 'hot-coffee' },
        { id: 209, name: 'Chocolatada', prices: { 'Chico': 68, 'Grande': 72 }, category: 'drinks', type: 'hot-coffee' }
    ],
    teas: [
        { id: 301, name: 'Té Negro (Earl Grey)', prices: { 'Chico': 68, 'Grande': 72 }, category: 'drinks', type: 'tea' },
        { id: 302, name: 'Té Negro Chai', prices: { 'Chico': 68, 'Grande': 72 }, category: 'drinks', type: 'tea' },
        { id: 303, name: 'Té Verde Flamingo Limonada', prices: { 'Chico': 68, 'Grande': 72 }, category: 'drinks', type: 'tea' },
        { id: 304, name: 'Matcha', prices: { 'Chico': 68, 'Grande': 72 }, category: 'drinks', type: 'tea' },
        { id: 305, name: 'Variedad de Tisanas', prices: { 'Chico': 68, 'Grande': 72 }, category: 'drinks', type: 'tea' }
    ]
};

// ============================================
// ESTADO GLOBAL
// ============================================
let cart = [];
let currentPage = 'bienvenido';
let selectedWeights = {};
let selectedMenuSizes = {};
let currentLanguage = 'es';
let currentSearchTerm = '';
let currentCategory = 'all';
// ============================================
// TRADUCCIONES
// ============================================
const translations = {
    es: {
        // Navegación
        'nav.welcome': 'Bienvenido',
        'nav.home': 'Inicio',
        'nav.menu': 'Menú',
        'nav.products': 'Productos',
        'nav.more': 'Más',
        'nav.main': 'Principal',
        
        // Página Bienvenido
        'welcome.promo.badge': '🔥 PROMOCIÓN',
        'welcome.promo.title': '¡2 Frappes por $120!',
        'welcome.promo.subtitle': 'Disfruta de nuestra promoción especial por tiempo limitado',
        'welcome.title': 'Bienvenido a Café Elementos',
        'welcome.description': 'El lugar donde el café cobra vida. Nos dedicamos a ofrecer café de alta calidad con un toque especial que deleita tus sentidos. Descubre nuestra pasión por el café en cada taza que preparamos.',
        'welcome.button': 'Explorar Nuestro Café',
        
        // Búsqueda
        'search.placeholder': 'Buscar productos...',
        'search.mainPlaceholder': 'Buscar café, bebidas, productos...',
        'search.button': '🔍 Buscar',
        'search.all': 'Todos',
        'search.coffee': 'Café a Granel',
        'search.drinks': 'Bebidas',
        'search.noResults': 'No se encontraron resultados para',
        
        // Newsletter
        'newsletter.title': 'SUSCRÍBETE',
        'newsletter.subtitle': 'Regístrate al correo electrónico para no perderte de nuestros eventos 2025',
        'newsletter.placeholder': 'Introduce tu correo electrónico aquí',
        'newsletter.button': 'Enviar',
        
        // Nosotros
'about.title': 'Acerca de Nosotros',
'about.subtitle': '☕ CAFÉ ELEMENTOS',
'about.brief': 'Breve descripción de la empresa',
'about.description1': 'Café Elementos es una cafetería inspirada en la pasión por el buen café y la convivencia auténtica. Nos dedicamos a crear bebidas y productos elaborados con granos seleccionados, procesos cuidados y sabores únicos que conectan con tus sentidos desde el primer sorbo.',
'about.description2': 'Nuestro propósito es que cada visita sea una experiencia cálida, agradable y significativa. Ya sea que vengas a relajarte, trabajar, compartir con amigos o simplemente disfrutar de un buen café, en Café Elementos siempre encontrarás un ambiente acogedor y un servicio atento.',
'about.description3': 'Nos encontramos en Villahermosa, Tabasco, ofreciendo siempre la mejor actitud, un trato amable y el compromiso de que tu bebida será preparada con dedicación, calidad y cariño.',
'about.mission.title': '🎯 Misión',
'about.mission.text1': 'Crear bebidas y productos de café de alta calidad, elaborados con granos cuidadosamente seleccionados, recetas originales y técnicas precisas que respeten cada uno de los elementos del proceso.',
'about.mission.text2': 'Buscamos aprovechar al máximo cada ingrediente para ofrecer sabores auténticos, equilibrados y memorables. Queremos ser parte de tus momentos favoritos: desde la primera taza de la mañana hasta la charla de la tarde, generando experiencias que te inviten a volver con la confianza de que siempre recibirás lo mejor.',
'about.mission.text3': 'Nuestro compromiso es mantener procesos limpios, seguros, consistentes y responsables, para que en cada taza encuentres dedicación, pasión y un estándar de excelencia.',
'about.vision.title': '🌎 Visión',
'about.vision.text1': 'Convertirnos en una cadena de cafeterías reconocida a nivel nacional e internacional por la calidad de nuestros productos, el servicio excepcional y el respeto por las personas y el entorno.',
'about.vision.text2': 'Aspiramos a ser una marca líder, ética y confiable en el mundo del café; un referente que inspire a trabajar con pasión, cuidado, responsabilidad y sentido humano.',
'about.vision.text3': 'Queremos que Café Elementos sea un espacio donde el sabor, la experiencia y los valores se unan para crear una identidad sólida y memorable.',
       
        // Contacto
        'contact.title': 'Contáctanos',
        'contact.address': 'Dirección',
        'contact.phone': 'Teléfono',
        'contact.email': 'Correo',
        'contact.form.name': 'Nombre',
        'contact.form.lastName': 'Apellido',
        'contact.form.email': 'Correo',
        'contact.form.phone': 'Teléfono',
        'contact.form.message': 'Mensaje',
        'contact.form.submit': 'Enviar',
        
        // Menú
        'menu.title': 'Nuestro Menú',
        'menu.subtitle': 'Descubre nuestras deliciosas bebidas',
        'menu.addToCart': '+ Agregar al carrito',
        
        // Productos
        'products.title': 'Nuestros Productos',
        
        // Carrito
        'cart.title': '🛒 Carrito',
        'cart.empty': 'Tu carrito está vacío',
        'cart.total': 'Total:',
        'cart.checkout': 'Proceder al Pago',
        
        // Checkout
        'checkout.title': 'Finalizar Compra',
        'checkout.name': 'Nombre Completo *',
        'checkout.email': 'Correo Electrónico *',
        'checkout.phone': 'Teléfono *',
        'checkout.address': 'Dirección de Entrega *',
        'checkout.city': 'Ciudad *',
        'checkout.postal': 'Código Postal *',
        'checkout.confirm': '✓ Confirmar Pedido',
        
        // Chat
        'chat.button': '¡Vamos a chatear!',
        'chat.placeholder': 'Escribe tu mensaje...',
        
        // Notificaciones
        'notify.emptyCart': 'Tu carrito está vacío',
        'notify.emptyEmail': 'Por favor ingresa tu correo electrónico',
        'notify.invalidEmail': 'Por favor ingresa un correo válido',
        'notify.fillFields': 'Por favor completa todos los campos requeridos'
    },
    en: {


        // Navigation
        'nav.welcome': 'Welcome',
        'nav.home': 'Home',
        'nav.menu': 'Menu',
        'nav.products': 'Products',
        'nav.more': 'More',
        'nav.main': 'Main',
        
        // Welcome Page
        'welcome.promo.badge': '🔥 PROMOTION',
        'welcome.promo.title': '2 Frappes for $120!',
        'welcome.promo.subtitle': 'Enjoy our special promotion for a limited time',
        'welcome.title': 'Welcome to Café Elementos',
        'welcome.description': 'The place where coffee comes to life. We are dedicated to offering high-quality coffee with a special touch that delights your senses. Discover our passion for coffee in every cup we prepare.',
        'welcome.button': 'Explore Our Coffee',
        
        // Search
        'search.placeholder': 'Search products...',
        'search.mainPlaceholder': 'Search coffee, drinks, products...',
        'search.button': '🔍 Search',
        'search.all': 'All',
        'search.coffee': 'Bulk Coffee',
        'search.drinks': 'Drinks',
        'search.noResults': 'No results found for',
        
        // Newsletter
        'newsletter.title': 'SUBSCRIBE',
        'newsletter.subtitle': 'Sign up for our email list to stay updated on our 2025 events',
        'newsletter.placeholder': 'Enter your email here',
        'newsletter.button': 'Submit',
        
        // About
'about.title': 'About Us',
'about.subtitle': '☕ CAFÉ ELEMENTOS',
'about.brief': 'Brief company description',
'about.description1': 'Café Elementos is a coffee shop inspired by a passion for good coffee and authentic connection. We create drinks and products crafted with selected beans, careful processes, and unique flavors that connect with your senses from the first sip.',
'about.description2': 'Our purpose is to make every visit a warm, pleasant, and meaningful experience. Whether you come to relax, work, share with friends, or simply enjoy good coffee, at Café Elementos you will always find a welcoming atmosphere and attentive service.',
'about.description3': 'We are located in Villahermosa, Tabasco, always offering the best attitude, friendly treatment, and the commitment that your drink will be prepared with dedication, quality, and care.',
'about.mission.title': '🎯 Mission',
'about.mission.text1': 'Create high-quality coffee drinks and products, crafted with carefully selected beans, original recipes, and precise techniques that respect each element of the process.',
'about.mission.text2': 'We seek to maximize every ingredient to offer authentic, balanced, and memorable flavors. We want to be part of your favorite moments: from the first cup in the morning to the afternoon chat, generating experiences that invite you to return with the confidence that you will always receive the best.',
'about.mission.text3': 'Our commitment is to maintain clean, safe, consistent, and responsible processes, so that in every cup you find dedication, passion, and a standard of excellence.',
'about.vision.title': '🌎 Vision',
'about.vision.text1': 'Become a coffee shop chain recognized nationally and internationally for the quality of our products, exceptional service, and respect for people and the environment.',
'about.vision.text2': 'We aspire to be a leading, ethical, and reliable brand in the coffee world; a reference that inspires working with passion, care, responsibility, and human sense.',
'about.vision.text3': 'We want Café Elementos to be a space where flavor, experience, and values come together to create a solid and memorable identity.',
        // Contact
        'contact.title': 'Contact Us',
        'contact.address': 'Address',
        'contact.phone': 'Phone',
        'contact.email': 'Email',
        'contact.form.name': 'First Name',
        'contact.form.lastName': 'Last Name',
        'contact.form.email': 'Email',
        'contact.form.phone': 'Phone',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Submit',
        
        // Menu
        'menu.title': 'Our Menu',
        'menu.subtitle': 'Discover our delicious drinks',
        'menu.addToCart': '+ Add to cart',
        
        // Products
        'products.title': 'Our Products',
        
        // Cart
        'cart.title': '🛒 Cart',
        'cart.empty': 'Your cart is empty',
        'cart.total': 'Total:',
        'cart.checkout': 'Proceed to Checkout',
        
        // Checkout
        'checkout.title': 'Checkout',
        'checkout.name': 'Full Name *',
        'checkout.email': 'Email *',
        'checkout.phone': 'Phone *',
        'checkout.address': 'Delivery Address *',
        'checkout.city': 'City *',
        'checkout.postal': 'Postal Code *',
        'checkout.confirm': '✓ Confirm Order',
        
        // Chat
        'chat.button': "Let's chat!",
        'chat.placeholder': 'Type your message...',
        
        // Notifications
        'notify.emptyCart': 'Your cart is empty',
        'notify.emptyEmail': 'Please enter your email',
        'notify.invalidEmail': 'Please enter a valid email',
        'notify.fillFields': 'Please complete all required fields'
    }
};

function translate(key) {
    return translations[currentLanguage][key] || key;
}

function applyTranslations() {
    const lang = currentLanguage;
    
    // Navegación
    const navLinks = document.querySelectorAll('#navMenu a');
    if (navLinks.length >= 5) {
        navLinks[0].textContent = translate('nav.welcome');
        navLinks[1].textContent = translate('nav.home');
        navLinks[2].textContent = translate('nav.menu');
        navLinks[3].textContent = translate('nav.products');
        navLinks[4].textContent = translate('nav.more');
    }
    
    // Principal text
    const principalText = document.querySelector('.principal-text');
    if (principalText) principalText.textContent = translate('nav.main');
    
    // Chat button
    const chatText = document.querySelector('.chat-text');
    if (chatText) chatText.textContent = translate('chat.button');
    
    // Welcome page
    const welcomeTitle = document.querySelector('#page-bienvenido h1');
    if (welcomeTitle) welcomeTitle.textContent = translate('welcome.title');
    
    const welcomeDesc = document.querySelector('#page-bienvenido .welcome-content > p');
    if (welcomeDesc) welcomeDesc.textContent = translate('welcome.description');
    
    const welcomeBtn = document.querySelector('.welcome-btn');
    if (welcomeBtn) welcomeBtn.textContent = translate('welcome.button');
    
    const promoBadge = document.querySelector('.promotion-badge');
    if (promoBadge) promoBadge.textContent = translate('welcome.promo.badge');
    
    const promoTitle = document.querySelector('.promotion-content h3');
    if (promoTitle) promoTitle.textContent = translate('welcome.promo.title');
    
    const promoSubtitle = document.querySelector('.promotion-content > p');
    if (promoSubtitle) promoSubtitle.textContent = translate('welcome.promo.subtitle');
    
    // Newsletter
    const newsletterTitle = document.querySelector('.hero h1');
    if (newsletterTitle) newsletterTitle.textContent = translate('newsletter.title');
    
    const newsletterSubtitle = document.querySelector('.hero p');
    if (newsletterSubtitle) newsletterSubtitle.textContent = translate('newsletter.subtitle');
    
    const newsletterBtn = document.querySelector('.newsletter button');
    if (newsletterBtn) newsletterBtn.textContent = translate('newsletter.button');
    
    const newsletterInput = document.getElementById('newsletterEmail');
    if (newsletterInput) newsletterInput.placeholder = translate('newsletter.placeholder');
    
    // Search inputs
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.placeholder = translate('search.placeholder');
    
    const mainSearchInput = document.getElementById('mainSearchInput');
    if (mainSearchInput) mainSearchInput.placeholder = translate('search.mainPlaceholder');
    
    // Contact section
    const contactTitles = document.querySelectorAll('.contact-container h2');
    contactTitles.forEach(title => {
        if (title.textContent.includes('Contáctanos') || title.textContent.includes('Contact')) {
            title.textContent = translate('contact.title');
        }
    });
    
   // About section - solo título
const aboutTitles = document.querySelectorAll('.about-content h2');
aboutTitles.forEach(title => {
    if (title.textContent.includes('Acerca') || title.textContent.includes('About')) {
        title.textContent = translate('about.title');
    }
});
    // Menu page
    const menuTitle = document.querySelector('.menu-hero h1');
    if (menuTitle) menuTitle.textContent = translate('menu.title');
    
    const menuSubtitle = document.querySelector('.menu-hero p');
    if (menuSubtitle) menuSubtitle.textContent = translate('menu.subtitle');
    
    // Products page
    const productsTitle = document.querySelector('#page-productos h2');
    if (productsTitle) productsTitle.textContent = translate('products.title');
    
    // Cart
    const cartTitle = document.querySelector('.cart-header h2');
    if (cartTitle) cartTitle.innerHTML = translate('cart.title');
    
    const cartTotalLabel = document.querySelector('.cart-total span:first-child');
    if (cartTotalLabel) cartTotalLabel.textContent = translate('cart.total');
    
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) checkoutBtn.textContent = translate('cart.checkout');
    
    // Checkout
    const checkoutTitle = document.querySelector('.checkout-header h2');
    if (checkoutTitle) checkoutTitle.textContent = translate('checkout.title');
    
    // Contact form placeholders
    const contactName = document.getElementById('contactName');
    if (contactName) contactName.placeholder = translate('contact.form.name');
    
    const contactLastName = document.getElementById('contactLastName');
    if (contactLastName) contactLastName.placeholder = translate('contact.form.lastName');
    
    const contactEmail = document.getElementById('contactEmail');
    if (contactEmail) contactEmail.placeholder = translate('contact.form.email');
    
    const contactPhone = document.getElementById('contactPhone');
    if (contactPhone) contactPhone.placeholder = translate('contact.form.phone');
    
    const contactMessage = document.getElementById('contactMessage');
    if (contactMessage) contactMessage.placeholder = translate('contact.form.message');
    
    // Chat placeholder
    const chatInput = document.getElementById('chatInput');
    if (chatInput) chatInput.placeholder = translate('chat.placeholder');
    
    // Category buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    if (categoryBtns.length >= 3) {
        categoryBtns[0].textContent = translate('search.all');
        categoryBtns[1].textContent = translate('search.coffee');
        categoryBtns[2].textContent = translate('search.drinks');
    }
    
    // Re-render cart and menu if they're visible
    if (cart.length > 0) {
        renderCartItems();
    }
}
// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    init();
    setupCardFormatting();
    setupMobileMenu();
    setupPromotionTimer();
    updateLastUpdateDate();
    
    // Cargar idioma guardado
    const savedLanguage = localStorage.getItem('cafeElementosLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = currentLanguage;
        }
    }
    
    // Cargar carrito guardado
    loadCartFromStorage();
});

function init() {
    // Inicializar pesos seleccionados por defecto
    products.forEach(p => {
        selectedWeights[p.id] = '1/4';
    });
    
    // Inicializar tamaños de menú por defecto
    Object.values(menuItems).flat().forEach(item => {
        if (item.prices) {
            selectedMenuSizes[item.id] = Object.keys(item.prices)[0];
        }
    });
    
    renderProducts();
    renderMenuItems();
    showPage('bienvenido');
    updateCartCount();
   
   applyTranslations();
}

// ============================================
// NAVEGACIÓN DE PÁGINAS
// ============================================
function showPage(pageName) {
    const pages = ['bienvenido', 'inicio', 'menu', 'productos', 'nosotros', 'privacy'];
    
    pages.forEach(page => {
        const pageEl = document.getElementById(`page-${page}`);
        if (pageEl) {
            pageEl.classList.add('hidden');
        }
    });
    
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        currentPage = pageName;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Cerrar menú móvil si está abierto
    closeMobileMenu();
}

// ============================================
// MENÚ MÓVIL
// ============================================
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuContainer = document.getElementById('mobileMenuContainer');
    
    if (mobileMenuBtn && mobileMenuContainer) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenuContainer.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!mobileMenuContainer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Prevenir que los clicks dentro del menú lo cierren
        mobileMenuContainer.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

function closeMobileMenu() {
    const mobileMenuContainer = document.getElementById('mobileMenuContainer');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (mobileMenuContainer && mobileMenuBtn) {
        mobileMenuContainer.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
}

// ============================================
// SISTEMA DE BÚSQUEDA
// ============================================
function handleSearch(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

function handleMainSearch(event) {
    if (event.key === 'Enter') {
        performMainSearch();
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        currentSearchTerm = searchInput.value.trim().toLowerCase();
        showPage('inicio');
        setTimeout(filterAndDisplayResults, 100);
    }
}

function performMainSearch() {
    const searchInput = document.getElementById('mainSearchInput');
    if (searchInput) {
        currentSearchTerm = searchInput.value.trim().toLowerCase();
        filterAndDisplayResults();
    }
}

function filterByCategory(category) {
    currentCategory = category;
    
    // Actualizar botones activos
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
        if ((category === 'all' && btn.textContent.includes('Todos')) ||
            (category === 'coffee' && btn.textContent.includes('Café')) ||
            (category === 'drinks' && btn.textContent.includes('Bebidas'))) {
            btn.classList.add('active');
        }
    });
    
    filterAndDisplayResults();
}

function filterAndDisplayResults() {
    let results = [];
    
    // Si no hay término de búsqueda, mostrar todos según categoría
    if (!currentSearchTerm) {
        if (currentCategory === 'all' || currentCategory === 'coffee') {
            results = [...results, ...products.map(p => ({...p, itemType: 'coffee'}))];
        }
        if (currentCategory === 'all' || currentCategory === 'drinks') {
            const allDrinks = Object.values(menuItems).flat();
            results = [...results, ...allDrinks.map(d => ({...d, itemType: 'drink'}))];
        }
    } else {
        // Buscar en productos de café
        if (currentCategory === 'all' || currentCategory === 'coffee') {
            const coffeeResults = products.filter(product => 
                product.name.toLowerCase().includes(currentSearchTerm) ||
                product.origin.toLowerCase().includes(currentSearchTerm)
            );
            results = [...results, ...coffeeResults.map(p => ({...p, itemType: 'coffee'}))];
        }
        
        // Buscar en bebidas
        if (currentCategory === 'all' || currentCategory === 'drinks') {
            const allDrinks = Object.values(menuItems).flat();
            const drinkResults = allDrinks.filter(drink => 
                drink.name.toLowerCase().includes(currentSearchTerm)
            );
            results = [...results, ...drinkResults.map(d => ({...d, itemType: 'drink'}))];
        }
    }
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
    if (!searchResultsContainer) return;
    
    if (results.length === 0 && currentSearchTerm) {
        searchResultsContainer.innerHTML = `
            <div class="search-results">
                <div class="no-results">
                    <p>No se encontraron resultados para "${currentSearchTerm}"</p>
                    <p>Intenta con otras palabras clave o revisa la categoría seleccionada.</p>
                </div>
            </div>
        `;
        return;
    }
    
    if (results.length > 0) {
        searchResultsContainer.innerHTML = `
            <div class="search-results">
                <div class="search-results-header">
                    <h3>Resultados de búsqueda (${results.length})</h3>
                </div>
                <div class="search-results-grid">
                    ${results.map(item => createSearchResultCard(item)).join('')}
                </div>
            </div>
        `;
    } else {
        searchResultsContainer.innerHTML = '';
    }
}

function createSearchResultCard(item) {
    if (item.itemType === 'coffee') {
        const selectedWeight = selectedWeights[item.id] || '1/4';
        const currentPrice = item.prices[selectedWeight];
        
        return `
            <div class="search-result-card coffee-card" onclick="navigateToProduct('coffee', ${item.id})">
                <div class="result-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-size:3rem;display:flex;align-items:center;justify-content:center;height:100%\\'>☕</div>'">
                </div>
                <div class="result-info">
                    <h4>${item.name}</h4>
                    <p class="result-origin">${item.origin}</p>
                    <p class="result-price">$${currentPrice}.00 MXN</p>
                    <button class="result-add-btn" onclick="event.stopPropagation(); addToCart(${item.id})">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
    } else {
        const hasMultipleSizes = item.prices && typeof item.prices === 'object';
        const selectedSize = selectedMenuSizes[item.id];
        const currentPrice = hasMultipleSizes ? item.prices[selectedSize] : item.price;
        
        return `
            <div class="search-result-card drink-card" onclick="navigateToProduct('drink', ${item.id})">
                <div class="result-image">
                    <div style="font-size:3rem;display:flex;align-items:center;justify-content:center;height:100%;background:#f5f5f5;border-radius:8px;">
                        ${item.type === 'frappe' ? '🧊' : item.type === 'tea' ? '🍵' : '☕'}
                    </div>
                </div>
                <div class="result-info">
                    <h4>${item.name}</h4>
                    <p class="result-type">${getDrinkTypeName(item.type)}</p>
                    <p class="result-price">$${currentPrice}.00</p>
                    <button class="result-add-btn" onclick="event.stopPropagation(); addMenuToCart(${item.id})">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
    }
}

function navigateToProduct(type, id) {
    if (type === 'coffee') {
        showPage('productos');
        setTimeout(() => {
            const productsSection = document.getElementById('productsGrid');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    } else if (type === 'drink') {
        showPage('menu');
        setTimeout(() => {
            const menuSection = document.querySelector('.menu-content');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    }
}

function getDrinkTypeName(type) {
    const typeNames = {
        'frappe': 'Bebida Fría',
        'hot-coffee': 'Café Caliente',
        'tea': 'Té'
    };
    return typeNames[type] || 'Bebida';
}

// ============================================
// SISTEMA MULTI-IDIOMA
// ============================================
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('cafeElementosLanguage', lang);
    applyTranslations();
    
    // Re-renderizar elementos dinámicos
    renderProducts();
    renderMenuItems();
}

// ============================================
// PROMOCIONES Y OFERTAS
// ============================================
function setupPromotionTimer() {
    const promotionTimerEl = document.getElementById('promotionTimer');
    if (!promotionTimerEl) return;
    
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    
    function updateTimer() {
        const now = new Date();
        const timeLeft = endDate - now;
        
        if (timeLeft <= 0) {
            promotionTimerEl.textContent = '¡La promoción ha terminado!';
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        promotionTimerEl.textContent = 
            `La promoción termina en: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    
    setInterval(updateTimer, 1000);
    updateTimer();
}

// ============================================
// FECHA DE ACTUALIZACIÓN
// ============================================
function updateLastUpdateDate() {
    const lastUpdateElement = document.getElementById('lastUpdateDate');
    if (lastUpdateElement) {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        lastUpdateElement.textContent = formattedDate;
    }
}

// ============================================
// RENDERIZADO DE PRODUCTOS (CAFÉ)
// ============================================
function createProductCard(product) {
    const selectedWeight = selectedWeights[product.id] || '1/4';
    const currentPrice = product.prices[selectedWeight];
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-badge">Nuevo</div>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-size:4rem;display:flex;align-items:center;justify-content:center;height:100%\\'>☕</div>'">
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})" title="Agregar al carrito">+</button>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-origin">${product.origin}</div>
                <div class="product-price" id="price-${product.id}">$${currentPrice}.00 MXN</div>
                <div class="product-weight">
                    ${Object.keys(product.prices).map(weight => `
                        <button class="weight-btn ${selectedWeight === weight ? 'active' : ''}" 
                                onclick="selectWeight(${product.id}, '${weight}')">
                            ${weight === '1kg' ? '1 kg' : weight + ' kg'}
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderProducts() {
    const container = document.getElementById('productsGrid');
    if (container) {
        container.innerHTML = products.map(product => createProductCard(product)).join('');
    }
}

// ============================================
// RENDERIZADO DE MENÚ (BEBIDAS)
// ============================================
function createMenuItem(item) {
    const hasMultipleSizes = item.prices && typeof item.prices === 'object';
    const selectedSize = selectedMenuSizes[item.id];
    const currentPrice = hasMultipleSizes ? item.prices[selectedSize] : item.price;
    
    return `
        <div class="menu-item" data-menu-id="${item.id}">
            <div class="menu-item-header">
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-price" id="menu-price-${item.id}">$${currentPrice}.00</div>
            </div>
            ${hasMultipleSizes ? `
                <div class="menu-item-sizes">
                    ${Object.keys(item.prices).map(size => `
                        <button class="size-btn ${selectedSize === size ? 'active' : ''}" 
                                onclick="selectMenuSize(${item.id}, '${size}')">
                            ${size}
                        </button>
                    `).join('')}
                </div>
            ` : ''}
            <button class="menu-item-add" onclick="addMenuToCart(${item.id})">
                + Agregar al carrito
            </button>
        </div>
    `;
}

function renderMenuItems() {
    const frappesContainer = document.getElementById('menuFrappes');
    const hotCoffeeContainer = document.getElementById('menuHotCoffee');
    const teasContainer = document.getElementById('menuTeas');
    
    if (frappesContainer) {
        frappesContainer.innerHTML = menuItems.frappes.map(item => createMenuItem(item)).join('');
    }
    
    if (hotCoffeeContainer) {
        hotCoffeeContainer.innerHTML = menuItems.hotCoffee.map(item => createMenuItem(item)).join('');
    }
    
    if (teasContainer) {
        teasContainer.innerHTML = menuItems.teas.map(item => createMenuItem(item)).join('');
    }
}

// ============================================
// SELECCIÓN DE PESO (CAFÉ)
// ============================================
function selectWeight(productId, weight) {
    selectedWeights[productId] = weight;
    const product = products.find(p => p.id === productId);
    
    const priceEl = document.getElementById(`price-${productId}`);
    if (priceEl) {
        priceEl.textContent = `$${product.prices[weight]}.00 MXN`;
    }
    
    const card = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (card) {
        const buttons = card.querySelectorAll('.weight-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.trim().includes(weight)) {
                btn.classList.add('active');
            }
        });
    }
}

// ============================================
// SELECCIÓN DE TAMAÑO (MENÚ)
// ============================================
function selectMenuSize(itemId, size) {
    selectedMenuSizes[itemId] = size;
    const item = Object.values(menuItems).flat().find(i => i.id === itemId);
    
    const priceEl = document.getElementById(`menu-price-${itemId}`);
    if (priceEl && item.prices) {
        priceEl.textContent = `$${item.prices[size]}.00`;
    }
    
    const menuItem = document.querySelector(`.menu-item[data-menu-id="${itemId}"]`);
    if (menuItem) {
        const buttons = menuItem.querySelectorAll('.size-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.trim() === size) {
                btn.classList.add('active');
            }
        });
    }
}

// ============================================
// FUNCIONES DEL CARRITO
// ============================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const weight = selectedWeights[productId] || '1/4';
    const existingItem = cart.find(item => item.id === productId && item.weight === weight && item.type === 'product');
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            type: 'product',
            name: product.name,
            origin: product.origin,
            weight: weight,
            price: product.prices[weight],
            quantity: 1,
            image: product.image
        });
    }
    
    updateCart();
    saveCartToStorage();
    showNotification(`${product.name} (${weight}) agregado al carrito`, 'success');
}

function addMenuToCart(itemId) {
    const item = Object.values(menuItems).flat().find(i => i.id === itemId);
    const size = selectedMenuSizes[itemId];
    const price = item.prices ? item.prices[size] : item.price;
    const sizeText = item.prices ? size : 'Único';
    
    const existingItem = cart.find(cartItem => 
        cartItem.id === itemId && 
        cartItem.size === sizeText && 
        cartItem.type === 'menu'
    );
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: itemId,
            type: 'menu',
            name: item.name,
            size: sizeText,
            price: price,
            quantity: 1,
            category: item.category
        });
    }
    
    updateCart();
    saveCartToStorage();
    showNotification(`${item.name} (${sizeText}) agregado al carrito`, 'success');
}

function removeFromCart(index) {
    const item = cart[index];
    cart.splice(index, 1);
    updateCart();
    saveCartToStorage();
    showNotification(`${item.name} eliminado del carrito`, 'success');
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCart();
        saveCartToStorage();
    }
}

function updateCart() {
    updateCartCount();
    renderCartItems();
    updateCartTotal();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const cartCount2 = document.getElementById('cartCount2');
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) cartCount.textContent = total;
    if (cartCount2) cartCount2.textContent = total;
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p style="font-size: 3rem; margin-bottom: 1rem;">🛒</p>
                <p>Tu carrito está vacío</p>
                <p style="font-size: 0.85rem; margin-top: 0.5rem;">¡Agrega algunos productos deliciosos!</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map((item, index) => {
        const displayInfo = item.type === 'product' 
            ? `${item.weight} kg` 
            : item.size;
        
        const imageHTML = item.image 
            ? `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-size:2.5rem\\'>☕</div>'">`
            : '<div style="font-size:2.5rem;">☕</div>';
        
        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    ${imageHTML}
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-weight">${displayInfo}</div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)} MXN</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})" title="Eliminar">✕</button>
            </div>
        `;
    }).join('');
}

function updateCartTotal() {
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)} MXN`;
    }
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    const overlay = document.getElementById('cartOverlay');
    modal.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (modal.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function saveCartToStorage() {
    localStorage.setItem('cafeElementosCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cafeElementosCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// ============================================
// CHECKOUT
// ============================================
function openCheckout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'error');
        return;
    }
    
    toggleCart();
    
    const modal = document.getElementById('checkoutModal');
    const overlay = document.getElementById('checkoutOverlay');
    const summaryItems = document.getElementById('orderSummaryItems');
    const orderTotal = document.getElementById('orderTotal');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    summaryItems.innerHTML = cart.map(item => {
        const displayInfo = item.type === 'product' ? `(${item.weight})` : `(${item.size})`;
        return `
            <div class="summary-item">
                <span>${item.name} ${displayInfo} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)} MXN</span>
            </div>
        `;
    }).join('');
    
    orderTotal.textContent = `$${total.toFixed(2)} MXN`;
    
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    const overlay = document.getElementById('checkoutOverlay');
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function togglePaymentForm(method) {
    const cardForm = document.getElementById('cardPaymentForm');
    const paypalForm = document.getElementById('paypalPaymentForm');
    
    if (method === 'card') {
        cardForm.style.display = 'block';
        paypalForm.style.display = 'none';
    } else if (method === 'paypal') {
        cardForm.style.display = 'none';
        paypalForm.style.display = 'block';
    }
}

function confirmOrder() {
    // Validar formulario
    const name = document.getElementById('checkoutName').value.trim();
    const email = document.getElementById('checkoutEmail').value.trim();
    const phone = document.getElementById('checkoutPhone').value.trim();
    const address = document.getElementById('checkoutAddress').value.trim();
    const city = document.getElementById('checkoutCity').value.trim();
    const postal = document.getElementById('checkoutPostal').value.trim();
    
    if (!name || !email || !phone || !address || !city || !postal) {
        showNotification('Por favor completa todos los campos requeridos', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Por favor ingresa un correo válido', 'error');
        return;
    }
    
    // Validar método de pago
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const cardExpiry = document.getElementById('cardExpiry').value.trim();
        const cardCVV = document.getElementById('cardCVV').value.trim();
        const cardName = document.getElementById('cardName').value.trim();
        
        if (!cardNumber || !cardExpiry || !cardCVV || !cardName) {
            showNotification('Por favor completa los datos de la tarjeta', 'error');
            return;
        }
    } else if (paymentMethod === 'paypal') {
        const paypalEmail = document.getElementById('paypalEmail').value.trim();
        if (!paypalEmail) {
            showNotification('Por favor ingresa tu correo de PayPal', 'error');
            return;
        }
    }
    
    // Generar número de orden
    const orderNumber = 'CE-' + Date.now().toString().slice(-8);
    
    // Preparar datos para EmailJS
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderItems = cart.map(item => {
        const displayInfo = item.type === 'product' ? `(${item.weight})` : `(${item.size})`;
        return `${item.name} ${displayInfo} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)} MXN`;
    }).join('\n');
    
    const templateParams = {
        to_email: email,
        to_name: name,
        order_number: orderNumber,
        order_items: orderItems,
        total_amount: `$${total.toFixed(2)} MXN`,
        shipping_address: `${address}, ${city}, CP: ${postal}`,
        phone: phone,
        payment_method: paymentMethod === 'card' ? 'Tarjeta de Crédito/Débito' : 'PayPal'
    };
    
    // Mostrar indicador de carga
    const confirmBtn = document.querySelector('.confirm-btn');
    const originalText = confirmBtn.textContent;
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = '<span class="loading-spinner"></span> Procesando...';
    
    // Enviar correo con EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log('Correo enviado exitosamente', response);
            
            // Cerrar checkout
            closeCheckout();
            
            // Mostrar modal de éxito
            showSuccessModal(orderNumber, paymentMethod);
            
            // Limpiar carrito
            cart = [];
            updateCart();
            saveCartToStorage();
            
            // Limpiar formulario
            document.getElementById('checkoutForm').reset();
            
        }, function(error) {
            console.error('Error al enviar correo:', error);
            showNotification('Hubo un problema al procesar tu pedido. Por favor intenta de nuevo.', 'error');
        })
        .finally(function() {
            confirmBtn.disabled = false;
            confirmBtn.textContent = originalText;
        });
}

function showSuccessModal(orderNumber, paymentMethod) {
    const modal = document.getElementById('successModal');
    const overlay = document.getElementById('successOverlay');
    const orderNumberEl = document.getElementById('orderNumber');
    const paymentMethodText = document.getElementById('paymentMethodText');
    
    orderNumberEl.textContent = orderNumber;
    
    if (paymentMethod === 'paypal') {
        paymentMethodText.textContent = 'Serás redirigido a PayPal para completar el pago. Hemos enviado la información del pedido a tu correo.';
    } else {
        paymentMethodText.textContent = 'Hemos enviado la confirmación y el ticket a tu correo electrónico.';
    }
    
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSuccess() {
    const modal = document.getElementById('successModal');
    const overlay = document.getElementById('successOverlay');
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    showPage('inicio');
}

// ============================================
// NEWSLETTER Y CONTACTO
// ============================================
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Por favor ingresa tu correo electrónico', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Por favor ingresa un correo válido', 'error');
        return;
    }
    
    // Enviar suscripción con EmailJS
    const templateParams = {
        to_email: 'cafelementos@gmail.com',
        subscriber_email: email,
        message: `Nueva suscripción al newsletter: ${email}`
    };
    
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function(response) {
            showNotification('¡Gracias por suscribirte! Te enviaremos las últimas noticias.', 'success');
            emailInput.value = '';
        }, function(error) {
            showNotification('Error al suscribirse. Por favor intenta de nuevo.', 'error');
        });
}

function sendContact() {
    const name = document.getElementById('contactName')?.value.trim();
    const lastName = document.getElementById('contactLastName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const phone = document.getElementById('contactPhone')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();
    
    if (!name || !email || !message) {
        showNotification('Por favor completa todos los campos requeridos', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Por favor ingresa un correo válido', 'error');
        return;
    }
    
    // Enviar con EmailJS
    const templateParams = {
        to_email: 'cafelementos@gmail.com',
        from_name: `${name} ${lastName || ''}`,
        from_email: email,
        phone: phone || 'No proporcionado',
        message: message
    };
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Enviando...';
    
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function(response) {
            showNotification('¡Gracias por contactarnos! Te responderemos pronto.', 'success');
            
            // Limpiar formulario
            if (document.getElementById('contactName')) document.getElementById('contactName').value = '';
            if (document.getElementById('contactLastName')) document.getElementById('contactLastName').value = '';
            if (document.getElementById('contactEmail')) document.getElementById('contactEmail').value = '';
            if (document.getElementById('contactPhone')) document.getElementById('contactPhone').value = '';
            if (document.getElementById('contactMessage')) document.getElementById('contactMessage').value = '';
        }, function(error) {
            showNotification('Error al enviar el mensaje. Por favor intenta de nuevo.', 'error');
        })
        .finally(function() {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
}

// ============================================
// CHAT
// ============================================
function toggleChat() {
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    
    if (chatWindow.classList.contains('active')) {
        chatWindow.classList.remove('active');
        chatButton.style.display = 'flex';
    } else {
        chatWindow.classList.add('active');
        chatButton.style.display = 'none';
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const messagesContainer = document.getElementById('chatMessages');
    
    // Agregar mensaje del usuario
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message sent';
    messageDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
    messagesContainer.appendChild(messageDiv);
    
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Simular respuesta automática
    setTimeout(() => {
        const responses = [
            '¡Gracias por tu mensaje! Un representante te atenderá pronto.',
            '¿Te gustaría conocer nuestros productos destacados?',
            'Estamos aquí para ayudarte. ¿En qué más puedo asistirte?',
            '¡Excelente pregunta! Déjame verificar esa información para ti.',
            'Nuestro horario es de Lunes a Viernes 8am-8pm. ¿En qué puedo ayudarte?'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseDiv = document.createElement('div');
        responseDiv.className = 'chat-message received';
        responseDiv.innerHTML = `<p>${randomResponse}</p>`;
        messagesContainer.appendChild(responseDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1500);
}

function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// ============================================
// UTILIDADES
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'success') {
    // Remover notificaciones existentes
    const existing = document.querySelectorAll('.notification');
    existing.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function setupCardFormatting() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue.slice(0, 19);
        });
    }
    
    const cardExpiryInput = document.getElementById('cardExpiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
    
    const cardCVVInput = document.getElementById('cardCVV');
    if (cardCVVInput) {
        cardCVVInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
        });
    }
}
