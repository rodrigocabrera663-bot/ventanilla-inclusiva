# Auditoría de accesibilidad — Ventanilla Inclusiva

Fecha: 2026-06-13 · Estándar objetivo: **WCAG 2.2 (AA)**

## Pruebas automáticas (verificadas en navegador)
| Criterio | Resultado |
|----------|-----------|
| Idioma de la página (`lang="es"`) | ✅ |
| Un solo `<h1>` por página, jerarquía de encabezados | ✅ |
| Enlace "Saltar al contenido" (primer foco) | ✅ |
| Todos los campos con `<label>` asociado | ✅ (0 sin label) |
| Radios con label y `<fieldset>`/`<legend>` | ✅ |
| Región de anuncios `aria-live="polite"` (#anuncio) | ✅ |
| Resumen de errores `role="alert"` + foco al fallar | ✅ |
| Botones con nombre accesible | ✅ (0 sin nombre) |
| Foco gestionado al cambiar de paso (`tabindex="-1"` en título) | ✅ |
| Lógica de negocio (validación, expediente, consulta) | ✅ 10/10 tests |

## Criterios WCAG 2.2 cubiertos por diseño
- **1.3.1 Info y relaciones** — HTML semántico, labels, fieldset/legend, `<dl>`.
- **1.4.1 Uso del color** — los errores no dependen solo del color (texto + foco + lista).
- **1.4.3 Contraste** — texto #1a1a1a sobre #fff (~16:1); navy #0b3d91 (~9:1); modo alto contraste disponible.
- **2.1.1 Teclado** — todo operable por teclado; sin trampas de foco.
- **2.4.1 Evitar bloques** — skip link. **2.4.7 Foco visible** — `:focus-visible` grueso.
- **3.3.1 Identificación de errores** + **3.3.3 Sugerencia** — resumen + mensajes con ejemplo.
- **3.3.2 Etiquetas o instrucciones** — label + texto de ayuda por campo.
- **4.1.2 Nombre, función, valor** — roles/atributos ARIA correctos.
- **4.1.3 Mensajes de estado** — `aria-live` para pasos, errores y confirmación.

## Pendiente (paso final del usuario, en Windows)
- [ ] **Recorrido con NVDA** (gratis): inicio → solicitud (con un error a propósito) →
      confirmación → consulta. Confirmar que cada paso, error y la confirmación **se escuchan**.
- [ ] Recorrido **solo con teclado** (sin mouse) de punta a punta.
- [ ] (Opcional) Probar en móvil con **TalkBack**.

## Seguridad / ética (rúbrica 20%)
- Sin backend, sin base de datos, **datos 100% sintéticos**.
- **Sin secretos** ni credenciales en el código.
- Funciona **offline**; los comandos de voz son opcionales (y se declara el caveat de
  la nube de Google en Chrome; Vosk como ruta offline en producción).
- Licencia **MIT** (open source, reutilizable por el Estado).
