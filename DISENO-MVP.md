# Diseño técnico (spec) — Ventanilla Inclusiva MVP
> Hackatón Transformagob 2026 · Desafío 15 · GORE Cusco
> Documento de diseño aprobado. Base para el plan de implementación.
> Complementa a `ANALISIS-Y-PLAN.md` (requisitos). Fecha: 2026-06-13.

---

## 1. Objetivo en una frase
Un **asistente conversacional guiado, accesible y open-source** que permite a una
persona con discapacidad visual **presentar y consultar una solicitud de acceso a
información pública del GORE Cusco de forma autónoma y privada**, usando su propio
lector de pantalla, con **comandos de voz en español** (manos libres) y **audio de
apoyo en quechua**.

## 2. Decisiones cerradas (no reabrir sin motivo)
| Tema | Decisión |
|------|----------|
| Equipo | Solo Rodrigo (puede crecer) |
| Stack | HTML5 semántico + CSS + JavaScript vanilla (sin framework, sin build) |
| Trámite | Solicitud de acceso a información pública |
| Paradigma | Web accesible *screen-reader-first* + comandos de voz en español |
| Inteligencia | **Determinista** (sin IA en la nube, sin LLM). Flujo fijo. |
| Datos | 100% sintéticos (JSON local). Sin backend, sin conexión a Qellqa real. |
| Voz — salida | La da **el lector del usuario** (no añadimos TTS → evita doble voz) |
| Voz — entrada | Comandos en español vía Web Speech API (demo). Producción: Vosk (offline, open). |
| Quechua | **Audio de salida** pregrabado por hablante nativo (quechua Qosqo-Qollaw), validado con mentores. Set curado ~12 frases. NO voz de entrada en quechua. |
| Telegram | Fuera del MVP → "próximos pasos" |
| Licencia | MIT (open source obligatorio) |
| Prueba | NVDA en Windows + navegación por teclado |

## 3. Arquitectura y estructura
Sin backend. Todo estático, corre abriendo el HTML o servido en GitHub Pages/Vercel.

```
ventanilla-inclusiva/
├─ index.html              # Inicio: elegir Presentar / Consultar
├─ solicitud.html          # Asistente guiado paso a paso
├─ consultar.html          # Consulta de estado por nº de expediente
├─ css/
│  └─ styles.css           # Accesible: contraste AA, focus visible, texto grande
├─ js/
│  ├─ asistente.js         # Máquina de estados del flujo conversacional
│  ├─ validacion.js        # Validación + resumen de errores accesible
│  ├─ voz.js               # Comandos de voz (Web Speech API) + fallback
│  ├─ i18n.js              # Textos ES + disparo de audio quechua
│  └─ store.js             # Persistencia simulada (localStorage) + nº expediente
├─ audio/qu/               # Clips .mp3 en quechua (hablante nativo)
├─ data/
│  └─ tramites.json        # Datos sintéticos (solicitudes de ejemplo, estados)
├─ README.md               # Qué es, cómo correrlo, cómo probarlo con NVDA, licencia
└─ LICENSE                 # MIT
```

## 4. Componentes accesibles reutilizables (el diferenciador)
Cada uno: **qué hace · cómo se usa · de qué depende**. Aislados y testeables.

1. **Campo de formulario accesible** (`<label>` + hint + error vinculado por `aria-describedby`).
   Depende de: nada. Se usa: en cada paso del asistente.
2. **Resumen de errores** (región `role="alert"`/`aria-live="assertive"`; al fallar, el
   foco salta al resumen; cada error enlaza a su campo). Cubre WCAG 3.3.1/3.3.3.
3. **Stepper conversacional** (anuncia "Paso X de Y" por `aria-live="polite"`; un paso
   visible a la vez; foco gestionado al avanzar). Depende de: asistente.js.
4. **Botón de audio quechua** (`<button>` "Escuchar en quechua"; reproduce el clip del
   paso actual). Accesible por lector y por comando de voz.
5. **Tracker de estado** (lista semántica que muestra estado/oficina/fecha/movimiento).
6. **Barra de comandos de voz** (botón "Activar voz"; muestra estado escuchando/idle;
   feedback textual de lo reconocido). Depende de: voz.js.

## 5. Flujo de usuario (conversacional, una cosa a la vez)
**Inicio (`index.html`):** encabezado h1 claro, "saltar al contenido", landmark `main`.
Dos acciones grandes: *Presentar solicitud* / *Consultar solicitud*. Comando de voz:
"presentar" / "consultar".

