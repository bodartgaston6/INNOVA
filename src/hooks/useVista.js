// ---------------------------------------------------------------------------
// useVista: saber qué pantalla hay que mostrar
//
// La página tiene tres pantallas ("vistas"): productos, contacto y local.
// Sigue siendo UNA sola página: lo que cambia es qué componente dibuja React.
//
// Para decidir cuál mostrar se usa el "hash" de la dirección, que es la parte
// que va después del #:
//     midominio.com/            -> productos
//     midominio.com/#contacto   -> contacto
//     midominio.com/#local      -> horarios y ubicación
//
// ¿Por qué el hash y no un simple estado? Porque cambiar el hash:
//   - no recarga la página,
//   - queda en el historial, así el botón "Atrás" del celular vuelve a la
//     pantalla anterior en vez de salir del sitio,
//   - permite compartir el enlace directo a una pantalla.
// Es un "router" mínimo, sin instalar ninguna librería.
// ---------------------------------------------------------------------------

import { useEffect, useState } from 'react'

// Las pantallas que existen. Cualquier otro hash se trata como "productos".
const VISTAS = ['productos', 'contacto', 'local']

// Lee el hash actual y devuelve el nombre de la vista que corresponde.
function leerVista() {
  // window.location.hash trae el # incluido ("#contacto"); slice(1) se lo saca.
  const hash = window.location.hash.slice(1)
  return VISTAS.includes(hash) ? hash : 'productos'
}

export function useVista() {
  // Arranca con la vista que indique la dirección con la que se entró.
  const [vista, setVista] = useState(leerVista)

  useEffect(() => {
    // El navegador dispara "hashchange" cada vez que cambia el hash: al tocar
    // un enlace del menú (href="#contacto") o al usar Atrás / Adelante.
    function alCambiarElHash() {
      setVista(leerVista())
      // Cada pantalla se empieza a leer desde arriba.
      window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', alCambiarElHash)
    // La limpieza: dejar de escuchar si el componente desaparece.
    return () => window.removeEventListener('hashchange', alCambiarElHash)

    // El array vacío [] significa "ejecutá este efecto una sola vez, al cargar".
  }, [])

  return vista
}
