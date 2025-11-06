// SnapB2B Website - Main JavaScript
// Clean, Vanilla JavaScript - No Dependencies

(function() {
  'use strict';

  // ===== MOBILE MENU TOGGLE =====
  const initMobileMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
      
      // Close menu when clicking on a link
      const navLinks = navMenu.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
        });
      });
    }
  };

  // ===== SMOOTH SCROLLING =====
  const initSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle internal anchor links
        if (href !== '#' && href.length > 1) {
          const target = document.querySelector(href);
          
          if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  };

  // ===== ACTIVE NAVIGATION STATE =====
  const initActiveNav = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage || 
          (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  };

  // ===== HEADER SCROLL EFFECT =====
  const initHeaderScroll = () => {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    if (header) {
      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 10) {
          header.style.boxShadow = 'var(--shadow-md)';
        } else {
          header.style.boxShadow = 'var(--shadow-sm)';
        }
        
        lastScroll = currentScroll;
      });
    }
  };

  // ===== FORM VALIDATION =====
  const initFormValidation = () => {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            
            // Show error message
            let errorMsg = input.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
              errorMsg = document.createElement('span');
              errorMsg.classList.add('error-message');
              errorMsg.textContent = 'This field is required';
              errorMsg.style.color = 'red';
              errorMsg.style.fontSize = '0.875rem';
              errorMsg.style.marginTop = '0.25rem';
              errorMsg.style.display = 'block';
              input.parentNode.insertBefore(errorMsg, input.nextSibling);
            }
          } else {
            input.classList.remove('error');
            const errorMsg = input.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
              errorMsg.remove();
            }
          }
          
          // Email validation
          if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
              isValid = false;
              input.classList.add('error');
            }
          }
        });
        
        if (!isValid) {
          e.preventDefault();
        }
      });
      
      // Remove error on input
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          input.classList.remove('error');
          const errorMsg = input.nextElementSibling;
          if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.remove();
          }
        });
      });
    });
  };

  // ===== LAZY LOADING IMAGES =====
  const initLazyLoad = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  };

  // ===== ANIMATE ON SCROLL =====
  const initScrollAnimation = () => {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    });
    
    // Add animated class styles
    const style = document.createElement('style');
    style.textContent = `
      .animated {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  };

  // ===== NEWSLETTER FORM =====
  const initNewsletter = () => {
    const newsletterForm = document.querySelector('[data-newsletter-form]');
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        
        // Show loading state
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        // Simulate API call (replace with actual endpoint)
        setTimeout(() => {
          button.textContent = 'Subscribed!';
          newsletterForm.reset();
          
          setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
          }, 2000);
        }, 1000);
      });
    }
  };

  // ===== CONTACT FORM =====
  const initContactForm = () => {
    const contactForm = document.querySelector('[data-contact-form]');
    
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        // Show loading state
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate API call (replace with actual endpoint)
        console.log('Form data:', data);
        
        setTimeout(() => {
          button.textContent = 'Message Sent!';
          contactForm.reset();
          
          // Show success message
          const successMsg = document.createElement('div');
          successMsg.className = 'success-message';
          successMsg.textContent = 'Thank you for your message. We\'ll get back to you soon!';
          successMsg.style.cssText = `
            background: #10b981;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            text-align: center;
          `;
          contactForm.appendChild(successMsg);
          
          setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            successMsg.remove();
          }, 3000);
        }, 1000);
      });
    }
  };

  // ===== INITIALIZE ALL =====
  const init = () => {
    initMobileMenu();
    initSmoothScroll();
    initActiveNav();
    initHeaderScroll();
    initFormValidation();
    initLazyLoad();
    initScrollAnimation();
    initNewsletter();
    initContactForm();
    
    console.log('SnapB2B Website initialized successfully! 🚀');
  };

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
