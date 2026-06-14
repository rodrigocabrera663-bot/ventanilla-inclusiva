import test from 'node:test';
import assert from 'node:assert';
import { t, claveAudioQuechua } from '../js/i18n.js';

test('t() devuelve el texto en espanol por clave', () => {
  assert.equal(t('inicio.titulo'), 'Ventanilla Inclusiva');
});

test('claveAudioQuechua() mapea clave a ruta de audio', () => {
  assert.equal(claveAudioQuechua('paso.datos'), 'audio/qu/paso-datos.mp3');
});

test('t() de clave inexistente devuelve la clave (no rompe)', () => {
  assert.equal(t('no.existe'), 'no.existe');
});
