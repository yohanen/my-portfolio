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
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
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

  // Render Skills
  const skills = [
    { name: 'Python', percent: 95 },
    { name: 'PHP', percent: 85 },
    { name: 'MySQL', percent: 80 },
    { name: 'CodeIgniter', percent: 80 },
    { name: 'HTML', percent: 90 },
    { name: 'CSS', percent: 90 },
    { name: 'JavaScript', percent: 85 },
    { name: 'Git', percent: 80 },
    { name: 'GitHub', percent: 80 },
    { name: 'Machine Learning', percent: 75 },
    { name: 'Communication', percent: 90 },
    { name: 'Critical Thinking', percent: 85 },
    { name: 'Teamwork', percent: 90 },
    { name: 'Problem Solving', percent: 85 },
    { name: 'Web Development', percent: 90 }
  ];
  const skillsList = document.getElementById('skillsList');
  if (skillsList) {
    skills.forEach(skill => {
      const div = document.createElement('div');
      div.className = 'skill';
      div.innerHTML = `<span class="font-semibold text-yellow-300">${skill.name}</span><div class="skill-bar"><div class="skill-bar-fill" style="width:0"></div></div><span class="text-xs text-gray-400 mt-1">${skill.percent}%</span>`;
      skillsList.appendChild(div);
    });
    // Animate skill bars
    setTimeout(() => {
      skillsList.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
        bar.style.width = skills[i].percent + '%';
      });
    }, 400);
  }

  // Render Testimonials
  const testimonials = [
    {
      text: `Mr. Yohanen Dinagde Ejeta is a highly dedicated and disciplined individual who consistently demonstrated strong academic commitment and intellectual curiosity throughout his Bachelor of Computer Applications (BCA) program. <span class='testimonial-more hidden'>His ability to think outside the box, problem-solving mindset, and continuous pursuit of excellence made him stand out among his peers. He has shown exceptional performance in academics, research projects, and student-led initiatives. He was an active member of several key groups including the Robotics Club, Cyber Security Forum, Coding and Innovation Cell, and the Open-Source Community. His leadership, communication skills, and technical foundation make him a strong candidate for scholarships, higher studies, and tech jobs alike.</span>`,
      author: 'Prof. (Dr.) Sonal Sharma',
      role: 'Director, Uttaranchal School of Computing Sciences',
      org: 'Uttaranchal University, Dehradun'
    },
    {
      text: `Yohanen has shown exceptional performance in academics, research projects, and student-led initiatives. <span class='testimonial-more hidden'>He was an active member of several key tech groups and contributed to the university's innovation culture. His technical skills and collaborative spirit are commendable.</span>`,
      author: 'Dr. Sameer Dev Sharma',
      role: 'HoD, Uttaranchal School of Computing Sciences',
      org: 'Uttaranchal University, Dehradun'
    },
    {
      text: `Yohanen is an active member of several key tech groups and has shown exceptional performance in academics and research. <span class='testimonial-more hidden'>He is a reliable team player and a quick learner, always ready to take on new challenges and responsibilities.</span>`,
      author: 'Mrs. Divya Singh',
      role: 'Class Coordinator (3rd Year)',
      org: 'Uttaranchal University, Dehradun'
    }
  ];
  const testimonialSlider = document.getElementById('testimonialSlider');
  const testimonialNav = document.getElementById('testimonialNav');
  let currentTestimonial = 0;
  function renderTestimonials() {
    if (!testimonialSlider || !testimonialNav) return;
    testimonialSlider.innerHTML = '';
    testimonialNav.innerHTML = '';
    testimonials.forEach((t, i) => {
      const slide = document.createElement('div');
      slide.className = 'testimonial-slide' + (i === 0 ? ' active' : '');
      slide.innerHTML = `
        <p class="italic text-gray-300 mb-4 testimonial-preview">${t.text}</p>
        <button class="testimonial-readmore text-yellow-400 underline text-sm mb-2">Read More</button>
        <p class="text-sm font-semibold text-yellow-300">— ${t.author}<br><span class="text-gray-400">${t.role}<br>${t.org}</span></p>
      `;
      testimonialSlider.appendChild(slide);
      // Nav dot
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Show testimonial ${i+1}`);
      dot.onclick = () => showTestimonial(i);
      testimonialNav.appendChild(dot);
    });
  }
  function showTestimonial(idx) {
    const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
    const dots = testimonialNav.querySelectorAll('.testimonial-dot');
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
      // Hide all testimonial-more and reset readmore button for hidden slides
      if (i !== idx) {
        const more = slide.querySelector('.testimonial-more');
        const btn = slide.querySelector('.testimonial-readmore');
        if (more) more.classList.add('hidden');
        if (btn) btn.textContent = 'Read More';
      }
    });
    dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
    currentTestimonial = idx;
  }
  renderTestimonials();
  // Read More/Read Less logic
  testimonialSlider.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('testimonial-readmore')) {
      const slide = testimonialSlider.querySelectorAll('.testimonial-slide')[currentTestimonial];
      const more = slide.querySelector('.testimonial-more');
      const btn = slide.querySelector('.testimonial-readmore');
      if (more && btn) {
        if (more.classList.contains('hidden')) {
          more.classList.remove('hidden');
          btn.textContent = 'Read Less';
        } else {
          more.classList.add('hidden');
          btn.textContent = 'Read More';
        }
      }
    }
  });
}); 
