// ---------------------------------------------------------------------------
// CARRITO
//
// El panel que se abre con el ícono del carrito. Lista lo que se agregó,
// permite cambiar las cantidades, muestra el total y arma el pedido para
// mandarlo por WhatsApp.
//
// La página no cobra ni registra nada: el pedido es un mensaje que le llega
// al local, que confirma precio y stock por el chat.
//
// Recibe:
//   abierto  -> true o false
//   alCerrar -> función para cerrarlo
// ---------------------------------------------------------------------------

import './Carrito.css'
import Panel from './Panel.jsx'
import ControlCantidad from './ControlCantidad.jsx'
import { useCarrito } from '../carrito/CarritoContext.js'
import { formatearPrecio } from '../utils/formato.js'
import { enlaceWhatsApp, mensajeDePedido } from '../utils/whatsapp.js'

function Carrito({ abierto, alCerrar }) {
  // Todo lo del carrito sale del contexto.
  const { items, total, agregar, quitar, vaciar } = useCarrito()

  const estaVacio = items.length === 0

  return (
    <Panel abierto={abierto} alCerrar={alCerrar} lado="derecha" titulo="Tu carrito">
      {/* Dos contenidos posibles según haya algo o no. */}
      {estaVacio ? (
        <div className="carrito-vacio">
          <p>Tu carrito está vacío.</p>
          <p className="carrito-ayuda">Tocá "Agregar" en un producto para sumarlo al pedido.</p>
          {/* Un enlace a la pantalla de productos que, además, cierra el panel.
              Así funciona igual aunque el carrito se haya abierto desde
              Contacto o desde Horarios. */}
          <a className="boton boton-secundario" href="#productos" onClick={alCerrar}>
            Ver productos
          </a>
        </div>
      ) : (
        <>
          {/* La lista de productos. <ul> y <li> son las etiquetas de HTML para
              una lista: un lector de pantalla anuncia cuántos elementos tiene. */}
          <ul className="carrito-lista">
            {items.map((item) => (
              <li key={item.producto.id} className="carrito-item">
                <div className="carrito-item-datos">
                  <p className="carrito-item-nombre">{item.producto.nombre}</p>
                  <p className="carrito-item-precio">
                    {formatearPrecio(item.producto.precio)} c/u
                  </p>
                </div>

                <div className="carrito-item-acciones">
                  {/* A cada control le pasamos funciones que ya "saben" de qué
                      producto se trata: () => agregar(id). */}
                  <ControlCantidad
                    cantidad={item.cantidad}
                    nombre={item.producto.nombre}
                    alSumar={() => agregar(item.producto.id)}
                    alRestar={() => quitar(item.producto.id)}
                  />
                  <p className="carrito-item-subtotal">{formatearPrecio(item.subtotal)}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* El pie con el total y las acciones. Queda fijo abajo del panel
              aunque la lista sea larga (ver el CSS). */}
          <div className="carrito-pie">
            <p className="carrito-total">
              <span>Total</span>
              <strong>{formatearPrecio(total)}</strong>
            </p>

            {/* Es un enlace, no un botón: lleva a WhatsApp con el mensaje ya
                escrito. target="_blank" lo abre en otra pestaña (o en la app
                en el celular) y rel="noopener" es una medida de seguridad que
                se pone siempre junto con target="_blank". */}
            <a
              className="boton boton-principal"
              href={enlaceWhatsApp(mensajeDePedido(items, total))}
              target="_blank"
              rel="noopener"
            >
              Enviar pedido por WhatsApp
            </a>

            <button type="button" className="boton boton-texto" onClick={vaciar}>
              Vaciar el carrito
            </button>

            <p className="carrito-ayuda">
              El pedido se confirma por WhatsApp. Precios y stock sujetos a confirmación.
            </p>
          </div>
        </>
      )}
    </Panel>
  )
}

export default Carrito
