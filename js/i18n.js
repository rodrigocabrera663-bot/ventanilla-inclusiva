// i18n.js — textos en espanol y mapeo de audio en quechua.
// Modulo ESM: lo usa el navegador (<script type="module">) y los tests de Node.

const ES = {
  'inicio.titulo': 'Ventanilla Inclusiva',
  'inicio.subtitulo': 'Trámites del Gobierno Regional de Cusco, accesibles para todas las personas.',
  'inicio.presentar': 'Presentar solicitud',
  'inicio.consultar': 'Consultar solicitud',
  'paso.datos': 'Tus datos de contacto',
  'paso.informacion': '¿Qué información solicitas?',
  'paso.entrega': '¿Cómo deseas recibir la respuesta?',
  'paso.confirmar': 'Revisa y confirma tu solicitud',
  'confirmacion.titulo': 'Solicitud enviada',
  'consultar.titulo': 'Consultar mi solicitud'
};

export function t(clave) {
  return Object.prototype.hasOwnProperty.call(ES, clave) ? ES[clave] : clave;
}

// Convierte una clave ('paso.datos') en la ruta del clip de audio en quechua.
export function claveAudioQuechua(clave) {
  return `audio/qu/${clave.replace(/\./g, '-')}.mp3`;
}
