// ---------------------------------------------------------------------------
// TARJETA DE PRODUCTO
//
// Dibuja UN producto: foto, marca, nombre, descripción, precio y la acción
// (agregar al carrito o consultar).
// Se usa una vez por cada producto del catálogo. Por eso conviene que sea un
// componente: se escribe una sola vez y se reutiliza con datos distintos.
// ---------------------------------------------------------------------------

import './TarjetaProducto.css'
import ControlCantidad from './ControlCantidad.jsx'
import { sePuedePedir, useCarrito } from '../carrito/CarritoContext.js'
import { formatearPrecio } from '../utils/formato.js'
import { enlaceWhatsApp, mensajeDeConsulta } from '../utils/whatsapp.js'

function TarjetaProducto({ producto }) {
  // Antes del return se puede escribir JavaScript normal para preparar lo que
  // se va a mostrar. Así el JSX de abajo queda más fácil de leer.

  // El carrito, leído del contexto. La tarjeta no recibe nada por props para
  // esto: por eso ni Catalogo ni SeccionCategoria tuvieron que cambiar.
  const { cantidades, agregar, quitar } = useCarrito()

  // Cuántas unidades de ESTE producto hay en el carrito (0 si no está).
  const cantidad = cantidades[producto.id] ?? 0

  // ¿Está en oferta? Solo si tiene precio, precio anterior, y el anterior es mayor.
  // El resultado es true o false.
  const enOferta =
    producto.precio !== null &&
    producto.precioAnterior !== null &&
    producto.precioAnterior > producto.precio

  // La etiqueta que va sobre la foto. "Sin stock" tiene prioridad sobre "Oferta".
  // Si no corresponde ninguna queda en null, y más abajo no se dibuja nada.
  let etiqueta = null
  if (!producto.stock) {
    etiqueta = 'Sin stock'
  } else if (enOferta) {
    etiqueta = 'Oferta'
  }

  // Armamos las clases de CSS. Arrancamos con la clase base y le vamos sumando
  // las que correspondan según el caso.
  // condición ? valorSiTrue : valorSiFalse  es el "operador ternario": un if
  // corto que devuelve un valor.
  const clasesTarjeta = producto.stock ? 'tarjeta' : 'tarjeta tarjeta-sin-stock'

  // Qué acción se ofrece abajo. Hay tres casos, así que lo resolvemos acá con
  // if / else y guardamos el JSX en una variable (el JSX es un valor más: se
  // puede guardar, pasar y devolver como cualquier otro).
  let accion
  if (!sePuedePedir(producto)) {
    // 1. Sin stock o sin precio: no va al carrito, se consulta por WhatsApp.
    accion = (
      <a
        className="boton boton-tenue"
        href={enlaceWhatsApp(mensajeDeConsulta(producto))}
        target="_blank"
        rel="noopener"
      >
        Consultar
      </a>
    )
  } else if (cantidad === 0) {
    // 2. Se puede pedir y todavía no está en el carrito.
    accion = (
      <button
        type="button"
        className="boton boton-secundario"
        onClick={() => agregar(producto.id)}
      >
        Agregar
      </button>
    )
  } else {
    // 3. Ya está en el carrito: el botón se convierte en el control de
    // cantidad. Es la confirmación de que se agregó, y permite sumar más
    // sin tener que abrir el carrito.
    accion = (
      <ControlCantidad
        cantidad={cantidad}
        nombre={producto.nombre}
        alSumar={() => agregar(producto.id)}
        alRestar={() => quitar(producto.id)}
      />
    )
  }

  return (
    <article className={clasesTarjeta}>
      <div className="tarjeta-foto">
        {/* Si el producto tiene imagen se muestra la foto; si no, la inicial de
            la categoría como relleno. Dentro del JSX no se puede escribir
            if/else, así que se usa el ternario. */}
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre} // texto alternativo: lo leen los lectores de pantalla y se ve si la foto no carga
            loading="lazy" // el navegador baja la foto recién cuando está por verse: la página carga más rápido
          />
        ) : (
          // aria-hidden: la inicial es solo un adorno, un lector de pantalla la saltea.
          <span className="tarjeta-inicial" aria-hidden="true">
            {producto.categoria.charAt(0)}
          </span>
        )}

        {/* condición && <algo />  significa "si la condición se cumple, dibujá
            esto". Si etiqueta es null, React no dibuja nada. */}
        {etiqueta && <span className="tarjeta-etiqueta">{etiqueta}</span>}
      </div>

      <div className="tarjeta-cuerpo">
        <p className="tarjeta-marca">{producto.marca}</p>
        <h3 className="tarjeta-nombre">{producto.nombre}</h3>
        <p className="tarjeta-descripcion">{producto.descripcion}</p>

        <p className="tarjeta-precios">
          {/* El precio anterior tachado, solo cuando hay oferta. <s> es la
              etiqueta de HTML para texto tachado. */}
          {enOferta && (
            <s className="tarjeta-precio-anterior">
              {formatearPrecio(producto.precioAnterior)}
            </s>
          )}

          {/* Un producto puede no tener precio cargado (precio: null en el JSON).
              Pensado para los celulares, cuyo precio cambia seguido: en ese caso
              se muestra "Consultar precio" en lugar de un número viejo. */}
          {producto.precio !== null ? (
            <strong className="tarjeta-precio">{formatearPrecio(producto.precio)}</strong>
          ) : (
            <span className="tarjeta-consultar">Consultar precio</span>
          )}
        </p>

        {/* La variable que armamos arriba, con la acción que corresponde. */}
        <div className="tarjeta-accion">{accion}</div>
      </div>
    </article>
  )
}

export default TarjetaProducto
