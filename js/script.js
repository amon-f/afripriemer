// Scroll progress indicator
function updateScrollProgress() {
  const scrollProgress = document.querySelector('.scroll-progress');
  if (!scrollProgress) return;
  
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.scrollY;
  const progress = (scrolled / documentHeight) * 100;
  
  scrollProgress.style.width = `${progress}%`;
}

// Initialize all animations and event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll progress
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress(); // Initial call
  // Back to top button
  const backToTopButton = document.getElementById('backToTop');
  
  if (backToTopButton) {
    // Show/hide button on scroll
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) { // Show after scrolling 300px
        backToTopButton.classList.remove('invisible', 'opacity-0');
        backToTopButton.classList.add('opacity-100');
      } else {
        backToTopButton.classList.remove('opacity-100');
        backToTopButton.classList.add('opacity-0', 'invisible');
      }
    });
    
    // Smooth scroll to top
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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
