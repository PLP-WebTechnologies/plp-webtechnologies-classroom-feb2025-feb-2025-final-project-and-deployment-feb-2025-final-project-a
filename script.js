document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');
  
  menuToggle.addEventListener('click', function() {
      nav.classList.toggle('show');
  });

  // Load blog posts dynamically
  const postsGrid = document.querySelector('.posts-grid');
  
  const blogPosts = [
      {
          id: 1,
          title: "The Future of Web Development in 2023",
          excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
          date: "June 15, 2023",
          author: "Sarah Johnson",
          image: "https://source.unsplash.com/random/600x400/?web,development"
      },
      {
          id: 2,
          title: "Getting Started with React Hooks",
          excerpt: "A beginner's guide to understanding and using React Hooks in your projects.",
          date: "June 10, 2023",
          author: "Mike Chen",
          image: "https://source.unsplash.com/random/600x400/?react,javascript"
      },
      {
          id: 3,
          title: "CSS Grid vs Flexbox: When to Use Each",
          excerpt: "Understanding the differences and best use cases for these powerful CSS layout tools.",
          date: "June 5, 2023",
          author: "Emma Davis",
          image: "https://source.unsplash.com/random/600x400/?css,design"
      },
      {
          id: 4,
          title: "Building Accessible Web Applications",
          excerpt: "Essential tips and techniques for creating web apps that everyone can use.",
          date: "May 28, 2023",
          author: "David Wilson",
          image: "https://source.unsplash.com/random/600x400/?accessibility,web"
      },
      {
          id: 5,
          title: "JavaScript Performance Optimization",
          excerpt: "Proven strategies to make your JavaScript code run faster and smoother.",
          date: "May 20, 2023",
          author: "Lisa Thompson",
          image: "https://source.unsplash.com/random/600x400/?javascript,code"
      }
  ];

  function renderPosts() {
      postsGrid.innerHTML = '';
      blogPosts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.className = 'post-card';
          postElement.innerHTML = `
              <div class="post-image">
                  <img src="${post.image}" alt="${post.title}">
              </div>
              <div class="post-content">
                  <h3>${post.title}</h3>
                  <div class="post-meta">
                      <span>${post.date}</span>
                      <span>By ${post.author}</span>
                  </div>
                  <p class="post-excerpt">${post.excerpt}</p>
                  <a href="blog-post.html?id=${post.id}" class="read-more">Read More →</a>
              </div>
          `;
          postsGrid.appendChild(postElement);
      });
  }

  renderPosts();

  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletter-form');
  
  newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input').value;
      
      // In a real app, you would send this to a server
      console.log('Subscribed email:', email);
      
      // Show success message
      alert('Thank you for subscribing to our newsletter!');
      this.reset();
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
              
              // Close mobile menu if open
              if (nav.classList.contains('show')) {
                  nav.classList.remove('show');
              }
          }
      });
  });
});