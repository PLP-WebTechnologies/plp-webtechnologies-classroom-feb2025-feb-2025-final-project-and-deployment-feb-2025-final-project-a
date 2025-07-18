// Products Database
const productsData = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: 1199.99,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "smartphones",
        rating: 4.8,
        reviews: 1247,
        badge: "New",
        description: "The most advanced iPhone ever with titanium design, A17 Pro chip, and ProRAW photography."
    },
    {
        id: 2,
        name: "MacBook Pro 16\"",
        price: 2499.99,
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "laptops",
        rating: 4.9,
        reviews: 892,
        badge: "Best Seller",
        description: "Supercharged by M3 Pro and M3 Max chips. Built for professionals who need maximum performance."
    },
    {
        id: 3,
        name: "AirPods Pro (3rd Gen)",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "headphones",
        rating: 4.7,
        reviews: 2156,
        badge: "Popular",
        description: "Personalized Spatial Audio, Adaptive Transparency, and up to 2x more Active Noise Cancellation."
    },
    {
        id: 4,
        name: "Samsung Galaxy S24 Ultra",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "smartphones",
        rating: 4.6,
        reviews: 1089,
        badge: "Latest",
        description: "Built-in S Pen, AI features, 200MP camera, and the most powerful Galaxy phone ever."
    },
    {
        id: 5,
        name: "Dell XPS 13 Plus",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "laptops",
        rating: 4.5,
        reviews: 567,
        badge: "Ultrabook",
        description: "Stunning 13.4-inch display, Intel 12th Gen processors, and premium design in a compact form."
    },
    {
        id: 6,
        name: "Sony WH-1000XM5",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "headphones",
        rating: 4.8,
        reviews: 1834,
        badge: "Premium",
        description: "Industry-leading noise canceling with new lightweight design and exceptional call quality."
    },
    {
        id: 7,
        name: "Google Nest Hub Max",
        price: 229.99,
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "smart-home",
        rating: 4.4,
        reviews: 923,
        badge: "Smart Display",
        description: "10-inch smart display with Google Assistant, video calling, and smart home control."
    },
    {
        id: 8,
        name: "iPad Pro 12.9\"",
        price: 1099.99,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "tablets",
        rating: 4.7,
        reviews: 1456,
        badge: "Pro",
        description: "M2 chip delivers incredible performance. 12.9-inch Liquid Retina XDR display for stunning visuals."
    },
    {
        id: 9,
        name: "Nintendo Switch OLED",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "gaming",
        rating: 4.6,
        reviews: 2789,
        badge: "Gaming",
        description: "7-inch OLED screen, enhanced audio, and 64GB internal storage for gaming anywhere."
    },
    {
        id: 10,
        name: "Amazon Echo Studio",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "smart-home",
        rating: 4.3,
        reviews: 1567,
        badge: "Hi-Fi",
        description: "High-fidelity smart speaker with 3D audio and Alexa. Room adaptation technology."
    },
    {
        id: 11,
        name: "Apple Watch Series 9",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "wearables",
        rating: 4.7,
        reviews: 1923,
        badge: "Health",
        description: "Advanced health monitoring, GPS tracking, and seamless iPhone integration."
    },
    {
        id: 12,
        name: "Microsoft Surface Pro 9",
        price: 999.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "laptops",
        rating: 4.4,
        reviews: 734,
        badge: "2-in-1",
        description: "Laptop flexibility with tablet portability. Intel 12th Gen or Microsoft SQ3 processors."
    },
    {
        id: 13,
        name: "Samsung Galaxy Tab S9",
        price: 799.99,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "tablets",
        rating: 4.6,
        reviews: 892,
        badge: "S Pen Included",
        description: "Premium Android tablet with S Pen, DeX mode, and stunning AMOLED display."
    },
    {
        id: 14,
        name: "Sony PlayStation 5",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "gaming",
        rating: 4.8,
        reviews: 3456,
        badge: "Next-Gen",
        description: "Revolutionary gaming console with 4K gaming, ray tracing, and lightning-fast SSD."
    },
    {
        id: 15,
        name: "Bose QuietComfort 45",
        price: 329.99,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "headphones",
        rating: 4.5,
        reviews: 1678,
        badge: "Noise Cancelling",
        description: "World-class noise cancellation, exceptional audio quality, and all-day comfort."
    },
    {
        id: 16,
        name: "Google Pixel 8 Pro",
        price: 999.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "smartphones",
        rating: 4.7,
        reviews: 1234,
        badge: "AI Camera",
        description: "Advanced AI photography, Magic Eraser, and pure Android experience with Tensor G3."
    },
    {
        id: 17,
        name: "Razer Blade 15",
        price: 1899.99,
        image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "laptops",
        rating: 4.6,
        reviews: 567,
        badge: "Gaming",
        description: "Premium gaming laptop with RTX 4070, Intel i7, and 144Hz display for serious gamers."
    },
    {
        id: 18,
        name: "Fitbit Versa 4",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "wearables",
        rating: 4.3,
        reviews: 2145,
        badge: "Fitness",
        description: "Advanced fitness tracking, GPS, sleep monitoring, and 6+ day battery life."
    },
    {
        id: 19,
        name: "LG OLED C3 55\"",
        price: 1499.99,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "tvs",
        rating: 4.8,
        reviews: 1876,
        badge: "4K OLED",
        description: "Self-lit OLED pixels, α9 Gen6 AI Processor, and Dolby Vision IQ for cinematic viewing."
    },
    {
        id: 20,
        name: "Canon EOS R5",
        price: 3899.99,
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "cameras",
        rating: 4.9,
        reviews: 456,
        badge: "Professional",
        description: "Professional mirrorless camera with 45MP sensor, 8K video, and incredible autofocus."
    },
    {
        id: 21,
        name: "Dyson V15 Detect",
        price: 749.99,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "home-appliances",
        rating: 4.7,
        reviews: 1324,
        badge: "Laser Detect",
        description: "Cordless vacuum with laser dust detection, LCD screen, and up to 60 minutes runtime."
    },
    {
        id: 22,
        name: "JBL Charge 5",
        price: 179.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "speakers",
        rating: 4.6,
        reviews: 2987,
        badge: "Waterproof",
        description: "Portable Bluetooth speaker with powerful bass, 20-hour playtime, and IP67 waterproof."
    },
    {
        id: 23,
        name: "Tesla Model S Plaid Wheel",
        price: 4500.00,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "automotive",
        rating: 4.9,
        reviews: 123,
        badge: "Luxury",
        description: "Premium 21-inch wheel set designed specifically for Tesla Model S Plaid."
    },
    {
        id: 24,
        name: "Oculus Quest 3",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "vr",
        rating: 4.7,
        reviews: 1567,
        badge: "VR/AR",
        description: "Mixed reality headset with improved graphics, hand tracking, and wireless freedom."
    }
];

