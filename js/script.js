// Mobile menu toggle
const btn = document.getElementById('menuBtn');
const menu = document.getElementById('mobileMenu');
btn?.addEventListener('click', () => menu?.classList.toggle('hidden'));

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Simple contact form handling (example - replace with real endpoint)
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Basic front-end validation
    const name = (document.getElementById('name') || {}).value || '';
    const email = (document.getElementById('email') || {}).value || '';
    const message = (document.getElementById('message') || {}).value || '';

    if (!name || !email || !message) {
      alert('Please complete name, email and message.');
      return;
    }

    // Demo behavior: show success toast (replace with real POST)
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    setTimeout(() => {
      alert('Thank you — we received your message. We will get back to you soon.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Inquiry';
      contactForm.reset();
    }, 900);
  });
}
