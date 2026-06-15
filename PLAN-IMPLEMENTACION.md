# Ventanilla Inclusiva — Plan de Implementación

> **Para ejecutar:** este plan se construye tarea por tarea. Los pasos usan checkbox `- [ ]`.
> Diseño: `DISENO-MVP.md` · Requisitos: `ANALISIS-Y-PLAN.md`. Fecha: 2026-06-13.

**Goal:** Prototipo web accesible (WCAG 2.2) que deja a una persona ciega presentar y
consultar una solicitud de acceso a información pública del GORE Cusco de forma
autónoma, con comandos de voz en español y audio de apoyo en quechua.

**Arquitectura:** Sitio estático (sin backend). Lógica pura en módulos ESM probables
con `node --test`. UI en HTML semántico + ARIA, probada manualmente con NVDA. Datos
sintéticos en JSON + `localStorage`. Voz por Web Speech API con degradación elegante.

**Tech Stack:** HTML5, CSS3, JavaScript (ESM, vanilla), Node 25 (`node --test`) para
tests de lógica, NVDA para test de accesibilidad. Sin frameworks, sin build.

**Regla de oro:** YAGNI. Demo funcional > features. Reservar tiempo para el PPT (entregable).

---

## Mapa de archivos
| Archivo | Responsabilidad única |
|---------|------------------------|
| `index.html` | Inicio: elegir Presentar / Consultar |
| `solicitud.html` | Contenedor del asistente guiado |
| `consultar.html` | Consulta de estado por nº de expediente |
| `css/styles.css` | Estilos accesibles (contraste AA, focus visible, texto grande) |
| `js/i18n.js` | Textos ES + ruta del audio quechua por clave (ESM, testeable) |
| `js/validacion.js` | Validación de campos + construcción del resumen de errores (ESM, testeable) |
| `js/store.js` | Guardar solicitud + generar nº de expediente + leer estado (ESM, testeable) |
| `js/asistente.js` | Máquina de estados del flujo + render de pasos + foco (UI) |
| `js/voz.js` | Comandos de voz (Web Speech API) + fallback (UI) |
| `data/tramites.json` | Solicitudes y estados sintéticos de ejemplo |
| `audio/qu/*.mp3` | Clips en quechua (hablante nativo) — placeholders hasta tenerlos |
| `README.md` / `LICENSE` | Docs + cómo probar con NVDA + MIT |

---

## Fase 0 — Setup (≈30 min)

### Tarea 0.1: Estructura del proyecto e inicialización
- [ ] **Paso 1: Crear carpetas y archivos base**
```bash
cd "C:/Users/RODRIGO/ventanilla-inclusiva"
mkdir -p css js data audio/qu test
```
- [ ] **Paso 2: Inicializar git local** (el push a GitHub se hará luego, con tu permiso)
```bash
git init
printf "node_modules/\n.DS_Store\n" > .gitignore
```
- [ ] **Paso 3: LICENSE MIT**
Crear `LICENSE` con el texto MIT estándar (titular: "Pillaca cabrera Rodrigo Gerardo — Ventanilla Inclusiva, 2026").
- [ ] **Paso 4: Datos sintéticos** — crear `data/tramites.json`:
```json
{
  "solicitudes": [
    { "expediente": "GRC-2026-000123", "estado": "En atención",
      "oficina": "Secretaría de Transparencia", "fechaIngreso": "2026-06-10",
      "ultimoMovimiento": "Derivado al área responsable (2026-06-12)" },
    { "expediente": "GRC-2026-000456", "estado": "Atendido",
      "oficina": "Mesa de Partes Virtual", "fechaIngreso": "2026-06-05",
      "ultimoMovimiento": "Respuesta enviada al correo del solicitante (2026-06-11)" }
  ]
}
```

---

## Fase 1 — Lógica pura con TDD (≈2.5 h)  · runner: `node --test`

