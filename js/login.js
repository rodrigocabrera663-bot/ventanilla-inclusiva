// login.js — ingreso simulado y accesible al casillero.
import { guardarSesion, obtenerSesion } from './auth.js';

// Si ya hay sesion, ir directo al casillero.
if (obtenerSesion()) location.href = 'casillero.html';

const form = document.getElementById('form-login');
const resumen = document.getElementById('resumen-errores');

function mostrarError(mensaje, campoId) {
  resumen.innerHTML = `<h2>Revisa este punto</h2><ul><li><a href="#${campoId}">${mensaje}</a></li></ul>`;
  resumen.hidden = false;
  const campo = document.getElementById(campoId);
  if (campo) campo.setAttribute('aria-invalid', 'true');
  resumen.focus();
}

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  resumen.hidden = true;
  const dni = document.getElementById('dni').value.trim();
  const nombre = document.getElementById('nombre').value.trim();

  if (!/^\d{8}$/.test(dni)) {
    mostrarError('El DNI debe tener 8 dígitos numéricos.', 'dni');
    return;
  }
  guardarSesion({ dni, nombre: nombre || 'Ciudadano(a)' });
  location.href = 'casillero.html';
});
