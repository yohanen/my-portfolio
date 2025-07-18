// Theme toggle
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const btn = document.getElementById('themeToggle');
  const isLight = document.body.classList.contains('light-mode');
  btn.textContent = isLight ? '🌙 Dark Mode' : '☀️ Light Mode';
}

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Scroll reveal animation
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  sections.forEach((section) => {
    section.classList.add('opacity-0', 'translate-y-4', 'transition', 'duration-700');
    observer.observe(section);
  });

  // Testimonial slider
  const slides = document.querySelectorAll('.testimonial-slide');
  let currentSlide = 0;
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
    });
    currentSlide = index;
  }
  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }
  function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }
  document.querySelectorAll('[onclick="nextSlide()"], [onclick="prevSlide()"]')
    .forEach(btn => {
      if (btn.getAttribute('onclick') === 'nextSlide()') btn.addEventListener('click', nextSlide);
      if (btn.getAttribute('onclick') === 'prevSlide()') btn.addEventListener('click', prevSlide);
    });
  showSlide(0);
  setInterval(nextSlide, 7000);

  // Copy email
  const copyBtn = document.querySelector('button[onclick="copyEmail()"]');
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('emailText').textContent;
      navigator.clipboard.writeText(email).then(() => {
        alert('✅ Email copied to clipboard!');
      });
    });
  }
}); 
