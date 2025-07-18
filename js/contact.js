// Contact Page Functionality
class ContactPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactForm();
        this.setupFAQ();
        this.setupChatButton();
        this.addContactPageStyles();
        this.setupFormValidation();
    }

    // Setup contact form functionality
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        }
    }

    // Handle form submission
    async handleFormSubmission(form) {
        const submitBtn = form.querySelector('.form-submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.simulateFormSubmission(new FormData(form));
            
            // Show success message
            this.showSuccessMessage();
            form.reset();
            
        } catch (error) {
            this.showErrorMessage(error.message);
        } finally {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    }

    // Simulate form submission
    simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                if (Math.random() > 0.1) { // 90% success rate
                    resolve({
                        status: 'success',
                        message: 'Your message has been sent successfully!'
                    });
                } else {
                    reject(new Error('Failed to send message. Please try again.'));
                }
            }, 2000);
        });
    }

    // Show success message
    showSuccessMessage() {
        this.showNotification(
            'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.',
            'success'
        );
    }

    // Show error message
    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    // Setup FAQ accordion
    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.style.maxHeight = '0';
                        otherQuestion.classList.remove('expanded');
                    }
                });
                
                // Toggle current item
                if (isExpanded) {
                    question.setAttribute('aria-expanded', 'false');
                    answer.style.maxHeight = '0';
                    question.classList.remove('expanded');
                } else {
                    question.setAttribute('aria-expanded', 'true');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    question.classList.add('expanded');
                }
            });
        });
    }

    // Setup chat button
    setupChatButton() {
        const chatBtn = document.querySelector('.chat-btn');
        if (chatBtn) {
            chatBtn.addEventListener('click', () => {
                this.openChat();
            });
        }
    }

    // Open chat simulation
    openChat() {
        this.showNotification(
            'Chat feature coming soon! For now, please use our contact form or call us directly.',
            'info'
        );
    }

    // Setup form validation
    setupFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    // Validate individual field
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Required field validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        // Email validation
        else if (fieldName === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
        // Phone validation
        else if (fieldName === 'phone' && value && !this.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
        // Message length validation
        else if (fieldName === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    // Show field error
    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        this.clearFieldError(field);
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    // Clear field error
    clearFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // Email validation
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    // Show notification
    showNotification(message, type = 'info') {
        if (window.cartManager) {
            window.cartManager.showNotification(message, type);
        } else {
            alert(message);
        }
    }

    // Add contact page specific styles
    addContactPageStyles() {
        const styles = `
            .contact-section {
                padding: var(--spacing-16) 0;
                background-color: var(--gray-50);
            }

            .contact-layout {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: var(--spacing-12);
                align-items: start;
            }

            .contact-info-section {
                background-color: var(--white);
                padding: var(--spacing-8);
                border-radius: var(--radius-2xl);
                box-shadow: var(--shadow-lg);
            }

            .contact-info-section h2 {
                font-size: var(--font-size-2xl);
                color: var(--gray-900);
                margin-bottom: var(--spacing-4);
            }

            .contact-info-section > p {
                color: var(--gray-600);
                margin-bottom: var(--spacing-8);
                line-height: 1.6;
            }

            .contact-methods {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-6);
                margin-bottom: var(--spacing-8);
            }

            .contact-method {
                display: flex;
                gap: var(--spacing-4);
                align-items: flex-start;
            }

            .contact-icon {
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
                border-radius: var(--radius-xl);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .contact-icon i {
                font-size: var(--font-size-lg);
                color: var(--white);
            }

            .contact-details h3 {
                font-size: var(--font-size-lg);
                color: var(--gray-900);
                margin-bottom: var(--spacing-2);
            }

            .contact-details p {
                color: var(--gray-700);
                margin-bottom: var(--spacing-1);
                font-weight: 500;
            }

            .contact-hours {
                font-size: var(--font-size-sm);
                color: var(--gray-500);
            }

            .chat-btn {
                background-color: var(--primary-color);
                color: var(--white);
                border: none;
                padding: var(--spacing-2) var(--spacing-4);
                border-radius: var(--radius-md);
                font-size: var(--font-size-sm);
                cursor: pointer;
                transition: background-color var(--transition-fast);
                margin-top: var(--spacing-2);
            }

            .chat-btn:hover {
                background-color: var(--primary-dark);
            }

            .social-section {
                border-top: 1px solid var(--gray-200);
                padding-top: var(--spacing-6);
            }

            .social-section h3 {
                font-size: var(--font-size-lg);
                color: var(--gray-900);
                margin-bottom: var(--spacing-4);
            }

            .social-section .social-links {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-3);
            }

            .social-link {
                display: flex;
                align-items: center;
                gap: var(--spacing-3);
                padding: var(--spacing-3);
                border-radius: var(--radius-lg);
                transition: background-color var(--transition-fast);
                text-decoration: none;
                color: var(--gray-700);
            }

            .social-link:hover {
                background-color: var(--gray-100);
                color: var(--primary-color);
            }

            .social-link i {
                width: 20px;
                text-align: center;
            }

            .contact-form-section {
                background-color: var(--white);
                padding: var(--spacing-8);
                border-radius: var(--radius-2xl);
                box-shadow: var(--shadow-lg);
            }

            .contact-form h2 {
                font-size: var(--font-size-2xl);
                color: var(--gray-900);
                margin-bottom: var(--spacing-4);
            }

            .contact-form > p {
                color: var(--gray-600);
                margin-bottom: var(--spacing-8);
                line-height: 1.6;
            }

            .form-group {
                margin-bottom: var(--spacing-6);
            }

            .form-group label {
                display: block;
                font-weight: 500;
                color: var(--gray-700);
                margin-bottom: var(--spacing-2);
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: var(--spacing-3);
                border: 1px solid var(--gray-300);
                border-radius: var(--radius-lg);
                font-size: var(--font-size-base);
                transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
                background-color: var(--white);
            }

            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
            }

            .form-group input.error,
            .form-group select.error,
            .form-group textarea.error {
                border-color: var(--danger-color);
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }

            .field-error {
                color: var(--danger-color);
                font-size: var(--font-size-sm);
                margin-top: var(--spacing-1);
            }

            .form-group textarea {
                resize: vertical;
                min-height: 120px;
            }

            .checkbox-group {
                display: flex;
                align-items: flex-start;
                gap: var(--spacing-3);
            }

            .checkbox-label {
                display: flex;
                align-items: flex-start;
                gap: var(--spacing-3);
                cursor: pointer;
                font-size: var(--font-size-sm);
                line-height: 1.5;
                margin-bottom: 0;
            }

            .checkbox-label input[type="checkbox"] {
                width: auto;
                margin: 0;
            }

            .checkbox-label a {
                color: var(--primary-color);
                text-decoration: underline;
            }

            .checkbox-label a:hover {
                color: var(--primary-dark);
            }

            .form-submit-btn {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: var(--spacing-2);
            }

            .btn-loading {
                display: none;
                align-items: center;
                gap: var(--spacing-2);
            }

            .faq-section {
                padding: var(--spacing-16) 0;
                background-color: var(--white);
            }

            .faq-grid {
                max-width: 800px;
                margin: 0 auto;
            }

            .faq-item {
                border: 1px solid var(--gray-200);
                border-radius: var(--radius-lg);
                margin-bottom: var(--spacing-4);
                overflow: hidden;
            }

            .faq-question {
                width: 100%;
                background: none;
                border: none;
                padding: var(--spacing-6);
                text-align: left;
                font-size: var(--font-size-base);
                font-weight: 500;
                color: var(--gray-900);
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: background-color var(--transition-fast);
            }

            .faq-question:hover {
                background-color: var(--gray-50);
            }

            .faq-question.expanded {
                background-color: var(--primary-color);
                color: var(--white);
            }

            .faq-question i {
                transition: transform var(--transition-fast);
            }

            .faq-question.expanded i {
                transform: rotate(180deg);
            }

            .faq-answer {
                max-height: 0;
                overflow: hidden;
                transition: max-height var(--transition-normal);
            }

            .faq-answer p {
                padding: 0 var(--spacing-6) var(--spacing-6);
                color: var(--gray-600);
                line-height: 1.6;
                margin: 0;
            }

            .hours-section {
                padding: var(--spacing-16) 0;
                background-color: var(--gray-50);
            }

            .hours-content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: var(--spacing-12);
                align-items: center;
            }

            .hours-info h2 {
                font-size: var(--font-size-2xl);
                color: var(--gray-900);
                margin-bottom: var(--spacing-6);
            }

            .hours-list {
                margin-bottom: var(--spacing-6);
            }

            .hours-item {
                display: flex;
                justify-content: space-between;
                padding: var(--spacing-3) 0;
                border-bottom: 1px solid var(--gray-200);
            }

            .hours-item:last-child {
                border-bottom: none;
            }

            .day {
                font-weight: 500;
                color: var(--gray-700);
            }

            .time {
                color: var(--gray-600);
            }

            .hours-note {
                display: flex;
                align-items: flex-start;
                gap: var(--spacing-2);
                background-color: var(--primary-color);
                color: var(--white);
                padding: var(--spacing-4);
                border-radius: var(--radius-lg);
                font-size: var(--font-size-sm);
                line-height: 1.5;
                margin: 0;
            }

            .hours-note i {
                margin-top: 2px;
                flex-shrink: 0;
            }

            .hours-map {
                background-color: var(--white);
                border-radius: var(--radius-2xl);
                overflow: hidden;
                box-shadow: var(--shadow-lg);
            }

            .map-placeholder {
                height: 300px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, var(--gray-100), var(--gray-200));
                color: var(--gray-600);
                text-align: center;
                padding: var(--spacing-8);
            }

            .map-placeholder i {
                font-size: var(--font-size-5xl);
                margin-bottom: var(--spacing-4);
                color: var(--primary-color);
            }

            .map-placeholder p {
                font-size: var(--font-size-lg);
                font-weight: 600;
                margin-bottom: var(--spacing-2);
                color: var(--gray-700);
            }

            .map-placeholder span {
                font-size: var(--font-size-sm);
                color: var(--gray-500);
            }

            /* Responsive Design */
            @media (max-width: 1024px) {
                .contact-layout,
                .hours-content {
                    grid-template-columns: 1fr;
                    gap: var(--spacing-8);
                }
            }

            @media (max-width: 768px) {
                .contact-section,
                .faq-section,
                .hours-section {
                    padding: var(--spacing-12) 0;
                }

                .contact-info-section,
                .contact-form-section {
                    padding: var(--spacing-6);
                }

                .contact-methods {
                    gap: var(--spacing-4);
                }

                .contact-method {
                    flex-direction: column;
                    text-align: center;
                }

                .social-section .social-links {
                    flex-direction: row;
                    flex-wrap: wrap;
                }

                .faq-question {
                    padding: var(--spacing-4);
                    font-size: var(--font-size-sm);
                }

                .faq-answer p {
                    padding: 0 var(--spacing-4) var(--spacing-4);
                }

                .map-placeholder {
                    height: 250px;
                    padding: var(--spacing-6);
                }
            }
        `;

        // Add styles to document
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}

// Initialize contact page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contactPage = new ContactPage();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactPage;
}
