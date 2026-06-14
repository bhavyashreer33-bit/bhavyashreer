const loader = document.getElementById('loader');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const nav = document.querySelector('.nav');
const navToggle = document.getElementById('navToggle');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const cursor = document.getElementById('customCursor');
const revealElements = document.querySelectorAll('.reveal');
const modal = document.getElementById('modalCert1');
const modalTrigger = document.querySelector('[data-modal-target]');
const modalClose = document.querySelector('[data-close]');
const typedText = document.getElementById('typedText');
const heroPhrases = ['Web Developer', 'Python Learner', 'AI Enthusiast', 'Digital Creator'];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let currentPhrase = 0;

window.addEventListener('load', () => {
  if (loader) {
    loader.classList.add('loaded');
    setTimeout(() => loader.remove(), 650);
  }
  revealOnScroll();
  typeText();
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  backToTop.classList.toggle('show', scrollY > 500);
  revealOnScroll();
  setActiveNavLink();
});

window.addEventListener('mousemove', (event) => {
  cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

document.querySelectorAll('button, a').forEach((elem) => {
  elem.addEventListener('mouseenter', () => {
    cursor.style.width = '36px';
    cursor.style.height = '36px';
    cursor.style.background = 'rgba(157,78,221,0.15)';
  });
  elem.addEventListener('mouseleave', () => {
    cursor.style.width = '18px';
    cursor.style.height = '18px';
    cursor.style.background = 'transparent';
  });
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('show')) {
      nav.classList.remove('show');
    }
  });
});

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-moon');
      icon.classList.toggle('fa-sun');
    }
  });
}

if (modalTrigger && modal) {
  modalTrigger.addEventListener('click', () => {
    modal.classList.add('show');
  });
}

if (modalClose && modal) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
  });
}

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('show');
  }
});

function typeText() {
  const phrase = heroPhrases[currentPhrase];
  if (!isDeleting) {
    typedText.textContent = phrase.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === phrase.length) {
      isDeleting = true;
      setTimeout(typeText, 1200);
      return;
    }
  } else {
    typedText.textContent = phrase.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % heroPhrases.length;
    }
  }
  setTimeout(typeText, isDeleting ? 80 : 120);
}

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
}

function setActiveNavLink() {
  const scrollPosition = window.scrollY + window.innerHeight / 3;
  navLinks.forEach((link) => {
    const targetSection = document.querySelector(link.getAttribute('href'));
    if (targetSection) {
      const sectionTop = targetSection.offsetTop;
      const sectionHeight = targetSection.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((item) => item.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

(function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  for (let i = 0; i < 18; i++) {
    const particle = document.createElement('span');
    particle.classList.add('particle');
    const size = Math.random() * 8 + 6;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.top = `${Math.random() * 90}%`;
    particle.style.left = `${Math.random() * 90}%`;
    particle.style.animationDuration = `${Math.random() * 8 + 8}s`;
    hero.appendChild(particle);
  }
})();
