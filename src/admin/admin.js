// ======================================================
//                 CATEGORY MODAL
// ======================================================

const openModal = document.getElementById("openModal");
const modal = document.getElementById("categoryModal");
const overlay = document.getElementById("overlay");

const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const categoryNameInput = document.getElementById("categoryName");
const saveCategoryBtn = document.getElementById("saveCategory");
const categoryModalTitle = document.querySelector("#categoryModal .modal-header h2");
const categoriesList = document.querySelector(".categories-list");

let editingCategoryCard = null;

function bindCategoryCardEvents(card) {
    const editBtn = card.querySelector(".edit-btn");

    editBtn?.addEventListener("click", () => {
        editingCategoryCard = card;
        const currentName = card.querySelector(".category-info h3")?.textContent.trim() || "";

        categoryModalTitle.textContent = "تعديل القسم";
        saveCategoryBtn.textContent = "حفظ التعديل";
        categoryNameInput.value = currentName;

        modal.classList.add("show");
        overlay.classList.add("show");
    });
}

function createCategoryCard(name, productsCount = "0 منتجات") {
    const card = document.createElement("div");
    card.className = "category-card";

    card.innerHTML = `
        <div class="category-info">
            <div class="category-icon">
                <i class="fa-solid fa-layer-group"></i>
            </div>
            <div>
                <h3>${name}</h3>
                <span>${productsCount}</span>
            </div>
        </div>
        <div class="category-actions">
            <button class="edit-btn">
                <i class="fa-regular fa-pen-to-square"></i>
                تعديل
            </button>
            <button class="delete-btn">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    `;

    bindCategoryCardEvents(card);
    return card;
}

if (openModal && modal && overlay) {

    // فتح نافذة إضافة قسم

    openModal.addEventListener("click", () => {
        editingCategoryCard = null;
        categoryModalTitle.textContent = "إضافة قسم جديد";
        saveCategoryBtn.textContent = "حفظ القسم";
        categoryNameInput.value = "";

        modal.classList.add("show");
        overlay.classList.add("show");

    });

    // غلق النافذة

    function closeCategoryModal() {

        modal.classList.remove("show");
        overlay.classList.remove("show");
        editingCategoryCard = null;
        categoryNameInput.value = "";
        categoryModalTitle.textContent = "إضافة قسم جديد";
        saveCategoryBtn.textContent = "حفظ القسم";

    }

    // الأحداث الخاصة بالغلق

    closeModal?.addEventListener("click", closeCategoryModal);

    cancelBtn?.addEventListener("click", closeCategoryModal);

    overlay.addEventListener("click", closeCategoryModal);

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            closeCategoryModal();

        }

    });

    saveCategoryBtn?.addEventListener("click", () => {
        const newName = categoryNameInput.value.trim();

        if (!newName) {
            categoryNameInput.focus();
            return;
        }

        if (editingCategoryCard) {
            const title = editingCategoryCard.querySelector(".category-info h3");
            if (title) {
                title.textContent = newName;
            }
        } else if (categoriesList) {
            categoriesList.appendChild(createCategoryCard(newName));
        }

        closeCategoryModal();
    });

}

if (categoriesList) {
    document.querySelectorAll(".categories-list .category-card").forEach(bindCategoryCardEvents);
}



// ======================================================
//                 SEARCH PRODUCTS
// ======================================================

const searchInput = document.getElementById("searchProduct");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const value = searchInput.value.toLowerCase();

        // هنضيف فلترة المنتجات هنا بعدين

        console.log(value);

    });

}



// ======================================================
//                 NAVIGATION TABS
// ======================================================

const categoriesBtn = document.getElementById("categoriesBtn");

const productsBtn = document.getElementById("productsBtn");

const categoriesSection = document.getElementById("categoriesSection");

const productsSection = document.getElementById("productsSection");

