// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Product Data
    const products = [
        { id: 1, name: 'Wireless Headphones', price: 199.99, image: 'headphones.jpg' },
        { id: 2, name: 'Smart Watch', price: 299.99, image: 'smartwatch.jpg' },
        { id: 3, name: '4K Camera', price: 799.99, image: 'camera.jpg' }
    ];

    // Initialize cart
    let cart = [];
    
    // Render Products
    const productGrid = document.querySelector('.product-grid');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });

    // Cart Functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            const product = products.find(p => p.id === productId);
            cart.push(product);
            updateCartCount();
        });
    });

    function updateCartCount() {
        document.querySelector('.cart-count').textContent = cart.length;
    }

    // Form Validation
    document.querySelector('.contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (validateForm(formData)) {
            alert('Message sent successfully!');
            e.target.reset();
        }
    });

    function validateForm(formData) {
        // Add validation logic
        return true;
    }
});