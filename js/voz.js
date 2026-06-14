// voz.js — comandos de voz en espanol como MEJORA opcional.
// Principio de mejora progresiva: si el navegador no soporta reconocimiento de voz
// o el usuario no da permiso de microfono, NO se muestra nada y todo el flujo
// sigue funcionando con teclado + lector de pantalla.
//
// Privacidad (declarado): el reconocimiento del navegador (Web Speech API) en
// Chrome procesa el audio en la nube de Google. En produccion se documenta Vosk
// (open-source, offline) como alternativa. Ver DISENO-MVP.md.

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const barra = document.getElementById('barra-voz');

// Si no hay soporte o no existe la barra en esta pagina: salir en silencio.
if (SR && barra) {
  iniciarBarraVoz();
}

function iniciarBarraVoz() {
  barra.hidden = false;
  barra.innerHTML = `
    <button type="button" class="boton boton-secundario" id="btn-voz" aria-pressed="false">
      Activar comandos de voz
    </button>
    <span class="estado-voz" id="estado-voz" aria-live="polite"></span>`;

  const boton = document.getElementById('btn-voz');
  const estado = document.getElementById('estado-voz');

  const rec = new SR();
  rec.lang = 'es-PE';
  rec.continuous = true;
  rec.interimResults = false;

  let activo = false;

  boton.addEventListener('click', () => {
    activo = !activo;
    boton.setAttribute('aria-pressed', String(activo));
    if (activo) {
      try { rec.start(); } catch { /* ya iniciado */ }
      estado.textContent = 'Escuchando. Di: siguiente, anterior, escuchar en quechua o ayuda.';
    } else {
      rec.stop();
      estado.textContent = 'Comandos de voz desactivados.';
    }
  });

  rec.addEventListener('result', (ev) => {
    const texto = ev.results[ev.results.length - 1][0].transcript.toLowerCase().trim();
    estado.textContent = `Escuché: "${texto}"`;
    ejecutarComando(texto, estado);
  });

  rec.addEventListener('error', (ev) => {
    activo = false;
    boton.setAttribute('aria-pressed', 'false');
    if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') {
      estado.textContent = 'No se pudo usar el micrófono. Puedes seguir con el teclado sin problema.';
    } else {
      estado.textContent = 'El reconocimiento de voz se detuvo. Puedes seguir con el teclado.';
    }
  });

  rec.addEventListener('end', () => {
    if (activo) { try { rec.start(); } catch { /* reintento */ } }
  });
}

function ejecutarComando(texto, estado) {
  // Mejora 2: si el usuario esta escribiendo en un campo, no ejecutar comandos
  // de navegacion (evita avances accidentales al captar palabras del dictado).
  const foco = document.activeElement;
  const escribiendo = foco && (foco.tagName === 'TEXTAREA' ||
    (foco.tagName === 'INPUT' && ['text', 'email', 'number', 'search', ''].includes(foco.type)));
  if (escribiendo) {
    estado.textContent = 'Estás en un campo de texto. Sal del campo (tecla Tab) y luego di el comando.';
    return;
  }

  const a = window.asistente;
  const incluye = (...palabras) => palabras.some((p) => texto.includes(p));

  if (incluye('siguiente', 'continuar', 'avanzar') && a) { a.siguiente(); return; }
  if (incluye('anterior', 'atrás', 'atras', 'regresar', 'volver') && a) { a.anterior(); return; }
  if (incluye('quechua') && a) { a.reproducirQuechua(); return; }
  if (incluye('inicio', 'principal')) { location.href = 'index.html'; return; }
  if (incluye('consultar')) { location.href = 'consultar.html'; return; }
  if (incluye('ayuda')) {
    estado.textContent = 'Comandos: siguiente, anterior, escuchar en quechua, consultar, inicio.';
    return;
  }
  estado.textContent = `No reconocí "${texto}". Di "ayuda" para ver los comandos.`;
}
