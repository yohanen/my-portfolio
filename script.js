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

  // Animate skill bars when Skills section is shown
  const skillsSection = document.getElementById('skills');
  const skillNames = [
    'Python', 'PHP', 'MySQL', 'CodeIgniter', 'HTML', 'CSS', 'JavaScript', 'Git', 'GitHub', 'Machine Learning', 'Communication', 'Critical Thinking', 'Teamwork', 'Problem Solving', 'Web Development'
  ];
  const skillPercents = [95, 85, 80, 80, 90, 90, 85, 80, 80, 75, 90, 85, 90, 85, 90];
  if (skillsSection && !skillsSection.querySelector('.skill-bar')) {
    const container = document.createElement('div');
    container.className = 'mt-8';
    skillNames.forEach((name, i) => {
      const bar = document.createElement('div');
      bar.className = 'mb-4';
      bar.innerHTML = `<div class="flex justify-between mb-1"><span>${name}</span><span class="text-yellow-300 font-bold">${skillPercents[i]}%</span></div><div class="skill-bar"><div class="skill-bar-fill" style="width:0"></div></div>`;
      container.appendChild(bar);
    });
    skillsSection.appendChild(container);
  }
  function animateSkillBars() {
    if (!skillsSection) return;
    const fills = skillsSection.querySelectorAll('.skill-bar-fill');
    fills.forEach((fill, i) => {
      setTimeout(() => {
        fill.style.width = skillPercents[i] + '%';
      }, 200 + i * 80);
    });
  }

  // Show skill bars when Skills section is shown
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (link.getAttribute('data-section') === 'skills') {
        setTimeout(animateSkillBars, 300);
      }
    });
  });

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      sections.forEach(section => section.classList.add('hidden'));
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      navLinks.forEach(l => l.classList.remove('bg-yellow-400', 'text-black'));
      link.classList.add('bg-yellow-400', 'text-black');
      if (window.innerWidth < 768) {
        document.getElementById('mobile-nav').classList.add('hidden');
      }
    });
  });

  // Project card ripple effect
  document.querySelectorAll('.bg-gray-700, .bg-gray-600').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'absolute pointer-events-none rounded-full';
      ripple.style.width = ripple.style.height = '120px';
      ripple.style.left = (e.offsetX - 60) + 'px';
      ripple.style.top = (e.offsetY - 60) + 'px';
      ripple.style.background = 'rgba(250,204,21,0.15)';
      ripple.style.zIndex = 10;
      ripple.style.transition = 'opacity 0.6s';
      ripple.style.position = 'absolute';
      card.style.position = 'relative';
      card.appendChild(ripple);
      setTimeout(() => ripple.style.opacity = 0, 300);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Enhanced testimonials carousel (fade/slide)
  const slides = document.querySelectorAll('.testimonial-slide');
  let currentSlide = 0;
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
      slide.style.transform = i === index ? 'translateX(0)' : (i < index ? 'translateX(-40px)' : 'translateX(40px)');
      // Hide all testimonial-more and reset readmore button for hidden slides
      if (i !== index) {
        const more = slide.querySelector('.testimonial-more');
        const btn = slide.querySelector('.testimonial-readmore');
        if (more) more.classList.add('hidden');
        if (btn) btn.textContent = 'Read More';
      }
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
  function attachTestimonialNavListeners() {
    const testimonialNextBtn = document.getElementById('testimonialNextBtn');
    const testimonialPrevBtn = document.getElementById('testimonialPrevBtn');
    if (testimonialNextBtn) {
      testimonialNextBtn.onclick = nextSlide;
    }
    if (testimonialPrevBtn) {
      testimonialPrevBtn.onclick = prevSlide;
    }
  }
  showSlide(0);
  // Dropdown navigation for testimonials
  const testimonialSelect = document.getElementById('testimonialSelect');
  if (testimonialSelect) {
    testimonialSelect.addEventListener('change', function() {
      const idx = parseInt(testimonialSelect.value);
      showSlide(idx);
    });
  }

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
