// ---------------------------------------------------------------------------
// PROVEEDOR DEL CARRITO
//
// Es el dueño del carrito: guarda qué productos hay y cuántos de cada uno,
// ofrece las funciones para modificarlo y lo publica por el contexto para que
// lo use toda la aplicación. También lo guarda en el navegador, así no se
// pierde si se recarga la página o se la cierra y se vuelve más tarde.
//
// Se usa una sola vez, envolviendo a toda la app (ver main.jsx).
// ---------------------------------------------------------------------------

import { useEffect, useState } from 'react'
import { CarritoContext, sePuedePedir } from './CarritoContext.js'
import productos from '../data/productos.json'

// El nombre con el que se guarda el carrito en el navegador.
const CLAVE_GUARDADO = 'carrito'

// Lee el carrito guardado de una visita anterior.
function leerCarritoGuardado() {
  // localStorage es un espacio que el navegador le da a cada sitio para
  // guardar textos. Puede fallar (por ejemplo en modo incógnito de algunos
  // navegadores) o tener un dato dañado, por eso todo va dentro de try/catch:
  // si algo sale mal, se arranca con el carrito vacío y la página sigue andando.
  try {
    // Solo guarda texto, así que el objeto se guardó convertido con
    // JSON.stringify y acá se reconstruye con JSON.parse.
    const guardado = JSON.parse(localStorage.getItem(CLAVE_GUARDADO) ?? '{}')

    // Entre una visita y otra el catálogo pudo cambiar. Nos quedamos solo con
    // lo que sigue existiendo y se puede pedir: si un producto se dio de baja
    // o quedó sin stock, no vuelve a aparecer en el carrito.
    const vigente = {}
    for (const producto of productos) {
      const cantidad = guardado[producto.id]
      if (sePuedePedir(producto) && Number.isInteger(cantidad) && cantidad > 0) {
        vigente[producto.id] = cantidad
      }
    }
    return vigente
  } catch {
    return {}
  }
}

// "children" es una prop especial: es lo que se escribe ENTRE la etiqueta de
// apertura y la de cierre del componente. Acá va a ser toda la app:
//     <CarritoProvider> <App /> </CarritoProvider>
export function CarritoProvider({ children }) {
  // El carrito es un objeto que relaciona el id de un producto con su cantidad:
  //     { 'acc-001': 2, 'acc-004': 1 }
  // No se guardan los productos enteros, solo el id: nombre y precio se buscan
  // en el catálogo al momento de mostrar. Así, si cambia un precio, el carrito
  // muestra siempre el actual.
  //
  // A useState se le puede pasar una FUNCIÓN en lugar de un valor: React la
  // ejecuta una sola vez, al arrancar, para obtener el valor inicial.
  const [cantidades, setCantidades] = useState(leerCarritoGuardado)

  // Cada vez que el carrito cambia, se guarda. El array [cantidades] hace que
  // este efecto se ejecute solo cuando cambia ese valor.
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(cantidades))
    } catch {
      // No se pudo guardar: el carrito igual funciona durante esta visita.
    }
  }, [cantidades])

  // --- Funciones para modificar el carrito ---------------------------------
  //
  // REGLA DE REACT: el estado nunca se modifica directamente. No se escribe
  // cantidades[id] = 2; se crea un objeto NUEVO con el cambio hecho y se lo
  // pasa a setCantidades. React compara el objeto viejo con el nuevo para
  // saber que tiene que volver a dibujar.
  //
  // A setCantidades se le pasa una función que recibe el valor anterior y
  // devuelve el nuevo. Es la forma segura cuando el nuevo depende del anterior.

  // Suma una unidad (o agrega el producto, si no estaba).
  function agregar(id) {
    setCantidades((anterior) => ({
      ...anterior, // copia todo lo que ya había
      // Los corchetes usan el VALOR de la variable id como nombre de la
      // propiedad. ?? 0 significa "si todavía no existe, tomalo como 0".
      [id]: (anterior[id] ?? 0) + 1,
    }))
  }

  // Resta una unidad. Si llega a cero, el producto sale del carrito.
  function quitar(id) {
    setCantidades((anterior) => {
      const copia = { ...anterior }
      const nuevaCantidad = (copia[id] ?? 0) - 1

      if (nuevaCantidad > 0) {
        copia[id] = nuevaCantidad
      } else {
        delete copia[id] // se puede: es una copia nuestra, no el estado original
      }
      return copia
    })
  }

  function vaciar() {
    setCantidades({})
  }

  // --- Datos calculados ----------------------------------------------------
  // No se guardan en el estado: se calculan a partir de "cantidades" cada vez
  // que el componente se dibuja. Guardarlos aparte obligaría a mantenerlos
  // sincronizados a mano, que es una fuente clásica de errores.

  // La lista para mostrar: cada renglón con el producto completo, su cantidad
  // y su subtotal. Object.entries convierte { 'acc-001': 2 } en [['acc-001', 2]].
  const items = Object.entries(cantidades).map(([id, cantidad]) => {
    // .find() devuelve el primer elemento que cumple la condición.
    const producto = productos.find((p) => p.id === id)
    return { producto, cantidad, subtotal: producto.precio * cantidad }
  })

  // .reduce() recorre un array acumulando un resultado. Arranca en 0 y le va
  // sumando lo de cada renglón.
  const total = items.reduce((suma, item) => suma + item.subtotal, 0)
  const unidades = items.reduce((suma, item) => suma + item.cantidad, 0)

  // Todo lo que se publica por el contexto. Cualquier componente lo obtiene
  // con useCarrito().
  const valor = { cantidades, items, total, unidades, agregar, quitar, vaciar }

  // El componente del contexto publica "valor" para todo lo que tenga adentro.
  return <CarritoContext value={valor}>{children}</CarritoContext>
}
