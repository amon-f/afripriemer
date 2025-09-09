// Scroll progress indicator with requestAnimationFrame for better performance
let ticking = false;
function updateScrollProgress() {
  const scrollProgress = document.querySelector('.scroll-progress');
  if (!scrollProgress) return;
  
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      
      scrollProgress.style.width = `${progress}%`;
      ticking = false;
    });
    ticking = true;
  }
}

// Animate service cards on scroll
const animateOnScroll = () => {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    const cardPosition = card.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (cardPosition < screenPosition) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
};

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Animate service cards
  animateOnScroll();
  
  // Add hover effect to service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

// Show/Hide back to top button based on scroll position
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

// Smooth scroll to top when back to top button is clicked
backToTopButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Back to top button functionality (moved to DOMContentLoaded)

// Initialize all animations and event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Back to top button functionality
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    // Show/hide back to top button on scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    // Smooth scroll to top when clicked
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  // Initialize all components
  initParticles();
  initTestimonialSlider();
  
  // Initialize scroll progress with throttling
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    updateScrollProgress();
    
    // Throttle the scroll event for better performance
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        scrollTimeout = null;
        // Any additional scroll handling can go here
      }, 100);
    }
  }, { passive: true });
  
  // Initial call to set progress on page load
  updateScrollProgress();
  
  // Back to top button with enhanced functionality
  const backToTopButton = document.getElementById('backToTop');
  
  if (backToTopButton) {
    // Use IntersectionObserver for better performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && window.pageYOffset > 300) {
          backToTopButton.classList.add('visible');
        } else {
          backToTopButton.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });
    
    // Observe a small element at the top of the page
    const header = document.querySelector('header');
    if (header) observer.observe(header);
    
    // Fallback for browsers that don't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.add('visible');
        } else {
          backToTopButton.classList.remove('visible');
        }
      });
    }
    
    // Initial check
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    }
    
    // Smooth scroll to top with easing and requestAnimationFrame
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Modern smooth scrolling with native behavior if supported
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      // Fallback for older browsers
      function easeInOutCubic(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2 * t * t * t + b;
        t -= 2;
        return c/2 * (t * t * t + 2) + b;
      }
      
      const start = window.pageYOffset;
      const duration = 1000;
      const startTime = performance.now();
      
      function scrollStep(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress, 0, 1, 1);
        
        window.scrollTo(0, start * (1 - easeProgress));
        
        if (elapsed < duration) {
          window.requestAnimationFrame(scrollStep);
        }
      }
      
      window.requestAnimationFrame(scrollStep);
    });
    
    // Add hover effect with CSS class instead of inline styles
    backToTopButton.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
    
    // Add focus styles for better accessibility
    backToTopButton.addEventListener('focus', function() {
      this.classList.add('focus-visible');
    });
    
    backToTopButton.addEventListener('blur', function() {
      this.classList.remove('focus-visible');
    });
  }
  
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
    yearEl.setAttribute('aria-label', `Copyright ${new Date().getFullYear()}`);
  }

  // Header scroll effect
  const header = document.querySelector('header');
  let lastScroll = 0;
  
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');
  const nav = document.querySelector('nav');
  
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle menu visibility
      if (nav.classList.contains('md:hidden')) {
        nav.classList.toggle('hidden');
      }
      
      // Toggle between menu and close icons
      if (menuIcon && closeIcon) {
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
      }
      
      // Toggle mobile menu class
      document.body.classList.toggle('overflow-hidden');
    });
  }

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic front-end validation
      const name = (document.getElementById('name') || {}).value || '';
      const email = (document.getElementById('email') || {}).value || '';
      const message = (document.getElementById('message') || {}).value || '';
      const phone = (document.getElementById('phone') || {}).value || '';
      const service = (document.getElementById('service') || {}).value || '';

      if (!name || !email || !message) {
        showToast('Please fill in all required fields', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
      }

      // Disable submit button and show loading state
      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="spinner"></span> Sending...';

      // Simulate form submission (replace with actual fetch/AJAX call)
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        showToast('Thank you! Your message has been sent. We\'ll get back to you soon!', 'success');
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }

  // Helper function to validate email
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Helper function to show toast messages
  function showToast(message, type = 'success') {
    // Remove any existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white font-medium text-sm z-50 transition-all duration-300 transform ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto-remove after delay
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      
      // Remove from DOM after fade out
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 5000);
  }
});

