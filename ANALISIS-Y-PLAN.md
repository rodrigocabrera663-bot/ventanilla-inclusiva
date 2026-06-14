# Ventanilla Inclusiva — Análisis y Plan
> Hackatón Transformagob 2026 · Desafío 15 · Gobierno Regional de Cusco (GRC)
> Documento maestro. Leer SIEMPRE antes de trabajar en el proyecto.
> Fuentes originales: `C:\Users\RODRIGO\Documents\Gore cuzco\`

---

## 0. ⏰ Lo urgente primero
- **Hoy es 13/06/2026 (Día 2 de 3).**
- **Cierre de envío: 14/06/2026, 11:59 pm — hora límite INAPELABLE.**
- Quedan **~1.5 días**. El plan está pensado para ese tiempo.
- Envío vía **Facilita Perú**: https://facilita.gob.pe/t/54660
- Evaluación final: 15–19 jun · Resultados: 23 jun.

---

## 1. El desafío (qué se pide)
**Título:** *Ventanilla inclusiva: Autonomía digital para la ciudadanía.*

**Pregunta:** ¿Cómo ayudar a los ciudadanos con **discapacidad visual** de Cusco a
acceder de **forma autónoma** a los trámites del GRC, **sin depender de
intermediarios o terceros**?

**El problema real (clave para no equivocarnos):**
- Hay **+4,988 ciudadanos con discapacidad visual** en la región.
- **Ya tienen sus propios lectores de pantalla** (NVDA, JAWS, TalkBack). El
  problema NO es que les falte tecnología.
- **La plataforma actual del GORE BLOQUEA/es incompatible con esos lectores.** La
  barrera aparece desde el primer contacto: la interfaz y los formatos no cumplen
  WCAG, así que el lector de pantalla no funciona y el usuario **ni siquiera puede
  iniciar el trámite**.
- Se concentra en la **Ventanilla Virtual** y el **Portal de Transparencia** del GRC.

**Insights del trabajo de campo:**
1. Necesitan que la info y los **formularios** sean interpretados correctamente por
   su lector de pantalla.
2. Necesitan **privacidad**: hoy se ven obligados a compartir datos y credenciales
   con terceros para completar trámites inaccesibles.
3. Necesitan **consistencia** entre tecnologías de asistencia (TalkBack, NVDA, JAWS).
4. Cita real de usuario: *"Cuando intento usar la Ventanilla Virtual con mi lector
   de pantalla, hay partes que simplemente no puedo escuchar ni entender; por eso
   tengo que pedir ayuda a otra persona para hacer mis trámites."*

**Situación deseada:** que puedan hacer trámites de forma **autónoma y privada** en
una ventanilla virtual compatible con sus herramientas de asistencia.

---

## 2. Alcance — qué SÍ y qué NO (no salirse de aquí)
**SÍ se espera:**
- Acceso autónomo a info y trámites de la Ventanilla Virtual.
- Compatibilidad con lectores de pantalla (JAWS, NVDA, TalkBack).
- Orientación **paso a paso** por voz o navegación accesible.
- **Identificación de errores en formularios** accesible.
- Mejorar UX bajo **WCAG 2.1** (el lineamiento nacional ya usa **WCAG 2.2** → apuntar a 2.2).
- Sencilla, escalable y viable para integrarse progresivamente.

**NO entra en el alcance:**
- Renovar TODA la Ventanilla Virtual institucional.
- Comprar licencias de software de asistencia.
- Modificar sistemas nacionales de otras entidades.
- Comprar equipos para usuarios finales.
- Infraestructura tecnológica de gran escala.
- Resolver accesibilidad de OTRAS discapacidades.

---

## 3. Restricciones (legales, datos, seguridad) — incumplir = descalificación
- **Leyes:** Ley 29973 (Persona con Discapacidad), Ley de Gobierno Digital (DL 1412),
  Ley 29733 (Protección de Datos Personales), Lineamientos de Accesibilidad del Estado.
- **Datos:** PROHIBIDO usar datos personales reales, credenciales, tokens, endpoints
  internos, expedientes o BD institucionales. Usar **datos sintéticos / simulados /
  abiertos**.
- **Seguridad:** PROHIBIDO tocar/escanear/probar sistemas reales del Estado. Todo en
  **ambiente de prueba/simulado/controlado**.
- **IA generativa:** permitida solo como apoyo (ideación, diseño, código, docs); hay
  que **declararla**. No meter datos sensibles en ella.
- **Código abierto OBLIGATORIO:** el núcleo debe entregarse con **licencia abierta**,
  reutilizable por el Estado. NO se admiten soluciones que dependan exclusivamente de
  software propietario/cerrado o que no se puedan reutilizar.
- **Equipo solucionador:** 2 a 5 personas mayores de edad (≠ del QOSQO LAB, que es el
  laboratorio que propone el reto).

---

## 4. 🎯 Rúbrica de evaluación (optimizar para esto)
Escala 0–4 por criterio × peso:

| Peso | Criterio | Qué da el puntaje máximo (4) |
|------|----------|------------------------------|
| **35%** | **Calidad de la solución frente al desafío** | Atiende el reto **con profundidad**, impacto diferenciado, y una respuesta que **el laboratorio no había contemplado**. Usuario articulado + valor público claro. |
| **30%** | **Prototipo funcional y viabilidad** | Prototipo **sólido, estable y demostrable**; viabilidad técnica/legal/operativa + **ruta clara de continuidad institucional**. |
| **20%** | **Apertura, reutilización y ética digital** | Núcleo **reutilizable, abierto, interoperable**; cumple datos/seguridad/ética; alineado a DL 1412 art. 29. |
| **15%** | **Presentación y documentación** | PPT claro + **demo integrada**; documentación técnica completa que facilita la reutilización. |

> **Lectura estratégica:** el 35% premia *profundidad y originalidad*, el 30% premia
> *que funcione de verdad y sea adoptable*, el 20% premia *open source bien hecho*.
> Ganar = MVP real + reutilizable + bien presentado, no una idea bonita sin demo.

---

## 5. Entregables obligatorios
1. **Presentación clara en PDF** (hay plantilla PPTX en la carpeta de fuentes).
2. **Prototipo funcional** de la solución.
3. (Suma puntos) **Repositorio de código abierto** + **documentación técnica** +
   **declaración de uso de IA**.

Se cargan en el **Formato de entrega final (Anexo 1)** vía Facilita Perú, que pide:
datos del equipo, nombre de la solución, descripción del desafío, beneficiario,
solución propuesta, **valor público esperado**, **funcionamiento del prototipo**,
**componentes abiertos**, **riesgos y mitigación**, **próximos pasos**, y enlaces
públicos (PDF, demo, repo, docs).

---

## 6. El sistema real (para que el prototipo sea creíble)
- Sistema: **SGD "Qellqa"** → `https://qellqa.regioncusco.gob.pe`
- **Mesa de Partes Virtual** (lo que usa el ciudadano):
  1. Selecciona un **trámite TUPA**.
  2. Llena la **casilla** del trámite.
  3. **Sube documentos**.
  4. Ve un **resumen del trámite**.
  5. **Confirmación de trámite iniciado** (genera nº de expediente).
  6. **Casillero electrónico** (bandeja del ciudadano).
