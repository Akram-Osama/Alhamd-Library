// ======================================================
//                 CATEGORY MODAL
// ======================================================

const openModal = document.getElementById("openModal");
const modal = document.getElementById("categoryModal");
const overlay = document.getElementById("overlay");

const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");

if (openModal && modal && overlay) {

    // فتح نافذة إضافة قسم

    openModal.addEventListener("click", () => {

        modal.classList.add("show");
        overlay.classList.add("show");

    });

    // غلق النافذة

    function closeCategoryModal() {

        modal.classList.remove("show");
        overlay.classList.remove("show");

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

if (

    addProductBtn &&
    productModal &&
    productOverlay

) {

    // فتح نافذة إضافة المنتج

    addProductBtn.addEventListener("click", () => {

        productModal.classList.add("show");

        productOverlay.classList.add("show");

    });

    // غلق النافذة

    function closeProduct() {

        productModal.classList.remove("show");

        productOverlay.classList.remove("show");

    }

    closeProductModal?.addEventListener("click", closeProduct);

    cancelProduct?.addEventListener("click", closeProduct);

    productOverlay.addEventListener("click", closeProduct);

}