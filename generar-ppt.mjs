// Genera Ventanilla-Inclusiva.pptx — presentación para la Hackatón Transformagob 2026.
import pptxgen from 'pptxgenjs';

const NAVY = '0B3D91';
const NAVY_OSC = '082A66';
const AMBAR = 'E0A100';
const TEXTO = '1A1A1A';
const GRIS = '566077';
const BLANCO = 'FFFFFF';
const HEAD = 'Georgia';
const BODY = 'Calibri';

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5
pptx.author = 'Rodrigo Cabrera';
pptx.company = 'Ventanilla Inclusiva';

const W = 13.33;

// Título de sección reutilizable (con línea decorativa)
function titulo(slide, texto) {
  slide.addText(texto, {
    x: 0.7, y: 0.4, w: W - 1.4, h: 0.8,
    fontFace: HEAD, fontSize: 32, bold: true, color: NAVY, align: 'left'
  });
  slide.addShape(pptx.ShapeType.rect, { x: 0.7, y: 1.15, w: 1.2, h: 0.05, fill: { color: AMBAR } });
}


function circuloNum(slide, n, x, y) {
  slide.addShape(pptx.ShapeType.ellipse, { x, y, w: 0.7, h: 0.7, fill: { color: NAVY } });
  slide.addText(String(n), { x, y, w: 0.7, h: 0.7, align: 'center', valign: 'middle',
    fontFace: HEAD, fontSize: 24, bold: true, color: BLANCO });
}

// ---------- Slide 1: Portada (navy) ----------
let s = pptx.addSlide();
s.background = { color: NAVY };
s.addText('Ventanilla Inclusiva', { x: 0.8, y: 2.2, w: 11.7, h: 1.2,
  fontFace: HEAD, fontSize: 50, bold: true, color: BLANCO });
s.addText('Autonomía digital para la ciudadanía', { x: 0.8, y: 3.5, w: 11.7, h: 0.8,
  fontFace: BODY, fontSize: 24, color: AMBAR, italic: true });
s.addText('Desafío 15  ·  Gobierno Regional de Cusco  ·  Hackatón Transformagob 2026',
  { x: 0.8, y: 6.4, w: 11.7, h: 0.5, fontFace: BODY, fontSize: 15, color: 'CADCFC' });

// ---------- Slide 2: El problema ----------
s = pptx.addSlide(); s.background = { color: BLANCO };
titulo(s, 'El problema');
s.addText('+4,988', { x: 0.7, y: 1.7, w: 4.2, h: 1.4,
  fontFace: HEAD, fontSize: 66, bold: true, color: NAVY });
s.addText('ciudadanos con discapacidad visual en la región Cusco',
  { x: 0.7, y: 3.05, w: 4.4, h: 1.0, fontFace: BODY, fontSize: 16, color: GRIS });
s.addText([
  { text: 'Ya usan lectores de pantalla (NVDA, JAWS, TalkBack).\n', options: { bold: true } },
  { text: 'Pero la Ventanilla Virtual del GORE los bloquea: no cumple accesibilidad y no pueden ni iniciar un trámite. Hoy dependen de terceros, perdiendo autonomía y privacidad.' }
], { x: 5.5, y: 1.7, w: 7.1, h: 2.2, fontFace: BODY, fontSize: 18, color: TEXTO, lineSpacingMultiple: 1.1 });
s.addShape(pptx.ShapeType.rect, { x: 5.5, y: 4.2, w: 0.08, h: 1.7, fill: { color: AMBAR } });
s.addText('"…hay partes que simplemente no puedo escuchar ni entender; por eso tengo que pedir ayuda a otra persona para hacer mis trámites."',
  { x: 5.8, y: 4.2, w: 6.8, h: 1.4, fontFace: BODY, fontSize: 16, italic: true, color: TEXTO });
s.addText('— Usuario con discapacidad visual, Cusco', { x: 5.8, y: 5.6, w: 6.8, h: 0.4,
  fontFace: BODY, fontSize: 13, color: GRIS });

// ---------- Slide 3: La solución ----------
s = pptx.addSlide(); s.background = { color: BLANCO };
titulo(s, 'La solución');
s.addText('Un asistente conversacional guiado y accesible (WCAG 2.2) que permite a una persona ciega presentar y consultar una solicitud de acceso a información pública de forma autónoma y privada, usando su propio lector de pantalla.',
  { x: 0.7, y: 1.7, w: 11.9, h: 1.8, fontFace: BODY, fontSize: 22, color: TEXTO, lineSpacingMultiple: 1.15 });