- **Flujo Mesa de Partes** (de `Flujo mesa de partes.jpg`):
  - **Presentar trámite:** Ciudadano presenta documento → Recepción verifica
    requisitos → (si cumple) Registro en STD + nº de expediente → Derivación al área
    → Entrega de cargo con nº y fecha. (si no cumple) se observa y devuelve.
  - **Consultar trámite:** Ciudadano da nº de expediente/DNI → Búsqueda → Verifica
    estado/oficina/último movimiento → Informa al ciudadano → puede acudir o retirarse.
- Horario mesa de partes: L–V 8:00–16:30.

> Nuestro prototipo **simula** este flujo (datos sintéticos), accesible de punta a
> punta. No tocamos Qellqa real.

---

## 7. Requisitos de accesibilidad (el corazón técnico)
Estándar: **WCAG 2.2** (el lineamiento nacional lo exige; el reto pide 2.1 mínimo →
apuntamos a 2.2 que lo incluye). Cuatro principios **POUR**:
- **Perceptible:** texto alternativo en imágenes, contraste suficiente, info no solo
  por color, estructura semántica (encabezados, listas, landmarks).
- **Operable:** **todo manejable por teclado**, foco visible, sin trampas de foco,
  tiempos ajustables, orden de tabulación lógico.
- **Comprensible:** lenguaje claro, etiquetas (`<label>`) en cada campo, instrucciones,
  **identificación de errores accesible** (mensajes + resumen con ARIA live region).