/* ===== main.js ===== */

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileBackdrop = document.getElementById('mobileBackdrop');
const header = document.getElementById('header');

// Mobile Menu Toggle
function toggleMobileMenu() {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  
  // Toggle menu state
  menuToggle.setAttribute('aria-expanded', !isExpanded);
  mobileNav.classList.toggle('active');
  mobileBackdrop.classList.toggle('active');
  document.body.style.overflow = isExpanded ? '' : 'hidden';
  
  // Toggle hamburger icon
  const hamburger = menuToggle.querySelector('.hamburger');
  if (hamburger) {
    hamburger.style.transform = isExpanded ? 'rotate(0)' : 'rotate(45deg)';
    
    const before = hamburger.querySelector('::before') || { style: {} };
    const after = hamburger.querySelector('::after') || { style: {} };
    
    // Testimonial Slider
    function initTestimonialSlider() {
      const testimonials = document.querySelectorAll('.testimonial');
      const dots = document.querySelectorAll('.testimonial-dots .dot');
      const prevBtn = document.querySelector('.testimonial-prev');
      const nextBtn = document.querySelector('.testimonial-next');
      
      let currentIndex = 0;
      const totalTestimonials = testimonials.length;
      
      // Show first testimonial by default
      if (testimonials.length > 0) {
        showTestimonial(0);
      }
      
      // Event listeners for dots
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          showTestimonial(index);
        });
      });
      
      // Event listeners for navigation buttons
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', showPrevTestimonial);
        nextBtn.addEventListener('click', showNextTestimonial);
      }
      
      // Auto-rotate testimonials
      let slideInterval = setInterval(showNextTestimonial, 8000);
      
      // Pause auto-rotate on hover
      const sliderContainer = document.querySelector('.testimonials-slider');
      if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
          clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
          clearInterval(slideInterval);
          slideInterval = setInterval(showNextTestimonial, 8000);
        });
      }
      
      function showTestimonial(index) {
        // Hide all testimonials and remove active class from dots
        testimonials.forEach(testimonial => {
          testimonial.classList.remove('active');
        });
        
        dots.forEach(dot => {
          dot.classList.remove('active');
        });
        
        // Show selected testimonial and update active dot
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
      }
      
      function showNextTestimonial() {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        showTestimonial(currentIndex);
      }
      
      function showPrevTestimonial() {
        currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        showTestimonial(currentIndex);
      }
      
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          showNextTestimonial();
        } else if (e.key === 'ArrowLeft') {
          showPrevTestimonial();
        }
      });
    }

    // Initialize testimonial slider when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      initTestimonialSlider();
      
      // Add animation classes to client logos
      const clientLogos = document.querySelectorAll('.client-logo');
      clientLogos.forEach((logo, index) => {
        logo.style.animationDelay = `${index * 0.1}s`;
        logo.classList.add('animate__animated', 'animate__fadeInUp');
      });
    });
  } else {
    before.style.transform = 'rotate(90deg)';
    after.style.transform = 'rotate(0)';
    before.style.top = '0';
    after.style.top = '0';
  }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
  if (window.innerWidth < 1024) {
    toggleMobileMenu();
  }
}

// Handle header scroll effect
function handleScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Show/hide back to top button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
  }
  
  // Update active navigation link
  updateActiveNavLink();
}

