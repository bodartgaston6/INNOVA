// ---------------------------------------------------------------------------
// WHATSAPP
//
// Funciones para armar los enlaces y los mensajes que se mandan al local.
// No hace falta ningún servicio ni permiso: WhatsApp ofrece una dirección
// (wa.me) que abre un chat con un número y con el mensaje ya escrito. La
// persona solo tiene que tocar "Enviar".
// ---------------------------------------------------------------------------

import { config } from '../config.js'
import { formatearPrecio } from './formato.js'

// Arma el enlace que abre el chat del local con un mensaje ya escrito.
// Si no se le pasa mensaje, abre el chat vacío.
export function enlaceWhatsApp(mensaje = '') {
  const chat = `https://wa.me/${config.whatsapp}`

  // Sin mensaje, alcanza con la dirección del chat.
  if (mensaje === '') {
    return chat
  }

  // encodeURIComponent convierte el texto para que pueda viajar dentro de una
  // dirección web: los espacios, saltos de línea, tildes y signos se
  // reemplazan por códigos (un espacio pasa a ser %20, por ejemplo).
  return `${chat}?text=${encodeURIComponent(mensaje)}`
}

// El mensaje del pedido, a partir de los renglones del carrito.
//
//   Hola! Quiero hacer un pedido:
//   • 2 x Funda silicona Galaxy A16 ($ 17.000)
//   • 1 x Cargador 25 W USB-C ($ 24.999)
//   Total: $ 41.999
export function mensajeDePedido(items, total) {
  const renglones = items.map(
    (item) => `• ${item.cantidad} x ${item.producto.nombre} (${formatearPrecio(item.subtotal)})`,
  )

  // Se juntan todas las líneas en un solo texto. '\n' es un salto de línea.
  return ['Hola! Quiero hacer un pedido:', ...renglones, `Total: ${formatearPrecio(total)}`].join(
    '\n',
  )
}

// El mensaje para consultar por un producto que no se puede pedir desde la
// página (sin stock o sin precio publicado).
export function mensajeDeConsulta(producto) {
  return `Hola! Quería consultar por: ${producto.nombre}`
}