**Presentar (`solicitud.html`)** — el asistente pregunta paso a paso:
1. **Tipo de solicitud**: acceso a información pública (preseleccionado, explicado).
2. **Datos del solicitante**: nombre, DNI, correo (sintéticos). Validación por campo.
3. **Qué información solicitas**: textarea con instrucciones claras.
4. **Área / entidad**: GORE Cusco (lista accesible).
5. **Forma de entrega**: correo electrónico / recojo (radios con `<fieldset>`+`<legend>`).
6. **Documento (opcional)**: subida accesible.
7. **Resumen + confirmación**: se lee todo lo ingresado; "¿Confirmas el envío?".
8. **Confirmación**: genera **nº de expediente** sintético; se anuncia por `aria-live`.

En cada paso: comandos "siguiente", "anterior", "repetir", "escuchar en quechua".

**Consultar (`consultar.html`):** ingresa nº de expediente → muestra estado, oficina,
fecha de ingreso y último movimiento (de `tramites.json`).

## 6. Comandos de voz (entrada)
- Motor: **Web Speech API** (`SpeechRecognition`), idioma `es-PE`, para la demo.
- Comandos: presentar, consultar, siguiente, anterior, repetir, confirmar, cancelar,
  "escuchar en quechua", "ayuda".
- **Fallback obligatorio:** si el navegador no soporta o el usuario no da permiso de
  micrófono, **todo funciona igual por teclado + lector**. La voz es *enhancement*,
  no requisito (principio de mejora progresiva).
- **Caveat declarado:** Web Speech API en Chrome procesa el audio en la nube de Google.
  Para producción se documenta **Vosk** (open-source, offline) como ruta correcta.

## 7. Quechua (audio de salida)
- Set curado de ~12 frases clave: bienvenida, las 8 preguntas del flujo, confirmación,
  error genérico. Guion en español → traducido y **validado por hablante nativo**.
- Dialecto: **quechua sureño Qosqo-Qollaw** (el de Cusco).
- Producción: pedir **notas de voz a los usuarios/mentores reales** (que la hackatón
  ofrece por WhatsApp/Meet) = auténtico + "probado en campo". Guardar como `audio/qu/*.mp3`.
- Reproducción: `<audio>` disparado por botón o comando de voz. Offline, sin nube.
- Si no se consigue el hablante a tiempo → Quechua pasa a "próximos pasos" sin romper nada.

## 8. Accesibilidad — checklist WCAG 2.2 (criterios objetivo)
- `lang="es"` (y `lang="qu"` en fragmentos quechua). Jerarquía de encabezados correcta.
- Todo operable por **teclado**; orden de tab lógico; **foco visible** (`:focus-visible`).
- Etiquetas en todos los campos (3.3.2); identificación de errores (3.3.1) + sugerencia (3.3.3).
- Mensajes de estado con `aria-live` (4.1.3); roles/nombres correctos (4.1.2).
- Contraste mínimo AA (1.4.3); no depender solo del color (1.4.1).
- Sin CAPTCHA visual. Sin límites de tiempo (o ajustables, 2.2.1).
- Targets ≥ 24px; "saltar al contenido"; landmarks (`header/nav/main/footer`).
- Usar el skill `/reglas-web` durante la construcción.

## 9. Manejo de errores
- Validación al intentar avanzar de paso (no en cada tecla, para no abrumar al lector).
- Resumen de errores arriba + foco al resumen + enlaces a campos.
- Mensajes claros en lenguaje sencillo ("Falta tu correo. Escríbelo así: nombre@correo.com").

## 10. Pruebas (antes de enviar)
- Recorrido completo **con NVDA** (instalar gratis en Windows): ¿se anuncia cada paso,
  cada error, la confirmación?
- Recorrido **solo con teclado** (sin mouse).
- Comandos de voz: caso feliz + fallback sin micrófono.
- Mini auditoría WCAG con la checklist de §8.

## 11. Fuera de alcance (MVP) → Próximos pasos (van en el PPT)
- Quechua por **voz de entrada** (ASR) y TTS quechua en tiempo real (Hinantin).
- **Canal Telegram** con mensajes de voz nativos.
- **Vosk** offline para comandos de voz en producción.
- Integración real con **Qellqa** y autenticación con DNI accesible.
- Más trámites TUPA.

## 12. Mapeo a la rúbrica (por qué esto gana)
- **35% Calidad/profundidad:** asistente conversacional accesible + bilingüe ES/Quechua
  + autonomía y privacidad reales = respuesta que el laboratorio no había contemplado.
- **30% Prototipo/viabilidad:** demo funcional probada con NVDA + ruta de adopción
  (componentes reutilizables) + próximos pasos claros.
- **20% Apertura/ética:** open source MIT, offline, datos sintéticos, sin dependencia
  cerrada, privacidad por diseño.
- **15% Presentación:** PPT + demo pública + README + este diseño técnico.
