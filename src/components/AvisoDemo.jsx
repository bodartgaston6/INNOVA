// ---------------------------------------------------------------------------
// AVISO DE DEMO
//
// Un cartel que avisa que los productos y los precios son de ejemplo. Sirve
// mientras la página se muestra como demostración, antes de cargar el
// catálogo real: evita que alguien tome los precios como verdaderos.
//
// Se prende y se apaga desde config.js, con "demo: true" o "demo: false".
// ---------------------------------------------------------------------------

import './AvisoDemo.css'
import { config } from '../config.js'

function AvisoDemo() {
  // Si el modo demo está apagado, el componente no dibuja nada. Un componente
  // puede devolver null, que para React significa "acá no va nada".
  if (!config.demo) {
    return null
  }

  return (
    // role="note" le indica a un lector de pantalla que es una aclaración.
    <p className="aviso-demo" role="note">
      <strong>Demo.</strong> Los productos y los precios son de ejemplo.
    </p>
  )
}

export default AvisoDemo
