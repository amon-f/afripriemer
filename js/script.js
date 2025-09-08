// Mobile menu toggle
const btn = document.getElementById('menuBtn');
const menu = document.getElementById('mobileMenu');
btn?.addEventListener('click', () => menu?.classList.toggle('hidden'));


// Dynamic year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();