// ---------------------------------------------------------------------------
// APP: el componente principal
//
// Un COMPONENTE de React es una función que devuelve lo que hay que dibujar.
// App es el de más arriba: arma la página juntando los demás componentes,
// como si fueran piezas.
//
// Tiene tres responsabilidades:
//   1. Mostrar el encabezado, que está en todas las pantallas.
//   2. Decidir qué pantalla ("vista") va debajo: productos, contacto o local.
//   3. Saber si el menú y el carrito están abiertos o cerrados.
// ---------------------------------------------------------------------------

import { useState } from 'react'

import { config } from './config.js'

import Encabezado from './components/Encabezado.jsx'
import Menu from './components/Menu.jsx'
import Carrito from './components/Carrito.jsx'

import VistaProductos from './vistas/VistaProductos.jsx'
import VistaContacto from './vistas/VistaContacto.jsx'
import VistaLocal from './vistas/VistaLocal.jsx'

import { useVista } from './hooks/useVista.js'

// El nombre de un componente SIEMPRE empieza con mayúscula. Así React distingue
// <Encabezado /> (un componente nuestro) de <div> (una etiqueta común de HTML).
function App() {
  // Qué pantalla mostrar: 'productos', 'contacto' o 'local'. Sale del # de la
  // dirección (ver src/hooks/useVista.js).
  const vista = useVista()

  // ESTADO: un dato que el componente recuerda y que, cuando cambia, hace que
  // React vuelva a dibujar la pantalla. useState devuelve el valor actual y la
  // función para cambiarlo; lo que va entre paréntesis es el valor inicial.
  //
  // El menú y el carrito arrancan cerrados (false).
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [carritoAbierto, setCarritoAbierto] = useState(false)

  // Lo que se devuelve es JSX: parece HTML, pero es JavaScript. Vite lo
  // traduce a llamadas de React antes de que llegue al navegador.
  //
  // Un componente tiene que devolver UN solo elemento, por eso todo va
  // envuelto en <> </>, un "fragmento": agrupa sin agregar ninguna etiqueta
  // extra a la página.
  return (
    <>
      {/* Los datos se les pasan a los componentes como "props", que se
          escriben igual que los atributos de HTML. Las llaves { } significan
          "esto es JavaScript".

          Al encabezado le pasamos dos FUNCIONES: él no abre nada por su
          cuenta, solo las llama cuando tocan un botón, y es App quien cambia
          el estado. Los datos BAJAN por props; los avisos SUBEN llamando a una
          función que el padre le prestó al hijo. */}
      <Encabezado
        nombre={config.nombre}
        alAbrirMenu={() => setMenuAbierto(true)}
        alAbrirCarrito={() => setCarritoAbierto(true)}
      />

      {/* Solo una de las tres se dibuja. condición && <algo /> significa "si
          la condición se cumple, dibujá esto". Las otras dos no existen en la
          página hasta que les toque. */}
      {vista === 'productos' && <VistaProductos />}
      {vista === 'contacto' && <VistaContacto />}
      {vista === 'local' && <VistaLocal />}

      {/* El menú y el carrito están siempre "puestos" en la página, pero
          ocultos. La prop abierto les dice cuándo mostrarse. */}
      <Menu abierto={menuAbierto} alCerrar={() => setMenuAbierto(false)} vistaActual={vista} />
      <Carrito abierto={carritoAbierto} alCerrar={() => setCarritoAbierto(false)} />
    </>
  )
}

// "export default" permite importarlo desde otro archivo: import App from './App.jsx'
export default App
