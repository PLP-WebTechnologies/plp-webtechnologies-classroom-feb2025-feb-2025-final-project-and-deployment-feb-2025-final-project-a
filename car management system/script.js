// script.js

document.addEventListener('DOMContentLoaded', () => {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.close');

  // Open modal
  portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
          const modalId = item.getAttribute('data-modal');
          document.getElementById(modalId).style.display = 'flex';
      });
  });

  // Close modal
  closeButtons.forEach(button => {
      button.addEventListener('click', () => {
          button.parentElement.parentElement.style.display = 'none';
      });
  });

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
          e.target.style.display = 'none';
      }
  });
});

//Testimonials section

// script.js

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const testimonials = document.querySelector('.testimonials-carousel');
    const items = document.querySelectorAll('.testimonial-item');
    let currentIndex = 0;

    const showTestimonial = (index) => {
        const offset = -index * 100;  // Moves to the left for each index
        testimonials.style.transform = `translateX(${offset}%)`;
    };

    document.querySelector('.carousel-btn.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;  // Loop back to first item
        showTestimonial(currentIndex);
    });

    document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;  // Loop back to last item
        showTestimonial(currentIndex);
    });
});



//appointment sceduler

// Wait until the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('appointment-form');
    const responseMessage = document.getElementById('response-message');
    const messageText = document.getElementById('message-text');

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the page from refreshing

        // Get the form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const message = document.getElementById('message').value;

        // Basic validation (you can add more validation if needed)
        if (!name || !email || !date || !time) {
            alert('Please fill out all required fields.');
            return;
        }

        // Show the success message
        messageText.innerText = `Thank you, ${name}! Your appointment is scheduled for ${date} at ${time}.`;
        responseMessage.classList.remove('hidden');

        // Reset the form after submission
        form.reset();
    });
});


//Sign up page
// Wait until the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signup-form');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the page from refreshing

        // Get the form values
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Simple validation for non-empty fields
        if (!fullname || !email || !password || !confirmPassword) {
            showError('Please fill out all fields.');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            showError('Passwords do not match.');
            return;
        }

        // Simulate a sign-up process (you can replace this with an actual backend call)
        alert('Sign up successful!');
        // Redirect to login page or main page after sign-up
        window.location.href = 'Log in.html';
    });

    // Function to display error message
    function showError(message) {
        errorText.innerText = message;
        errorMessage.classList.remove('hidden');
    }
});



// log in page

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    // Handle form submission
    form.addEventListener('submit', function (event) {
        // Do not prevent form submission if the action is set to the backend
        const actionUrl = form.getAttribute('action');
        if (actionUrl && actionUrl.includes('login.php')) {
            // Allow the form to submit normally to the backend
            return;
        }

        // If no backend is involved, use the below code for simulated login
        event.preventDefault(); // Prevent the page from refreshing

        // Get the form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simple validation for non-empty fields
        if (!email || !password) {
            showError('Please enter both email and password.');
            return;
        }

        // Simulate a login check (for frontend-only testing)
        if (email === 'test@example.com' && password === 'password123') {
            alert('Login successful!');
            // Redirect to dashboard or main page
            window.location.href = 'index.html';
        } else {
            showError('Invalid email or password.');
        }
    });

    // Function to display error message
    function showError(message) {
        errorText.innerText = message;
        errorMessage.classList.remove('hidden');
    }
});
