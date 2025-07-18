// Main JavaScript file for TechStore
class TechStore {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.setupSearch();
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupNewsletterForm();
        this.setupCategoryCards();
        this.setupLazyLoading();
        this.loadFeaturedProducts();
    }

    // Setup event listeners
    setupEventListeners() {
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.onDOMLoaded();
        });

        // Window events
        window.addEventListener('scroll', () => this.onScroll());
        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('load', () => this.onLoad());
    }

    // DOM loaded handler
    onDOMLoaded() {
        console.log('TechStore initialized');
        this.updateActiveNavLink();
    }

    // Scroll handler
    onScroll() {
        this.updateHeaderOnScroll();
        this.updateActiveNavLinkOnScroll();
    }

    // Resize handler
    onResize() {
        this.closeMobileMenuOnResize();
    }

    // Load handler
    onLoad() {
        this.setupIntersectionObserver();
    }

    // Setup navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');
                
                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });
    }

    // Update active nav link based on current page
    updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Update active nav link on scroll (for single page)
    updateActiveNavLinkOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (sections.length === 0) return;

        let currentSection = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Setup search functionality
    setupSearch() {
        const searchBtn = document.getElementById('search-btn');
        const searchOverlay = document.getElementById('search-overlay');
        const searchClose = document.getElementById('search-close');
        const searchInput = document.getElementById('search-input');

        // Open search
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.openSearch();
            });
        }

        // Close search
        if (searchClose) {
            searchClose.addEventListener('click', () => {
                this.closeSearch();
            });
        }

        // Close search on overlay click
        if (searchOverlay) {
            searchOverlay.addEventListener('click', (e) => {
                if (e.target === searchOverlay) {
                    this.closeSearch();
                }
            });
        }

        // Search input functionality
        if (searchInput) {
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(searchInput.value);
                }
            });

            // Real-time search suggestions (optional)
            searchInput.addEventListener('input', (e) => {
                this.showSearchSuggestions(e.target.value);
            });
        }

        // Close search with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
                this.closeSearch();
            }
        });
    }

    // Open search overlay
    openSearch() {
        const searchOverlay = document.getElementById('search-overlay');
        const searchInput = document.getElementById('search-input');
        
        if (searchOverlay) {
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus on input after animation
            setTimeout(() => {
                if (searchInput) {
                    searchInput.focus();
                }
            }, 100);
        }
    }

    // Close search overlay
    closeSearch() {
        const searchOverlay = document.getElementById('search-overlay');
        
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Perform search
    performSearch(query) {
        if (!query.trim()) return;

        // For demo purposes, redirect to products page with search parameter
        const searchParams = new URLSearchParams();
        searchParams.set('search', query.trim());
        
        // If we're already on products page, update the current search
        if (window.location.pathname.includes('products.html')) {
            window.history.pushState({}, '', `products.html?${searchParams.toString()}`);
            if (window.productManager) {
                this.displaySearchResults(query);
            }
        } else {
            // Redirect to products page with search
            window.location.href = `products.html?${searchParams.toString()}`;
        }
        
        this.closeSearch();
    }

    // Display search results
    displaySearchResults(query) {
        if (!window.productManager) return;

        const results = window.productManager.searchProducts(query);
        const container = document.getElementById('products-container');
        
        if (container) {
            if (results.length === 0) {
                container.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search" style="font-size: 3rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
                        <h3>No products found</h3>
                        <p>Try adjusting your search terms or browse our categories.</p>
                    </div>
                `;
            } else {
                container.innerHTML = results.map(product => 
                    window.productManager.generateProductHTML(product)
                ).join('');
                window.productManager.attachAddToCartListeners();
            }
        }
    }

    // Show search suggestions
    showSearchSuggestions(query) {
        // Implementation for search suggestions would go here
        // For now, this is a placeholder
        console.log('Search suggestions for:', query);
    }

    // Setup scroll effects
    setupScrollEffects() {
        // Add scroll class to header when scrolled
        this.updateHeaderOnScroll();
    }

    // Update header appearance on scroll
    updateHeaderOnScroll() {
        const header = document.querySelector('.header');
        
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    // Setup mobile menu
    setupMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    // Toggle mobile menu
    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const menuToggle = document.getElementById('menu-toggle');
        
        if (navMenu && menuToggle) {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Toggle body scroll
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }

    // Close mobile menu
    closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const menuToggle = document.getElementById('menu-toggle');
        
        if (navMenu && menuToggle) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Close mobile menu on resize
    closeMobileMenuOnResize() {
        if (window.innerWidth >= 768) {
            this.closeMobileMenu();
        }
    }

    // Setup newsletter form
    setupNewsletterForm() {
        const newsletterForm = document.getElementById('newsletter-form');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmission(new FormData(newsletterForm));
            });
        }
    }

    // Handle newsletter submission
    handleNewsletterSubmission(formData) {
        const email = formData.get('email') || document.querySelector('.newsletter-input').value;
        
        if (!email) {
            this.showMessage('Please enter your email address.', 'warning');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showMessage('Please enter a valid email address.', 'warning');
            return;
        }

        // Simulate API call
        this.showMessage('Subscribing...', 'info');
        
        setTimeout(() => {
            this.showMessage('Thank you for subscribing!', 'success');
            document.querySelector('.newsletter-input').value = '';
        }, 1000);
    }

    // Validate email format
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Setup category cards
    setupCategoryCards() {
        const categoryCards = document.querySelectorAll('.category-card');
        
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                if (category) {
                    // Redirect to products page with category filter
                    window.location.href = `products.html?category=${category}`;
                }
            });
        });
    }

    // Setup lazy loading for images
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Setup intersection observer for animations
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            }, {
                threshold: 0.1
            });

            // Observe elements for animation
            document.querySelectorAll('.product-card, .category-card, .section-header').forEach(el => {
                animationObserver.observe(el);
            });
        }
    }

    // Load featured products on homepage
    loadFeaturedProducts() {
        console.log('loadFeaturedProducts called');
        console.log('window.productManager available:', !!window.productManager);
        console.log('featured-products element exists:', !!document.getElementById('featured-products'));
        
        if (window.productManager && document.getElementById('featured-products')) {
            window.productManager.loadFeaturedProducts();
        } else {
            console.log('Cannot load featured products - missing productManager or container');
        }
    }

    // Show message to user
    showMessage(message, type = 'info') {
        if (window.cartManager) {
            window.cartManager.showNotification(message, type);
        } else {
            // Fallback alert
            alert(message);
        }
    }

    // Smooth scroll to element
    smoothScrollTo(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Format currency
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Get URL parameters
    getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Set URL parameter
    setUrlParameter(name, value) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set(name, value);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState({}, '', newUrl);
    }

    // Remove URL parameter
    removeUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.delete(name);
        const newUrl = urlParams.toString() ? 
            `${window.location.pathname}?${urlParams.toString()}` : 
            window.location.pathname;
        window.history.pushState({}, '', newUrl);
    }
}

// Initialize TechStore when script loads
const techStore = new TechStore();

// Make techStore globally available
window.techStore = techStore;

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TechStore;
}
