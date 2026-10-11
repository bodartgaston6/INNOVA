// ---------------------------------------------------------------------------
// CONFIGURACIÓN DEL LOCAL
//
// Todo lo que cambia de un cliente a otro vive en este archivo. La idea es que
// para armar la página de otro comercio solo haya que tocar esto, el archivo
// de productos y las fotos, sin modificar ningún componente.
//
// "export" hace que otros archivos puedan importar este objeto:
//     import { config } from './config.js'
// ---------------------------------------------------------------------------

export const config = {
  nombre: 'INNOVA APPLESTORE',
  slogan: 'Especialistas en Tecnología',

  // MODO DEMO. Con true se muestra, arriba de los productos, el aviso
  // "los productos y los precios son de ejemplo". Cuando cargues los productos
  // reales, cambialo a false y el aviso desaparece.
  demo: false,

  // Colores del local. main.jsx los copia a variables de CSS (--color-fondo, etc.)
  // y el resto de los tonos (grises, líneas) se calculan a partir de estos tres
  // en index.css. Cambiando estos tres valores cambia toda la página.
  colores: {
    fondo: '#000000', // negro: el fondo de toda la página
    texto: '#ffffff', // blanco: textos, placas de las fotos y la categoría activa
    acento: '#0b1b3f', // azul oscuro: etiquetas, líneas y placas de productos sin foto
  },

  // El número al que llegan los pedidos y las consultas. Formato internacional
  // sin "+", sin 0 y sin 15: 549 + código de área + número.
  whatsapp: '5493574412783',

  // --- Pantalla "Horarios y ubicación" ---

  // La dirección que se muestra. También se usa para buscar en Google Maps si
  // mapaEnlace está vacío.
  direccion: 'San Martín 976, Río Primero, Córdoba, Argentina',

  // El enlace exacto del local en Google Maps (Compartir > Copiar vínculo).
  // Es a donde lleva el botón "Abrir en Google Maps".
  mapaEnlace: 'https://maps.app.goo.gl/YNwTib65YwBCCTfy9',

  // Un renglón por horario. Lo que va antes de los dos puntos se muestra a la
  // izquierda (los días) y lo que va después, a la derecha (las horas).
  horarios: ['Lunes a Sábados: 9 a 13 y 17:30 a 21:30'],

  // Usuario de Instagram sin @, o vacío ('') para no mostrar el botón.
  instagram: 'innova.applestore',
}
