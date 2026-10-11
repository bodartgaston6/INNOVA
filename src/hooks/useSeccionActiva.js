// ---------------------------------------------------------------------------
// useSeccionActiva: saber qué categoría se está mirando
//
// Un "hook" es una función de React cuyo nombre empieza con "use" y que le
// agrega una capacidad a un componente. useState es uno que ya trae React;
// este lo escribimos nosotros (se le dice "hook personalizado") para sacar de
// App toda la lógica del scroll y dejarla junta en un solo lugar.
//
// Hace dos cosas:
//   1. Mientras se baja por la página, se fija qué sección quedó arriba de
//      todo y la marca como activa.
//   2. Ofrece una función para saltar a una sección (cuando se toca una
//      categoría en la barra).
//
// Recibe:
//   ids      -> array con el id de cada sección, en el orden de la página
//   barraRef -> referencia a la barra de categorías, para saber hasta dónde
//               llega lo que queda fijo arriba de la pantalla
//
// Devuelve un array con dos cosas, igual que useState:
//   [ idDeLaSeccionActiva, funcionParaIrAUnaSeccion ]
// ---------------------------------------------------------------------------

import { useEffect, useRef, useState } from 'react'

export function useSeccionActiva(ids, barraRef) {
  // La sección activa. Arranca en la primera.
  const [activa, setActiva] = useState(ids[0])

  // useRef guarda un valor que sobrevive entre un dibujado y el siguiente,
  // igual que el estado, pero con una diferencia clave: cambiarlo NO vuelve a
  // dibujar el componente. Sirve para datos "internos" que la pantalla no
  // muestra. El valor se lee y se escribe en la propiedad .current.

  // true mientras la página se está moviendo sola porque tocaron una categoría.
  const saltando = useRef(false)
  // El temporizador que avisa cuándo terminó ese movimiento.
  const temporizador = useRef(null)

  // Se da por terminado el salto cuando pasan 150 ms sin que la página se
  // mueva. Cada vez que se llama, se cancela la espera anterior y se arranca
  // de nuevo (a esta técnica se le dice "debounce").
  function esperarFinDelSalto() {
    clearTimeout(temporizador.current)
    temporizador.current = setTimeout(() => {
      saltando.current = false
    }, 150)
  }

  // useEffect ejecuta código DESPUÉS de que React dibujó en pantalla. Es el
  // lugar para lo que "sale" de React: escuchar eventos del navegador, medir
  // elementos, usar temporizadores. Acá lo usamos para escuchar el scroll.
  useEffect(() => {
    // Evita calcular más de una vez por cuadro de pantalla (ver más abajo).
    let calculoPendiente = false

    // Recorre las secciones y decide cuál es la activa.
    function calcular() {
      calculoPendiente = false

      // getBoundingClientRect() da la posición de un elemento respecto de la
      // parte visible de la pantalla. El borde de abajo de la barra de
      // categorías es nuestra "línea de corte": por encima de ella todo está
      // tapado por lo que queda fijo. Le sumamos 8px de tolerancia.
      const limite = barraRef.current.getBoundingClientRect().bottom + 8

      // La activa es la ÚLTIMA sección cuyo borde de arriba ya pasó esa línea.
      let actual = ids[0]
      for (const id of ids) {
        const seccion = document.getElementById(id)
        if (seccion && seccion.getBoundingClientRect().top <= limite) {
          actual = id
        }
      }

      // Caso especial: si se llegó al final de la página, la activa es la
      // última, aunque sea tan corta que su título no llegue hasta arriba.
      const llegoAlFinal =
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (llegoAlFinal) {
        actual = ids[ids.length - 1]
      }

      // Si el valor es el mismo que ya estaba, React no vuelve a dibujar nada.
      setActiva(actual)
    }

    function alMoverLaPagina() {
      // Si la página se mueve porque tocaron una categoría, no recalculamos:
      // esa categoría ya quedó marcada y no queremos que la marca vaya
      // saltando por todas las secciones intermedias. Solo renovamos la espera.
      if (saltando.current) {
        esperarFinDelSalto()
        return
      }

      // El evento "scroll" se dispara muchísimas veces por segundo.
      // requestAnimationFrame le pide al navegador que ejecute calcular justo
      // antes del próximo cuadro; con la bandera nos aseguramos de pedirlo una
      // sola vez por cuadro. Así el scroll se mantiene fluido.
      if (!calculoPendiente) {
        calculoPendiente = true
        requestAnimationFrame(calcular)
      }
    }

    // { passive: true } le promete al navegador que no vamos a frenar el
    // scroll, y eso le permite moverlo sin esperar a nuestro código.
    window.addEventListener('scroll', alMoverLaPagina, { passive: true })
    // Si cambia el tamaño de la ventana (o se gira el celular), todo se reubica.
    window.addEventListener('resize', alMoverLaPagina)

    // Una primera vez al cargar, por si la página no arranca arriba de todo.
    calcular()

    // La función que devuelve un efecto es su "limpieza": React la ejecuta
    // cuando el componente desaparece. Hay que sacar todo lo que se enganchó,
    // para no dejar código escuchando eventos de algo que ya no existe.
    return () => {
      window.removeEventListener('scroll', alMoverLaPagina)
      window.removeEventListener('resize', alMoverLaPagina)
      clearTimeout(temporizador.current)
    }

    // El array del final son las "dependencias": el efecto se vuelve a ejecutar
    // solo si alguna de ellas cambia. Como ids y barraRef son siempre los
    // mismos, en la práctica corre una vez, al cargar la página.
  }, [ids, barraRef])

  // Lleva la página hasta una sección. La usa la barra de categorías.
  function irASeccion(id) {
    const seccion = document.getElementById(id)
    if (!seccion) return

    // Marcamos la categoría enseguida, sin esperar a que termine el movimiento.
    saltando.current = true
    setActiva(id)
    esperarFinDelSalto()

    // A dónde hay que llegar: la posición de la sección dentro de la página,
    // menos lo que ocupa lo que queda fijo arriba (encabezado + barra de
    // categorías). Si no se restara, el título quedaría tapado.
    const altoFijo = barraRef.current.getBoundingClientRect().bottom
    const destino = seccion.getBoundingClientRect().top + window.scrollY - altoFijo

    // Hay personas que configuran su dispositivo para reducir las animaciones
    // (les causan mareo). matchMedia permite consultarlo y respetarlo: en ese
    // caso se salta directo, sin el desplazamiento suave.
    const sinAnimaciones = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({ top: destino, behavior: sinAnimaciones ? 'auto' : 'smooth' })
  }

  return [activa, irASeccion]
}
