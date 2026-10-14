// Menú móvil
const toggle = document.querySelector('.toggle');
const menu = document.getElementById('menu');
const setMenu = open => {
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
};
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// Sombra del encabezado al desplazarse
const header = document.querySelector('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Enlace activo según la sección visible
const links = [...menu.querySelectorAll('a:not(.btn)')];
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
links.forEach(l => { const s = document.querySelector(l.getAttribute('href')); if (s) spy.observe(s); });

// Aparición suave de contenido
const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in'); reveal.unobserve(entry.target); }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

// Formulario de demostración (no envía datos)
document.getElementById('demo').addEventListener('submit', function (e) {
  e.preventDefault();
  const d = new FormData(this);
  document.getElementById('feedback').textContent =
    'Vista de demostración: solicitud de "' + d.get('servicio') + '" preparada para ' + d.get('nombre') + '. No se envió ni guardó información.';
});
