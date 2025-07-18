// Theme toggle
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const btn = document.getElementById('themeToggle');
  const isLight = document.body.classList.contains('light-mode');
  btn.textContent = isLight ? '🌙 Dark Mode' : '☀️ Light Mode';
}

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar navigation logic
  const sections = document.querySelectorAll('.section-content');
  const navLinks = document.querySelectorAll('.nav-link');

  // Show only About section on load
  sections.forEach(section => section.classList.add('hidden'));
  const aboutSection = document.getElementById('about');
  if (aboutSection) aboutSection.classList.remove('hidden');

  // Nav link click handler
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      sections.forEach(section => section.classList.add('hidden'));
      const targetSection = document.getElementById(sectionId);
      if (targetSection) targetSection.classList.remove('hidden');
      navLinks.forEach(l => l.classList.remove('bg-yellow-400', 'text-black'));
      link.classList.add('bg-yellow-400', 'text-black');
      // Close mobile nav if open
      if (window.innerWidth < 768) {
        document.getElementById('mobile-nav').classList.add('hidden');
      }
    });
  });

  // Hamburger menu for mobile
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileNavToggle && mobileNav) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
  }

  // Highlight About nav link on load
  navLinks.forEach(l => l.classList.remove('bg-yellow-400', 'text-black'));
  const aboutNav = Array.from(navLinks).find(l => l.getAttribute('data-section') === 'about');
  if (aboutNav) aboutNav.classList.add('bg-yellow-400', 'text-black');

  // Mobile menu
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Scroll reveal animation
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