- **Robusto:** HTML válido y semántico, roles ARIA correctos, compatible con lectores
  de pantalla (name/role/value correctos).

**Ventaja clave:** el usuario está en **Windows 11** → puede instalar **NVDA (gratis)**
y **probar el prototipo con un lector de pantalla real**. Eso es exactamente lo que
pide el reto y vuelve la demo irrefutable.

Referencia local: las 100 reglas de Vercel (`~/.claude/skills/reglas-web/guidelines.md`)
cubren gran parte de WCAG → usar el skill `/reglas-web` al construir.

---

## 8. 🧭 Análisis de enfoques posibles
| Enfoque | Idea | A favor | En contra | Veredicto |
|---------|------|---------|-----------|-----------|
| **A. Ventanilla Virtual accesible (implementación de referencia)** | Reconstruir el **flujo de UN trámite** de mesa de partes virtual, 100% accesible y screen-reader-first, como prototipo reutilizable | Pega directo al reto; reutilizable; demostrable con NVDA; ruta de adopción clara | Hay que diseñar bien la UX accesible | ✅ **Recomendado** |
| **B. Overlay de accesibilidad sobre la web actual** | Capa/widget encima de la plataforma existente | Rápido en teoría | Los overlays están **mal vistos** en accesibilidad y no arreglan el bloqueo de fondo; baja viabilidad real | ❌ Evitar |
| **C. Asistente por voz que reemplaza al lector** | Chatbot/voz que guía y lee | Llamativo | El reto pide compatibilidad con SUS lectores, **no reemplazarlos**; duplica esfuerzo | 🟡 Solo como complemento |

---

## 9. ✅ Propuesta recomendada (MVP)
**"Ventanilla Inclusiva": prototipo open-source de Ventanilla Virtual accesible**, que
demuestra a un ciudadano con discapacidad visual **iniciar y consultar un trámite de
forma autónoma y privada**, usando su propio lector de pantalla.

**MVP mínimo (lo que SÍ construimos en el tiempo):**
1. **Presentar un trámite** (mesa de partes virtual simulada): elegir trámite TUPA →
   formulario accesible (labels, instrucciones, validación con resumen de errores ARIA)
   → subir documento → resumen → confirmación con nº de expediente.
2. **Consultar estado** de un trámite por nº de expediente (datos simulados).
3. **Orientación paso a paso** accesible (un *stepper* con anuncios para lector de
   pantalla; opcional: guía por audio como complemento, no reemplazo).
4. Todo **WCAG 2.2**, probado con **NVDA**.

**Diferenciadores (suben el 35% y el 20%):**
- Entregar el núcleo como **librería de componentes accesibles reutilizables**
  (campo de formulario, subida de archivo, stepper, resumen de errores, tracker de
  estado) → el GORE los adopta progresivamente. Eso es "lo que el laboratorio no había
  contemplado".
- Ángulo **privacidad/autonomía** explícito en la demo (sin terceros).
- **Reporte de auditoría de accesibilidad** del prototipo (antes/después).

**Stack sugerido (viable en 48h + accesible + open source):**
- **HTML semántico + CSS + JS** (o **Next.js** si el equipo está cómodo). Lo semántico
  da control fino de accesibilidad.
- Demo pública en **Vercel/GitHub Pages**; **repo en GitHub con licencia MIT**.
- Datos **sintéticos** (JSON simulado), sin backend real ni datos personales.

> ⚠️ Esto es una **recomendación**, no una decisión cerrada. Las decisiones finales
> (sección 12) las define el equipo en el brainstorming.

---

