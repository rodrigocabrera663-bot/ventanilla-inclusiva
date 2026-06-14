# Contenido de la presentación (PPT/PDF) — Ventanilla Inclusiva

> Volcar en la plantilla oficial `PLANTILLA PPT HACKATON GOBIERNO REGIONAL DE CUSCO.pptx`
> y exportar a PDF. Cubre el Anexo 1 y maximiza la rúbrica (35/30/20/15).

## Slide 1 — Portada
- **Ventanilla Inclusiva: Autonomía digital para la ciudadanía**
- Desafío 15 · Gobierno Regional de Cusco · Hackatón Transformagob 2026
- Equipo: [tu nombre] · Software libre (MIT)

## Slide 2 — El problema (criterio 35%)
- **+4,988 ciudadanos con discapacidad visual** en Cusco enfrentan una muralla digital.
- Ya tienen lectores de pantalla (NVDA, JAWS, TalkBack), pero la Ventanilla Virtual del
  GORE **los bloquea**: no cumple accesibilidad y no pueden ni iniciar un trámite.
- Cita real: *"…hay partes que simplemente no puedo escuchar ni entender; por eso tengo
  que pedir ayuda a otra persona para hacer mis trámites."*
- Consecuencia: pierden **autonomía** y **privacidad** (comparten datos con terceros).

## Slide 3 — La solución
- **Asistente conversacional guiado y accesible** (WCAG 2.2) que deja a una persona ciega
  **presentar y consultar** una solicitud de acceso a información pública **sola**.
- Compatible con **su propio** lector de pantalla. Autónomo. Privado. Offline.

## Slide 4 — Funcionamiento del prototipo (criterio 30%)
- Captura 1: inicio (Presentar / Consultar).
- Captura 2: asistente paso a paso con el resumen de errores accesible.
- Captura 3: confirmación con número de expediente.
- Captura 4: consulta de estado.
- Mencionar: **comandos de voz** en español y **botón de audio en quechua** por paso.
- Demo en vivo / enlace público.

## Slide 5 — Valor público
- **Autonomía**: hacen trámites sin depender de nadie.
- **Privacidad**: sus datos no salen del dispositivo (sin terceros).
- **Inclusión**: pensado también para hablantes de quechua (audio nativo).
- **Derecho a la información y transparencia** garantizados.

## Slide 6 — Apertura, reutilización y ética (criterio 20%)
- **Open source (MIT)** — el GORE puede adoptarlo y mejorarlo (DL 1412, art. 29).
- **Componentes accesibles reutilizables** — se integran por partes a los sistemas actuales.
- **Datos 100% sintéticos**, sin tocar sistemas reales, sin credenciales, **offline**.
- Estándares: **WCAG 2.2**, Ley 29973, Ley 29733, Lineamientos de Accesibilidad del Estado.

## Slide 7 — Riesgos y mitigación
| Riesgo | Mitigación |
|--------|------------|
| Accesibilidad mal hecha | Probado con NVDA + auditoría WCAG |
| Dependencia de software cerrado | Solo open source, sin IA en la nube |
| Datos sensibles | Datos sintéticos, nada sale del dispositivo |
| Voz en la nube (Chrome) | Opcional; Vosk offline para producción |

## Slide 8 — Próximos pasos
- Audio en quechua grabado y validado en campo (Qosqo-Qollaw).
- Reconocimiento de voz offline (Vosk). Canal por Telegram con voz.
- Integración real con Qellqa + autenticación con DNI accesible.

## Slide 9 — Cierre
- "Una ventanilla que funciona con las herramientas que la ciudadanía ya usa."
- Enlaces: demo pública · repositorio · documentación.
- Gracias.

---
### Declaración (incluir en la última slide o nota)
Prototipo experimental y demostrativo. Desarrollado con apoyo de IA generativa
(declarado). No usa datos personales reales ni sistemas no autorizados. No depende de
software propietario restrictivo.
