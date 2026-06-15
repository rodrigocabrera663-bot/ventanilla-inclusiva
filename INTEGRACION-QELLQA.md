# Cómo se integraría con Qellqa (sistema real del GORE Cusco)

> Este prototipo **no toca** el sistema real (las bases de la hackatón lo prohíben y
> usamos datos sintéticos). Pero lo diseñé para que la integración sea **directa**: la
> capa de accesibilidad (lo difícil, ya resuelto) está **desacoplada** de la capa de datos.

## La idea: una sola pieza por reemplazar
Toda la lógica de datos vive en **`js/store.js`**, con una interfaz clara. Para producción,
basta reemplazar ese módulo por un **adaptador** que llame a las APIs reales del GORE,
**sin tocar la interfaz accesible**.

### Interfaz que ya usa la app (prototipo → producción)
| Función actual (`store.js`) | En producción llamaría a… |
|-----------------------------|---------------------------|
| `guardarSolicitud(solicitud)` | API de **mesa de partes** de Qellqa → registra expediente |
| `buscarEstado(expediente)` | API de **seguimiento** del Sistema de Trámite Documentario (STD) |
| `solicitudesGuardadas()` | API del **casillero electrónico** del ciudadano |
| (adjunto) | Servicio de **carga de documentos** de Qellqa |
| (login) | Identidad con **DNI/RENIEC** + casillero, de forma accesible |

## Mapa al flujo real (del manual de Qellqa)
1. Ciudadano se identifica → **casillero electrónico**.
2. Presenta trámite TUPA → **registro en el STD**, genera **número de expediente**.
3. Mesa de Partes **deriva** al área correspondiente.
4. Ciudadano **consulta el estado** (oficina, último movimiento).

Mi prototipo **simula exactamente este flujo**; producción solo cambia el origen de los datos.

## Requisitos para la adopción (viabilidad)
- APIs/servicios del GORE expuestos de forma segura (no incluidos aquí por reglas).
- Identidad accesible (evitar CAPTCHA visual; usar alternativas accesibles).
- Protección de datos (Ley 29733) y seguridad de la información en el lado del GORE.
- Reutilizar la **librería de componentes accesibles** de este repo en la Ventanilla actual.

## Por qué esto importa
El 80% de la dificultad de una mesa de partes accesible es la **lógica de foco, lectores
y WCAG** — y eso ya está resuelto y probado aquí. La integración con Qellqa es trabajo de
**conexión de datos**, no de reinventar la accesibilidad.