## 10. Plan de trabajo (time-boxed para ~1.5 días)
**Bloque 1 — Definir (2–3 h):**
- Brainstorming con el equipo (skill `brainstorming`): confirmar enfoque A, elegir
  **qué trámite** demostrar, repartir roles.
- Escribir el **diseño/spec** corto (skill `writing-plans`).

**Bloque 2 — Diseñar (3–4 h):**
- Agente `arquitecto`: estructura del proyecto + flujo de usuario.
- Wireframe accesible de las 3 pantallas (presentar / confirmación / consultar).

**Bloque 3 — Construir (8–10 h):**
- Maquetar con HTML semántico + `/reglas-web` aplicado en vivo (agente `frontend`).
- Implementar validación + resumen de errores ARIA + stepper.
- Datos simulados.

**Bloque 4 — Probar (2–3 h):**
- Instalar **NVDA** y recorrer todo el flujo con lector de pantalla.
- `verification-before-completion`: corregir lo que el lector no anuncie bien.
- Auditoría de accesibilidad (checklist WCAG).

**Bloque 5 — Empaquetar (3–4 h):**
- Desplegar demo pública (Vercel) + repo público con README y licencia MIT.
- **PPT/PDF** con la plantilla oficial: problema, solución, valor público,
  funcionamiento, componentes abiertos, riesgos, próximos pasos.
- Llenar el formato de Facilita Perú y **enviar antes de las 11:59 pm del 14/06**.

---

## 11. Riesgos y mitigación (para el formato de entrega)
| Riesgo | Mitigación |
|--------|------------|
| Tiempo (48h) | MVP enfocado en 1 trámite; nada de over-engineering (YAGNI). |
| Accesibilidad mal hecha | Probar con NVDA real, no asumir; usar `/reglas-web`. |
| Parecer "idea sin demo" | Priorizar prototipo funcional desplegado y público. |
| Dependencia de software cerrado (descalifica) | Solo open source, licencia MIT, datos sintéticos. |
| Tocar datos/sistemas reales (descalifica) | Todo simulado; cero conexión a Qellqa real. |

---

## 12. ❓ Decisiones pendientes (para el brainstorming con el equipo)
1. **¿Cuántos somos y qué sabe hacer cada quien?** (define cuánto código asumimos).
2. **¿Qué trámite concreto demostramos?** (uno simple y representativo).
3. **¿Stack: HTML/CSS/JS simple o Next.js?** (según skills del equipo).
4. **¿Incluimos la guía por voz como complemento o lo dejamos para "próximos pasos"?**
5. **¿Quién prueba con NVDA?** (idealmente Rodrigo, está en Windows).
6. **¿Tenemos acceso a un usuario real con discapacidad visual para validar?** (los
   mentores ofrecieron acompañamiento por Meet/WhatsApp).

---

## 13. Cómo encaja con nuestro arsenal de Claude Code
- `brainstorming` (Superpowers) → cerrar el enfoque y el alcance.
- `writing-plans` → spec ejecutable.
- agente `arquitecto` → estructura y flujo.
- agente `frontend` + skill `/reglas-web` → UI accesible (WCAG).
- `test-driven-development` + NVDA → que funcione de verdad.
- agente `seguridad` → verificar que no exponemos datos ni dependemos de algo cerrado.
- `verification-before-completion` → antes de enviar.
- `/research` → si necesitamos ejemplos de patrones accesibles (ARIA, validación).

---

## 14. Fuentes (en `C:\Users\RODRIGO\Documents\Gore cuzco\`)
- `Desafío 15. Resumen desafío ... GORE CUSCO.pdf` — el desafío (núcleo).
- `8190908-bases-hackaton-transformagob-2026 (1).pdf` — bases + rúbrica + Anexo 1.
- `1. Agenda Hackatón Transformagob 2026.pdf` — agenda y deadline.
- `6905744-lineamiento-...-accesibles.pdf` — lineamientos de accesibilidad (WCAG 2.2).
- `MANUAL USUARIO - SGD V3 - 3107-1.pdf` — manual del sistema Qellqa.
- `Flujo mesa de partes.jpg` — diagrama del flujo de trámites.
- `PLANTILLA PPT HACKATON GOBIERNO REGIONAL DE CUSCO (2).pptx` — plantilla de entrega.
