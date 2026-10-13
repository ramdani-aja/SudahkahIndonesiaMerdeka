const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navigationItems = document.querySelectorAll('.nav-links a');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
});

navigationItems.forEach((item) => {
  item.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Buka menu');
  });
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

revealElements.forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll('main section[id]');
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navigationItems.forEach((item) => {
        item.classList.toggle(
          'active',
          item.getAttribute('href') === `#${entry.target.id}`,
        );
      });
    });
  },
  { rootMargin: '-35% 0px -55% 0px' },
);

sections.forEach((section) => navObserver.observe(section));
