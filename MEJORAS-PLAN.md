# Plan Ganador v2 — Ventanilla Inclusiva (8 horas)
> Objetivo: pasar de "formulario accesible" a **"mesa de partes inclusiva de
> extremo a extremo"**, sin romper el demo y sin violar reglas. Commit tras cada paso.

## El reencuadre (la narrativa que gana)
No es un formulario. Es **el motor de accesibilidad + mesa de partes inclusiva de
referencia** para el Estado: identificarse → presentar → **adjuntar** → recibir
expediente → **seguir en su casillero**, todo con su lector de pantalla O con
nuestra voz. La parte difícil (foco, lectores, WCAG) **ya está resuelta** — lista
para que el GORE la adopte.

## Lo que construyo yo (orden por impacto/riesgo)

### 1. Casillero electrónico + login simulado  ⭐ (la crítica #1)
- `login.html` + `js/auth.js`: ingreso accesible (DNI/usuario), sesión en
  localStorage, **sin CAPTCHA** (showcase de auth accesible). Cuenta demo sintética.
- `casillero.html` + `js/casillero.js`: "Mis solicitudes" — lista accesible de los
  expedientes del ciudadano (estado, oficina, fecha) como en Qellqa real.
- Las solicitudes presentadas aparecen en el casillero → flujo de sistema, no de form.
- **Por qué:** responde "es un formulario, no un sistema". Suma 35% + 30%.

### 2. Subida de archivos accesible
- Paso en el asistente: `<input type="file">` con label, nombre del archivo
  anunciado por aria-live, formatos sugeridos (PDF/imagen). Guardado simulado.
- **Por qué:** flujo real (adjuntar solicitud firmada/sustento). 35% + 30%.

### 3. Modo voz (la app habla sola, sin instalar nada)
- `js/modo-voz.js`: toggle "🔊 Modo voz" (apagado por defecto → evita doble voz con
  el lector). Usa speechSynthesis del navegador + los comandos de voz que ya existen.
- **Por qué:** inclusión extra para quien no tiene lector. Sin instalar nada. 35%.

### 4. Pulido visual accesible (moderno y confiable, no recargado)
- Restyle de `styles.css`: escala tipográfica, espaciado, hero en inicio, tarjetas
  con profundidad sutil, marca/wordmark. Mantiene contraste AA y foco visible.
- **Por qué:** "se ve del 2005" → desconfianza de autoridades + baja visión. 15% + 30%.

### 5. PWA (instalable, offline)
- `manifest.webmanifest` + `sw.js` (cachea assets → funciona sin internet) + íconos.
- Botón/aviso "Instalar app" para acceso directo en celular y escritorio.
- **Por qué:** aplicación instalable y offline para zonas rurales de Cusco. 30%.

### 6. Reescritura en primera persona (voz de autor)
- README, contenido del PPT y texto de Facilita en primera persona: "Desarrollé…",
  "Mi propuesta…", "Decidí no usar IA en la nube porque…".
- **Por qué:** hoy suena a IA/tercera persona → resta. 15%.

### 7. Spec de integración con Qellqa (adaptador)  [si alcanza]
- `INTEGRACION-QELLQA.md`: cómo se reemplaza `store.js` por un adaptador real
  (`presentarTramite()`, `consultarEstado()`, `subirDocumento()`) mapeado a la mesa
  de partes real. Sin tocar el sistema (cumple reglas).
- **Por qué:** responde "es un juguete" mostrando viabilidad. 30%.

## Lo que haces tú (en paralelo, son tuyas)
- [ ] **Prueba con NVDA** (5 min) y me reportas.
- [ ] **Grabar audio quechua** (12 frases, hablante nativo Qosqo-Qollaw).
- [ ] Repo a **público** antes de enviar.
- [ ] **Probar la instalación PWA** desde el navegador.
- [ ] **Video demo 1-2 min** con NVDA (lo más convincente para el jurado).
- [ ] **Enviar en Facilita** antes del 14/06 11:59 pm.

## Reglas del sprint
- Commit + verificación tras CADA mejora → siempre hay demo funcional.
- Si el tiempo se acaba, paramos en un punto estable (nunca a medias).
- Nada de IA en la nube, datos reales, ni tocar Qellqa (descalifica).
