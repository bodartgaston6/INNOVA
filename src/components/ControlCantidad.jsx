// ---------------------------------------------------------------------------
// CONTROL DE CANTIDAD
//
// El grupo  [ − ]  2  [ + ]  para sumar o restar unidades de un producto.
// Se usa en dos lugares: en la tarjeta del producto (una vez agregado) y en
// cada renglón del carrito. Por eso es un componente aparte.
//
// No sabe nada del carrito: muestra el número que le pasan y avisa cuando
// tocan un botón. Eso lo hace reutilizable en cualquier lado.
//
// Recibe:
//   cantidad -> el número a mostrar
//   nombre   -> el nombre del producto (para los textos de accesibilidad)
//   alSumar  -> función a llamar al tocar +
//   alRestar -> función a llamar al tocar −
// ---------------------------------------------------------------------------

import './ControlCantidad.css'
import { IconoMas, IconoMenos } from './Iconos.jsx'

function ControlCantidad({ cantidad, nombre, alSumar, alRestar }) {
  return (
    // role="group" + aria-label le explican a un lector de pantalla que estos
    // tres elementos van juntos y de qué producto son.
    <div className="cantidad" role="group" aria-label={`Cantidad de ${nombre}`}>
      <button
        type="button"
        className="cantidad-boton"
        // Con una sola unidad, restar saca el producto: el texto lo aclara.
        aria-label={cantidad === 1 ? `Quitar ${nombre} del carrito` : 'Restar una unidad'}
        onClick={alRestar}
      >
        <IconoMenos />
      </button>

      {/* aria-live="polite" hace que un lector de pantalla anuncie el número
          nuevo cuando cambia, sin interrumpir lo que estaba diciendo. */}
      <span className="cantidad-numero" aria-live="polite">
        {cantidad}
      </span>

      <button
        type="button"
        className="cantidad-boton"
        aria-label="Sumar una unidad"
        onClick={alSumar}
      >
        <IconoMas />
      </button>
    </div>
  )
}

export default ControlCantidad