// Categories
const categories = [
    { id: 'smartphones', name: 'Smartphones', icon: 'fas fa-mobile-alt' },
    { id: 'laptops', name: 'Laptops', icon: 'fas fa-laptop' },
    { id: 'headphones', name: 'Audio', icon: 'fas fa-headphones' },
    { id: 'smart-home', name: 'Smart Home', icon: 'fas fa-home' },
    { id: 'tablets', name: 'Tablets', icon: 'fas fa-tablet-alt' },
    { id: 'gaming', name: 'Gaming', icon: 'fas fa-gamepad' },
    { id: 'wearables', name: 'Wearables', icon: 'fas fa-watch' },
    { id: 'tvs', name: 'TVs & Displays', icon: 'fas fa-tv' },
    { id: 'cameras', name: 'Cameras', icon: 'fas fa-camera' },
    { id: 'home-appliances', name: 'Home Appliances', icon: 'fas fa-blender' },
    { id: 'speakers', name: 'Speakers', icon: 'fas fa-volume-up' },
    { id: 'automotive', name: 'Automotive', icon: 'fas fa-car' },
    { id: 'vr', name: 'VR/AR', icon: 'fas fa-vr-cardboard' }
];

// Product utility functions
class ProductManager {
    constructor() {
        this.products = productsData;
        this.categories = categories;
    }

    // Get all products
    getAllProducts() {
        return this.products;
    }

    // Get featured products (first 6)
    getFeaturedProducts() {
        return this.products.slice(0, 6);
    }

    // Get products by category
    getProductsByCategory(categoryId) {
        return this.products.filter(product => product.category === categoryId);
    }

    // Get product by ID
    getProductById(id) {
        return this.products.find(product => product.id === parseInt(id));
    }

    // Search products
    searchProducts(query) {
        const searchTerm = query.toLowerCase();
        return this.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    // Sort products
    sortProducts(products, sortBy) {
        const sorted = [...products];
        
        switch (sortBy) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'reviews':
                return sorted.sort((a, b) => b.reviews - a.reviews);
            case 'name':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return sorted;
        }
    }

    // Filter products by price range
    filterByPrice(products, minPrice, maxPrice) {
        return products.filter(product => 
            product.price >= minPrice && product.price <= maxPrice
        );
    }

    // Filter products by rating
    filterByRating(products, minRating) {
        return products.filter(product => product.rating >= minRating);
    }

    // Generate product HTML
    generateProductHTML(product) {
        const stars = this.generateStars(product.rating);
        
        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    }

    // Generate stars HTML
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let starsHTML = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star star"></i>';
        }
        
        // Half star
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt star"></i>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star star"></i>';
        }
        
        return starsHTML;
    }

    // Load featured products on homepage
    loadFeaturedProducts() {
        const container = document.getElementById('featured-products');
        if (!container) {
            console.log('Featured products container not found');
            return;
        }

        console.log('Loading featured products...');
        const featuredProducts = this.getFeaturedProducts();
        console.log('Featured products count:', featuredProducts.length);
        
        container.innerHTML = featuredProducts.map(product => 
            this.generateProductHTML(product)
        ).join('');

        // Add event listeners for add to cart buttons
        this.attachAddToCartListeners();
        console.log('Featured products loaded successfully');
    }

    // Load all products (for products page)
    loadAllProducts(containerId = 'products-container') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.log('Products container not found:', containerId);
            return;
        }

        console.log('Loading all products...');
        const allProducts = this.getAllProducts();
        console.log('All products count:', allProducts.length);
        
        container.innerHTML = allProducts.map(product => 
            this.generateProductHTML(product)
        ).join('');

        // Add event listeners for add to cart buttons
        this.attachAddToCartListeners();
        console.log('All products loaded successfully');
    }

    // Attach event listeners to add to cart buttons
    attachAddToCartListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = parseInt(button.dataset.id);
                const product = this.getProductById(productId);
                
                if (product && window.cartManager) {
                    window.cartManager.addToCart(product);
                    
                    // Visual feedback
                    button.innerHTML = '<i class="fas fa-check"></i> Added!';
                    button.style.backgroundColor = 'var(--success-color)';
                    
                    setTimeout(() => {
                        button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                        button.style.backgroundColor = '';
                    }, 1500);
                }
            });
        });
    }
}

// Initialize product manager
const productManager = new ProductManager();
console.log('ProductManager initialized with', productManager.products.length, 'products');

// Make available globally
window.productManager = productManager;
console.log('ProductManager assigned to window.productManager');

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProductManager, productsData, categories };
}
