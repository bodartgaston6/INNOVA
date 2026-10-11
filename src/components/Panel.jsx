// ---------------------------------------------------------------------------
// PANEL
//
// Una hoja que entra desde un costado de la pantalla y se pone por encima de
// todo. La usan el menú (entra por la izquierda) y el carrito (por la derecha).
// Como el comportamiento es el mismo, se escribe una sola vez acá y cada uno
// le pone su contenido adentro.
//
// Está hecho con <dialog>, una etiqueta de HTML pensada para esto. Abierta
// con showModal(), el navegador resuelve solo varias cosas difíciles de hacer
// bien a mano:
//   - oscurece el resto de la página y no deja interactuar con lo de atrás,
//   - se cierra con la tecla Escape,
//   - mantiene el foco del teclado dentro del panel,
//   - avisa a los lectores de pantalla que se abrió una ventana.
//
// Recibe:
//   abierto  -> true o false
//   alCerrar -> función para avisar que hay que cerrarlo
//   lado     -> 'izquierda' o 'derecha'
//   titulo   -> el título que se muestra arriba
//   children -> el contenido (lo que se escribe entre <Panel> y </Panel>)
// ---------------------------------------------------------------------------

import { useEffect, useId, useRef } from 'react'
import './Panel.css'
import { IconoCerrar } from './Iconos.jsx'

function Panel({ abierto, alCerrar, lado, titulo, children }) {
  // Referencia al <dialog> real, para poder llamar a sus funciones.
  const dialogoRef = useRef(null)

  // useId genera un identificador único. Lo usamos para unir el panel con su
  // título (aria-labelledby), sin riesgo de que dos paneles repitan el id.
  const idTitulo = useId()

  // Un <dialog> no se abre cambiando una prop: hay que llamar a sus funciones
  // showModal() y close(). Este efecto "traduce" la prop abierto a esas
  // llamadas cada vez que cambia.
  useEffect(() => {
    const dialogo = dialogoRef.current

    // dialogo.open dice si ya está abierto; se consulta para no abrirlo dos veces.
    if (abierto && !dialogo.open) {
      dialogo.showModal()
    } else if (!abierto && dialogo.open) {
      dialogo.close()
    }
  }, [abierto])

  // Cerrar al tocar afuera, en la parte oscurecida. Ese fondo oscuro pertenece
  // al propio <dialog>, así que el clic llega a él. Si el clic fue ADENTRO del
  // panel, event.target es el elemento tocado (un botón, un texto) y no el
  // dialog: en ese caso no hay que cerrar.
  function alHacerClic(evento) {
    if (evento.target === evento.currentTarget) {
      alCerrar()
    }
  }

  return (
    <dialog
      ref={dialogoRef}
      // Las comillas invertidas arman el texto con la variable adentro:
      // lado = 'derecha'  ->  className = "panel panel-derecha"
      className={`panel panel-${lado}`}
      aria-labelledby={idTitulo}
      // onClose se dispara cuando el dialog se cierra por CUALQUIER motivo,
      // incluida la tecla Escape. Avisamos al padre para que su estado
      // (abierto) no quede desfasado de la realidad.
      onClose={alCerrar}
      onClick={alHacerClic}
    >
      <div className="panel-interior">
        <header className="panel-cabecera">
          <h2 id={idTitulo} className="panel-titulo">
            {titulo}
          </h2>
          {/* Un botón que solo tiene un ícono necesita aria-label: es el texto
              que anuncia un lector de pantalla. */}
          <button type="button" className="boton-icono" aria-label="Cerrar" onClick={alCerrar}>
            <IconoCerrar />
          </button>
        </header>

        <div className="panel-cuerpo">{children}</div>
      </div>
    </dialog>
  )
}

export default Panel
