// ---------------------------------------------------------------------------
// CONTEXTO DEL CARRITO
//
// El problema: el carrito lo necesitan componentes que están lejos entre sí.
// La tarjeta de un producto (para agregar), el encabezado (para mostrar
// cuántos hay) y el panel del carrito (para listarlos). Pasarlo por props
// obligaría a hacerlo viajar por componentes intermedios que no lo usan
// (Vista -> Sección -> Catálogo -> Tarjeta).
//
// Un CONTEXTO resuelve eso: es un canal por el que un componente de arriba
// publica un valor, y cualquier componente de abajo, esté a la profundidad que
// esté, lo puede leer directamente.
//
// Son dos partes:
//   - Este archivo crea el canal y la función para leerlo.
//   - CarritoProvider.jsx es quien publica el valor (el carrito en sí).
// ---------------------------------------------------------------------------

import { createContext, useContext } from 'react'

// Crea el canal. null es el valor que se leería si nadie publicó nada.
export const CarritoContext = createContext(null)

// ¿Este producto se puede pedir? Solo si hay stock y tiene precio cargado.
// Los demás no van al carrito: se consultan por WhatsApp.
// Está acá porque la usan tanto el proveedor como la tarjeta del producto.
export function sePuedePedir(producto) {
  return producto.stock && producto.precio !== null
}

// Un hook propio para leer el carrito desde cualquier componente:
//     const { agregar, total } = useCarrito()
// Es un atajo de useContext(CarritoContext) que además avisa con un error
// claro si alguien lo usa fuera del proveedor.
export function useCarrito() {
  const carrito = useContext(CarritoContext)

  if (carrito === null) {
    throw new Error('useCarrito se tiene que usar dentro de <CarritoProvider>')
  }

  return carrito
}
