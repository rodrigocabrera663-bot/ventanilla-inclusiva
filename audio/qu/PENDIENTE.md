# Audio en quechua — guion para grabación (PENDIENTE)

> El mecanismo ya funciona: cada paso del asistente tiene un botón **"Escuchar en
> quechua"**. Si el archivo .mp3 existe, lo reproduce; si no, el asistente avisa
> "audio aún no disponible" (sin romper nada).
>
> **Para completarlo:** graba estas frases con un hablante **nativo de quechua sureño
> (Qosqo-Qollaw, el de Cusco)** y guárdalas con el nombre exacto indicado en esta
> carpeta (`audio/qu/`). Valida la traducción y la pronunciación con los
> usuarios/mentores reales que ofrece la hackatón (por WhatsApp/Meet = "probado en
> campo"). Formato: **.mp3**, voz clara, sin ruido.

## Frases que usa el asistente (obligatorias)
Traduce el texto en español al quechua Qosqo-Qollaw y graba cada archivo:

| Archivo (nombre exacto) | Texto en español a traducir y grabar |
|-------------------------|--------------------------------------|
| `paso-datos.mp3` | "Paso 1. Escribe tus datos de contacto: tu nombre completo, tu DNI de 8 dígitos y tu correo electrónico." |
| `paso-informacion.mp3` | "Paso 2. Describe qué información pública del Gobierno Regional de Cusco deseas obtener." |
| `paso-entrega.mp3` | "Paso 3. Elige cómo deseas recibir la respuesta: por correo electrónico o recojo presencial." |
| `paso-confirmar.mp3` | "Paso 4. Revisa tu solicitud. Si todo está bien, envíala." |

## Frases recomendadas (suman, opcionales)
| Archivo sugerido | Texto en español |
|------------------|------------------|
| `bienvenida.mp3` | "Bienvenido a la Ventanilla Inclusiva del Gobierno Regional de Cusco. Puedes presentar o consultar una solicitud de forma autónoma." |
| `confirmacion.mp3` | "Tu solicitud fue enviada. Guarda tu número de expediente para consultar el estado." |
| `error.mp3` | "Revisa los datos. Algunos campos necesitan corrección." |

## Cómo se conecta (para referencia técnica)
El nombre del archivo lo decide `js/i18n.js` → `claveAudioQuechua(clave)`:
`'paso.datos'` → `audio/qu/paso-datos.mp3` (reemplaza el punto por guion).
Si agregas frases nuevas, usa la misma convención.
