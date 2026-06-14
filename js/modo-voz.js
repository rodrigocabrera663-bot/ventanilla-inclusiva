// modo-voz.js — lee la pagina en voz alta usando la voz del navegador (TTS).
// NO necesita instalar nada. APAGADO por defecto: si el usuario tiene un lector de
// pantalla y ademas enciende esto, habria doble voz. Es para quien NO tiene lector.

const synth = window.speechSynthesis;
const contenedor = document.getElementById('paso-contenedor');

if (synth && contenedor) {
  const barra = document.createElement('div');
  barra.className = 'barra-voz';
  barra.innerHTML = `
    <button type="button" class="boton boton-secundario" id="btn-modo-voz" aria-pressed="false">
      🔊 Leer en voz alta
    </button>
    <span class="estado-voz" id="estado-modo-voz" aria-live="polite"></span>`;
  contenedor.parentNode.insertBefore(barra, contenedor);

  const btn = document.getElementById('btn-modo-voz');
  const estado = document.getElementById('estado-modo-voz');
  let activo = false;

  function leerActual() {
    if (!activo) return;
    const sec = contenedor.querySelector('section');
    if (!sec) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(sec.innerText);
    u.lang = 'es-PE';
    u.rate = 1;
    synth.speak(u);
  }

  btn.addEventListener('click', () => {
    activo = !activo;
    btn.setAttribute('aria-pressed', String(activo));
    if (activo) {
      estado.textContent = 'Modo voz activado: la página se leerá sola. Si usas un lector de pantalla, mantenlo apagado para evitar doble voz.';
      leerActual();
    } else {
      synth.cancel();
      estado.textContent = 'Modo voz desactivado.';
    }
  });

  // Cuando el asistente cambia de paso, leer el nuevo paso.
  new MutationObserver(() => leerActual()).observe(contenedor, { childList: true });
}
