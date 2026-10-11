// ---------------------------------------------------------------------------
// BARRA DE CATEGORÍAS
//
// La fila con los nombres de las categorías, dentro del bloque fijo de arriba.
// Muestra cuál se está mirando con una línea que se desliza de una a otra, y
// al tocar un nombre lleva la página hasta esa sección.
//
// No decide cuál es la activa ni mueve la página: eso lo hace App (con el hook
// useSeccionActiva). Esta barra solo dibuja y avisa.
//
// Recibe:
//   categorias -> array de objetos { nombre, id }
//   activa     -> el id de la categoría que se está mirando
//   alElegir   -> una FUNCIÓN que hay que llamar, con el id, al tocar un nombre
//   ref        -> una referencia que el padre quiere enganchar a la franja,
//                 para poder medirla (la usa el hook del scroll)
// ---------------------------------------------------------------------------

import { useEffect, useRef, useState } from 'react'
import './BarraCategorias.css'

function BarraCategorias({ categorias, activa, alElegir, ref }) {
  // Referencia al <nav>, para poder medir los botones y deslizar la fila.
  const filaRef = useRef(null)

  // Dónde va la línea que marca la categoría activa: a cuántos píxeles del
  // borde izquierdo empieza y cuánto mide de ancho. Es estado porque, cuando
  // cambia, hay que volver a dibujarla en su nuevo lugar.
  const [linea, setLinea] = useState({ izquierda: 0, ancho: 0 })

  // Este efecto se ejecuta cada vez que cambia la categoría activa (ver el
  // array [activa] al final). Hace falta un efecto porque para ubicar la línea
  // hay que MEDIR el botón, y solo se puede medir algo que ya está dibujado.
  useEffect(() => {
    function ubicarLinea() {
      const fila = filaRef.current
      // Busca, dentro de la fila, el botón marcado como actual.
      const boton = fila.querySelector('[aria-current="true"]')
      if (!boton) return

      // offsetLeft y offsetWidth son la posición y el ancho del botón, medidos
      // respecto de la fila.
      setLinea({ izquierda: boton.offsetLeft, ancho: boton.offsetWidth })

      // Si hay más categorías de las que entran en la pantalla, deslizamos la
      // fila para que la activa quede centrada y siempre a la vista.
      const centro = boton.offsetLeft + boton.offsetWidth / 2 - fila.clientWidth / 2
      const sinAnimaciones = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      fila.scrollTo({ left: centro, behavior: sinAnimaciones ? 'auto' : 'smooth' })
    }

    ubicarLinea()

    // Si cambia el ancho de la ventana, los botones se mueven: hay que volver a medir.
    window.addEventListener('resize', ubicarLinea)
    // La limpieza del efecto: sacar lo que enganchamos.
    return () => window.removeEventListener('resize', ubicarLinea)
  }, [activa])

  return (
    // La franja que queda fija debajo del encabezado. La "ref" que llega por
    // props se la pasamos a este <div>: así el padre obtiene el elemento real.
    <div className="categorias-franja" ref={ref}>
      {/* aria-label le pone nombre a esta zona para quienes usan lector de pantalla. */}
      <nav className="categorias" aria-label="Categorías" ref={filaRef}>
        {categorias.map((categoria) => {
          // ¿Este botón es el de la categoría que se está mirando? true o false.
          const estaActiva = categoria.id === activa

          return (
            <button
              key={categoria.id}
              type="button"
              className="categorias-boton"
              // aria-current indica "este es el actual". Lo lee un lector de
              // pantalla, y además lo usamos en el CSS para pintarlo de blanco
              // y arriba, en el efecto, para encontrar el botón a medir.
              aria-current={estaActiva ? 'true' : undefined}
              // onClick recibe una FUNCIÓN, que React ejecuta cuando se hace clic.
              // Por eso va con la flecha () => ... : si escribiéramos directamente
              // onClick={alElegir(categoria.id)} se ejecutaría al dibujar, no al tocar.
              onClick={() => alElegir(categoria.id)}
            >
              {categoria.nombre}
            </button>
          )
        })}

        {/* La línea que marca la categoría activa. Su posición y su ancho salen
          del estado y se aplican con "style", que en JSX recibe un objeto
          (por eso las dobles llaves: unas por "esto es JavaScript" y otras
          por el objeto). aria-hidden la esconde de los lectores de pantalla,
          porque es puramente visual. */}
        <span
          className="categorias-linea"
          aria-hidden="true"
          style={{ width: linea.ancho, transform: `translateX(${linea.izquierda}px)` }}
        />
      </nav>
    </div>
  )
}

export default BarraCategorias