### Tarea 1.1: i18n (textos ES + clave→audio quechua)
**Files:** Create `js/i18n.js`, Test `test/i18n.test.js`
- [ ] **Paso 1: Test que falla**
```js
// test/i18n.test.js
import test from 'node:test';
import assert from 'node:assert';
import { t, claveAudioQuechua } from '../js/i18n.js';

test('t() devuelve el texto en español por clave', () => {
  assert.equal(t('inicio.titulo'), 'Ventanilla Inclusiva');
});
test('claveAudioQuechua() mapea clave a ruta de audio', () => {
  assert.equal(claveAudioQuechua('paso.datos'), 'audio/qu/paso-datos.mp3');
});
test('t() de clave inexistente devuelve la clave (no rompe)', () => {
  assert.equal(t('no.existe'), 'no.existe');
});
```
- [ ] **Paso 2: Correr y ver que falla** — `node --test test/i18n.test.js` → FAIL (módulo no existe).
- [ ] **Paso 3: Implementación mínima**
```js
// js/i18n.js
const ES = {
  'inicio.titulo': 'Ventanilla Inclusiva',
  'inicio.presentar': 'Presentar solicitud',
  'inicio.consultar': 'Consultar solicitud',
  'paso.datos': 'Tus datos de contacto',
  'paso.informacion': '¿Qué información solicitas?',
  'paso.entrega': '¿Cómo deseas recibir la respuesta?',
  'paso.confirmar': 'Revisa y confirma tu solicitud',
  'confirmacion.titulo': 'Solicitud enviada'
};
export function t(clave) { return ES[clave] ?? clave; }
export function claveAudioQuechua(clave) {
  return `audio/qu/${clave.replace(/\./g, '-')}.mp3`;
}
```
- [ ] **Paso 4: Correr y ver que pasa** — `node --test test/i18n.test.js` → PASS.
- [ ] **Paso 5: Commit** — `git add js/i18n.js test/i18n.test.js && git commit -m "feat: módulo i18n con textos ES y mapeo de audio quechua"`

### Tarea 1.2: Validación + resumen de errores
**Files:** Create `js/validacion.js`, Test `test/validacion.test.js`
- [ ] **Paso 1: Test que falla**
```js
// test/validacion.test.js
import test from 'node:test';
import assert from 'node:assert';
import { validarDatos } from '../js/validacion.js';

test('falta nombre → error con id de campo', () => {
  const errores = validarDatos({ nombre: '', dni: '12345678', correo: 'a@b.com' });
  assert.ok(errores.some(e => e.campo === 'nombre'));
});
test('correo inválido → error', () => {
  const errores = validarDatos({ nombre: 'Ana', dni: '12345678', correo: 'malo' });
  assert.ok(errores.some(e => e.campo === 'correo'));
});
test('DNI debe tener 8 dígitos', () => {
  const errores = validarDatos({ nombre: 'Ana', dni: '123', correo: 'a@b.com' });
  assert.ok(errores.some(e => e.campo === 'dni'));
});
test('datos válidos → sin errores', () => {
  const errores = validarDatos({ nombre: 'Ana', dni: '12345678', correo: 'a@b.com' });
  assert.equal(errores.length, 0);
});
```
- [ ] **Paso 2: Correr y ver que falla** — `node --test test/validacion.test.js` → FAIL.
- [ ] **Paso 3: Implementación mínima**
```js
// js/validacion.js
export function validarDatos({ nombre, dni, correo }) {
  const errores = [];
  if (!nombre || !nombre.trim())
    errores.push({ campo: 'nombre', mensaje: 'Escribe tu nombre completo.' });
  if (!/^\d{8}$/.test(dni || ''))
    errores.push({ campo: 'dni', mensaje: 'El DNI debe tener 8 dígitos.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo || ''))
    errores.push({ campo: 'correo', mensaje: 'Escribe un correo válido, por ejemplo: nombre@correo.com' });
  return errores;
}
```
- [ ] **Paso 4: Correr y ver que pasa** — `node --test test/validacion.test.js` → PASS.
- [ ] **Paso 5: Commit** — `git commit -am "feat: validación de datos con mensajes accesibles"`

### Tarea 1.3: Store (guardar + generar expediente + consultar)
**Files:** Create `js/store.js`, Test `test/store.test.js`
- [ ] **Paso 1: Test que falla**
```js
// test/store.test.js
import test from 'node:test';
import assert from 'node:assert';
import { generarExpediente, buscarEstado } from '../js/store.js';

const datos = require('../data/tramites.json');

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
```
> Nota: si `require` de JSON da problemas en ESM, leer el JSON con `import ... assert { type: 'json' }` o `fs.readFileSync` en el test.
- [ ] **Paso 2: Correr y ver que falla** — `node --test test/store.test.js` → FAIL.
- [ ] **Paso 3: Implementación mínima**
```js
// js/store.js
export function generarExpediente() {
  const n = Math.floor(Math.random() * 1_000_000).toString().padStart(6, '0');
  return `GRC-2026-${n}`;
}
export function buscarEstado(expediente, solicitudes) {
  return solicitudes.find(s => s.expediente === expediente) ?? null;
}
export function guardarSolicitud(solicitud) { // navegador
  const exp = generarExpediente();
  const todas = JSON.parse(localStorage.getItem('solicitudes') || '[]');
  todas.push({ ...solicitud, expediente: exp, estado: 'Recibido' });
  localStorage.setItem('solicitudes', JSON.stringify(todas));
  return exp;
}
```
- [ ] **Paso 4: Correr y ver que pasa** — `node --test test/store.test.js` → PASS.
- [ ] **Paso 5: Commit** — `git commit -am "feat: store con generación de expediente y consulta de estado"`

