// preferencias.js — controles de accesibilidad: alto contraste y texto grande.
// Persisten en localStorage y se aplican en todas las paginas.

function aplicar(clase, activo) {
  document.body.classList.toggle(clase, activo);
}

function configurarToggle(idBoton, clase, claveLS) {
  const boton = document.getElementById(idBoton);
  if (!boton) return;
  const activoInicial = localStorage.getItem(claveLS) === '1';
  aplicar(clase, activoInicial);
  boton.setAttribute('aria-pressed', String(activoInicial));

  boton.addEventListener('click', () => {
    const activo = boton.getAttribute('aria-pressed') !== 'true';
    boton.setAttribute('aria-pressed', String(activo));
    aplicar(clase, activo);
    localStorage.setItem(claveLS, activo ? '1' : '0');
  });
}

configurarToggle('btn-contraste', 'contraste-alto', 'pref-contraste');
configurarToggle('btn-texto', 'texto-grande', 'pref-texto');
