// ---------------------------------------------------------------------------
// VISTA: HORARIOS Y UBICACIÓN
//
// La pantalla con los horarios de atención, la dirección y el mapa. Todos los
// datos salen de config.js.
// ---------------------------------------------------------------------------

import './vistas.css'
import { config } from '../config.js'

// En config.js cada horario es un texto como "Lunes a viernes: 9 a 13 y 17 a 21".
// Para mostrarlo en dos columnas (días | horas) lo partimos en el primer ":".
//   separarHorario('Sábados: 9 a 13') -> { dias: 'Sábados', horas: '9 a 13' }
// Si un texto no tiene ":", va entero en la primera columna.
function separarHorario(texto) {
  const posicion = texto.indexOf(':') // dónde está el primer ":" (-1 si no hay)

  if (posicion === -1) {
    return { dias: texto, horas: '' }
  }

  return {
    dias: texto.slice(0, posicion).trim(), // lo de antes del ":"
    horas: texto.slice(posicion + 1).trim(), // lo de después
  }
}

function VistaLocal() {
  const horarios = config.horarios.map(separarHorario)

  // Un enlace que abre Google Maps buscando la dirección del local. Sirve
  // siempre, aunque no se haya configurado el mapa incrustado.
  const enlaceMapa =
  config.mapaEnlace ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.direccion)}`

  return (
    <main className="contenido vista">
      <h2 className="vista-titulo">Horarios y ubicación</h2>

      <section className="vista-bloque">
        <h3 className="vista-subtitulo">Horarios de atención</h3>

        {/* <dl> es la etiqueta de HTML para pares "término / descripción":
            <dt> es el término (los días) y <dd> su descripción (las horas). */}
        <dl className="horarios">
          {horarios.map((horario) => (
            // Un grupo por horario. Usamos el texto de los días como key.
            <div key={horario.dias} className="horarios-fila">
              <dt>{horario.dias}</dt>
              <dd>{horario.horas}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="vista-bloque">
        <h3 className="vista-subtitulo">Dónde estamos</h3>
        <p className="vista-direccion">{config.direccion}</p>

        {/* El mapa incrustado es opcional: se muestra solo si en config.js se
            cargó "mapaEmbed". Si no existe, config.mapaEmbed es undefined, que
            cuenta como "falso", y no se dibuja nada. */}
        {config.mapaEmbed && (
          <iframe
            className="mapa"
            src={config.mapaEmbed}
            title={`Mapa de ${config.nombre}`} // un iframe siempre lleva título
            loading="lazy" // se carga recién cuando está por verse
          />
        )}

        <div className="vista-acciones">
          <a className="boton boton-secundario" href={enlaceMapa} target="_blank" rel="noopener">
            Abrir en Google Maps
          </a>
        </div>
      </section>
    </main>
  )
}

export default VistaLocal