---

## Fase 2 — UI accesible (≈5 h)  · verificación: NVDA + teclado

> Para cada tarea de UI, el criterio de aceptación es **funcional + accesible**, no un test
> automático. Verificar con: navegación por teclado (Tab/Shift+Tab/Enter) y NVDA encendido.

### Tarea 2.1: Página de inicio (`index.html` + `css/styles.css`)
- [ ] **Paso 1: Construir** `index.html` con: `<!doctype html>`, `lang="es"`, `<title>`,
  enlace "Saltar al contenido" (primer foco), `<header>` con `<h1>` "Ventanilla Inclusiva",
  `<main id="contenido">` con dos `<a>`/`<button>` grandes: *Presentar solicitud*
  (→ `solicitud.html`) y *Consultar solicitud* (→ `consultar.html`). `<footer>` con nota.
- [ ] **Paso 2: `css/styles.css`** con: contraste AA, `:focus-visible` muy visible
  (outline grueso), targets ≥ 44px, opción de texto grande, respeta `prefers-reduced-motion`.
- [ ] **Paso 3: Criterio de aceptación (verificar):**
  - Con NVDA: anuncia título, encabezado y ambos botones con su nombre.
  - Solo teclado: el primer Tab muestra "Saltar al contenido"; se llega a ambos botones; Enter navega.
- [ ] **Paso 4: Commit** — `git commit -am "feat: página de inicio accesible"`

### Tarea 2.2: Asistente de solicitud (`solicitud.html` + `js/asistente.js`)
- [ ] **Paso 1:** `solicitud.html` con un `<main>` que contiene un `<form>` y un
  contenedor de pasos. Incluir la **región de estado** (siempre presente):
```html
<p id="anuncio" class="visually-hidden" aria-live="polite"></p>
<div id="resumen-errores" role="alert" tabindex="-1" hidden></div>
```
- [ ] **Paso 2:** `js/asistente.js` — máquina de estados con pasos:
  `datos → informacion → entrega → confirmar → enviado`. Al avanzar:
  renderiza el paso, mueve el foco al encabezado del paso, y escribe en `#anuncio`
  el texto "Paso N de 4: …" (lo vocaliza el lector).
- [ ] **Paso 3:** Cada campo: `<label for>` explícito, `aria-describedby` al hint,
  `<fieldset><legend>` para los radios de forma de entrega. Subida de archivo opcional con `<label>`.
- [ ] **Paso 4: Validación accesible** al pulsar "Siguiente": si `validarDatos()` devuelve
  errores → rellenar `#resumen-errores` con una lista de enlaces (`<a href="#id-campo">`),
  quitar `hidden`, y mover el foco al resumen. Cada campo con error: `aria-invalid="true"`.
- [ ] **Paso 5: Confirmación** — paso "confirmar" lee de vuelta todo lo ingresado; al
  enviar, `guardarSolicitud()` → mostrar nº de expediente y escribirlo en `#anuncio`.
- [ ] **Paso 6: Criterio de aceptación (NVDA):** recorrer el flujo completo solo con
  teclado y lector; los cambios de paso, los errores y la confirmación **se escuchan**.
- [ ] **Paso 7: Commit** — `git commit -am "feat: asistente de solicitud guiado y accesible"`

### Tarea 2.3: Consulta de estado (`consultar.html`)
- [ ] **Paso 1:** Formulario con un campo "Número de expediente" (`<label>`), botón Consultar.
- [ ] **Paso 2:** Al consultar: usar `buscarEstado()` sobre `data/tramites.json` (y también
  `localStorage`). Mostrar resultado en una lista semántica (`<dl>` estado/oficina/fecha/
  movimiento) dentro de una región `aria-live="polite"`. Si no existe: mensaje claro.
- [ ] **Paso 3: Criterio de aceptación (NVDA):** al consultar `GRC-2026-000123`, el lector
  anuncia el estado y los detalles.
- [ ] **Paso 4: Commit** — `git commit -am "feat: consulta de estado de trámite accesible"`

---

## Fase 3 — Comandos de voz (≈1.5 h)

### Tarea 3.1: `js/voz.js` con degradación elegante
- [ ] **Paso 1:** Detectar soporte: `const SR = window.SpeechRecognition || window.webkitSpeechRecognition;`
  Si no existe o no hay permiso → no mostrar el botón de voz, **todo sigue funcionando por teclado**.
