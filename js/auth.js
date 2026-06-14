// auth.js — sesion SIMULADA (no es autenticacion real). Datos sinteticos.
// Cumple las reglas de la hackaton: no usa identidad real ni sistemas externos.

const CLAVE = 'sesion';

export function guardarSesion(sesion) {
  localStorage.setItem(CLAVE, JSON.stringify(sesion));
}

export function obtenerSesion() {
  try { return JSON.parse(localStorage.getItem(CLAVE)); }
  catch { return null; }
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE);
}

// Si no hay sesion, redirige a la pagina de ingreso. Devuelve la sesion o null.
export function requiereSesion(redirigirA = 'login.html') {
  const s = obtenerSesion();
  if (!s) location.href = redirigirA;
  return s;
}
