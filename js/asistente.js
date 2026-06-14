// asistente.js — flujo conversacional guiado y accesible para presentar la solicitud.
// Renderiza un paso a la vez, gestiona el foco, anuncia por aria-live y valida.

import { validarDatos } from './validacion.js';
import { guardarSolicitud } from './store.js';
import { t, claveAudioQuechua } from './i18n.js';

const contenedor = document.getElementById('paso-contenedor');
const anuncio = document.getElementById('anuncio');
const resumenErrores = document.getElementById('resumen-errores');

const estado = {
  paso: 0,
  datos: { nombre: '', dni: '', correo: '' },
  detalle: '',
  entrega: ''
};

// Definicion de los pasos. clave = clave i18n (para titulo y audio quechua).
const PASOS = [
  { clave: 'paso.datos', render: renderDatos, validar: validarPasoDatos, leer: leerDatos },
  { clave: 'paso.informacion', render: renderInformacion, validar: validarPasoInformacion, leer: leerInformacion },
  { clave: 'paso.entrega', render: renderEntrega, validar: validarPasoEntrega, leer: leerEntrega },
  { clave: 'paso.confirmar', render: renderConfirmar, validar: () => [], leer: () => {} }
];

// ---------- Render de cada paso ----------
function renderDatos() {
  return `
    <p class="ayuda">Paso 1: necesitamos saber cómo contactarte. Son datos de ejemplo para esta demostración.</p>
    <div class="campo">
      <label for="nombre">Nombre completo</label>
      <p class="ayuda" id="ayuda-nombre">Por ejemplo: Ana Quispe Huamán.</p>
      <input id="nombre" name="nombre" type="text" autocomplete="name"
             aria-describedby="ayuda-nombre" value="${esc(estado.datos.nombre)}">
    </div>
    <div class="campo">
      <label for="dni">DNI</label>
      <p class="ayuda" id="ayuda-dni">8 dígitos numéricos.</p>
      <input id="dni" name="dni" type="text" inputmode="numeric" maxlength="8"
             aria-describedby="ayuda-dni" value="${esc(estado.datos.dni)}">
    </div>
    <div class="campo">
      <label for="correo">Correo electrónico</label>
      <p class="ayuda" id="ayuda-correo">Aquí recibirás la respuesta. Ejemplo: nombre@correo.com.</p>
      <input id="correo" name="correo" type="email" autocomplete="email"
             aria-describedby="ayuda-correo" value="${esc(estado.datos.correo)}">
    </div>`;
}

function renderInformacion() {
  return `
    <p class="ayuda">Paso 2: cuéntanos qué información pública del Gobierno Regional de Cusco deseas obtener.</p>
    <div class="campo">
      <label for="detalle">Describe la información que solicitas</label>
      <p class="ayuda" id="ayuda-detalle">Sé específico. Ejemplo: presupuesto de obras del año 2025.</p>
      <textarea id="detalle" name="detalle" aria-describedby="ayuda-detalle">${esc(estado.detalle)}</textarea>
    </div>
    <p>Entidad: <strong>Gobierno Regional de Cusco</strong>.</p>`;
}

function renderEntrega() {
  const c = estado.entrega === 'correo' ? 'checked' : '';
  const r = estado.entrega === 'recojo' ? 'checked' : '';
  return `
    <p class="ayuda">Paso 3: elige cómo deseas recibir la respuesta.</p>
    <fieldset>
      <legend>Forma de entrega</legend>
      <div class="opcion-radio">
        <input type="radio" id="entrega-correo" name="entrega" value="correo" ${c}>
        <label for="entrega-correo">Por correo electrónico</label>
      </div>
      <div class="opcion-radio">
        <input type="radio" id="entrega-recojo" name="entrega" value="recojo" ${r}>
        <label for="entrega-recojo">Recojo presencial en Mesa de Partes</label>
      </div>
    </fieldset>`;
}

