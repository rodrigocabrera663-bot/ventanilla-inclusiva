import test from 'node:test';
import assert from 'node:assert';
import { validarDatos } from '../js/validacion.js';

test('falta nombre -> error con id de campo', () => {
  const errores = validarDatos({ nombre: '', dni: '12345678', correo: 'a@b.com' });
  assert.ok(errores.some(e => e.campo === 'nombre'));
});

test('correo invalido -> error', () => {
  const errores = validarDatos({ nombre: 'Ana', dni: '12345678', correo: 'malo' });
  assert.ok(errores.some(e => e.campo === 'correo'));
});

test('DNI debe tener 8 digitos', () => {
  const errores = validarDatos({ nombre: 'Ana', dni: '123', correo: 'a@b.com' });
  assert.ok(errores.some(e => e.campo === 'dni'));
});

test('datos validos -> sin errores', () => {
  const errores = validarDatos({ nombre: 'Ana', dni: '12345678', correo: 'a@b.com' });
  assert.equal(errores.length, 0);
});
