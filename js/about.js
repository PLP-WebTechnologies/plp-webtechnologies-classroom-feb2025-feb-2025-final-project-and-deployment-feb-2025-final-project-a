// About Page Functionality
class AboutPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupCounterAnimation();
        this.setupScrollAnimations();
        this.addAboutPageStyles();
    }

    // Setup counter animation for statistics
    setupCounterAnimation() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    // Animate counter numbers
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            updateCounter();
        });
    }

    // Setup scroll animations
    setupScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe elements for animation
            const elementsToAnimate = document.querySelectorAll(
                '.mv-card, .team-member, .feature-card, .about-hero-content'
            );
            
            elementsToAnimate.forEach(el => {
                animationObserver.observe(el);
            });
        }
    }

    // Add specific styles for about page
    addAboutPageStyles() {
        const styles = `
            .about-hero {
                padding: var(--spacing-20) 0;
                background-color: var(--gray-50);
            }

            .about-hero-content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: var(--spacing-12);
                align-items: center;
            }

            .about-text h2 {
                font-size: var(--font-size-3xl);
                color: var(--gray-900);
                margin-bottom: var(--spacing-6);
            }

            .about-text .lead {
                font-size: var(--font-size-lg);
                color: var(--gray-700);
                font-weight: 500;
                margin-bottom: var(--spacing-6);
                line-height: 1.6;
            }

            .about-text p {
                color: var(--gray-600);
                line-height: 1.7;
                margin-bottom: var(--spacing-4);
            }

            .about-image img {
                width: 100%;
                height: 400px;
                object-fit: cover;
                border-radius: var(--radius-2xl);
                box-shadow: var(--shadow-lg);
            }

            .mission-vision {
                padding: var(--spacing-20) 0;
                background-color: var(--white);
            }

            .mv-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: var(--spacing-8);
            }

            .mv-card {
                background-color: var(--white);
                padding: var(--spacing-8);
                border-radius: var(--radius-2xl);
                text-align: center;
                box-shadow: var(--shadow-md);
                transition: all var(--transition-normal);
                opacity: 0;
                transform: translateY(30px);
            }

            .mv-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            .mv-card:hover {
                box-shadow: var(--shadow-xl);
                transform: translateY(-8px);
            }

            .mv-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
                border-radius: var(--radius-full);
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto var(--spacing-6);
                transition: transform var(--transition-normal);
            }

            .mv-card:hover .mv-icon {
                transform: scale(1.1);
            }

            .mv-icon i {
                font-size: var(--font-size-2xl);
                color: var(--white);
            }

            .mv-card h3 {
                font-size: var(--font-size-xl);
                color: var(--gray-900);
                margin-bottom: var(--spacing-4);
            }

            .mv-card p {
                color: var(--gray-600);
                line-height: 1.6;
                margin-bottom: 0;
            }

            .stats-section {
                padding: var(--spacing-20) 0;
                background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
                color: var(--white);
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: var(--spacing-8);
            }

            .stat-item {
                text-align: center;
            }

            .stat-number {
                font-size: var(--font-size-5xl);
                font-weight: 700;
                color: var(--white);
                margin-bottom: var(--spacing-2);
                display: block;
            }

            .stat-label {
                font-size: var(--font-size-lg);
                color: rgba(255, 255, 255, 0.9);
                font-weight: 500;
            }

            .stat-suffix {
                font-size: var(--font-size-2xl);
                color: var(--white);
                font-weight: 600;
                margin-left: 4px;
            }

            .team-section {
                padding: var(--spacing-20) 0;
                background-color: var(--gray-50);
            }

            .team-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: var(--spacing-8);
            }

            .team-member {
                background-color: var(--white);
                border-radius: var(--radius-2xl);
                overflow: hidden;
                box-shadow: var(--shadow-md);
                transition: all var(--transition-normal);
                opacity: 0;
                transform: translateY(30px);
            }

            .team-member.animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            .team-member:hover {
                box-shadow: var(--shadow-xl);
                transform: translateY(-8px);
            }

            .member-image {
                height: 300px;
                overflow: hidden;
            }

            .member-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform var(--transition-slow);
            }

            .team-member:hover .member-image img {
                transform: scale(1.05);
            }

            .member-info {
                padding: var(--spacing-6);
            }

            .member-info h3 {
                font-size: var(--font-size-xl);
                color: var(--gray-900);
                margin-bottom: var(--spacing-2);
            }

            .member-role {
                color: var(--primary-color);
                font-weight: 600;
                margin-bottom: var(--spacing-4);
            }

            .member-bio {
                color: var(--gray-600);
                line-height: 1.6;
                margin-bottom: var(--spacing-4);
            }

            .member-social {
                display: flex;
                gap: var(--spacing-3);
            }

            .member-social a {
                width: 40px;
                height: 40px;
                background-color: var(--gray-100);
                border-radius: var(--radius-lg);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--gray-600);
                transition: all var(--transition-fast);
                text-decoration: none;
            }

            .member-social a:hover {
                background-color: var(--primary-color);
                color: var(--white);
                transform: translateY(-2px);
            }

            .why-choose-us {
                padding: var(--spacing-20) 0;
                background-color: var(--white);
            }

            .features-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: var(--spacing-8);
            }

            .feature-card {
                background-color: var(--gray-50);
                padding: var(--spacing-8);
                border-radius: var(--radius-2xl);
                text-align: center;
                transition: all var(--transition-normal);
                border: 1px solid var(--gray-100);
                opacity: 0;
                transform: translateY(30px);
            }

            .feature-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            .feature-card:hover {
                background-color: var(--white);
                box-shadow: var(--shadow-lg);
                transform: translateY(-4px);
                border-color: var(--primary-color);
            }

            .feature-icon {
                width: 70px;
                height: 70px;
                background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
                border-radius: var(--radius-full);
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto var(--spacing-6);
                transition: transform var(--transition-normal);
            }

            .feature-card:hover .feature-icon {
                transform: scale(1.1);
            }

            .feature-icon i {
                font-size: var(--font-size-xl);
                color: var(--white);
            }

            .feature-card h3 {
                font-size: var(--font-size-xl);
                color: var(--gray-900);
                margin-bottom: var(--spacing-4);
            }

            .feature-card p {
                color: var(--gray-600);
                line-height: 1.6;
                margin-bottom: 0;
            }

            .cta-section {
                padding: var(--spacing-20) 0;
                background: linear-gradient(135deg, var(--gray-900), var(--gray-800));
                color: var(--white);
                text-align: center;
            }

            .cta-content h2 {
                font-size: var(--font-size-4xl);
                color: var(--white);
                margin-bottom: var(--spacing-6);
            }

            .cta-content p {
                font-size: var(--font-size-lg);
                color: rgba(255, 255, 255, 0.9);
                margin-bottom: var(--spacing-8);
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            .cta-actions {
                display: flex;
                gap: var(--spacing-4);
                justify-content: center;
                flex-wrap: wrap;
            }

            .cta-actions .btn-secondary {
                background-color: transparent;
                color: var(--white);
                border-color: var(--white);
            }

            .cta-actions .btn-secondary:hover {
                background-color: var(--white);
                color: var(--gray-900);
            }

            /* Responsive Design */
            @media (max-width: 1024px) {
                .about-hero-content {
                    grid-template-columns: 1fr;
                    gap: var(--spacing-8);
                }
            }

            @media (max-width: 768px) {
                .about-hero {
                    padding: var(--spacing-12) 0;
                }

                .mission-vision,
                .team-section,
                .why-choose-us,
                .stats-section,
                .cta-section {
                    padding: var(--spacing-12) 0;
                }

                .about-text h2 {
                    font-size: var(--font-size-2xl);
                }

                .mv-grid,
                .team-grid,
                .features-grid {
                    grid-template-columns: 1fr;
                    gap: var(--spacing-6);
                }

                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                    gap: var(--spacing-6);
                }

                .stat-number {
                    font-size: var(--font-size-4xl);
                }

                .cta-content h2 {
                    font-size: var(--font-size-3xl);
                }

                .cta-actions {
                    flex-direction: column;
                    align-items: center;
                }
            }

            @media (max-width: 480px) {
                .stats-grid {
                    grid-template-columns: 1fr;
                }
            }

            /* Animation delays for staggered effect */
            .mv-card:nth-child(1) { transition-delay: 0.1s; }
            .mv-card:nth-child(2) { transition-delay: 0.2s; }
            .mv-card:nth-child(3) { transition-delay: 0.3s; }

            .team-member:nth-child(1) { transition-delay: 0.1s; }
            .team-member:nth-child(2) { transition-delay: 0.2s; }
            .team-member:nth-child(3) { transition-delay: 0.3s; }
            .team-member:nth-child(4) { transition-delay: 0.4s; }

            .feature-card:nth-child(1) { transition-delay: 0.1s; }
            .feature-card:nth-child(2) { transition-delay: 0.2s; }
            .feature-card:nth-child(3) { transition-delay: 0.3s; }
            .feature-card:nth-child(4) { transition-delay: 0.4s; }
            .feature-card:nth-child(5) { transition-delay: 0.5s; }
            .feature-card:nth-child(6) { transition-delay: 0.6s; }
        `;

        // Add styles to document
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}

// Initialize about page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aboutPage = new AboutPage();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AboutPage;
}
