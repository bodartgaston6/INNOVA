// ---------------------------------------------------------------------------
// VISTA: PRODUCTOS
//
// La pantalla principal: la barra de categorías y, debajo, una sola lista con
// TODOS los productos, separados en una sección por categoría. La barra marca
// sola la categoría que se está mirando y permite saltar a cualquiera.
//
// Es lo que antes estaba en App. Se mudó acá porque ahora hay más pantallas,
// y cada una vive en su propio archivo dentro de src/vistas.
// ---------------------------------------------------------------------------

import { useRef } from 'react'

// Vite permite importar un .json directamente: "productos" ya llega convertido
// en un array de objetos de JavaScript, listo para usar.
import productos from '../data/productos.json'

import AvisoDemo from '../components/AvisoDemo.jsx'
import BarraCategorias from '../components/BarraCategorias.jsx'
import SeccionCategoria from '../components/SeccionCategoria.jsx'
import { useSeccionActiva } from '../hooks/useSeccionActiva.js'
import { aIdentificador } from '../utils/formato.js'

// --- Preparar los datos ----------------------------------------------------
// Todo esto se calcula acá afuera, y no dentro del componente, porque los
// productos no cambian mientras la página está abierta: alcanza con
// calcularlo una vez.

// Los nombres de las categorías salen SOLOS de los productos: no hay que
// mantener una lista a mano. Si agregás al JSON un producto con
// "categoria": "Mac", aparece la sección y su nombre en la barra.
//
//   productos.map((p) => p.categoria)  -> ['Celulares', 'Celulares', 'Fundas', ...]
//   new Set(...)                       -> saca los repetidos
//   [...]                              -> los tres puntos "desarman" el Set
//                                         dentro de un array nuevo
//
// El orden es el orden en que aparece cada categoría en el JSON.
const nombresDeCategorias = [...new Set(productos.map((p) => p.categoria))]

// Con esos nombres armamos los "grupos": un objeto por categoría, con todo lo
// que hace falta para dibujar su sección.
//   { nombre: 'Vidrios templados', id: 'vidrios-templados', productos: [...] }
const grupos = nombresDeCategorias.map((nombre) => ({
  nombre,
  // El id identifica la sección dentro de la página (es el id del HTML).
  id: aIdentificador(nombre),
  // .filter() devuelve un array nuevo solo con los que cumplen la condición.
  productos: productos.filter((p) => p.categoria === nombre),
}))

// Solo los ids, en orden: es lo que necesita el hook que sigue el scroll.
const idsDeSecciones = grupos.map((grupo) => grupo.id)

function VistaProductos() {
  // Una "ref" es una forma de agarrar un elemento real de la página desde el
  // código. La creamos vacía y se la pasamos a la barra de categorías, que la
  // engancha a su franja. La necesitamos para medir hasta dónde llega lo que
  // queda fijo arriba de la pantalla.
  const barraRef = useRef(null)

  // Nuestro hook (ver src/hooks/useSeccionActiva.js). Nos da:
  //   seccionActiva -> el id de la categoría que se está mirando
  //   irASeccion    -> la función para saltar a una categoría
  // Cada vez que seccionActiva cambia, React vuelve a dibujar este componente
  // y la barra recibe el valor nuevo.
  const [seccionActiva, irASeccion] = useSeccionActiva(idsDeSecciones, barraRef)

  // Un componente tiene que devolver UN solo elemento. Como acá hay dos (la
  // barra y el <main>), los envolvemos en <> </>, un "fragmento": agrupa sin
  // agregar ninguna etiqueta extra a la página.
  return (
    <>
      {/* A la barra le pasamos qué categorías dibujar, cuál está activa y la
          función para saltar a una. Los datos BAJAN por props; los avisos
          SUBEN llamando a una función que el padre le prestó al hijo. */}
      <BarraCategorias
        categorias={grupos}
        activa={seccionActiva}
        alElegir={irASeccion}
        ref={barraRef}
      />

      {/* En JSX se escribe className en lugar de class, porque "class" es una
          palabra reservada de JavaScript. */}
      <main className="contenido">
        {/* El cartel de "productos de ejemplo". Se dibuja solo si en config.js
            está demo: true; si no, no ocupa lugar. */}
        <AvisoDemo />

        {/* Una sección por cada grupo. .map() convierte cada grupo (datos) en
            un componente. "key" le permite a React identificar cada elemento
            de una lista; tiene que ser única y estable. */}
        {grupos.map((grupo) => (
          <SeccionCategoria
            key={grupo.id}
            id={grupo.id}
            nombre={grupo.nombre}
            productos={grupo.productos}
          />
        ))}
      </main>
    </>
  )
}

export default VistaProductos
