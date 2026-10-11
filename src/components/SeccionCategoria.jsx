// ---------------------------------------------------------------------------
// SECCIÓN DE UNA CATEGORÍA
//
// Un bloque de la página: el título de la categoría, cuántos productos tiene
// y, debajo, la grilla con esos productos. La página es una sección de estas
// atrás de la otra.
//
// Recibe:
//   id        -> identificador de la sección (ej.: "vidrios-templados")
//   nombre    -> el título a mostrar (ej.: "Vidrios templados")
//   productos -> los productos de esa categoría
// ---------------------------------------------------------------------------

import './SeccionCategoria.css'
import Catalogo from './Catalogo.jsx'

function SeccionCategoria({ id, nombre, productos }) {
  const cantidad = productos.length

  // El id del título, armado a partir del id de la sección. Las comillas
  // invertidas ` ` permiten meter variables dentro de un texto con ${ }.
  const idTitulo = `${id}-titulo`

  return (
    // El id en el <section> es lo que le permite al hook encontrar esta
    // sección (con document.getElementById) para saber dónde está y para
    // saltar hasta ella.
    // aria-labelledby le dice a un lector de pantalla que el nombre de esta
    // sección es el texto del título.
    <section id={id} className="seccion" aria-labelledby={idTitulo}>
      <header className="seccion-cabecera">
        <h2 id={idTitulo} className="seccion-titulo">
          {nombre}
        </h2>

        {/* Singular o plural según la cantidad, con el operador ternario. */}
        <p className="seccion-cantidad">
          {cantidad} {cantidad === 1 ? 'producto' : 'productos'}
        </p>
      </header>

      {/* El catálogo es el mismo componente de siempre: dibuja la lista que
          recibe. Ahora se usa una vez por sección, cada vez con sus productos. */}
      <Catalogo productos={productos} />
    </section>
  )
}

export default SeccionCategoria