// Enhanced smooth scroll for anchor links with better performance and accessibility
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  // Skip if it's a back-to-top button or has no href
  if (anchor.getAttribute('href') === '#' || anchor.classList.contains('back-to-top')) {
    return;
  }
  
  // Handle Home link specifically
  if (anchor.getAttribute('href') === '#home') {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Update URL without adding to history
      history.replaceState(null, null, ' ');
      
      // Update active nav link
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      anchor.classList.add('active');
    });
    return;
  }
  
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || !targetId) return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    e.preventDefault();
    
    // Calculate scroll position with header offset
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const extraOffset = 20; // Extra space between the target and viewport
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight - extraOffset;
    
    // Use native smooth scrolling if available
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // Fallback for older browsers
      const start = window.pageYOffset;
      const distance = offsetPosition - start;
      const duration = 800;
      let startTime = null;
      
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          window.requestAnimationFrame(animation);
        }
      }
      
      function easeInOutCubic(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
      }
      
      window.requestAnimationFrame(animation);
    }
    
    // Update URL without adding to history
    if (history.pushState) {
      history.pushState(null, null, targetId);
    } else {
      window.location.hash = targetId;
    }
    
    // Close mobile menu if open
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    if (menuToggle && mobileNav && mobileNav.classList.contains('active')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
      
      // Move focus to the target element for better keyboard navigation
      setTimeout(() => {
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus();
      }, 1000);
    }
  });
});

// Handle back button/forward button navigation with smooth scroll
window.addEventListener('popstate', function(e) {
  const hash = window.location.hash;
  if (hash) {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// Event Listeners
menuToggle.addEventListener('click', toggleMobileMenu);
mobileBackdrop.addEventListener('click', toggleMobileMenu);
window.addEventListener('scroll', handleScroll);

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Initialize
handleScroll();

/* ===== stats-counter.js ===== */

document.addEventListener('DOMContentLoaded', function() {
  // Counter animation
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateValue(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => observer.observe(number));
  }

  function animateValue(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // Animation duration in milliseconds
    const stepTime = 20; // Time between each step
    const steps = Math.ceil(duration / stepTime);
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      current += increment;
      step++;
      
      if (step >= steps) {
        clearInterval(timer);
        current = target; // Ensure we end on the exact target number
      }
      
      element.textContent = Math.round(current);
    }, stepTime);
  }
});

// Initialize particles.js
function initParticles() {
  if (typeof particlesJS === 'function') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.5 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }
}

/* ===== Testimonial Slider ===== */
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  
  // If no testimonials found, exit
  if (testimonials.length === 0) return;
  
  let currentIndex = 0;
  const totalTestimonials = testimonials.length;
  let slideInterval;
  
  // Show first testimonial by default
  showTestimonial(0);
  
  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showTestimonial(index);
    });
  });
  
  // Event listeners for navigation buttons
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', showPrevTestimonial);
    nextBtn.addEventListener('click', showNextTestimonial);
  }
  
  // Start auto-rotation
  startAutoRotation();
  
  // Pause auto-rotate on hover
  const sliderContainer = document.querySelector('.testimonials-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', pauseAutoRotation);
    sliderContainer.addEventListener('mouseleave', startAutoRotation);
  }
  
  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show selected testimonial and update dot
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
  }
  
  function showNextTestimonial() {
    const nextIndex = (currentIndex + 1) % totalTestimonials;
    showTestimonial(nextIndex);
  }
  
  function showPrevTestimonial() {
    const prevIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(prevIndex);
  }
  
  function startAutoRotation() {
    clearInterval(slideInterval);
    slideInterval = setInterval(showNextTestimonial, 5000);
  }
  
  function pauseAutoRotation() {
    clearInterval(slideInterval);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentIndex = 0;

    // Show initial testimonial
    showTestimonial(currentIndex);

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
            updateDots();
        });
    });

    // Event listeners for navigation buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
            updateDots();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
            updateDots();
        });
    }

    // Auto-rotate testimonials
    let autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
        updateDots();
    }, 8000);

    // Pause auto-rotation on hover
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });

        slider.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                showTestimonial(currentIndex);
                updateDots();
            }, 8000);
        });
    }

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
});
