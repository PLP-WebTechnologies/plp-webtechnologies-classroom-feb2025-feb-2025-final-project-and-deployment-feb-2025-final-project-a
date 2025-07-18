// Products Page Functionality
class ProductsPage {
    constructor() {
        this.currentProducts = [];
        this.filteredProducts = [];
        this.currentView = 'grid';
        this.itemsPerPage = 12;
        this.currentPage = 1;
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.setupFilters();
        this.setupSorting();
        this.setupViewToggle();
        this.setupPagination();
        this.checkUrlParameters();
        this.updateProductsCount();
    }

    // Load all products
    loadProducts() {
        if (window.productManager) {
            this.currentProducts = window.productManager.getAllProducts();
            this.filteredProducts = [...this.currentProducts];
            this.displayProducts();
        }
    }

    // Setup filter functionality
    setupFilters() {
        // Category filters
        const categoryInputs = document.querySelectorAll('input[name="category"]');
        categoryInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.applyFilters();
            });
        });

        // Rating filters
        const ratingInputs = document.querySelectorAll('input[name="rating"]');
        ratingInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.applyFilters();
            });
        });

        // Price filter
        const applyPriceBtn = document.getElementById('apply-price-filter');
        if (applyPriceBtn) {
            applyPriceBtn.addEventListener('click', () => {
                this.applyFilters();
            });
        }

        // Price inputs enter key
        const priceInputs = document.querySelectorAll('.price-input');
        priceInputs.forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.applyFilters();
                }
            });
        });

        // Clear filters
        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }
    }

    // Apply all filters
    applyFilters() {
        let filtered = [...this.currentProducts];

        // Apply category filter
        const selectedCategory = document.querySelector('input[name="category"]:checked');
        if (selectedCategory && selectedCategory.value !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory.value);
        }

        // Apply rating filter
        const selectedRating = document.querySelector('input[name="rating"]:checked');
        if (selectedRating && selectedRating.value !== 'all') {
            const minRating = parseFloat(selectedRating.value);
            filtered = filtered.filter(product => product.rating >= minRating);
        }

        // Apply price filter
        const minPrice = document.getElementById('min-price').value;
        const maxPrice = document.getElementById('max-price').value;
        
        if (minPrice) {
            filtered = filtered.filter(product => product.price >= parseFloat(minPrice));
        }
        
        if (maxPrice) {
            filtered = filtered.filter(product => product.price <= parseFloat(maxPrice));
        }

        this.filteredProducts = filtered;
        this.currentPage = 1;
        this.displayProducts();
        this.updateProductsCount();
        this.updateUrlWithFilters();
    }

    // Clear all filters
    clearAllFilters() {
        // Reset category filter
        document.querySelector('input[name="category"][value="all"]').checked = true;
        
        // Reset rating filter
        document.querySelector('input[name="rating"][value="all"]').checked = true;
        
        // Reset price inputs
        document.getElementById('min-price').value = '';
        document.getElementById('max-price').value = '';
        
        // Reset sort
        document.getElementById('sort-select').value = 'default';
        
        // Apply filters (which will show all products)
        this.applyFilters();
    }

    // Setup sorting functionality
    setupSorting() {
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                this.sortProducts(sortSelect.value);
            });
        }
    }

    // Sort products
    sortProducts(sortBy) {
        if (window.productManager) {
            this.filteredProducts = window.productManager.sortProducts(this.filteredProducts, sortBy);
            this.displayProducts();
        }
    }

    // Setup view toggle
    setupViewToggle() {
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.switchView(view);
                
                // Update active state
                viewButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    // Switch between grid and list view
    switchView(view) {
        this.currentView = view;
        const container = document.getElementById('products-container');
        
        if (container) {
            container.className = view === 'list' ? 'products-list' : 'products-grid';
            this.displayProducts();
        }
    }

    // Setup pagination
    setupPagination() {
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreProducts();
            });
        }
    }

    // Load more products
    loadMoreProducts() {
        this.currentPage++;
        this.displayProducts(true);
    }

    // Display products
    displayProducts(append = false) {
        const container = document.getElementById('products-container');
        if (!container || !window.productManager) return;

        const startIndex = append ? (this.currentPage - 1) * this.itemsPerPage : 0;
        const endIndex = this.currentPage * this.itemsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        if (productsToShow.length === 0 && !append) {
            container.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-box-open" style="font-size: 3rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters or search terms.</p>
                    <button class="btn btn-primary" onclick="productsPage.clearAllFilters()">Clear Filters</button>
                </div>
            `;
            this.hideLoadMoreButton();
            return;
        }

        const productsHTML = productsToShow.map(product => {
            if (this.currentView === 'list') {
                return this.generateListProductHTML(product);
            } else {
                return window.productManager.generateProductHTML(product);
            }
        }).join('');

        if (append) {
            container.insertAdjacentHTML('beforeend', productsHTML);
        } else {
            container.innerHTML = productsHTML;
        }

        // Attach event listeners
        window.productManager.attachAddToCartListeners();

        // Update load more button
        this.updateLoadMoreButton();

        // Add animation to new products
        this.animateNewProducts();
    }

    // Generate list view HTML for product
    generateListProductHTML(product) {
        const stars = window.productManager.generateStars(product.rating);
        
        return `
            <div class="product-list-item" data-id="${product.id}">
                <div class="product-list-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-list-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-count">(${product.reviews} reviews)</span>
                    </div>
                    <div class="product-list-actions">
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="add-to-cart" data-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Update load more button visibility
    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more');
        if (!loadMoreBtn) return;

        const totalShown = this.currentPage * this.itemsPerPage;
        const hasMore = totalShown < this.filteredProducts.length;

        if (hasMore) {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.textContent = `Load More (${Math.min(this.itemsPerPage, this.filteredProducts.length - totalShown)} more)`;
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Hide load more button
    hideLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Update products count
    updateProductsCount() {
        const countElement = document.getElementById('products-count');
        if (countElement) {
            const count = this.filteredProducts.length;
            const total = this.currentProducts.length;
            
            if (count === total) {
                countElement.textContent = `Showing all ${count} products`;
            } else {
                countElement.textContent = `Showing ${count} of ${total} products`;
            }
        }
    }

    // Animate new products
    animateNewProducts() {
        const newProducts = document.querySelectorAll('.product-card:not(.animated), .product-list-item:not(.animated)');
        newProducts.forEach((product, index) => {
            product.classList.add('animated');
            setTimeout(() => {
                product.classList.add('fade-in');
            }, index * 100);
        });
    }

    // Check URL parameters for initial filters
    checkUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Check for category filter
        const category = urlParams.get('category');
        if (category) {
            const categoryInput = document.querySelector(`input[name="category"][value="${category}"]`);
            if (categoryInput) {
                categoryInput.checked = true;
            }
        }

        // Check for search query
        const search = urlParams.get('search');
        if (search) {
            this.performSearch(search);
        }

        // Apply filters if any were set
        if (category || search) {
            this.applyFilters();
        }
    }

    // Perform search
    performSearch(query) {
        if (window.productManager) {
            this.filteredProducts = window.productManager.searchProducts(query);
            this.currentPage = 1;
            this.displayProducts();
            this.updateProductsCount();
            
            // Update page title to reflect search
            document.title = `Search Results for "${query}" - TechStore`;
            
            // Update page header
            const pageTitle = document.querySelector('.page-title');
            const pageDescription = document.querySelector('.page-description');
            
            if (pageTitle) {
                pageTitle.textContent = `Search Results for "${query}"`;
            }
            
            if (pageDescription) {
                pageDescription.textContent = `Found ${this.filteredProducts.length} products matching your search`;
            }
        }
    }

    // Update URL with current filters
    updateUrlWithFilters() {
        const urlParams = new URLSearchParams();
        
        // Add category filter
        const selectedCategory = document.querySelector('input[name="category"]:checked');
        if (selectedCategory && selectedCategory.value !== 'all') {
            urlParams.set('category', selectedCategory.value);
        }
        
        // Add rating filter
        const selectedRating = document.querySelector('input[name="rating"]:checked');
        if (selectedRating && selectedRating.value !== 'all') {
            urlParams.set('rating', selectedRating.value);
        }
        
        // Add price filters
        const minPrice = document.getElementById('min-price').value;
        const maxPrice = document.getElementById('max-price').value;
        
        if (minPrice) {
            urlParams.set('min_price', minPrice);
        }
        
        if (maxPrice) {
            urlParams.set('max_price', maxPrice);
        }
        
        // Add sort
        const sort = document.getElementById('sort-select').value;
        if (sort !== 'default') {
            urlParams.set('sort', sort);
        }
        
        // Update URL without page reload
        const newUrl = urlParams.toString() ? 
            `${window.location.pathname}?${urlParams.toString()}` : 
            window.location.pathname;
        
        window.history.replaceState({}, '', newUrl);
    }

    // Filter by specific category (called from category cards)
    filterByCategory(categoryId) {
        const categoryInput = document.querySelector(`input[name="category"][value="${categoryId}"]`);
        if (categoryInput) {
            categoryInput.checked = true;
            this.applyFilters();
        }
    }

    // Get current filter state
    getCurrentFilters() {
        const selectedCategory = document.querySelector('input[name="category"]:checked');
        const selectedRating = document.querySelector('input[name="rating"]:checked');
        const minPrice = document.getElementById('min-price').value;
        const maxPrice = document.getElementById('max-price').value;
        const sort = document.getElementById('sort-select').value;
        
        return {
            category: selectedCategory ? selectedCategory.value : 'all',
            rating: selectedRating ? selectedRating.value : 'all',
            minPrice: minPrice || null,
            maxPrice: maxPrice || null,
            sort: sort || 'default'
        };
    }

    // Reset to specific page state
    resetToState(state) {
        // Set category
        if (state.category) {
            const categoryInput = document.querySelector(`input[name="category"][value="${state.category}"]`);
            if (categoryInput) categoryInput.checked = true;
        }
        
        // Set rating
        if (state.rating) {
            const ratingInput = document.querySelector(`input[name="rating"][value="${state.rating}"]`);
            if (ratingInput) ratingInput.checked = true;
        }
        
        // Set price range
        if (state.minPrice) {
            document.getElementById('min-price').value = state.minPrice;
        }
        
        if (state.maxPrice) {
            document.getElementById('max-price').value = state.maxPrice;
        }
        
        // Set sort
        if (state.sort) {
            document.getElementById('sort-select').value = state.sort;
        }
        
        // Apply all filters
        this.applyFilters();
    }
}

// Additional CSS for products page
const additionalStyles = `
    .page-header {
        padding: calc(80px + var(--spacing-8)) 0 var(--spacing-8);
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
        color: var(--white);
        text-align: center;
    }

    .page-title {
        font-size: var(--font-size-4xl);
        margin-bottom: var(--spacing-4);
        color: var(--white);
    }

    .page-description {
        font-size: var(--font-size-lg);
        margin-bottom: var(--spacing-6);
        color: rgba(255, 255, 255, 0.9);
    }

    .breadcrumb {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-2);
        font-size: var(--font-size-sm);
    }

    .breadcrumb a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
    }

    .breadcrumb a:hover {
        color: var(--white);
    }

    .breadcrumb-separator {
        color: rgba(255, 255, 255, 0.6);
    }

    .breadcrumb-current {
        color: var(--white);
        font-weight: 500;
    }

    .products-section {
        padding: var(--spacing-12) 0;
    }

    .products-layout {
        display: grid;
        grid-template-columns: 250px 1fr;
        gap: var(--spacing-8);
    }

    .products-sidebar {
        background-color: var(--white);
        border: 1px solid var(--gray-200);
        border-radius: var(--radius-xl);
        padding: var(--spacing-6);
        height: fit-content;
        position: sticky;
        top: 100px;
    }

    .filter-section {
        margin-bottom: var(--spacing-8);
    }

    .filter-section:last-child {
        margin-bottom: 0;
    }

    .filter-title {
        font-size: var(--font-size-lg);
        font-weight: 600;
        margin-bottom: var(--spacing-4);
        color: var(--gray-900);
    }

    .filter-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
    }

    .filter-option {
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
        cursor: pointer;
        font-size: var(--font-size-sm);
        color: var(--gray-700);
        transition: color var(--transition-fast);
    }

    .filter-option:hover {
        color: var(--primary-color);
    }

    .filter-option input {
        margin: 0;
    }

    .price-range {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
    }

    .price-inputs {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
    }

    .price-input {
        flex: 1;
        padding: var(--spacing-2);
        border: 1px solid var(--gray-300);
        border-radius: var(--radius-md);
        font-size: var(--font-size-sm);
    }

    .price-separator {
        color: var(--gray-500);
    }

    .apply-price-filter {
        padding: var(--spacing-2) var(--spacing-4);
        background-color: var(--primary-color);
        color: var(--white);
        border: none;
        border-radius: var(--radius-md);
        font-size: var(--font-size-sm);
        cursor: pointer;
        transition: background-color var(--transition-fast);
    }

    .apply-price-filter:hover {
        background-color: var(--primary-dark);
    }

    .clear-filters {
        width: 100%;
        padding: var(--spacing-3);
        background-color: var(--gray-100);
        color: var(--gray-700);
        border: 1px solid var(--gray-300);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all var(--transition-fast);
    }

    .clear-filters:hover {
        background-color: var(--gray-200);
        color: var(--gray-900);
    }

    .products-content {
        min-height: 500px;
    }

    .products-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-8);
        padding-bottom: var(--spacing-4);
        border-bottom: 1px solid var(--gray-200);
    }

    .products-count {
        font-size: var(--font-size-sm);
        color: var(--gray-600);
    }

    .products-controls {
        display: flex;
        align-items: center;
        gap: var(--spacing-4);
    }

    .view-toggle {
        display: flex;
        border: 1px solid var(--gray-300);
        border-radius: var(--radius-md);
        overflow: hidden;
    }

    .view-btn {
        padding: var(--spacing-2) var(--spacing-3);
        background-color: var(--white);
        border: none;
        cursor: pointer;
        color: var(--gray-600);
        transition: all var(--transition-fast);
    }

    .view-btn.active,
    .view-btn:hover {
        background-color: var(--primary-color);
        color: var(--white);
    }

    .sort-select {
        padding: var(--spacing-2) var(--spacing-4);
        border: 1px solid var(--gray-300);
        border-radius: var(--radius-md);
        font-size: var(--font-size-sm);
        background-color: var(--white);
        cursor: pointer;
    }

    .products-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-6);
    }

    .product-list-item {
        display: flex;
        gap: var(--spacing-6);
        background-color: var(--white);
        border: 1px solid var(--gray-200);
        border-radius: var(--radius-xl);
        padding: var(--spacing-6);
        transition: all var(--transition-normal);
    }

    .product-list-item:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
    }

    .product-list-image {
        flex-shrink: 0;
        width: 200px;
        height: 150px;
        border-radius: var(--radius-lg);
        overflow: hidden;
        position: relative;
    }

    .product-list-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .product-list-info {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .product-list-info .product-title {
        font-size: var(--font-size-xl);
        margin-bottom: var(--spacing-3);
    }

    .product-description {
        flex: 1;
        color: var(--gray-600);
        margin-bottom: var(--spacing-4);
        line-height: 1.5;
    }

    .product-list-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
    }

    .no-products {
        grid-column: 1 / -1;
        text-align: center;
        padding: var(--spacing-16);
        color: var(--gray-500);
    }

    .load-more-container {
        text-align: center;
        margin-top: var(--spacing-12);
    }

    @media (max-width: 1024px) {
        .products-layout {
            grid-template-columns: 1fr;
        }

        .products-sidebar {
            position: static;
            margin-bottom: var(--spacing-8);
        }
    }

    @media (max-width: 768px) {
        .products-header {
            flex-direction: column;
            gap: var(--spacing-4);
            align-items: stretch;
        }

        .products-controls {
            justify-content: space-between;
        }

        .product-list-item {
            flex-direction: column;
        }

        .product-list-image {
            width: 100%;
            height: 200px;
        }

        .product-list-actions {
            flex-direction: column;
            gap: var(--spacing-3);
            align-items: stretch;
        }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize products page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.productsPage = new ProductsPage();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductsPage;
}
