// A'D'ELEC 03 — Premium interactions

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Sticky header scroll state
const header = document.getElementById('siteHeader');
const onScroll = () => {
  if (window.scrollY > 20) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---- Burger menu (mobile)
const burger = document.getElementById('burgerBtn');
const nav = document.querySelector('.nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.classList.toggle('active');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// ---- Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---- Hero crossfade slideshow
const slides = document.querySelectorAll('.hero-img');
let slideIdx = 0;
if (slides.length > 1) {
  setInterval(() => {
    slides[slideIdx].classList.remove('active');
    slideIdx = (slideIdx + 1) % slides.length;
    slides[slideIdx].classList.add('active');
  }, 5000);
}

// ---- Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    lbImg.src = item.href;
    lbCap.textContent = item.dataset.caption || '';
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add('open'));
    document.body.style.overflow = 'hidden';
  });
});
const closeLB = () => {
  lightbox.classList.remove('open');
  setTimeout(() => { lightbox.hidden = true; document.body.style.overflow = ''; }, 300);
};
document.querySelector('.lb-close').addEventListener('click', closeLB);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLB(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lightbox.hidden) closeLB(); });

// ---- Smooth anchor scroll with header offset (Safari fallback)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});