- [ ] **Paso 2:** Botón "Activar comandos de voz" (toggle, `aria-pressed`). Al activar:
  `lang = 'es-PE'`, escuchar comandos. Mostrar feedback textual de lo reconocido en una
  región `aria-live`.
- [ ] **Paso 3:** Mapear comandos → acciones del asistente: "presentar", "consultar",
  "siguiente", "anterior", "repetir", "confirmar", "escuchar en quechua", "ayuda".
- [ ] **Paso 4: Criterio de aceptación:** con micrófono, "siguiente" avanza el paso;
  **sin** micrófono/permiso, no rompe nada.
- [ ] **Paso 5: Commit** — `git commit -am "feat: comandos de voz en español con fallback por teclado"`

---

## Fase 4 — Quechua (≈1 h)

### Tarea 4.1: Soporte bilingüe + audio
- [ ] **Paso 1:** En cada paso del asistente, botón "▶ Escuchar en quechua" que reproduce
  `claveAudioQuechua(clavePaso)` con un `<audio>`. Accesible y disparable por comando de voz.
- [ ] **Paso 2:** Crear **placeholders** `audio/qu/*.mp3` (silencio breve) para no romper la
  demo, y un `audio/qu/PENDIENTE.md` listando las frases a grabar con el hablante nativo.
- [ ] **Paso 3:** Guion de las ~12 frases (ES) en `audio/qu/PENDIENTE.md` para enviar a los
  mentores/usuarios reales por WhatsApp y reemplazar los placeholders con sus notas de voz.
- [ ] **Paso 4: Commit** — `git commit -am "feat: soporte de audio en quechua (placeholders + guion para grabación)"`

---

## Fase 5 — Pruebas y auditoría (≈1.5 h)

### Tarea 5.1: Suite de lógica + accesibilidad
- [ ] **Paso 1:** Correr toda la lógica: `node --test` → todo PASS.
- [ ] **Paso 2:** Instalar **NVDA** (gratis) y recorrer: inicio → solicitud (con un error a
  propósito) → confirmación → consulta. Anotar lo que el lector NO anuncie y corregirlo.
- [ ] **Paso 3:** Recorrido **solo teclado** (sin mouse) de punta a punta.
- [ ] **Paso 4:** Checklist WCAG 2.2 de `DISENO-MVP.md §8`: marcar cada criterio.
- [ ] **Paso 5: Commit** — `git commit -am "test: auditoría de accesibilidad con NVDA y teclado"`

---

## Fase 6 — Empaquetar y entregar (≈3 h)

### Tarea 6.1: Documentación y despliegue
- [ ] **Paso 1:** `README.md` — qué es, problema, cómo correrlo, **cómo probarlo con NVDA**,
  decisiones (offline/sin IA/datos sintéticos), declaración de uso de IA generativa, licencia MIT.
- [ ] **Paso 2:** Desplegar la demo pública (GitHub Pages o Vercel). *(Subir a GitHub
  requiere tu confirmación y cuenta — lo hacemos juntos.)*
- [ ] **Paso 3:** Verificar que la demo pública carga y es navegable.

### Tarea 6.2: Presentación (ENTREGABLE OBLIGATORIO)
- [ ] **Paso 1:** Usar la plantilla `PLANTILLA PPT ... CUSCO (2).pptx` de la carpeta de fuentes.
- [ ] **Paso 2:** Contenido siguiendo el Anexo 1: problema, beneficiario, solución, **valor
  público**, **funcionamiento del prototipo** (con captura/demo), **componentes abiertos**,
  **riesgos y mitigación**, **próximos pasos** (quechua por voz, Telegram, Vosk, integración Qellqa).
- [ ] **Paso 3:** Exportar a **PDF**.
- [ ] **Paso 4:** Llenar el formato de **Facilita Perú** (https://facilita.gob.pe/t/54660) con
  los enlaces (PDF, demo, repo) y **enviar antes del 14/06 11:59 pm**.

---

## Auto-revisión (cobertura del spec)
- Trámite acceso a info pública → Fases 2-3. ✓
- Screen-reader-first + WCAG 2.2 → Fase 2 + 5. ✓
- Identificación de errores accesible → Tarea 2.2 Paso 4. ✓
- Comandos de voz + fallback → Fase 3. ✓
- Quechua audio + validación nativa → Fase 4. ✓
- Datos sintéticos / sin backend / offline → Fase 0-1. ✓
- Open source MIT + README + demo → Fase 6. ✓
- PPT/PDF + envío Facilita → Tarea 6.2. ✓
- Rúbrica (calidad/prototipo/apertura/presentación) → todo el plan. ✓

**Sin placeholders de lógica:** el código de Fase 1 está completo. La UI usa criterios de
aceptación verificables con NVDA (la accesibilidad no se testea automáticamente).
