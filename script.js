// Rancho Bello

// Year
const y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

// Smooth scroll
document.querySelectorAll('.nav__links a, a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id && id.startsWith('#') && id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior:'smooth', block:'start' });
      }
    }
  });
});

// Reservar form -> WhatsApp
(function(){
  const form = document.getElementById('form-reservar');
  if (!form) return;
  const PHONE = '5491166930368';
  const fmt = (d) => {
    if (!d) return '';
    const [y,m,day] = d.split('-');
    return `${day}/${m}/${y}`;
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    const nombre = (fd.get('nombre') || '').trim();
    const desde = fd.get('desde');
    const hasta = fd.get('hasta');
    const personas = fd.get('personas');
    const mensaje = (fd.get('mensaje') || '').trim();
    if (!nombre || !desde || !hasta || !personas) {
      form.reportValidity();
      return;
    }
    const partes = [
      'Hola! Quiero consultar disponibilidad en *Rancho Bello*.',
      '',
      `• Nombre: ${nombre}`,
      `• Fechas: ${fmt(desde)} al ${fmt(hasta)}`,
      `• Huéspedes: ${personas}`,
    ];
    if (mensaje) partes.push(`• Mensaje: ${mensaje}`);
    partes.push('', 'Gracias!');
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(partes.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
  });
})();
