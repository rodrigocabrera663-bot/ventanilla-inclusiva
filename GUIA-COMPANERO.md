# 👋 Guía rápida para probar "Ventanilla Inclusiva"

Hola 👋 Gracias por ayudar a probar este proyecto.

## ¿Qué es?
Una web **accesible** para que personas con **discapacidad visual** hagan un trámite
del Gobierno Regional de Cusco (solicitud de acceso a información pública) **solas**,
usando su lector de pantalla. Es para la Hackatón Transformagob 2026 (Desafío 15).

## Cómo abrirlo (2 minutos)
Necesitas tener **Python** instalado (viene en la mayoría de PC; si no:
https://www.python.org/downloads/ → marca "Add to PATH").

1. Descomprime el ZIP en una carpeta.
2. Abre esa carpeta y, en la barra de dirección, escribe `cmd` y presiona Enter
   (se abre la consola dentro de la carpeta).
3. Pega esto y presiona Enter:
   ```
   python -m http.server 8080
   ```
4. Abre el navegador (Chrome o Edge) en:
   ```
   http://localhost:8080
   ```
   Deja la consola abierta mientras lo usas. Para cerrar: `Ctrl + C`.

## Cómo probarlo
**Prueba normal (con mouse):**
- Entra a "Presentar solicitud" y avanza paso a paso.
- Deja un campo vacío y dale "Siguiente": debe mostrar los errores arriba.
- Al final te da un número de expediente. Cópialo.
- Entra a "Consultar solicitud" y pega ese número (o prueba `GRC-2026-000123`).

**Prueba de accesibilidad (lo importante):**
- Instala **NVDA** (gratis): https://www.nvaccess.org/download/
- Enciéndelo y recorre la web **solo con el teclado** (Tab para moverte, Enter para
  activar). **Cierra los ojos** y comprueba si entiendes todo solo escuchando.

## ¿En qué nos puedes ayudar? (feedback)
- ¿Se entiende cada paso solo escuchando con NVDA?
- ¿Los mensajes de error son claros?
- ¿Algo se ve mal o confunde?
- Ideas para mejorarlo (¡bienvenidas!).

Más detalle técnico en `README.md`. ¡Gracias! 🙌
