// Efeitos de scroll: Intersection Observer (reveal) + Parallax
(function () {
  // Reveal
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.classList.add('is-inview');
    }
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal-up, .reveal-fade, [data-observe]').forEach(el => io.observe(el));

 // Parallax (suave e sem jank) — DESLIGADO no mobile
const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
const isMobile = window.matchMedia('(max-width: 428px)').matches;
let ticking = false;

function onScroll() {
  if (isMobile) return; // <- evita aplicar transform no mobile
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const top = window.scrollY || window.pageYOffset;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        el.style.transform = `translate3d(0, ${top * -speed}px, 0)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });


  // Suavizar âncoras internas
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// Destacar link ativo no menu lateral conforme a seção visível
(function(){
  const sideLinks = document.querySelectorAll('.side-nav a[href^="#"]');
  if (!sideLinks.length) return;

  const targets = [...sideLinks].map(a => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    return el ? { a, el } : null;
  }).filter(Boolean);

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      const it = targets.find(t => t.el === e.target);
      if (!it) return;
      if (e.isIntersecting){
        sideLinks.forEach(l => l.classList.remove('is-active'));
        it.a.classList.add('is-active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

  targets.forEach(t => io.observe(t.el));
})();

// ===== H1: troca de texto no mobile (único h1, sem duplicar) =====
(function () {
  const title = document.getElementById('heroTitle');
  if (!title) return;

  // guarda o desktop (HTML) para restaurar quando sair do mobile
  if (!title.dataset.desktopTitle) {
    title.dataset.desktopTitle = title.innerHTML;
  }

  const mq = window.matchMedia('(max-width: 428px)');
  const applyTitle = () => {
    if (mq.matches) {
      // mobile
      const mobile = title.dataset.mobileTitle?.trim();
      if (mobile) title.textContent = mobile; // texto puro (sem spans)
    } else {
      // desktop
      title.innerHTML = title.dataset.desktopTitle;
    }
  };

  applyTitle();
  mq.addEventListener ? mq.addEventListener('change', applyTitle)
                      : mq.addListener(applyTitle);
})();
