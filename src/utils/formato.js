// ---------------------------------------------------------------------------
// FUNCIONES DE FORMATO
//
// Funciones chicas que no dibujan nada: reciben un dato y devuelven un texto.
// Van en un archivo aparte porque las usan varios componentes.
// ---------------------------------------------------------------------------

// Intl.NumberFormat es una herramienta del navegador que sabe escribir números
// como se usan en cada país. Con 'es-AR' pone el punto de miles y el signo $.
// Se crea una sola vez acá arriba (y no dentro de la función) porque crearlo
// es relativamente costoso y el resultado se puede reutilizar.
const formateadorPesos = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0, // sin centavos: 289999 -> "$ 289.999"
})

// Convierte un número en un precio listo para mostrar.
//   formatearPrecio(289999) -> "$ 289.999"
export function formatearPrecio(numero) {
  return formateadorPesos.format(numero)
}

// Convierte un texto en un identificador apto para usar como id de HTML:
// minúsculas, sin tildes y con guiones en lugar de espacios.
//   aIdentificador('Vidrios templados') -> "vidrios-templados"
//   aIdentificador('Accesorios Ñandú')  -> "accesorios-nandu"
// Lo usamos para darle un id a la sección de cada categoría.
export function aIdentificador(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD') // separa cada letra de su tilde: "á" pasa a ser "a" + "´"
    .replace(/[̀-ͯ]/g, '') // borra esas tildes sueltas
    .replace(/[^a-z0-9]+/g, '-') // todo lo que no sea letra o número pasa a ser un guion
    .replace(/^-+|-+$/g, '') // saca los guiones que hayan quedado en las puntas
}