if (

    categoriesBtn &&
    productsBtn &&
    categoriesSection &&
    productsSection

) {

    // أول ما الصفحة تفتح

    productsSection.style.display = "none";

    //==========================
    // الأقسام
    //==========================

    categoriesBtn.addEventListener("click", () => {

        categoriesSection.style.display = "block";

        productsSection.style.display = "none";

        categoriesBtn.classList.add("active");

        productsBtn.classList.remove("active");

    });

    //==========================
    // المنتجات
    //==========================

    productsBtn.addEventListener("click", () => {

        categoriesSection.style.display = "none";

        productsSection.style.display = "block";

        productsBtn.classList.add("active");

        categoriesBtn.classList.remove("active");

    });

}



// ======================================================
//                 FILTER POPUP
// ======================================================

const filterBtn = document.getElementById("filterBtn");

const filterPopup = document.getElementById("filterPopup");

const filterOverlay = document.getElementById("filterOverlay");

const closeFilter = document.getElementById("closeFilter");

if (

    filterBtn &&
    filterPopup &&
    filterOverlay

) {

    // فتح الفلتر

    filterBtn.addEventListener("click", () => {

        filterPopup.classList.add("show");

        filterOverlay.classList.add("show");

    });

    // غلق الفلتر

    function closeFilterPopup() {

        filterPopup.classList.remove("show");

        filterOverlay.classList.remove("show");

    }

    closeFilter?.addEventListener("click", closeFilterPopup);

    filterOverlay.addEventListener("click", closeFilterPopup);

}



// ======================================================
//                 PRODUCT MODAL
// ======================================================

const addProductBtn = document.getElementById("addProductBtn");

const productModal = document.getElementById("productModal");

const productOverlay = document.getElementById("productOverlay");

const closeProductModal = document.getElementById("closeProductModal");

const cancelProduct = document.querySelector(".cancel-product");
const saveProductBtn = document.getElementById("saveProductBtn");
const productsTableBody = document.getElementById("productsTableBody");
const productNameInput = document.getElementById("productName");
const productCategorySelect = document.getElementById("productCategory");
const productPriceInput = document.getElementById("productPrice");
const productAvailabilityToggle = document.getElementById("productAvailability");
const productImageInput = document.getElementById("productImage");
const uploadBox = document.getElementById("uploadBox");
const imagePreview = document.getElementById("imagePreview");
const imageIcon = document.getElementById("imageIcon");
const imageLabel = document.getElementById("imageLabel");
const productModalTitle = document.querySelector("#productModal .modal-header h2");

let editingProductRow = null;
let selectedProductImage = "";

function setProductPreview(imageSrc) {
    if (!imagePreview || !uploadBox) return;

    if (imageSrc) {
        imagePreview.src = imageSrc;
        imagePreview.classList.add("show");
        uploadBox.classList.add("has-preview");
    } else {
        imagePreview.removeAttribute("src");
        imagePreview.classList.remove("show");
        uploadBox.classList.remove("has-preview");
    }
}

function resetProductForm() {
    if (productNameInput) productNameInput.value = "";
    if (productCategorySelect) productCategorySelect.selectedIndex = 0;
    if (productPriceInput) productPriceInput.value = "";
    if (productAvailabilityToggle) productAvailabilityToggle.checked = true;
    selectedProductImage = "";
    setProductPreview("");
}

function openProductModalForEdit(row) {
    editingProductRow = row;
    const name = row.querySelector(".product-name-cell")?.textContent.trim() || "";
    const category = row.querySelector(".product-category-cell")?.textContent.trim() || "";
    const price = row.querySelector(".product-price-cell")?.textContent.replace(/ج\.م/g, "").trim() || "";
    const status = row.querySelector(".product-status-cell .status")?.textContent.trim() || "";
    const imageSrc = row.querySelector(".product-image")?.getAttribute("src") || "";

    if (productNameInput) productNameInput.value = name;
    if (productCategorySelect) productCategorySelect.value = category;
    if (productPriceInput) productPriceInput.value = price;
    if (productAvailabilityToggle) productAvailabilityToggle.checked = status === "متوفر";

    selectedProductImage = imageSrc;
    setProductPreview(imageSrc);

    if (productModalTitle) productModalTitle.textContent = "تعديل المنتج";
    if (saveProductBtn) saveProductBtn.textContent = "حفظ التعديل";

    productModal.classList.add("show");
    productOverlay.classList.add("show");
}

