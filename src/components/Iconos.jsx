// ---------------------------------------------------------------------------
// ÍCONOS
//
// Los íconos de la interfaz, dibujados con SVG directamente en el código.
// SVG es un formato de imagen hecho de formas (líneas, círculos, trazos): se
// ve nítido en cualquier tamaño y pesa casi nada. Al estar escritos acá no hay
// que descargar ninguna librería de íconos.
//
// Cada ícono es un componente chiquito. Este archivo exporta varios, por eso
// usan "export" a secas (sin "default") y se importan con llaves:
//     import { IconoMenu, IconoCarrito } from './Iconos.jsx'
// ---------------------------------------------------------------------------

// Todos comparten la misma base: tamaño, y trazo del color del texto que los
// rodea. "currentColor" significa justamente eso: "usá el color del texto".
// Así un ícono dentro de un botón blanco es blanco sin configurarle nada.
//
// {...props} pasa al <svg> cualquier otra prop que reciba el componente.
function Icono({ children, ...props }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24" // el "lienzo" sobre el que se dibuja: 24 x 24 unidades
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      // Un ícono es decorativo: el nombre accesible lo pone el botón que lo
      // contiene (con aria-label), así que el lector de pantalla lo saltea.
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

// Las tres líneas del menú.
export function IconoMenu() {
  return (
    <Icono>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icono>
  )
}

export function IconoCarrito() {
  return (
    <Icono>
      <path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.3a1.5 1.5 0 0 0 1.5-1.2L20 7.5H6.2" />
      <circle cx="9.5" cy="19.5" r="1.2" />
      <circle cx="17" cy="19.5" r="1.2" />
    </Icono>
  )
}

// La cruz para cerrar.
export function IconoCerrar() {
  return (
    <Icono>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icono>
  )
}

export function IconoMas() {
  return (
    <Icono width="18" height="18">
      <path d="M12 5v14M5 12h14" />
    </Icono>
  )
}

export function IconoMenos() {
  return (
    <Icono width="18" height="18">
      <path d="M5 12h14" />
    </Icono>
  )
}
