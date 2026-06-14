// validacion.js — valida los datos del solicitante y devuelve errores accesibles.
// Cada error: { campo, mensaje }. El 'campo' coincide con el id del input,
// para poder enlazar el resumen de errores con cada campo (WCAG 3.3.1).

export function validarDatos({ nombre, dni, correo }) {
  const errores = [];

  if (!nombre || !nombre.trim()) {
    errores.push({ campo: 'nombre', mensaje: 'Escribe tu nombre completo.' });
  }

  if (!/^\d{8}$/.test(dni || '')) {
    errores.push({ campo: 'dni', mensaje: 'El DNI debe tener 8 dígitos numéricos.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo || '')) {
    errores.push({
      campo: 'correo',
      mensaje: 'Escribe un correo válido, por ejemplo: nombre@correo.com'
    });
  }

  return errores;
}
