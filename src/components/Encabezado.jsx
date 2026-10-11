// ---------------------------------------------------------------------------
// ENCABEZADO
//
// La barra de arriba, que queda siempre a la vista: el botón del menú, el
// nombre del local y el botón del carrito. Es compacta a propósito: en el
// celular tiene que ocupar poco para dejarle la pantalla a los productos.
//
// No abre el menú ni el carrito por su cuenta: avisa a App, que es quien sabe
// si están abiertos o cerrados.
//
// Recibe:
//   nombre         -> el nombre del local
//   alAbrirMenu    -> función a llamar al tocar las tres líneas
//   alAbrirCarrito -> función a llamar al tocar el carrito
// ---------------------------------------------------------------------------

// Cada componente trae su propio CSS. Vite lo suma a la página cuando el
// componente se usa.
import './Encabezado.css'
import { IconoCarrito, IconoMenu } from './Iconos.jsx'
import { useCarrito } from '../carrito/CarritoContext.js'

// Las props llegan todas juntas en un objeto. Escribirlas entre llaves dentro
// de los paréntesis lo "desarma" (se llama desestructurar): es lo mismo que
// recibir (props) y después usar props.nombre, props.alAbrirMenu, etc.
function Encabezado({ nombre, alAbrirMenu, alAbrirCarrito }) {
  // Cuántas unidades hay en el carrito. No llega por props: se lee
  // directamente del contexto (ver src/carrito/CarritoContext.js).
  const { unidades } = useCarrito()

  // El texto que anuncia un lector de pantalla para el botón del carrito.
  let textoCarrito = 'Abrir el carrito, está vacío'
  if (unidades === 1) {
    textoCarrito = 'Abrir el carrito, tiene 1 producto'
  } else if (unidades > 1) {
    textoCarrito = `Abrir el carrito, tiene ${unidades} productos`
  }

  return (
    <header className="encabezado">
      <div className="encabezado-interior">
        <button
          type="button"
          className="boton-icono"
          aria-label="Abrir el menú"
          onClick={alAbrirMenu}
        >
          <IconoMenu />
        </button>

        {/* El nombre es un enlace a la pantalla de productos: tocarlo lleva al
            inicio, como en casi cualquier sitio. */}
        <h1 className="encabezado-nombre">
          <a href="#productos">{nombre}</a>
        </h1>

        <button
          type="button"
          className="boton-icono encabezado-carrito"
          aria-label={textoCarrito}
          onClick={alAbrirCarrito}
        >
          <IconoCarrito />
          {/* El numerito, solo si hay algo en el carrito. */}
          {unidades > 0 && <span className="encabezado-contador">{unidades}</span>}
        </button>
      </div>
    </header>
  )
}

export default Encabezado
