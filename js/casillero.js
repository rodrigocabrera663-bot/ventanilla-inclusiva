// casillero.js — muestra las solicitudes del ciudadano (como en Qellqa real).
// Combina datos de ejemplo (data/tramites.json) con las solicitudes presentadas
// en este dispositivo (localStorage). Requiere sesion simulada.

import { requiereSesion, cerrarSesion } from './auth.js';
import { solicitudesGuardadas } from './store.js';

const sesion = requiereSesion(); // si no hay sesion, redirige a login.html
const lista = document.getElementById('lista-solicitudes');

if (sesion) {
  document.getElementById('saludo').textContent =
    `Hola, ${sesion.nombre}. Aquí ves el estado de tus trámites.`;
}

document.getElementById('btn-salir').addEventListener('click', () => {
  cerrarSesion();
  location.href = 'index.html';
});

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function cargar() {
  let demo = [];
  try {
    const r = await fetch('data/tramites.json');
    demo = (await r.json()).solicitudes || [];
  } catch { /* sin servidor http: solo lo guardado localmente */ }
  return [...solicitudesGuardadas(), ...demo];
}

function render(solicitudes) {
  if (!solicitudes.length) {
    lista.innerHTML = `<div class="paso"><p>Aún no tienes solicitudes.
      <a href="solicitud.html">Presenta tu primera solicitud</a>.</p></div>`;
    return;
  }
  const items = solicitudes.map((s) => `
    <li class="paso" style="list-style:none">
      <h3 style="margin:0 0 6px; color:var(--azul-osc)">Expediente ${esc(s.expediente)}</h3>
      <dl class="detalle-estado">
        <dt>Estado</dt><dd>${esc(s.estado)}</dd>
        <dt>Oficina</dt><dd>${esc(s.oficina)}</dd>
        <dt>Fecha de ingreso</dt><dd>${esc(s.fechaIngreso)}</dd>
        <dt>Último movimiento</dt><dd>${esc(s.ultimoMovimiento)}</dd>
      </dl>
    </li>`).join('');
  lista.innerHTML = `<ul style="padding:0; display:grid; gap:14px">${items}</ul>`;
}

cargar().then(render);
