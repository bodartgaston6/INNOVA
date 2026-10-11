// ---------------------------------------------------------------------------
// PUNTO DE ENTRADA
//
// Es el primer archivo que se ejecuta (lo carga index.html). Hace dos cosas:
//   1. Pasa los colores del local a variables de CSS.
//   2. Le dice a React que dibuje la aplicación dentro del <div id="root">.
// ---------------------------------------------------------------------------

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Importar un CSS desde JavaScript es algo que resuelve Vite: toma el archivo
// y lo agrega a la página. index.css tiene los estilos generales.
import './index.css'

import App from './App.jsx'
import { CarritoProvider } from './carrito/CarritoProvider.jsx'
import { config } from './config.js'

// 1. Colores ----------------------------------------------------------------
// document.documentElement es la etiqueta <html>. setProperty le define una
// variable de CSS; después cualquier estilo puede usarla con var(--color-fondo).
// Así los colores del local se cambian en config.js y no hay que tocar ningún CSS.
//
// El "if" de cada línea cubre el caso de que en config.js falte alguno de los
// tres: si no está, no se toca nada y queda el color de respaldo de index.css.
const raiz = document.documentElement
const { fondo, texto, acento } = config.colores
if (fondo) raiz.style.setProperty('--color-fondo', fondo)
if (texto) raiz.style.setProperty('--color-texto', texto)
if (acento) raiz.style.setProperty('--color-acento', acento)

// 2. Dibujar la aplicación --------------------------------------------------
// createRoot "engancha" React al <div id="root"> de index.html, y render() le
// indica qué dibujar ahí adentro: nuestro componente <App />.
//
// <StrictMode> no dibuja nada. Solo activa chequeos extra mientras desarrollás
// (por ejemplo, ejecuta algunas cosas dos veces para detectar errores). En la
// versión publicada no tiene ningún efecto.
//
// <CarritoProvider> envuelve a toda la app: es quien guarda el carrito y lo
// pone a disposición de cualquier componente que esté adentro (ver
// src/carrito/CarritoProvider.jsx).
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </StrictMode>,
)
