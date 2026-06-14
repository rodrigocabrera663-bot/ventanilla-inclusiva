// consultar.js — busca el estado de un tramite por numero de expediente.
// Combina los datos de ejemplo (data/tramites.json) con las solicitudes
// guardadas en este dispositivo (localStorage).

import { buscarEstado, solicitudesGuardadas } from './store.js';

const form = document.getElementById('form-consulta');
const resultado = document.getElementById('resultado');

async function cargarSolicitudes() {
  let demo = [];
  try {
    const resp = await fetch('data/tramites.json');
    const json = await resp.json();
    demo = json.solicitudes || [];
  } catch {
    // Si no hay servidor http (file://), seguimos solo con lo guardado localmente.
  }
  return [...demo, ...solicitudesGuardadas()];
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function mostrar(sol, expediente) {
  if (!sol) {
    resultado.innerHTML = `
      <div class="paso">
        <h2 tabindex="-1" id="r-titulo">No encontramos ese expediente</h2>
        <p>Revisa el número e inténtalo de nuevo. Ejemplo válido: GRC-2026-000123.</p>
      </div>`;
  } else {
    resultado.innerHTML = `
      <div class="paso">
        <h2 tabindex="-1" id="r-titulo">Estado del expediente ${esc(sol.expediente)}</h2>
        <dl class="detalle-estado">
          <dt>Estado</dt><dd>${esc(sol.estado)}</dd>
          <dt>Oficina</dt><dd>${esc(sol.oficina)}</dd>
          <dt>Fecha de ingreso</dt><dd>${esc(sol.fechaIngreso)}</dd>
          <dt>Último movimiento</dt><dd>${esc(sol.ultimoMovimiento)}</dd>
        </dl>
      </div>`;
  }
  document.getElementById('r-titulo').focus();
}

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const expediente = document.getElementById('expediente').value.trim();
  const todas = await cargarSolicitudes();
  mostrar(buscarEstado(expediente, todas), expediente);
});
