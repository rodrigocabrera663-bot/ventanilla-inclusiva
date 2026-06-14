// store.js — generacion de numero de expediente y consulta/guardado de solicitudes.
// Sin backend: usa datos sinteticos (data/tramites.json) y localStorage en el navegador.

export function generarExpediente() {
  const n = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, '0');
  return `GRC-2026-${n}`;
}

// Busca un expediente en una lista de solicitudes. Devuelve el objeto o null.
export function buscarEstado(expediente, solicitudes) {
  return solicitudes.find((s) => s.expediente === expediente) ?? null;
}

// Guarda una solicitud en localStorage (solo navegador) y devuelve su expediente.
export function guardarSolicitud(solicitud) {
  const expediente = generarExpediente();
  const previas = JSON.parse(localStorage.getItem('solicitudes') || '[]');
  previas.push({
    ...solicitud,
    expediente,
    estado: 'Recibido',
    oficina: 'Mesa de Partes Virtual',
    fechaIngreso: new Date().toISOString().slice(0, 10),
    ultimoMovimiento: 'Solicitud registrada, pendiente de derivación'
  });
  localStorage.setItem('solicitudes', JSON.stringify(previas));
  return expediente;
}

// Lee las solicitudes guardadas en localStorage (solo navegador).
export function solicitudesGuardadas() {
  return JSON.parse(localStorage.getItem('solicitudes') || '[]');
}
