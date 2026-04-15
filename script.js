const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// ---------- PRODUCT CLICK → OPEN PRODUCT PAGE ----------
function setupProductLinks() {
    document.querySelectorAll('.pro').forEach(product => {
        product.addEventListener('click', (e) => {
            // Prevent cart icon from triggering product page
            if (e.target.closest('.cart')) return;

            const id = product.getAttribute('data-id');
            if (!id) return;

            window.location.href = `sproduct.html?id=${id}`;
        });
    });
}

// ---------- PRODUCT DATA ----------
const productData = {
    "winter-jacket": {
        name: "Winter Black Jacket",
        price: 14.99,
        images: [
            "img/products/I1.avif",
            "img/products/I20.jpg",
            "img/products/I20.jpg",
            "img/products/I20.jpg",
            
        ],
        description: "Stay warm, dry, and ready for action with this sleek black winter sports jacket..."
    },

    "mens-tracksuit": {
        name: "Mens Workout Tracksuit",
        price: 24.99,
        images: [
            "img/products/I2.avif",
            "img/products/I20.jpg",
            "img/products/I20.jpg",
            "img/products/I20.jpg",

        ],
        description: "Premium men's workout tracksuit designed for comfort and performance."
    },

    "womens-tracksuit": {
        name: "Womens Tracksuit Set",
        price: 24.99,
        images: [
            "img/products/I3.avif",
            "img/products/I20.jpg",
            "img/products/I20.jpg",
            "img/products/I20.jpg",
        ],
        description: "Stylish women's tracksuit set for training or casual wear."
    },

    "womens-fleece": {
        name: "Womens Fleece",
        price: 14.99,
        images: [
            "img/products/I4.avif",
            "img/products/I20.jpg",
            "img/products/I20.jpg",
            "img/products/I20.jpg",
        ],
        description: "Soft and warm fleece perfect for winter."
    },

    "nike-gloves": {
        name: "Nike Academy Gloves",
        price: 27.99,
        images: [
            "img/products/I5.1.avif",
            "img/products/I20.jpg",
            "img/products/I20.jpg",
            "img/products/I20.jpg",
        ],
        description: "High‑performance Nike gloves for cold‑weather training."
    },

    "nike-running-top": {
        name: "Nike Swift Womens Running Top",
        price: 37.99,
        images: [
            "img/products/I8.avif",
            "img/products/I20.jpg",
            "img/products/I20.jpg",
            "img/products/I20.jpg",
        ],
        description: "Lightweight running top designed for speed and comfort."
    },

    "running-jacket": {
        name: "Running Jacket",
        price: 49.99,
        images: [
            "img/products/I6.avif",
            "img/products/I20.jpg",
            "img/products/I20.jpg",
            "img/products/I20.jpg",
        ],
        description: "Premium running jacket built for performance."
    },

    "nike-shorts": {
        name: "Nike Challenger Shorts",
        price: 34.99,
        images: [
            "img/products/I7.avif",
            "img/products/I20.jpg",
            "img/products/I20.jpg",
            "img/products/I20.jpg",
        ],
        description: "Breathable Nike shorts for training and running."
    }
};

// ---------- LOAD PRODUCT PAGE ----------
function loadProductPage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id || !productData[id]) return;

    const product = productData[id];

    // Update name + price
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = `£${product.price.toFixed(2)}`;

    // Update main image
    document.getElementById("MainImg").src = product.images[0];

    // Update small images
    const smallImgs = document.querySelectorAll(".small-img");
    smallImgs.forEach((img, index) => {
        img.src = product.images[index] || product.images[0];
    });

    // Update description
    document.querySelector(".single-pro-details span").textContent = product.description;
}

// ---------- CART STORAGE ----------
function getCart() {
    const cart = localStorage.getItem('cartItems');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

// ---------- ADD TO CART (SINGLE PRODUCT PAGE) ----------
function setupSingleProductAddToCart() {
    const addBtn = document.getElementById('add-to-cart-btn');
    const nameEl = document.getElementById('product-name');
    const priceEl = document.getElementById('product-price');
    const qtyEl = document.getElementById('product-qty');
    const mainImg = document.getElementById('MainImg');

    if (!addBtn) return;

    addBtn.addEventListener('click', () => {
        const name = nameEl.textContent.trim();
        const price = parseFloat(priceEl.textContent.replace('£', ''));
        const quantity = parseInt(qtyEl.value) || 1;
        const image = mainImg.src;

        let cart = getCart();

        const existing = cart.find(item => item.name === name && item.image === image);

        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({
                id: Date.now(),
                name,
                price,
                image,
                quantity
            });
        }

        saveCart(cart);
        alert('Item added to cart');
    });
}

