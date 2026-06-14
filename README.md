# Ventanilla Inclusiva 🦯🏛️

> Asistente web **accesible** para que las personas con **discapacidad visual** de la
> región Cusco realicen trámites del **Gobierno Regional de Cusco** de forma
> **autónoma y privada**, usando su propio lector de pantalla.

**Hackatón Transformagob 2026 · Desafío 15 · Gobierno Regional de Cusco.**
Software libre (MIT). Sin backend, sin nube, sin datos reales.

---

## El problema
Más de **4,988 ciudadanos con discapacidad visual** en Cusco ya usan lectores de
pantalla (NVDA, JAWS, TalkBack), pero la Ventanilla Virtual del Gobierno Regional
**no es compatible** con ellos: no cumple los estándares de accesibilidad y los deja
sin poder iniciar un trámite. Hoy dependen de terceros, perdiendo autonomía y privacidad.

## La solución
Un **asistente conversacional guiado**, accesible de punta a punta (WCAG 2.2), que
demuestra cómo una persona ciega puede **presentar y consultar** una solicitud de
acceso a información pública **sola**, con su lector de pantalla.

### Características
- ♿ **Compatible con lectores de pantalla** — HTML semántico, ARIA, foco gestionado, anuncios en vivo.
- 🧭 **Guía paso a paso** — una pregunta a la vez, sin abrumar.
- ⚠️ **Identificación de errores accesible** — resumen con foco y enlaces a cada campo.
- 🎙️ **Comandos de voz en español** (opcional) — "siguiente", "anterior", "consultar"… Manos libres.
- 🗣️ **Audio de apoyo en quechua** — botón por paso (pendiente de grabación nativa, ver `audio/qu/PENDIENTE.md`).
- 🔆 **Alto contraste y texto grande** — también para baja visión.
- 🔒 **Privado y offline** — sin backend, sin IA en la nube, datos sintéticos. Tus datos no salen del dispositivo.

## Cómo ejecutarlo
Necesita servirse por **http** (para cargar los datos de ejemplo):

```bash
# Con Python (incluido en Windows/macOS/Linux)
python -m http.server 8080
# Abre http://localhost:8080
```

> Trámite de ejemplo para consultar: `GRC-2026-000123`.

## Cómo probarlo con un lector de pantalla (NVDA)
1. Descarga **NVDA** (gratis): https://www.nvaccess.org/
2. Enciéndelo y abre `http://localhost:8080`.
3. Navega **solo con teclado** (Tab / Shift+Tab / Enter): presenta una solicitud,
   provoca un error a propósito (deja un campo vacío) y confirma que el lector
   **anuncia cada paso, cada error y la confirmación**.

## Arquitectura
Sitio estático, sin dependencias ni build.
- `index.html` · `solicitud.html` · `consultar.html` — páginas.
- `css/styles.css` — estilos accesibles.
- `js/` — `i18n`, `validacion`, `store` (lógica pura, con tests), `asistente`,
  `voz`, `consultar`, `preferencias`.
- `data/tramites.json` — datos sintéticos.

### Componentes reutilizables
El núcleo está pensado para que el GORE lo adopte por partes: campo accesible,
resumen de errores, stepper conversacional, tracker de estado, botón de audio.

## Tests
```bash
node --test     # lógica: validación, expediente, i18n (10 pruebas)
```
Auditoría de accesibilidad: ver [`AUDITORIA-ACCESIBILIDAD.md`](AUDITORIA-ACCESIBILIDAD.md).

## Declaración de uso de IA generativa
Este prototipo se desarrolló con apoyo de **IA generativa (Claude Code)** para
ideación, diseño, redacción de código y documentación. Todo el contenido fue
revisado por el equipo. **No se ingresaron datos personales reales ni información
confidencial** en ninguna herramienta de IA.

## Próximos pasos
- Grabar el audio en quechua con hablante nativo (Qosqo-Qollaw) y validarlo en campo.
- Reconocimiento de voz **offline** con Vosk (open-source) para producción.
- Canal por **Telegram** con mensajes de voz nativos.
- Integración real con el sistema **Qellqa** y autenticación con DNI accesible.
- Texto bilingüe español/quechua validado por hablante nativo.

## Licencia
[MIT](LICENSE) — software libre, reutilizable por el Estado peruano.

## Documentos del proyecto
- [`ANALISIS-Y-PLAN.md`](ANALISIS-Y-PLAN.md) — requisitos y rúbrica.
- [`DISENO-MVP.md`](DISENO-MVP.md) — diseño técnico.
- [`PLAN-IMPLEMENTACION.md`](PLAN-IMPLEMENTACION.md) — plan de construcción.
- [`AUDITORIA-ACCESIBILIDAD.md`](AUDITORIA-ACCESIBILIDAD.md) — pruebas de accesibilidad.