function renderConfirmar() {
  const entregaTxt = estado.entrega === 'correo' ? 'Por correo electrónico' : 'Recojo presencial en Mesa de Partes';
  return `
    <p class="ayuda">Paso 4: revisa tu solicitud. Si todo está bien, envíala.</p>
    <dl class="detalle-estado">
      <dt>Nombre</dt><dd>${esc(estado.datos.nombre)}</dd>
      <dt>DNI</dt><dd>${esc(estado.datos.dni)}</dd>
      <dt>Correo</dt><dd>${esc(estado.datos.correo)}</dd>
      <dt>Información solicitada</dt><dd>${esc(estado.detalle)}</dd>
      <dt>Forma de entrega</dt><dd>${esc(entregaTxt)}</dd>
    </dl>`;
}

// ---------- Lectura de datos del DOM al estado ----------
function leerDatos() {
  estado.datos.nombre = val('nombre');
  estado.datos.dni = val('dni');
  estado.datos.correo = val('correo');
}
function leerInformacion() { estado.detalle = val('detalle'); }
function leerEntrega() {
  const sel = document.querySelector('input[name="entrega"]:checked');
  estado.entrega = sel ? sel.value : '';
}

// ---------- Validacion por paso ----------
function validarPasoDatos() { return validarDatos(estado.datos); }
function validarPasoInformacion() {
  return estado.detalle.trim()
    ? []
    : [{ campo: 'detalle', mensaje: 'Describe qué información solicitas.' }];
}
function validarPasoEntrega() {
  return estado.entrega
    ? []
    : [{ campo: 'entrega-correo', mensaje: 'Elige cómo deseas recibir la respuesta.' }];
}

// ---------- Pintar el paso actual ----------
function pintar() {
  const def = PASOS[estado.paso];
  ocultarErrores();
  const total = PASOS.length;
  const esUltimo = estado.paso === total - 1;

  contenedor.innerHTML = `
    <section class="paso" aria-labelledby="titulo-paso">
      <p class="indicador-paso" aria-hidden="true">Paso ${estado.paso + 1} de ${total}</p>
      <h2 id="titulo-paso" tabindex="-1"
          aria-label="Paso ${estado.paso + 1} de ${total}: ${esc(t(def.clave))}">${esc(t(def.clave))}</h2>
      ${def.render()}
      <button type="button" class="boton-quechua" id="btn-quechua">▶ Escuchar este paso en quechua</button>
      <div class="acciones-paso">
        ${estado.paso > 0 ? '<button type="button" class="boton boton-secundario" id="btn-anterior">Anterior</button>' : ''}
        ${esUltimo
          ? '<button type="button" class="boton boton-primario" id="btn-enviar">Enviar solicitud</button>'
          : '<button type="button" class="boton boton-primario" id="btn-siguiente">Siguiente</button>'}
      </div>
    </section>`;

  // Foco al titulo del paso: el lector anuncia "Paso X de Y: Titulo" (via aria-label).
  // No usamos aria-live aqui para evitar doble locucion (Mejora 3).
  document.getElementById('titulo-paso').focus();

  // Eventos
  byId('btn-quechua').addEventListener('click', reproducirQuechua);
  if (byId('btn-anterior')) byId('btn-anterior').addEventListener('click', anterior);
  if (byId('btn-siguiente')) byId('btn-siguiente').addEventListener('click', siguiente);
  if (byId('btn-enviar')) byId('btn-enviar').addEventListener('click', enviar);
}

// ---------- Navegacion ----------
function siguiente() {
  const def = PASOS[estado.paso];
  def.leer();
  const errores = def.validar();
  if (errores.length) { mostrarErrores(errores); return; }
  estado.paso = Math.min(estado.paso + 1, PASOS.length - 1);
  pintar();
}
function anterior() {
  PASOS[estado.paso].leer();
  estado.paso = Math.max(estado.paso - 1, 0);
  pintar();
}