// ---------- ADD TO CART (SHOP PAGE) ----------
function setupFeaturedProductsAddToCart() {
    document.querySelectorAll('.pro').forEach(card => {
        const cartBtn = card.querySelector('.cart');
        if (!cartBtn) return;

        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const name = card.querySelector('.des h5').textContent.trim();
            const price = parseFloat(card.querySelector('.des h4').textContent.replace('£', ''));
            const image = card.querySelector('img').src;

            let cart = getCart();

            const existing = cart.find(item => item.name === name && item.image === image);

            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({
                    id: Date.now() + Math.random(),
                    name,
                    price,
                    image,
                    quantity: 1
                });
            }

            saveCart(cart);
            alert('Item added to cart');
        });
    });
}

// ---------- RENDER CART PAGE ----------
function renderCartPage() {
    const cartTableBody = document.getElementById('cart-body');
    let cart = getCart();

    // Update total
    const totalBox = document.getElementById('cart-total');
    if (totalBox) {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalBox.textContent = `£${total.toFixed(2)}`;
    }

    if (!cartTableBody) return;

    cartTableBody.innerHTML = '';

    if (cart.length === 0) {
        cartTableBody.innerHTML = `
            <tr><td colspan="6" style="text-align:center;">Your cart is empty.</td></tr>
        `;
        return;
    }

    cart.forEach(item => {
        const row = document.createElement('tr');
        const subtotal = (item.price * item.quantity).toFixed(2);

        row.innerHTML = `
            <td><a href="#" class="remove-item" data-id="${item.id}">
                <i class="fa-regular fa-circle-xmark"></i></a>
            </td>
            <td><img src="${item.image}"></td>
            <td>${item.name}</td>
            <td>£${item.price.toFixed(2)}</td>
            <td><input type="number" class="cart-qty" data-id="${item.id}" value="${item.quantity}" min="1"></td>
            <td class="item-subtotal">£${subtotal}</td>
        `;

        cartTableBody.appendChild(row);
    });

    setupCartEvents();
}

// ---------- CART EVENTS ----------
function setupCartEvents() {
    const cartTableBody = document.getElementById('cart-body');
    if (!cartTableBody) return;

    // Remove item
    cartTableBody.addEventListener('click', (e) => {
        const removeLink = e.target.closest('.remove-item');
        if (!removeLink) return;

        e.preventDefault();
        const id = removeLink.getAttribute('data-id');

        let cart = getCart().filter(item => String(item.id) !== String(id));
        saveCart(cart);
        renderCartPage();
    });

    // Quantity change
    cartTableBody.addEventListener('change', (e) => {
        if (!e.target.classList.contains('cart-qty')) return;

        const id = e.target.getAttribute('data-id');
        let newQty = Math.max(1, parseInt(e.target.value));

        let cart = getCart();
        const item = cart.find(i => String(i.id) === String(id));
        if (!item) return;

        item.quantity = newQty;
        saveCart(cart);

        // Update subtotal
        const row = e.target.closest('tr');
        row.querySelector('.item-subtotal').textContent =
            `£${(item.price * item.quantity).toFixed(2)}`;

        // Update total
        const totalBox = document.getElementById('cart-total');
        if (totalBox) {
            const newTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
            totalBox.textContent = `£${newTotal.toFixed(2)}`;
        }
    });
}

// ---------- PRODUCT IMAGE SWITCHING ----------
function setupProductImageSwitcher() {
    const MainImg = document.getElementById('MainImg');
    const smallimg = document.getElementsByClassName('small-img');

    if (!MainImg) return;

    for (let i = 0; i < smallimg.length; i++) {
        smallimg[i].onclick = function () {
            MainImg.src = smallimg[i].src;
        };
    }
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
    setupProductLinks();
    loadProductPage();
    setupProductImageSwitcher();
    setupSingleProductAddToCart();
    setupFeaturedProductsAddToCart();
    renderCartPage();
});

document.getElementById("signInButton")?.addEventListener("click", () => {
    document.getElementById("signup").style.display = "none";
    document.getElementById("signIn").style.display = "block";
});

document.getElementById("signUpButton")?.addEventListener("click", () => {
    document.getElementById("signIn").style.display = "none";
    document.getElementById("signup").style.display = "block";
});