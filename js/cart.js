// Shopping Cart Manager
class CartManager {
    constructor() {
        this.cart = this.loadCartFromStorage();
        this.cartModal = document.getElementById('cart-modal');
        this.cartCount = document.getElementById('cart-count');
        this.cartItems = document.getElementById('cart-items');
        this.cartTotal = document.getElementById('cart-total');
        
        this.initEventListeners();
        this.updateCartDisplay();
    }

    // Initialize event listeners
    initEventListeners() {
        // Cart button click
        const cartBtn = document.getElementById('cart-btn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.toggleCart());
        }

        // Close cart modal
        const cartClose = document.getElementById('cart-close');
        const cartCloseBtn = document.getElementById('cart-close-btn');
        
        if (cartClose) {
            cartClose.addEventListener('click', () => this.closeCart());
        }
        
        if (cartCloseBtn) {
            cartCloseBtn.addEventListener('click', () => this.closeCart());
        }

        // Close modal when clicking outside
        if (this.cartModal) {
            this.cartModal.addEventListener('click', (e) => {
                if (e.target === this.cartModal) {
                    this.closeCart();
                }
            });
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }

        // Listen for ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.cartModal && this.cartModal.classList.contains('active')) {
                this.closeCart();
            }
        });
    }

    // Add product to cart
    addToCart(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        this.saveCartToStorage();
        this.updateCartDisplay();
        this.showNotification(`${product.name} added to cart!`, 'success');
    }

    // Remove product from cart
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCartToStorage();
        this.updateCartDisplay();
        this.showNotification('Item removed from cart', 'info');
    }

    // Update quantity of item in cart
    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCartToStorage();
                this.updateCartDisplay();
            }
        }
    }

    // Clear entire cart
    clearCart() {
        this.cart = [];
        this.saveCartToStorage();
        this.updateCartDisplay();
        this.showNotification('Cart cleared', 'info');
    }

    // Get cart total
    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get cart item count
    getCartItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    // Update cart display
    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartTotal();
    }

    // Update cart count badge
    updateCartCount() {
        if (this.cartCount) {
            const count = this.getCartItemCount();
            this.cartCount.textContent = count;
            this.cartCount.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    // Update cart items in modal
    updateCartItems() {
        if (!this.cartItems) return;

        if (this.cart.length === 0) {
            this.cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart" style="font-size: 3rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
                    <p style="color: var(--gray-500); text-align: center;">Your cart is empty</p>
                    <a href="products.html" class="btn btn-primary" style="margin-top: 1rem;">Start Shopping</a>
                </div>
            `;
            return;
        }

        this.cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="remove-item" onclick="cartManager.removeFromCart(${item.id})" title="Remove item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update cart total
    updateCartTotal() {
        if (this.cartTotal) {
            this.cartTotal.textContent = this.getCartTotal().toFixed(2);
        }
    }

    // Toggle cart modal
    toggleCart() {
        if (this.cartModal) {
            if (this.cartModal.classList.contains('active')) {
                this.closeCart();
            } else {
                this.openCart();
            }
        }
    }

    // Open cart modal
    openCart() {
        if (this.cartModal) {
            this.cartModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close cart modal
    closeCart() {
        if (this.cartModal) {
            this.cartModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Checkout process
    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty!', 'warning');
            return;
        }

        // Simulate checkout process
        this.showNotification('Redirecting to checkout...', 'info');
        
        setTimeout(() => {
            // In a real application, this would redirect to a payment page
            alert(`Checkout Summary:\n\nItems: ${this.getCartItemCount()}\nTotal: $${this.getCartTotal().toFixed(2)}\n\nThank you for your order!`);
            this.clearCart();
            this.closeCart();
        }, 1000);
    }

    // Save cart to localStorage
    saveCartToStorage() {
        try {
            localStorage.setItem('techstore_cart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }

    // Load cart from localStorage
    loadCartFromStorage() {
        try {
            const savedCart = localStorage.getItem('techstore_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
            return [];
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-color)' : type === 'warning' ? 'var(--warning-color)' : 'var(--primary-color)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: var(--z-tooltip);
            max-width: 300px;
            animation: slideInFromRight 0.3s ease-out;
        `;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInFromRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 0.25rem;
            }
            .notification-close:hover {
                opacity: 0.8;
            }
        `;
        
        if (!document.querySelector('#notification-styles')) {
            style.id = 'notification-styles';
            document.head.appendChild(style);
        }

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutToRight 0.3s ease-in forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);

        // Add slide out animation
        if (!document.querySelector('#slideout-animation')) {
            const slideOutStyle = document.createElement('style');
            slideOutStyle.id = 'slideout-animation';
            slideOutStyle.textContent = `
                @keyframes slideOutToRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(slideOutStyle);
        }
    }

    // Get cart summary for display
    getCartSummary() {
        return {
            items: this.cart,
            itemCount: this.getCartItemCount(),
            total: this.getCartTotal()
        };
    }

    // Add multiple items at once
    addMultipleItems(items) {
        items.forEach(item => {
            this.addToCart(item.product, item.quantity);
        });
    }

    // Check if product is in cart
    isInCart(productId) {
        return this.cart.some(item => item.id === productId);
    }

    // Get quantity of specific product in cart
    getProductQuantity(productId) {
        const item = this.cart.find(item => item.id === productId);
        return item ? item.quantity : 0;
    }
}

// Initialize cart manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cartManager = new CartManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartManager;
}
