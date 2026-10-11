// ---------------------------------------------------------------------------
// MENÚ
//
// El panel que se abre con las tres líneas. Tiene los enlaces a las tres
// pantallas de la página.
//
// Recibe:
//   abierto     -> true o false
//   alCerrar    -> función para cerrarlo
//   vistaActual -> el nombre de la pantalla que se está viendo, para marcarla
// ---------------------------------------------------------------------------

import './Menu.css'
import Panel from './Panel.jsx'
import { config } from '../config.js'

// Las pantallas del menú, como datos. Para agregar una opción alcanza con
// sumar un renglón acá (y crear su vista). "vista" es lo que va después del #
// en la dirección; tiene que coincidir con los nombres de useVista.js.
const ENLACES = [
  { vista: 'productos', texto: 'Productos' },
  { vista: 'contacto', texto: 'Contacto' },
  { vista: 'local', texto: 'Horarios y ubicación' },
]

function Menu({ abierto, alCerrar, vistaActual }) {
  return (
    // Todo lo que va entre <Panel> y </Panel> le llega a Panel como "children".
    <Panel abierto={abierto} alCerrar={alCerrar} lado="izquierda" titulo="Menú">
      <nav className="menu" aria-label="Secciones del sitio">
        {ENLACES.map((enlace) => (
          // Son enlaces comunes (<a>), no botones: al tocarlos el navegador
          // cambia el # de la dirección, y useVista detecta ese cambio y
          // muestra la pantalla. No hace falta ningún código para "navegar".
          <a
            key={enlace.vista}
            href={`#${enlace.vista}`}
            className="menu-enlace"
            // aria-current="page" marca "estás acá". Lo anuncia un lector de
            // pantalla y lo usamos en el CSS para resaltarlo.
            aria-current={enlace.vista === vistaActual ? 'page' : undefined}
            // Además de navegar, al tocar hay que cerrar el menú.
            onClick={alCerrar}
          >
            {enlace.texto}
          </a>
        ))}
      </nav>

      <p className="menu-pie">
        {config.nombre}
        <br />
        {config.slogan}
      </p>
    </Panel>
  )
}

export default Menu
