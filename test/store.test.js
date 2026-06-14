import test from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { generarExpediente, buscarEstado } from '../js/store.js';

const datos = JSON.parse(
  readFileSync(new URL('../data/tramites.json', import.meta.url))
);

test('generarExpediente() produce formato GRC-2026-XXXXXX', () => {
  assert.match(generarExpediente(), /^GRC-2026-\d{6}$/);
});

test('buscarEstado() encuentra un expediente existente', () => {
  const r = buscarEstado('GRC-2026-000123', datos.solicitudes);
  assert.equal(r.estado, 'En atención');
});

test('buscarEstado() devuelve null si no existe', () => {
  assert.equal(buscarEstado('GRC-2026-999999', datos.solicitudes), null);
});
