// ---------------------------------------------------------------------------
// CATÁLOGO
//
// Recibe la lista de productos y dibuja una tarjeta por cada uno, en grilla.
// No sabe de dónde vienen los productos ni cómo es una tarjeta por dentro:
// solo se ocupa de recorrer la lista. Eso es lo que permite que después (paso 3)
// le pasemos la lista ya filtrada sin tener que cambiar nada acá.
// ---------------------------------------------------------------------------

import './Catalogo.css'
import TarjetaProducto from './TarjetaProducto.jsx'

function Catalogo({ productos }) {
  // Si la lista viene vacía, se devuelve un mensaje y se corta acá.
  // Un componente puede tener varios "return" según el caso.
  if (productos.length === 0) {
    return <p className="catalogo-vacio">No hay productos para mostrar.</p>
  }

  return (
    <section className="catalogo">
      {/* .map() recorre el array y devuelve uno nuevo, transformando cada
          elemento. Acá convierte cada producto (un objeto con datos) en una
          tarjeta (un componente). Es LA forma de dibujar listas en React.

          "key" es obligatoria en las listas: le da a React una forma de
          identificar cada elemento, para saber cuál cambió, cuál se agregó o
          cuál se quitó sin redibujar todo. Tiene que ser un valor único y
          estable, por eso usamos el id del producto. */}
      {productos.map((producto) => (
        <TarjetaProducto key={producto.id} producto={producto} />
      ))}
    </section>
  )
}

export default Catalogo
