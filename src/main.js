import "./style.css";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const productsGrid = document.querySelector(".products-grid");
const categoryButtons = document.querySelectorAll(".category-btn");

// Global products array
let products = [];

// =====================
// Cart
// =====================

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const checkoutBtn = document.querySelector(".checkout-btn");
const cartFooter = document.querySelector(".cart-footer");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =====================
// Load Products
// =====================
async function loadProducts() {
    try {
        const snapshot = await getDocs(collection(db, "products"));

        products = snapshot.docs.map(doc => ({
            firestoreId: doc.id,
            ...doc.data()
        }));

        renderProducts(products);

    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// =====================
// Render Products
// =====================
function renderProducts(productsToRender) {

    productsGrid.innerHTML = "";

    productsToRender.forEach((product) => {

        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p class="category">${product.category}</p>

            <p class="price">${product.price} ج.م</p>

            <p class="availability">
                المتوفر: ${product.availability}
            </p>

            <button class="buy-btn">
                <i class="fa-solid fa-cart-plus"></i>
                إضافة إلى عربة التسوق
            </button>
        `;

        const buyBtn = card.querySelector(".buy-btn");

buyBtn.addEventListener("click", () => {
    addToCart(product);
});

productsGrid.appendChild(card);
    });
}

// =====================
// Category Filtering
// =====================
categoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active class
        categoryButtons.forEach(btn => btn.classList.remove("active"));

        // Add active class
        button.classList.add("active");

        const selectedCategory = button.textContent.trim();

        if (selectedCategory === "كل المنتجات") {
            renderProducts(products);
            return;
        }

        const filteredProducts = products.filter(product => {

            switch (selectedCategory) {

                case "الكشاكيل":
                    return product.category === "الكشاكيل";

                case "الأقلام":
                    return product.category === "الأقلام";

                case "الأدوات الفنية":
                    return product.category === "الأدوات الفنية";

                case "الأدوات الهندسية":
                    return product.category === "الأدوات الهندسية";

                case "الحقائب":
                    return product.category === "الحقائب";

                default:
                    return false;
            }

        });

        renderProducts(filteredProducts);

    });

});

// =====================
// Start App
// =====================
loadProducts();
renderCart();
updateCartCount();

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

// Open Cart
cartBtn.addEventListener("click", () => {

    cartSidebar.classList.add("active");
    overlay.classList.add("active");

});

// Checkout
checkoutBtn.addEventListener("click", () => {
    showCheckoutForm();
});

// Close Cart
closeCart.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

function closeSidebar(){

    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeSidebar();
    }
});

// =====================
// CART FUNCTIONS
// =====================

function addToCart(product) {

    const existing = cart.find(item => item.firestoreId === product.firestoreId);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    renderCart();

}

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

    cartItems.innerHTML = `
        <p class="empty-cart">
            لا توجد منتجات في العربة
        </p>
    `;

    cartTotal.textContent = "0 ج.م";

    updateCartCount();

    return;
}

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        const card = document.createElement("div");

        card.className = "cart-card";

        card.innerHTML = `

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p class="cart-price">${item.price} ج.م</p>

                <div class="cart-controls">

                    <button class="minus">-</button>

                    <span>${item.quantity}</span>

                    <button class="plus">+</button>

                    <button class="delete-btn">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </div>

        `;

        // زيادة الكمية

        card.querySelector(".plus").addEventListener("click", () => {

            item.quantity++;

            saveCart();

            renderCart();

        });

        // نقصان الكمية

        card.querySelector(".minus").addEventListener("click", () => {

            item.quantity--;

            if (item.quantity <= 0) {

                cart = cart.filter(p => p.firestoreId !== item.firestoreId);

            }

            saveCart();

            renderCart();

        });

        // حذف

        card.querySelector(".delete-btn").addEventListener("click", () => {

            cart = cart.filter(p => p.firestoreId !== item.firestoreId);

            saveCart();

            renderCart();

        });

        cartItems.appendChild(card);

    });

    cartTotal.textContent = `${total} ج.م`;
    updateCartCount();

}

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));
    

}

function showCheckoutForm() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">
                لا توجد منتجات في العربة
            </p>
        `;
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartItems.innerHTML = `
        <div class="checkout-form">
            <div class="form-group">
                <label for="fullName">الاسم الكامل</label>
                <input id="fullName" type="text" placeholder="اكتب اسمك الكامل">
            </div>

            <div class="form-group" id="addressGroup">
                <label for="address">العنوان بالتفصيل</label>
                <textarea id="address" rows="4" placeholder="اكتب عنوانك بالتفصيل"></textarea>
            </div>

            <div class="form-group delivery-method">
                <label>طريقة الاستلام</label>
                <div class="delivery-options">
                    <label class="delivery-label">
                        <input type="checkbox" id="deliveryCheckbox" checked>
                        <span class="option-text">توصيل إلى المنزل</span>
                    </label>

                    <label class="delivery-label">
                        <input type="checkbox" id="pickupCheckbox">
                        <span class="option-text">تجهيز للإستلام</span>
                    </label>
                </div>
            </div>

            <div class="order-summary">
                <h3>ملخص الطلب</h3>
                <div class="order-items">
                    ${cart.map(item => `<p class="order-item">${item.name} x${item.quantity} — ${item.price * item.quantity} ج.م</p>`).join("")}
                </div>
                <p class="order-total">الإجمالي: <strong>${total} ج.م</strong></p>
            </div>

            <div class="checkout-actions">
                <button class="cancel-order-btn" type="button">إلغاء الطلب</button>
                <button class="whatsapp-order-btn" type="button">إرسال عبر واتساب</button>
            </div>
        </div>
    `;

    cartFooter.style.display = "none";

    document.querySelector(".cancel-order-btn").addEventListener("click", () => {
        cartFooter.style.display = "block";
        renderCart();
    });

    // Use two circular checkboxes but allow only one selected at a time; always show address
    const deliveryCheckbox = document.getElementById('deliveryCheckbox');
    const pickupCheckbox = document.getElementById('pickupCheckbox');
    const deliveryLabel = deliveryCheckbox ? deliveryCheckbox.closest('.delivery-label') : null;
    const pickupLabel = pickupCheckbox ? pickupCheckbox.closest('.delivery-label') : null;
    const addressGroupEl = document.getElementById('addressGroup');
    if (addressGroupEl) addressGroupEl.style.display = 'block';
    function updateSelection() {
        if (deliveryCheckbox && pickupCheckbox) {
            if (deliveryCheckbox.checked) pickupCheckbox.checked = false;
            if (pickupCheckbox.checked) deliveryCheckbox.checked = false;
            if (deliveryLabel) deliveryLabel.classList.toggle('selected', deliveryCheckbox.checked);
            if (pickupLabel) pickupLabel.classList.toggle('selected', pickupCheckbox.checked);
        }
    }
    if (deliveryCheckbox) deliveryCheckbox.addEventListener('change', updateSelection);
    if (pickupCheckbox) pickupCheckbox.addEventListener('change', updateSelection);
    updateSelection();

    document.querySelector(".whatsapp-order-btn").addEventListener("click", () => {
        const fullName = document.getElementById("fullName").value.trim();
        const address = document.getElementById("address").value.trim();
        const method = deliveryCheckbox && deliveryCheckbox.checked ? 'delivery' : (pickupCheckbox && pickupCheckbox.checked ? 'pickup' : null);

        if (!fullName) {
            alert("الرجاء إدخال الاسم الكامل.");
            return;
        }

        if (!method) {
            alert("الرجاء اختيار طريقة الاستلام (توصيل أو تجهيز)." );
            return;
        }

        if (method === "delivery" && !address) {
            alert("الرجاء إدخال العنوان للتوصيل للمنزل.");
            return;
        }

        const messageLines = [
            "أرغب في طلب",
            ...cart.map(item => `- ${item.name} x${item.quantity} (${item.price * item.quantity} ج.م)`),
            `الإجمالي: ${total} ج.م`,
            "", 
            `اسم العميل: ${fullName}`,
            `طريقة الاستلام: ${method === 'delivery' ? 'توصيل للمنزل' : 'تجهيز للإستلام'}`
        ];
        if (method === 'delivery') {
            messageLines.push(`العنوان: ${address}`);
        }

        const message = encodeURIComponent(messageLines.join("\n"));
        const phone = method === 'delivery' ? '201098554914' : '201124369007';
        const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

        window.open(whatsappUrl, "_blank");
    });
}

function updateCartCount() {

    let totalItems = 0;

    cart.forEach((item) => {
        totalItems += item.quantity;
    });

    cartCount.textContent = totalItems;
    cartCount.classList.toggle("hidden", totalItems === 0);

}