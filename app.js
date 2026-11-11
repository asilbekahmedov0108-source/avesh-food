/* ============================================
   AVESH FOOD — App Logic (vanilla JS)
   ============================================ */

(function () {
  "use strict";

  /* ---------- Logo SVG (inline) ---------- */
  const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FF7A18"/>
        <stop offset="100%" stop-color="#E63946"/>
      </linearGradient>
      <linearGradient id="bun" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F4A261"/>
        <stop offset="100%" stop-color="#E76F51"/>
      </linearGradient>
      <linearGradient id="cheese" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFD166"/>
        <stop offset="100%" stop-color="#F4A261"/>
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="58" fill="url(#bg)"/>
    <circle cx="60" cy="60" r="58" fill="none" stroke="#fff" stroke-width="3" opacity="0.85"/>
    <path d="M22 58 Q60 26 98 58 Z" fill="url(#bun)"/>
    <ellipse cx="42" cy="46" rx="2.4" ry="1.4" fill="#fff" opacity="0.9" transform="rotate(-15 42 46)"/>
    <ellipse cx="58" cy="42" rx="2.4" ry="1.4" fill="#fff" opacity="0.9" transform="rotate(8 58 42)"/>
    <ellipse cx="74" cy="44" rx="2.4" ry="1.4" fill="#fff" opacity="0.9" transform="rotate(-5 74 44)"/>
    <ellipse cx="50" cy="52" rx="2" ry="1.2" fill="#fff" opacity="0.85"/>
    <ellipse cx="68" cy="52" rx="2" ry="1.2" fill="#fff" opacity="0.85"/>
    <path d="M20 60 Q26 56 32 60 Q38 56 44 60 Q50 56 56 60 Q62 56 68 60 Q74 56 80 60 Q86 56 92 60 Q98 56 100 60 L100 66 L20 66 Z" fill="#52B788"/>
    <path d="M22 64 L98 64 L94 72 L26 72 Z" fill="url(#cheese)"/>
    <rect x="20" y="70" width="80" height="12" rx="6" fill="#6A2C2C"/>
    <path d="M20 82 L100 82 Q100 92 60 92 Q20 92 20 82 Z" fill="url(#bun)"/>
    <text x="60" y="112" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#fff" text-anchor="middle" letter-spacing="2">AVESH</text>
  </svg>`;

  /* ---------- Menu data ---------- */
  const IMG = {
    hotdog: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/91d196f6b4b6.jpeg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/eca2ac9476af.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/69f818795cb9.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/35be27ad5aa8.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/54cc72c1eeb3.jpg",
    ],
    burger: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/107312c3142d.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/899f154732de.jpg",
    ],
    lavash: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d4912278395d.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c0e19f56ebb5.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b9562883e6e3.jpg",
    ],
    kfc: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1d835dfb50a4.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d48580fd2c77.jpg",
    ],
    pizza: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/57bb30e31b11.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f60620de6c06.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ab3b1b9bcc2b.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/59fcebab1570.jpg",
    ],
  };

  const CATEGORIES = [
    { id: "hotdog", name: { uz: "Hot-doglar", ru: "Хот-доги", en: "Hot Dogs" }, emoji: "🌭" },
    { id: "burger", name: { uz: "Burgerlar", ru: "Бургеры", en: "Burgers" }, emoji: "🍔" },
    { id: "lavash", name: { uz: "Lavash & Shaurma", ru: "Лаваш и Шаурма", en: "Lavash & Shawarma" }, emoji: "🌯" },
    { id: "kfc", name: { uz: "KFC & Fri", ru: "KFC и Фри", en: "KFC & Fries" }, emoji: "🍗" },
    { id: "pizza", name: { uz: "Pitsa", ru: "Пицца", en: "Pizza" }, emoji: "🍕" },
  ];

  const MENU_ITEMS = [
    // Hot-doglar
    { id: "hd-mini", name: "Hot Dog Mini", price: 15000, category: "hotdog", image: IMG.hotdog[2], desc: { uz: "Kichik hot dog, klassik sous va piyoz bilan.", ru: "Маленький хот-дог с классическим соусом и луком.", en: "Small hot dog with classic sauce and onions." } },
    { id: "hd-standart", name: "Hot Dog Standart", price: 20000, category: "hotdog", image: IMG.hotdog[3], desc: { uz: "Standart hot dog, ketçap, mayonez va xantal bilan.", ru: "Стандартный хот-дог с кетчупом, майонезом и горчицей.", en: "Standard hot dog with ketchup, mayo and mustard." } },
    { id: "hd-gigant", name: "Hot Dog Gigant", price: 24000, category: "hotdog", image: IMG.hotdog[0], desc: { uz: "Katta hot dog, qo'shimcha souslar bilan.", ru: "Большой хот-дог с дополнительными соусами.", en: "Big hot dog with extra sauces." } },
    { id: "hd-chikken", name: "Hot Dog Chikken", price: 26000, category: "hotdog", image: IMG.hotdog[2], desc: { uz: "Tovuq kolbasa bilan tayyorlangan hot dog.", ru: "Хот-дог с куриной колбасой.", en: "Hot dog with chicken sausage." } },
    { id: "hd-mol", name: "Hot Dog Mol Go'shtli", price: 32000, category: "hotdog", image: IMG.hotdog[0], desc: { uz: "Mol go'shtli kolbasa bilan to'yimli hot dog.", ru: "Сытный хот-дог с говяжьей колбасой.", en: "Hearty hot dog with beef sausage." }, badge: { uz: "Hit", ru: "Хит", en: "Hit" } },
    { id: "hd-gigant-katta", name: "Hot Dog Gigant Katta", price: 30000, category: "hotdog", image: IMG.hotdog[3], desc: { uz: "Gigant hot dogning katta versiyasi.", ru: "Большая версия гигантского хот-дога.", en: "Large version of the giant hot dog." } },
    { id: "hd-titanik", name: "Titanik Hot Dog", price: 40000, category: "hotdog", image: IMG.hotdog[1], desc: { uz: "Ultra katta hot dog, ikkita kolbasa va qo'shimcha souslar.", ru: "Ультра большой хот-дог с двумя колбасами.", en: "Ultra big hot dog with two sausages." }, badge: { uz: "Yangi", ru: "Новинка", en: "New" } },
    { id: "hd-titanik-asarti", name: "Titanik Hot Dog Asarti", price: 45000, category: "hotdog", image: IMG.hotdog[4], desc: { uz: "Titanik hot dog, qo'shimcha pishloq va bekon bilan.", ru: "Титаник хот-дог с сыром и беконом.", en: "Titanic hot dog with cheese and bacon." }, badge: { uz: "Premium", ru: "Премиум", en: "Premium" } },

    // Burgerlar
    { id: "bg-chiz-std", name: "Chizburger Standart", price: 32000, category: "burger", image: IMG.burger[0], desc: { uz: "Bir katletli chizburger, eritilgan pishloq bilan.", ru: "Чизбургер с одной котлетой и плавленым сыром.", en: "Single patty cheeseburger with melted cheese." } },
    { id: "bg-chiz-dbl", name: "Chizburger Dvaynoy Katlet", price: 45000, category: "burger", image: IMG.burger[1], desc: { uz: "Ikkita mol go'shtli katlet, qo'shimcha pishloq va souslar.", ru: "Две говяжьи котлеты с сыром и соусами.", en: "Two beef patties with extra cheese and sauces." }, badge: { uz: "Hit", ru: "Хит", en: "Hit" } },

    // Lavash & Shaurma
    { id: "lv-std", name: "Lavash Standart", price: 33000, category: "lavash", image: IMG.lavash[0], desc: { uz: "Tovuq go'shtli lavash, sabzavotlar va sous bilan.", ru: "Куриный лаваш с овощами и соусом.", en: "Chicken lavash with veggies and sauce." } },
    { id: "lv-dbl", name: "Lavash Dvaynoy", price: 43000, category: "lavash", image: IMG.lavash[1], desc: { uz: "Ikki karra go'shtli to'yimli lavash.", ru: "Двойной мясной лаваш.", en: "Double meat lavash." }, badge: { uz: "Hit", ru: "Хит", en: "Hit" } },
    { id: "sh-std", name: "Shaurma Standart (Tovuq)", price: 32000, category: "lavash", image: IMG.lavash[2], desc: { uz: "Tovuq go'shtli klassik shaurma.", ru: "Классическая куриная шаурма.", en: "Classic chicken shawarma." } },
    { id: "sh-dbl", name: "Shaurma Dvaynoy (Tovuq)", price: 38000, category: "lavash", image: IMG.lavash[0], desc: { uz: "Ikki karra tovuq go'shtli shaurma.", ru: "Двойная куриная шаурма.", en: "Double chicken shawarma." } },

    // KFC & Fri
    { id: "kfc-350", name: "KFC 350 gr", price: 44000, category: "kfc", image: IMG.kfc[0], desc: { uz: "350 gramm qarsildoq qovurilgan tovuq bo'laklari.", ru: "350 г хрустящей жареной курицы.", en: "350g of crispy fried chicken." } },
    { id: "kfc-500", name: "KFC 500 gr", price: 55000, category: "kfc", image: IMG.kfc[1], desc: { uz: "500 gramm qarsildoq qovurilgan tovuq, oilaviy hajm.", ru: "500 г хрустящей курицы, семейный размер.", en: "500g crispy chicken, family size." }, badge: { uz: "Oilaviy", ru: "Семейный", en: "Family" } },

    // Pitsa
    { id: "pz-free-std", name: "Free Standart", price: 15000, category: "pizza", image: IMG.pizza[2], desc: { uz: "Klassik pishloqli pitsa, kichik hajm.", ru: "Классическая сырная пицца, маленькая.", en: "Classic cheese pizza, small." } },
    { id: "pz-free-big", name: "Free Katta", price: 25000, category: "pizza", image: IMG.pizza[2], desc: { uz: "Katta pishloqli pitsa.", ru: "Большая сырная пицца.", en: "Large cheese pizza." } },
    { id: "pz-peperoni", name: "Peperoni Pitsa 25 sm", price: 35000, category: "pizza", image: IMG.pizza[1], desc: { uz: "Peperoni kolbasali va pishloqli pitsa.", ru: "Пицца с пепперони и сыром.", en: "Pepperoni and cheese pizza." }, badge: { uz: "Hit", ru: "Хит", en: "Hit" } },
    { id: "pz-mol", name: "Mol Go'shtli Pitsa 25 sm", price: 40000, category: "pizza", image: IMG.pizza[0], desc: { uz: "Mol go'shtli, piyoz va qalampirli to'yimli pitsa.", ru: "Сытная пицца с говядиной, луком и перцем.", en: "Hearty pizza with beef, onions and peppers." } },
    { id: "pz-tovuq", name: "Tovuq Go'shtli Pitsa 33 sm", price: 58000, category: "pizza", image: IMG.pizza[3], desc: { uz: "Tovuq go'shtli, qo'ziqorin va pishloqli katta pitsa.", ru: "Большая пицца с курицей, грибами и сыром.", en: "Large pizza with chicken, mushrooms and cheese." } },
    { id: "pz-zakaznoy", name: "Zakaznoy Pitsa 36 sm", price: 115000, category: "pizza", image: IMG.pizza[1], desc: { uz: "Premium zakaznoy pitsa - 36 sm, ko'p masalliqli.", ru: "Премиум заказная пицца 36 см.", en: "Premium custom pizza 36 cm." }, badge: { uz: "Premium", ru: "Премиум", en: "Premium" } },
    { id: "pz-miks", name: "Miks Pitsa 40 sm", price: 100000, category: "pizza", image: IMG.pizza[0], desc: { uz: "Aralash masalliqli oilaviy pitsa 40 sm.", ru: "Смешанная семейная пицца 40 см.", en: "Mixed family pizza 40 cm." }, badge: { uz: "Oilaviy", ru: "Семейный", en: "Family" } },
  ];

  /* ---------- i18n ---------- */
  const I18N = {
    brand: { uz: "Avesh Food", ru: "Avesh Food", en: "Avesh Food" },
    tagline: { uz: "Eng mazali va qaynoq fast-food taomlari sizni kutmoqda", ru: "Самые вкусные и горячие блюда фаст-фуда ждут вас", en: "The tastiest and hottest fast food is waiting for you" },
    nav_menu: { uz: "Bosh menyu", ru: "Главное меню", en: "Main menu" },
    nav_active: { uz: "Amaldagi", ru: "Текущие", en: "Active" },
    nav_history: { uz: "Buyurtmalar", ru: "Заказы", en: "Orders" },
    nav_profile: { uz: "Profil", ru: "Профиль", en: "Profile" },
    nav_settings: { uz: "Sozlamalar", ru: "Настройки", en: "Settings" },
    cart: { uz: "Savatcha", ru: "Корзина", en: "Cart" },
    cart_empty: { uz: "Savatcha bo'sh", ru: "Корзина пуста", en: "Cart is empty" },
    cart_empty_hint: { uz: "Taomlar tanlang va savatchaga qo'shing", ru: "Выберите блюда и добавьте в корзину", en: "Pick dishes and add to cart" },
    add_to_cart: { uz: "Savatga qo'shish", ru: "В корзину", en: "Add to cart" },
    added: { uz: "qo'shildi", ru: "добавлено", en: "added" },
    total: { uz: "Jami", ru: "Итого", en: "Total" },
    checkout: { uz: "Buyurtma berish", ru: "Оформить заказ", en: "Checkout" },
    clear_cart: { uz: "Tozalash", ru: "Очистить", en: "Clear" },
    empty_orders: { uz: "Hozircha buyurtmalar yo'q", ru: "Заказов пока нет", en: "No orders yet" },
    empty_orders_hint: { uz: "Birinchi buyurtmangizni joylang!", ru: "Оформите свой первый заказ!", en: "Place your first order!" },
    order_id: { uz: "Buyurtma raqami", ru: "Номер заказа", en: "Order #" },
    order_total: { uz: "Summa", ru: "Сумма", en: "Total" },
    cancel_order: { uz: "Bekor qilish", ru: "Отменить", en: "Cancel" },
    deliver_order: { uz: "Yetkazildi", ru: "Доставлено", en: "Delivered" },
    active_orders: { uz: "Amaldagi buyurtmalar", ru: "Текущие заказы", en: "Active orders" },
    order_history: { uz: "Buyurtmalar tarixi", ru: "История заказов", en: "Order history" },
    status_active: { uz: "Faol", ru: "Активен", en: "Active" },
    status_delivered: { uz: "Yetkazilgan", ru: "Доставлен", en: "Delivered" },
    profile_title: { uz: "Mijoz Profili", ru: "Профиль клиента", en: "Customer Profile" },
    full_name: { uz: "Ism familiya", ru: "Имя фамилия", en: "Full name" },
    phone: { uz: "Telefon raqami", ru: "Номер телефона", en: "Phone number" },
    address: { uz: "Manzil", ru: "Адрес", en: "Address" },
    save_profile: { uz: "Saqlash", ru: "Сохранить", en: "Save" },
    profile_saved: { uz: "Profil saqlandi", ru: "Профиль сохранён", en: "Profile saved" },
    settings_title: { uz: "Sozlamalar", ru: "Настройки", en: "Settings" },
    dark_mode: { uz: "Tungi rejim", ru: "Тёмный режим", en: "Dark mode" },
    language: { uz: "Til", ru: "Язык", en: "Language" },
    clear_cache: { uz: "Keshni tozalash", ru: "Очистить кэш", en: "Clear cache" },
    cache_cleared: { uz: "Kesh tozalandi", ru: "Кэш очищен", en: "Cache cleared" },
    cache_note: { uz: "Ma'lumotlar faqat shu brauzerda saqlanadi (localStorage).", ru: "Данные хранятся только в этом браузере.", en: "Data is stored only in this browser." },
    order_placed: { uz: "Buyurtma qabul qilindi!", ru: "Заказ принят!", en: "Order placed!" },
    fill_profile: { uz: "Iltimos, profil ma'lumotlarini to'ldiring", ru: "Пожалуйста, заполните профиль", en: "Please fill in profile" },
    hero_btn: { uz: "Menyuga o'tish", ru: "Перейти к меню", en: "Go to menu" },
    hero_popular: { uz: "Mashhur taomlar", ru: "Популярные блюда", en: "Popular dishes" },
    hero_welcome: { uz: "ga xush kelibsiz!", ru: "добро пожаловать!", en: "Welcome!" },
    menu_desc: { uz: "Hot-dog, burger, lavash, shaurma, KFC va pitsa — barchasi buyurtma berishingiz bilan tayyor", ru: "Хот-доги, бургеры, лаваш, шаурма, KFC и пицца — всё готовится по заказу", en: "Hot dogs, burgers, lavash, shawarma, KFC and pizza — all made fresh to order" },
    fast_delivery: { uz: "Tez yetkazib berish", ru: "Быстрая доставка", en: "Fast delivery" },
    hot_food: { uz: "Har doim qaynoq", ru: "Всегда горячее", en: "Always hot" },
    footer_rights: { uz: "Barcha huquqlar himoyalangan", ru: "Все права защищены", en: "All rights reserved" },
    delivery_time: { uz: "30 daqiqa ichida", ru: "в течение 30 минут", en: "within 30 minutes" },
    free_delivery: { uz: "Bepul yetkazib berish", ru: "Бесплатная доставка", en: "Free delivery" },
    contact_us: { uz: "Biz bilan bog'lanish", ru: "Связаться с нами", en: "Contact us" },
    working_hours: { uz: "Ish vaqti: 10:00 - 23:00", ru: "Часы работы: 10:00 - 23:00", en: "Working hours: 10:00 - 23:00" },
  };

  /* ---------- State (with localStorage) ---------- */
  const LS = {
    get(key, def) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; } },
    set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
    remove(key) { try { localStorage.removeItem(key); } catch {} },
  };

  const state = {
    cart: LS.get("avesh-cart", []),
    orders: LS.get("avesh-orders", []),
    profile: LS.get("avesh-profile", { name: "", phone: "", address: "" }),
    lang: LS.get("avesh-lang", "uz"),
    theme: LS.get("avesh-theme", "dark"),
  };

  function saveCart() { LS.set("avesh-cart", state.cart); }
  function saveOrders() { LS.set("avesh-orders", state.orders); }
  function saveProfile() { LS.set("avesh-profile", state.profile); }

  /* ---------- Helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function t(key) {
    const entry = I18N[key];
    return entry ? (entry[state.lang] || entry.uz) : key;
  }

  function formatPrice(n) {
    return n.toLocaleString("ru-RU") + " so'm";
  }

  function fmtDate(ts) {
    const d = new Date(ts);
    return d.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  function findItem(id) { return MENU_ITEMS.find(i => i.id === id); }
  function cartTotal() { return state.cart.reduce((s, i) => s + i.qty * i.price, 0); }
  function cartCount() { return state.cart.reduce((s, i) => s + i.qty, 0); }

  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  /* ---------- Toast ---------- */
  function toast(title, desc, type = "success") {
    const container = $("#toastContainer");
    const el = document.createElement("div");
    el.className = `toast ${type}`;
    el.innerHTML = `<div class="toast-body"><div class="toast-title">${esc(title)}</div>${desc ? `<div class="toast-desc">${esc(desc)}</div>` : ""}</div><button class="toast-close" aria-label="Close">×</button>`;
    container.appendChild(el);
    const close = () => {
      el.classList.add("fade-out");
      setTimeout(() => el.remove(), 300);
    };
    el.querySelector(".toast-close").onclick = close;
    setTimeout(close, 3200);
  }

  /* ---------- Apply theme ---------- */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    const toggle = $("#darkToggle");
    if (toggle) toggle.checked = state.theme === "dark";
  }

  /* ---------- Apply i18n ---------- */
  function applyI18n() {
    document.documentElement.lang = state.lang;
    $$("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = t(key);
      if (val) el.textContent = val;
    });
    $$("[data-lang]").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === state.lang);
    });
  }

  /* ---------- Render Logo ---------- */
  function renderLogos() {
    const a = $("#brandLogo");
    const b = $("#footerLogo");
    if (a) a.innerHTML = LOGO_SVG;
    if (b) b.innerHTML = LOGO_SVG;
  }

  /* ---------- Render Menu ---------- */
  function renderMenu() {
    const container = $("#menuContainer");
    const html = CATEGORIES.map(cat => {
      const items = MENU_ITEMS.filter(i => i.category === cat.id);
      const cards = items.map((item, idx) => {
        const badge = item.badge ? `<span class="menu-card-badge">${esc(item.badge[state.lang])}</span>` : "";
        return `
        <article class="menu-card" style="animation-delay: ${Math.min(idx * 0.04, 0.24)}s">
          <div class="menu-card-img">
            ${badge}
            <img src="${item.image}" alt="${esc(item.name)}" loading="lazy" />
            <span class="menu-card-price">${formatPrice(item.price)}</span>
          </div>
          <div class="menu-card-body">
            <h4 class="menu-card-name">${esc(item.name)}</h4>
            <p class="menu-card-desc">${esc(item.desc[state.lang])}</p>
            <button class="menu-card-add" data-add="${item.id}">
              <span>+</span> <span>${t("add_to_cart")}</span>
            </button>
          </div>
        </article>`;
      }).join("");
      return `
        <div class="category">
          <div class="cat-head">
            <span class="cat-emoji">${cat.emoji}</span>
            <h3 class="cat-title">${esc(cat.name[state.lang])}</h3>
            <span class="cat-line"></span>
          </div>
          <div class="menu-grid">${cards}</div>
        </div>`;
    }).join("");
    container.innerHTML = html;
  }

  /* ---------- Cart ---------- */
  function addToCart(id) {
    const item = findItem(id);
    if (!item) return;
    const existing = state.cart.find(i => i.id === id);
    if (existing) existing.qty++;
    else state.cart.push({ id: item.id, name: item.name, price: item.price, image: item.image, qty: 1 });
    saveCart();
    renderCartBadge();
    renderCart();
    toast(`${item.name} ${t("added")} ✓`, formatPrice(item.price), "success");

    // Quick "added" feedback on button
    const btn = document.querySelector(`[data-add="${id}"]`);
    if (btn) {
      btn.classList.add("added");
      const labelSpan = btn.querySelector("span:last-child");
      const original = labelSpan ? labelSpan.textContent : null;
      if (labelSpan) labelSpan.textContent = "✓";
      setTimeout(() => {
        btn.classList.remove("added");
        if (labelSpan && original) labelSpan.textContent = original;
      }, 1200);
    }
  }

  function changeQty(id, delta) {
    const line = state.cart.find(i => i.id === id);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) state.cart = state.cart.filter(i => i.id !== id);
    saveCart();
    renderCartBadge();
    renderCart();
  }

  function removeLine(id) {
    state.cart = state.cart.filter(i => i.id !== id);
    saveCart();
    renderCartBadge();
    renderCart();
  }

  function clearCart() {
    state.cart = [];
    saveCart();
    renderCartBadge();
    renderCart();
  }

  function renderCartBadge() {
    const badge = $("#cartBadge");
    const count = cartCount();
    if (count > 0) {
      badge.textContent = count;
      badge.hidden = false;
    } else {
      badge.hidden = true;
    }
  }

  function renderCart() {
    const body = $("#cartBody");
    const foot = $("#cartFoot");
    const drawerCount = $("#drawerCount");
    const count = cartCount();
    drawerCount.textContent = count;
    drawerCount.hidden = count === 0;

    if (state.cart.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-ico">🛍️</div>
          <div class="cart-empty-title">${esc(t("cart_empty"))}</div>
          <div class="cart-empty-hint">${esc(t("cart_empty_hint"))}</div>
        </div>`;
      foot.hidden = true;
      return;
    }

    foot.hidden = false;
    $("#cartTotal").textContent = formatPrice(cartTotal());
    body.innerHTML = state.cart.map(line => `
      <div class="cart-line">
        <img class="cart-line-img" src="${line.image}" alt="${esc(line.name)}" />
        <div class="cart-line-info">
          <div class="cart-line-top">
            <span class="cart-line-name">${esc(line.name)}</span>
            <button class="cart-line-remove" data-remove="${line.id}" aria-label="remove">🗑️</button>
          </div>
          <div class="cart-line-price">${formatPrice(line.price)}</div>
          <div class="cart-line-bottom">
            <div class="qty-control">
              <button class="qty-btn" data-dec="${line.id}" aria-label="-">−</button>
              <span class="qty-val">${line.qty}</span>
              <button class="qty-btn" data-inc="${line.id}" aria-label="+">+</button>
            </div>
            <span class="cart-line-total">${formatPrice(line.price * line.qty)}</span>
          </div>
        </div>
      </div>
    `).join("");
  }

  /* ---------- Cart Drawer ---------- */
  function openCart() {
    $("#cartDrawer").classList.add("open");
    $("#cartDrawer").setAttribute("aria-hidden", "false");
    $("#cartOverlay").hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    $("#cartDrawer").classList.remove("open");
    $("#cartDrawer").setAttribute("aria-hidden", "true");
    $("#cartOverlay").hidden = true;
    document.body.style.overflow = "";
  }

  /* ---------- Checkout ---------- */
  function checkout() {
    if (state.cart.length === 0) return;
    const p = state.profile;
    if (!p.name || !p.phone || !p.address) {
      toast(t("fill_profile"), "", "error");
      closeCart();
      scrollTo("profile");
      return;
    }
    const order = {
      id: "AV-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      createdAt: Date.now(),
      items: state.cart.map(i => ({ ...i })),
      total: cartTotal(),
      customer: { ...p },
      status: "active",
    };
    state.orders.unshift(order);
    saveOrders();
    state.cart = [];
    saveCart();
    renderCartBadge();
    renderCart();
    renderOrders();
    closeCart();
    toast(t("order_placed"), `${t("order_id")}: ${order.id} • ${formatPrice(order.total)}`, "success");
    setTimeout(() => scrollTo("active"), 200);
  }

  /* ---------- Orders ---------- */
  function cancelOrder(id) {
    state.orders = state.orders.filter(o => o.id !== id);
    saveOrders();
    renderOrders();
  }
  function deliverOrder(id) {
    state.orders = state.orders.map(o => o.id === id ? { ...o, status: "delivered" } : o);
    saveOrders();
    renderOrders();
  }

  function renderOrders() {
    const active = state.orders.filter(o => o.status === "active");
    const delivered = state.orders.filter(o => o.status === "delivered");
    $("#activeCount").textContent = active.length;
    $("#activeCount").hidden = active.length === 0;
    $("#historyCount").textContent = `${delivered.length} ${state.lang === "uz" ? "ta" : state.lang === "ru" ? "заказов" : "orders"}`;

    $("#activeList").innerHTML = active.length === 0
      ? emptyStateHTML("⏰", t("empty_orders"), t("empty_orders_hint"))
      : active.map(o => orderCardHTML(o, true)).join("");

    $("#historyList").innerHTML = delivered.length === 0
      ? emptyStateHTML("🧾", t("empty_orders"), t("empty_orders_hint"))
      : delivered.map(o => orderCardHTML(o, false)).join("");
  }

  function emptyStateHTML(ico, title, hint) {
    return `<div class="empty-state">
      <div class="empty-ico">${ico}</div>
      <div class="empty-title">${esc(title)}</div>
      <div class="empty-hint">${esc(hint)}</div>
    </div>`;
  }

  function orderCardHTML(o, active) {
    const lines = o.items.map(it => `
      <div class="order-line">
        <img class="order-line-img" src="${it.image}" alt="${esc(it.name)}" />
        <span class="order-line-name">${esc(it.name)}</span>
        <span class="order-line-qty">×${it.qty}</span>
        <span class="order-line-price">${formatPrice(it.price * it.qty)}</span>
      </div>`).join("");
    const statusClass = active ? "active" : "delivered";
    const statusText = active ? t("status_active") : t("status_delivered");
    const actions = active ? `
      <div class="order-actions">
        <button class="btn btn-outline-red btn-sm" data-cancel="${o.id}">${t("cancel_order")}</button>
        <button class="btn btn-green btn-sm" data-deliver="${o.id}">✓ ${t("deliver_order")}</button>
      </div>` : "";
    return `
      <div class="order-card">
        <div class="order-head">
          <div>
            <div class="order-id">📦 ${t("order_id")}: <code>${o.id}</code></div>
            <div class="order-meta">${fmtDate(o.createdAt)} • ${esc(o.customer.name)} • ${esc(o.customer.phone)}</div>
          </div>
          <span class="order-status ${statusClass}">${statusText}</span>
        </div>
        <div class="order-body">${lines}</div>
        <div class="order-foot">
          <span class="order-total-label">${t("order_total")}</span>
          <span class="order-total-amount">${formatPrice(o.total)}</span>
          ${actions}
        </div>
      </div>`;
  }

  /* ---------- Profile ---------- */
  function loadProfileForm() {
    $("#pName").value = state.profile.name || "";
    $("#pPhone").value = state.profile.phone || "";
    $("#pAddress").value = state.profile.address || "";
  }
  function saveProfileForm(e) {
    e.preventDefault();
    state.profile = {
      name: $("#pName").value.trim(),
      phone: $("#pPhone").value.trim(),
      address: $("#pAddress").value.trim(),
    };
    saveProfile();
    toast(t("profile_saved"), "", "success");
  }

  /* ---------- Settings ---------- */
  function toggleTheme() {
    state.theme = $("#darkToggle").checked ? "dark" : "light";
    LS.set("avesh-theme", state.theme);
    applyTheme();
  }
  function changeLang(lang) {
    state.lang = lang;
    LS.set("avesh-lang", lang);
    applyI18n();
    renderMenu();
    renderCart();
    renderOrders();
  }
  function clearCache() {
    state.cart = [];
    state.orders = [];
    state.profile = { name: "", phone: "", address: "" };
    LS.remove("avesh-cart");
    LS.remove("avesh-orders");
    LS.remove("avesh-profile");
    saveCart();
    renderCartBadge();
    renderCart();
    renderOrders();
    loadProfileForm();
    toast(t("cache_cleared"), "", "success");
  }

  /* ---------- Navigation ---------- */
  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------- Init ---------- */
  function init() {
    renderLogos();
    applyTheme();
    applyI18n();
    renderMenu();
    renderCartBadge();
    renderCart();
    renderOrders();
    loadProfileForm();
    $("#year").textContent = new Date().getFullYear();

    // Nav buttons
    $$("[data-nav]").forEach(btn => {
      btn.addEventListener("click", () => scrollTo(btn.getAttribute("data-nav")));
    });

    // Hero CTA
    $("#heroCta").addEventListener("click", () => scrollTo("menu"));

    // Cart open/close
    $("#cartBtn").addEventListener("click", openCart);
    $("#cartOverlay").addEventListener("click", closeCart);
    $("#clearCartBtn").addEventListener("click", clearCart);
    $("#checkoutBtn").addEventListener("click", checkout);

    // Event delegation for dynamically rendered buttons
    document.addEventListener("click", (e) => {
      const addBtn = e.target.closest("[data-add]");
      if (addBtn) { addToCart(addBtn.getAttribute("data-add")); return; }

      const incBtn = e.target.closest("[data-inc]");
      if (incBtn) { changeQty(incBtn.getAttribute("data-inc"), 1); return; }

      const decBtn = e.target.closest("[data-dec]");
      if (decBtn) { changeQty(decBtn.getAttribute("data-dec"), -1); return; }

      const rmBtn = e.target.closest("[data-remove]");
      if (rmBtn) { removeLine(rmBtn.getAttribute("data-remove")); return; }

      const cancelBtn = e.target.closest("[data-cancel]");
      if (cancelBtn) { cancelOrder(cancelBtn.getAttribute("data-cancel")); return; }

      const delBtn = e.target.closest("[data-deliver]");
      if (delBtn) { deliverOrder(delBtn.getAttribute("data-deliver")); return; }
    });

    // Profile form
    $("#profileForm").addEventListener("submit", saveProfileForm);

    // Settings
    $("#darkToggle").addEventListener("change", toggleTheme);
    $$("[data-lang]").forEach(btn => {
      btn.addEventListener("click", () => changeLang(btn.getAttribute("data-lang")));
    });
    $("#clearCacheBtn").addEventListener("click", clearCache);

    // Escape closes cart
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && $("#cartDrawer").classList.contains("open")) closeCart();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
