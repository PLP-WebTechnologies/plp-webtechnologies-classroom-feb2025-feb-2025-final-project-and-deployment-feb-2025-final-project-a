// This file contains JavaScript code for interactivity, such as form validation and image sliders.

document.addEventListener('DOMContentLoaded', function() {
    // Example of form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            if (!name || !email) {
                event.preventDefault();
                alert('Please fill in all fields.');
            }
        });
    }

    // Smooth scrolling to featured products
    window.scrollToFeatured = function () {
        document.getElementById('featured-products').scrollIntoView({ behavior: 'smooth' });
    };

    // Image slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
        });
    }

    document.getElementById('next').addEventListener('click', function () {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    });

    document.getElementById('prev').addEventListener('click', function () {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    });

    showSlide(currentSlide);
});