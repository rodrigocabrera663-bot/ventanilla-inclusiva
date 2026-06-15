# Ventanilla Inclusiva 🦯🏛️

> Desarrollé esta plataforma para que las personas con **discapacidad visual** de la
> región Cusco puedan hacer trámites del **Gobierno Regional de Cusco** de forma
> **autónoma y privada**, usando su propio lector de pantalla.

**Hackatón Transformagob 2026 · Desafío 15 · Gobierno Regional de Cusco.**
Software libre (MIT). Sin backend, sin nube, sin datos reales.

---

## El problema que decidí resolver
En Cusco hay **más de 4,988 ciudadanos con discapacidad visual**. Casi todos ya usan
lectores de pantalla (NVDA, JAWS, TalkBack) en su día a día. El problema no es que les
falte tecnología: es que la **Ventanilla Virtual del GORE no es compatible** con esos
lectores y los deja sin poder iniciar un trámite. Hoy dependen de terceros, perdiendo
**autonomía y privacidad** (tienen que compartir sus datos con otra persona).

Mi conclusión fue clara: no necesitan otra herramienta que instalar, necesitan una
**ventanilla que funcione con las herramientas que ya usan**.

## Lo que construí
Un **sistema de mesa de partes inclusiva** de extremo a extremo, accesible bajo WCAG 2.2:

1. **Ingreso a un casillero** electrónico (login simulado, sin CAPTCHA).
2. **Presentar una solicitud** de acceso a información pública, guiada paso a paso,
   con **adjuntar documento** y validación de errores accesible.
3. **Confirmación** con número de expediente.
4. **Consultar el estado** del trámite y verlo en **"Mis solicitudes"**.

### Decisiones que tomé (y por qué)
- **Accesibilidad real, no de cartón.** Programé la semántica HTML, el manejo del foco
  y los anuncios `aria-live` para que el lector anuncie cada paso, cada error y la
  confirmación. Probé la estructura y el flujo para que funcione de verdad.
- **Sin IA en la nube.** Decidí no usar un chatbot de IA porque enviaría los datos del
  ciudadano a un tercero — justo lo contrario de la privacidad que busco. Todo corre
  **offline, en el dispositivo**.
- **Quechua con respeto.** Dejé el audio en quechua como capacidad diseñada y un
  **próximo paso a grabar con un hablante nativo** (Qosqo-Qollaw), porque prefiero no
  presentar un audio de máquina que suene inauténtico ante una comunidad quechuahablante.
- **Modo voz opcional.** Para quien no tiene lector de pantalla, agregué un modo que
  **lee la página en voz alta** con la voz del navegador, sin instalar nada.

### Funciones
- ♿ **Compatible con lectores de pantalla** — semántica, ARIA, foco gestionado, errores
  inline enlazados al campo (`aria-describedby`).
- 🧭 **Asistente guiado** paso a paso, con subida de archivos accesible.
- 🗂️ **Casillero electrónico** + ingreso simulado.
- 🎙️ **Comandos de voz** en español (no interfieren mientras escribes).
- 🔊 **Modo voz** — la app lee sola, sin instalar nada.
- 🗣️ **Audio de apoyo en quechua** (mecanismo listo; grabación nativa pendiente).
- 📱 **PWA instalable** y **offline** — funciona sin internet (clave en zonas rurales).
- 🔆 **Alto contraste y texto grande** — también para baja visión.
- 🔒 **Privado** — datos sintéticos, nada sale del dispositivo.

## Cómo correrlo
Necesita servirse por **http** (para cargar los datos de ejemplo):

```bash
python -m http.server 8080
# Abre http://localhost:8080
```
> Para probar la consulta: número de expediente `GRC-2026-000123`.

## Cómo probarlo con un lector de pantalla (NVDA)
1. Instala **NVDA** (gratis): https://www.nvaccess.org/download/
2. Enciéndelo y abre `http://localhost:8080`.
3. Navega **solo con teclado** (Tab / Enter), idealmente con los ojos cerrados.
   Provoca un error a propósito y comprueba que el lector lo anuncia.

También puedes comparar el antes/después en `comparativa.html` para escuchar la diferencia.

## Cómo lo convertí en app móvil (APK)
La hice **PWA**, así que se instala desde el navegador en Android. Para generar un
**.apk** la empaqueté con [PWABuilder](https://www.pwabuilder.com/) apuntando a la URL
pública del sitio — sin reescribir código.

## Arquitectura
Sitio estático, sin dependencias de runtime ni build.
- Páginas: `index`, `login`, `casillero`, `solicitud`, `consultar`, `comparativa`.
- `css/styles.css` — estilos accesibles.
- `js/` — `i18n`, `validacion`, `store`, `auth` (lógica con tests) + `asistente`, `voz`,
  `modo-voz`, `consultar`, `casillero`, `login`, `preferencias`, `pwa`.
- `data/tramites.json` — datos sintéticos. `sw.js` + `manifest.webmanifest` — PWA.

### Componentes reutilizables
Pensé el núcleo para que el GORE lo adopte por partes: campo accesible, resumen de
errores, stepper conversacional, tracker de estado, subida de archivos, casillero.

## Pruebas
```bash
node --test     # lógica: validación, expediente, i18n (10 pruebas)
```
Auditoría de accesibilidad: ver [`AUDITORIA-ACCESIBILIDAD.md`](AUDITORIA-ACCESIBILIDAD.md).

## Declaración de uso de IA generativa
Desarrollé este prototipo con apoyo de **IA generativa** para ideación, diseño,
redacción de código y documentación. Revisé todo el contenido. **No ingresé datos
personales reales ni información confidencial** en ninguna herramienta de IA.

## Próximos pasos
- Grabar el audio en quechua con hablante nativo (Qosqo-Qollaw) y validarlo en campo.
- Reconocimiento de voz **offline** con Vosk para producción.
- Canal por **Telegram** con mensajes de voz.
- Integración real con el sistema **Qellqa** (ver [`INTEGRACION-QELLQA.md`](INTEGRACION-QELLQA.md))
  y autenticación con DNI accesible.

## Licencia
[MIT](LICENSE) — software libre, reutilizable por el Estado peruano.