const chips = ['Autónomo', 'Privado', 'Offline', 'Open source'];
chips.forEach((c, i) => {
  const x = 0.7 + i * 3.05;
  s.addShape(pptx.ShapeType.roundRect, { x, y: 4.2, w: 2.8, h: 1.0, rectRadius: 0.12,
    fill: { color: NAVY } });
  s.addText(c, { x, y: 4.2, w: 2.8, h: 1.0, align: 'center', valign: 'middle',
    fontFace: HEAD, fontSize: 20, bold: true, color: BLANCO });
});

// ---------- Slide 4: Cómo funciona ----------
s = pptx.addSlide(); s.background = { color: BLANCO };
titulo(s, 'Cómo funciona el prototipo');
const pasos = [
  ['1', 'Trámite TUPA', 'Selección accesible del trámite (Copias, Transparencia, etc.)'],
  ['2', 'Tus datos (RENIEC)', 'Autocompletado automático al ingresar tu DNI.'],
  ['3', 'Documento y Carga', 'Asunto, folios y adjunto de sustento (PDF/JPG/PNG).'],
  ['4', 'Forma de entrega', 'Por correo electrónico o recojo presencial.'],
  ['5', 'Confirmación', 'Revisión final y generación de número de expediente.']
];
pasos.forEach((p, i) => {
  const y = 1.35 + i * 1.1;
  circuloNum(s, p[0], 0.7, y);
  s.addText(p[1], { x: 1.6, y: y - 0.05, w: 5.0, h: 0.4, fontFace: HEAD, fontSize: 18, bold: true, color: NAVY });
  s.addText(p[2], { x: 1.6, y: y + 0.35, w: 5.2, h: 0.4, fontFace: BODY, fontSize: 13, color: GRIS });
});
s.addShape(pptx.ShapeType.roundRect, { x: 7.4, y: 1.35, w: 5.2, h: 5.1, rectRadius: 0.12,
  fill: { color: 'F2F5FB' }, line: { color: NAVY, width: 1 } });
s.addText([
  { text: 'Además\n', options: { bold: true, fontSize: 18, color: NAVY } },
  { text: '🔐  Casillero Electrónico: bandeja ciudadana accesible con historial y notificaciones oficiales.\n\n', options: {} },
  { text: '🎙️  Comandos de voz en español (mejora manos libres)\n\n', options: {} },
  { text: '🗣️  Audio de apoyo en quechua por cada paso del asistente\n\n', options: {} },
  { text: '⚠️  Identificación de errores accesible (resumen y foco programado)', options: {} }
], { x: 7.7, y: 1.6, w: 4.6, h: 4.6, fontFace: BODY, fontSize: 13.5, color: TEXTO, lineSpacingMultiple: 1.0 });

// ---------- Slide 5: Interfaz del Prototipo ----------
s = pptx.addSlide(); s.background = { color: BLANCO };
titulo(s, 'Interfaz del Prototipo');

// Tarjeta 1 (Izquierda) - Screenshot 1
s.addShape(pptx.ShapeType.roundRect, { x: 0.7, y: 1.6, w: 5.6, h: 5.1, rectRadius: 0.12, fill: { color: 'F2F5FB' } });
s.addImage({ path: 'screenshot1.png', x: 1.0, y: 1.9, w: 5.0, h: 3.5 });
s.addText('Pantalla de inicio y Casillero Electrónico accesible.', {
  x: 0.7, y: 5.6, w: 5.6, h: 0.9,
  fontFace: BODY, fontSize: 14, color: TEXTO, align: 'center', bold: true
});

// Tarjeta 2 (Derecha) - Screenshot 2
s.addShape(pptx.ShapeType.roundRect, { x: 7.0, y: 1.6, w: 5.6, h: 5.1, rectRadius: 0.12, fill: { color: 'F2F5FB' } });
s.addImage({ path: 'screenshot2.png', x: 7.3, y: 1.9, w: 5.0, h: 3.5 });
s.addText('Asistente conversacional con soporte de voz y audio en quechua.', {
  x: 7.0, y: 5.6, w: 5.6, h: 0.9,
  fontFace: BODY, fontSize: 14, color: TEXTO, align: 'center', bold: true
});

// ---------- Slide 6: Valor público ----------
s = pptx.addSlide(); s.background = { color: BLANCO };
titulo(s, 'Valor público');
const valores = [
  ['Autonomía', 'Hacen trámites sin depender de nadie.'],
  ['Privacidad', 'Sus datos no salen del dispositivo.'],
  ['Inclusión', 'Pensado también para hablantes de quechua.'],
  ['Transparencia', 'Garantiza el derecho a la información pública.']
];
valores.forEach((v, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = 0.7 + col * 6.1, y = 1.8 + row * 2.3;
  s.addShape(pptx.ShapeType.roundRect, { x, y, w: 5.8, h: 2.0, rectRadius: 0.12,
    fill: { color: 'F2F5FB' } });
  s.addText(v[0], { x: x + 0.3, y: y + 0.25, w: 5.2, h: 0.6, fontFace: HEAD, fontSize: 22, bold: true, color: NAVY });
  s.addText(v[1], { x: x + 0.3, y: y + 0.95, w: 5.2, h: 0.9, fontFace: BODY, fontSize: 16, color: TEXTO });
});