function createProductRow(product) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <img class="product-image" src="${product.image}" alt="${product.name}">
        </td>
        <td class="product-name-cell">${product.name}</td>
        <td class="product-category-cell">${product.category}</td>
        <td class="product-price-cell">${product.price} ج.م</td>
        <td class="product-status-cell">
            <span class="status ${product.available ? "available" : "unavailable"}">
                ${product.available ? "متوفر" : "غير متوفر"}
            </span>
        </td>
        <td>
            <button class="icon-btn edit">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="icon-btn delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
    `;

    return row;
}

function renderInitialProduct() {
    if (!productsTableBody) return;

    productsTableBody.innerHTML = "";
    productsTableBody.appendChild(createProductRow({
        image: "https://placehold.co/70",
        name: "دفتر سلك",
        category: "الكشاكيل",
        price: "45",
        available: true
    }));
}

if (addProductBtn && productModal && productOverlay) {

    // فتح نافذة إضافة المنتج

    addProductBtn.addEventListener("click", () => {
        editingProductRow = null;
        resetProductForm();
        if (productModalTitle) productModalTitle.textContent = "إضافة منتج جديد";
        if (saveProductBtn) saveProductBtn.textContent = "حفظ المنتج";

        productModal.classList.add("show");

        productOverlay.classList.add("show");

    });

    // غلق النافذة

    function closeProduct() {

        productModal.classList.remove("show");

        productOverlay.classList.remove("show");
        editingProductRow = null;
        resetProductForm();
        if (productModalTitle) productModalTitle.textContent = "إضافة منتج جديد";
        if (saveProductBtn) saveProductBtn.textContent = "حفظ المنتج";

    }

    closeProductModal?.addEventListener("click", closeProduct);

    cancelProduct?.addEventListener("click", closeProduct);

    productOverlay.addEventListener("click", closeProduct);

}

if (productImageInput && uploadBox) {
    productImageInput.addEventListener("change", (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            selectedProductImage = reader.result;
            setProductPreview(selectedProductImage);
        };
        reader.readAsDataURL(file);
    });
}

if (saveProductBtn) {
    saveProductBtn.addEventListener("click", () => {
        const name = productNameInput?.value.trim();
        const category = productCategorySelect?.value || "";
        const price = productPriceInput?.value.trim();
        const available = productAvailabilityToggle?.checked ?? true;

        if (!name || !price || !category) {
            return;
        }

        const productData = {
            image: selectedProductImage || "https://placehold.co/70",
            name,
            category,
            price,
            available
        };

        if (editingProductRow) {
            editingProductRow.innerHTML = `
                <td>
                    <img class="product-image" src="${productData.image}" alt="${productData.name}">
                </td>
                <td class="product-name-cell">${productData.name}</td>
                <td class="product-category-cell">${productData.category}</td>
                <td class="product-price-cell">${productData.price} ج.م</td>
                <td class="product-status-cell">
                    <span class="status ${productData.available ? "available" : "unavailable"}">
                        ${productData.available ? "متوفر" : "غير متوفر"}
                    </span>
                </td>
                <td>
                    <button class="icon-btn edit">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="icon-btn delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
        } else if (productsTableBody) {
            productsTableBody.appendChild(createProductRow(productData));
        }

        closeProduct();
    });
}

if (productsTableBody) {
    productsTableBody.addEventListener("click", (e) => {
        const editButton = e.target.closest(".icon-btn.edit");
        const deleteButton = e.target.closest(".icon-btn.delete");
        const row = e.target.closest("tr");

        if (editButton && row) {
            openProductModalForEdit(row);
        }

        if (deleteButton && row) {
            row.remove();
        }
    });

    renderInitialProduct();
}