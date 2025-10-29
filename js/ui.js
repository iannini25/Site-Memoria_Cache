// UI utilidades: menu mobile, ano do footer, progresso do scroll
(function () {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const navBtn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (navBtn && nav) {
    navBtn.addEventListener('click', () => {
      const open = nav.style.display === 'flex';
      nav.style.display = open ? 'none' : 'flex';
      navBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  // progress bar
  const bar = document.querySelector('.scrollbar');
  const setProgress = () => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (bar) bar.style.width = progress + '%';
  };
  setProgress();
  window.addEventListener('scroll', setProgress, { passive: true });
})();
