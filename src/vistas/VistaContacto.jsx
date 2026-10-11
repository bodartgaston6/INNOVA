// ---------------------------------------------------------------------------
// VISTA: CONTACTO
//
// La pantalla con las formas de comunicarse con el local. Todos los datos
// salen de config.js: para otro comercio no hay que tocar este archivo.
// ---------------------------------------------------------------------------

import './vistas.css'
import { config } from '../config.js'
import { enlaceWhatsApp } from '../utils/whatsapp.js'

function VistaContacto() {
  return (
    <main className="contenido vista">
      <h2 className="vista-titulo">Contacto</h2>

      <p className="vista-bajada">
        Escribinos por cualquier consulta sobre productos, precios o stock.
      </p>

      <div className="vista-acciones">
        {/* Sin mensaje: abre el chat vacío para que la persona escriba lo que quiera. */}
        <a
          className="boton boton-principal"
          href={enlaceWhatsApp()}
          target="_blank"
          rel="noopener"
        >
          Escribir por WhatsApp
        </a>

        {/* Instagram es opcional: si en config.js quedó vacío, el botón no se
            dibuja. Un texto vacío ('') cuenta como "falso" en una condición. */}
        {config.instagram && (
          <a
            className="boton boton-secundario"
            href={`https://instagram.com/${config.instagram}`}
            target="_blank"
            rel="noopener"
          >
            Ver Instagram: @{config.instagram}
          </a>
        )}
      </div>

      {/* Un enlace a la otra pantalla, para quien busca cómo llegar. */}
      <p className="vista-nota">
        También podés pasar por el local: <a href="#local">ver horarios y ubicación</a>.
      </p>
    </main>
  )
}

export default VistaContacto
