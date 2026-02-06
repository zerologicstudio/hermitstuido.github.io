/**
 * Hermit Studio - Main JavaScript
 * Premium VFX & Event Coverage Website
 */

// ===== DOM Elements =====
const preloader = document.getElementById('preloader');
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const statNumbers = document.querySelectorAll('.stat-number');
const contactForm = document.getElementById('contact-form');

// ===== Preloader =====
window.addEventListener('load', () => {
  setTimeout(() => {
    preloader.classList.add('hidden');
    initAnimations();
  }, 1000);
});

// ===== Navigation =====
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // Add scrolled class for background change
  if (currentScrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  lastScrollY = currentScrollY;
});

// Mobile Navigation Toggle
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu on link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ===== Portfolio Filter =====
if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      portfolioItems.forEach(item => {
        const category = item.dataset.category;
        
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ===== Portfolio Lightbox =====
portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const title = item.querySelector('.portfolio-title')?.textContent || '';
    const category = item.querySelector('.portfolio-category')?.textContent || '';
    openLightbox(title, category);
  });
});

function openLightbox(title, category) {
  // Create lightbox element
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close"><i class="fas fa-times"></i></button>
      <div class="lightbox-video">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: var(--color-bg-tertiary); border-radius: var(--radius-md);">
          <i class="fas fa-play-circle" style="font-size: 4rem; color: var(--color-accent); margin-bottom: 1rem;"></i>
          <p style="color: var(--color-text-secondary);">${category}</p>
          <h3 style="margin-top: 0.5rem;">${title}</h3>
          <p style="font-size: 0.875rem; margin-top: 1rem;">Video player would open here</p>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
  
  // Animate in
  setTimeout(() => lightbox.classList.add('active'), 10);
  
  // Close handlers
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const close = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => lightbox.remove(), 300);
  };
  
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  
  // Escape key
  document.addEventListener('keydown', function closeHandler(e) {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', closeHandler);
    }
  });
}

// ===== Stats Counter Animation =====
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stat = entry.target;
      const target = parseInt(stat.dataset.count);
      animateCounter(stat, target);
      statsObserver.unobserve(stat);
    }
  });
}, observerOptions);

if (statNumbers.length > 0) {
  statNumbers.forEach(stat => statsObserver.observe(stat));
}

function animateCounter(element, target) {
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  const stepTime = duration / steps;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

// ===== Scroll Animations (AOS-like) =====
function initAnimations() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => animationObserver.observe(el));
}

// ===== Contact Form =====
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    // Check if using Formspree (has action URL)
    const formspreeUrl = contactForm.action;
    
    if (formspreeUrl && formspreeUrl.includes('formspree.io')) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.innerHTML;
      
      // Validate form
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }
      
      // Submit to Formspree via AJAX
      submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      
      try {
        const response = await fetch(formspreeUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          showFormMessage('Thank you! Your message has been sent successfully.', 'success');
          contactForm.reset();
        } else {
          showFormMessage('Something went wrong. Please try again.', 'error');
        }
      } catch (error) {
        showFormMessage('Something went wrong. Please try again.', 'error');
      }
      
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    } else {
      // Original form handling (for non-Formspree forms)
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      
      // Validate form
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }
      
      // Simulate form submission
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        showFormMessage('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(message, type) {
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) existingMessage.remove();
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message form-message--${type}`;
  messageDiv.style.cssText = `
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    font-size: 0.9375rem;
    text-align: center;
    ${type === 'success' ? 'background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid #10b981;' : 'background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444;'}
  `;
  messageDiv.textContent = message;
  
  const form = document.getElementById('contact-form');
  form.insertBefore(messageDiv, form.firstChild);
  
  setTimeout(() => messageDiv.remove(), 5000);
}

// ===== Magnetic Buttons =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.hero-content');
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight);
  }
});

// ===== Lazy Loading Images =====
if ('loading' in HTMLImageElement.prototype) {
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.loading = 'lazy';
  });
} else {
  // Fallback for older browsers
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.removeAttribute('loading');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// ===== Mobile Touch Improvements =====
if ('ontouchstart' in window) {
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    });
    item.addEventListener('touchend', function() {
      this.classList.remove('touch-active');
    });
  });
}

// ===== Utility Functions =====

// Debounce function
function debounce(func, wait) {
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

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===== Console Welcome =====
console.log('%cHermit Studio', 'font-size: 24px; font-weight: bold; color: #d4af37;');
console.log('%cPremium Visual Production', 'font-size: 14px; color: #b0b0b0;');
console.log('%cWebsite created with excellence', 'font-size: 12px; color: #666;');