// ---------- Slide 7: Apertura, reutilización y ética ----------
s = pptx.addSlide(); s.background = { color: BLANCO };
titulo(s, 'Apertura, reutilización y ética');
const etica = [
  ['Licencia Libre (MIT)', 'Código 100% abierto que el GORE Cusco puede adoptar, mejorar y desplegar legalmente (D.L. 1412, art. 29).'],
  ['Diseño Reutilizable', 'Componentes modulares de accesibilidad (stepper, forms) listos para integrarse a los sistemas actuales del GRC.'],
  ['Privacidad por Diseño', 'Datos 100% sintéticos. Sin IA en la nube, sin datos personales y operable de forma local (offline).'],
  ['Cumplimiento de Estándares', 'Alineado a las pautas WCAG 2.2, Ley N° 29973 (Discapacidad) y Ley N° 29733 (Datos Personales).']
];
etica.forEach((v, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = 0.7 + col * 6.1, y = 1.8 + row * 2.3;
  s.addShape(pptx.ShapeType.roundRect, { x, y, w: 5.8, h: 2.0, rectRadius: 0.12,
    fill: { color: 'F2F5FB' } });
  s.addText(v[0], { x: x + 0.3, y: y + 0.25, w: 5.2, h: 0.6, fontFace: HEAD, fontSize: 20, bold: true, color: NAVY });
  s.addText(v[1], { x: x + 0.3, y: y + 0.95, w: 5.2, h: 0.9, fontFace: BODY, fontSize: 14.5, color: TEXTO });
});

// ---------- Slide 7: Riesgos y mitigación ----------
s = pptx.addSlide(); s.background = { color: BLANCO };
titulo(s, 'Riesgos y mitigación');
const filas = [
  ['Riesgo', 'Mitigación'],
  ['Accesibilidad mal hecha', 'Probado con NVDA + auditoría WCAG'],
  ['Dependencia de software cerrado', 'Solo open source, sin IA en la nube'],
  ['Datos sensibles', 'Datos sintéticos; nada sale del dispositivo'],
  ['Voz en la nube (Chrome)', 'Opcional; Vosk offline para producción']
];
const rows = filas.map((f, i) => f.map((c) => ({
  text: c,
  options: {
    fontFace: BODY, fontSize: 16, bold: i === 0, color: i === 0 ? BLANCO : TEXTO,
    fill: { color: i === 0 ? NAVY : (i % 2 ? 'F2F5FB' : BLANCO) }, valign: 'middle'
  }
})));
s.addTable(rows, { x: 0.7, y: 1.8, w: 11.9, colW: [5.0, 6.9], rowH: 0.8,
  border: { type: 'solid', color: 'D5DBE8', pt: 1 } });

// ---------- Slide 8: Próximos pasos ----------
s = pptx.addSlide(); s.background = { color: BLANCO };
titulo(s, 'Próximos pasos');
s.addText([
  { text: 'Grabar el audio en quechua con hablante nativo (Qosqo-Qollaw) y validarlo en campo.\n\n' },
  { text: 'Reconocimiento de voz offline con Vosk (open source) para producción.\n\n' },
  { text: 'Canal por Telegram con mensajes de voz nativos.\n\n' },
  { text: 'Integración real con el sistema Qellqa y autenticación con DNI accesible.' }
], { x: 0.9, y: 1.9, w: 11.5, h: 4.5, fontFace: BODY, fontSize: 21, color: TEXTO,
  bullet: { code: '2022', indent: 22 }, lineSpacingMultiple: 1.1 });

// ---------- Slide 9: Cierre (navy) ----------
s = pptx.addSlide(); s.background = { color: NAVY };
s.addText('"Una ventanilla que funciona con las herramientas que la ciudadanía ya usa."',
  { x: 1.0, y: 2.3, w: 11.3, h: 1.8, fontFace: HEAD, fontSize: 32, bold: true, color: BLANCO, italic: true });
s.addText('Gracias.', { x: 1.0, y: 5.7, w: 6, h: 0.7, fontFace: HEAD, fontSize: 24, color: AMBAR });

await pptx.writeFile({ fileName: 'Ventanilla-Inclusiva.pptx' });
console.log('PPTX generado: Ventanilla-Inclusiva.pptx');