function enviar() {
  const expediente = guardarSolicitud({
    ...estado.datos, detalle: estado.detalle, entrega: estado.entrega
  });
  contenedor.innerHTML = `
    <section class="aviso-exito" aria-labelledby="titulo-exito">
      <h2 id="titulo-exito" tabindex="-1">Solicitud enviada</h2>
      <p>Tu solicitud fue registrada correctamente.</p>
      <p>Tu número de expediente es:</p>
      <p class="expediente">${esc(expediente)}</p>
      <p>Guárdalo para consultar el estado de tu trámite.</p>
      <div class="acciones-paso">
        <a class="boton boton-secundario" href="consultar.html">Consultar mi solicitud</a>
        <a class="boton boton-secundario" href="index.html">Volver al inicio</a>
      </div>
    </section>`;
  document.getElementById('titulo-exito').focus();
  anunciar(`Solicitud enviada. Tu número de expediente es ${expediente.split('').join(' ')}`);
}

// ---------- Errores accesibles ----------
// Quita los errores inline anteriores y restaura aria-describedby/aria-invalid.
function limpiarErroresInline() {
  contenedor.querySelectorAll('.error-campo').forEach((el) => el.remove());
  contenedor.querySelectorAll('[aria-invalid="true"]').forEach((el) => {
    el.removeAttribute('aria-invalid');
    const base = (el.getAttribute('aria-describedby') || '')
      .split(/\s+/).filter((tk) => tk && !tk.startsWith('error-'));
    el.setAttribute('aria-describedby', base.join(' '));
  });
}

function mostrarErrores(errores) {
  limpiarErroresInline();
  // Resumen accesible arriba (role="alert", el foco salta aqui).
  const items = errores
    .map((e) => `<li><a href="#${e.campo}">${esc(e.mensaje)}</a></li>`)
    .join('');
  resumenErrores.innerHTML = `
    <h2>Revisa estos puntos antes de continuar</h2>
    <ul>${items}</ul>`;
  resumenErrores.hidden = false;

  // Mejora 1: ademas, error INLINE en cada campo, enlazado por aria-describedby,
  // para que el lector lo lea al enfocar el campo (no solo en el resumen).
  errores.forEach((e) => {
    const campo = byId(e.campo);
    if (!campo) return;
    campo.setAttribute('aria-invalid', 'true');
    const errId = `error-${e.campo}`;
    const aviso = document.createElement('p');
    aviso.id = errId;
    aviso.className = 'error-campo';
    aviso.textContent = e.mensaje;
    campo.insertAdjacentElement('afterend', aviso);
    const tokens = (campo.getAttribute('aria-describedby') || '')
      .split(/\s+/).filter((tk) => tk && !tk.startsWith('error-'));
    tokens.push(errId);
    campo.setAttribute('aria-describedby', tokens.join(' '));
  });

  resumenErrores.focus();
}
function ocultarErrores() {
  resumenErrores.hidden = true;
  resumenErrores.innerHTML = '';
  limpiarErroresInline();
}

// ---------- Audio quechua ----------
let audioActual = null;
function reproducirQuechua() {
  const def = PASOS[estado.paso];
  if (audioActual) { audioActual.pause(); }
  audioActual = new Audio(claveAudioQuechua(def.clave));
  audioActual.play().catch(() => {
    anunciar('El audio en quechua de este paso aún no está disponible.');
  });
}

// ---------- Utilidades ----------
function anunciar(texto) { anuncio.textContent = ''; setTimeout(() => { anuncio.textContent = texto; }, 50); }
function byId(id) { return document.getElementById(id); }
function val(id) { const el = byId(id); return el ? el.value : ''; }
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// API publica para voz.js
window.asistente = { siguiente, anterior, reproducirQuechua,
  claveActual: () => PASOS[estado.paso]?.clave };

// Arranque
pintar();
