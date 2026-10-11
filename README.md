# Catálogo para local de celulares y accesorios

Página de catálogo hecha con React y Vite. Sin backend: es un sitio estático.

## Cómo correrlo

Hace falta tener [Node.js](https://nodejs.org) instalado (versión 20 o más nueva).

```
npm install      # baja las dependencias a la carpeta node_modules (solo la primera vez)
npm run dev      # levanta la página en http://localhost:5173 y se actualiza sola al guardar
```

Otros comandos:

```
npm run build    # genera la versión final, optimizada, en la carpeta dist
npm run preview  # sirve esa carpeta dist para probarla antes de publicar
npm run lint     # revisa el código en busca de errores comunes
```

## Cómo se creó

```
npm create vite@latest catalogo-celulares -- --template react
```

Ese comando genera la estructura básica de un proyecto React. Después se quitó
el contenido de ejemplo de la plantilla (el contador, los logos y sus estilos).

## Qué es cada archivo

| Archivo | Qué hace |
|---|---|
| `index.html` | La única página HTML. Tiene el título, la descripción y el `<div id="root">` vacío. |
| `src/main.jsx` | Lo primero que se ejecuta: aplica los colores y dibuja `<App />` dentro de `#root`. |
| `src/App.jsx` | El componente principal: encabezado, pantalla que corresponde, menú y carrito. |
| `src/config.js` | Datos del local: nombre, modo demo, los tres colores, WhatsApp, Instagram, dirección, horarios y mapa. |
| `src/data/productos.json` | La lista de productos. |
| `src/vistas/` | Las tres pantallas: productos, contacto, y horarios y ubicación. |
| `src/components/` | Las piezas de la página. Cada una es un `.jsx` con su `.css` al lado. |
| `src/carrito/` | El carrito: qué hay cargado, cómo se modifica y cómo se guarda en el navegador. |
| `src/hooks/useVista.js` | Decide qué pantalla mostrar según el `#` de la dirección. |
| `src/hooks/useSeccionActiva.js` | La lógica del scroll: detecta qué categoría se está mirando y permite saltar a una. |
| `src/utils/formato.js` | Funciones de ayuda: escribir precios y armar el id de cada sección. |
| `src/utils/whatsapp.js` | Arma los enlaces y los mensajes que se mandan por WhatsApp. |
| `src/index.css` | Estilos generales, tipografías y variables de color. |
| `public/` | Archivos que se publican tal cual: el ícono, las fotos (`public/img`) y la tipografía de los títulos (`public/fuentes`). |
| `package.json` | Nombre del proyecto, comandos (`scripts`) y dependencias. |
| `vite.config.js` | Configuración de Vite. Solo activa el soporte para React. |
| `.oxlintrc.json` | Reglas del revisor de código (`npm run lint`). |
| `.gitignore` | Lo que Git no tiene que subir: `node_modules` y `dist`. |

`node_modules` y `dist` no se editan nunca: se generan solas con `npm install`
y `npm run build`.

## Pantallas

Es una sola página con tres pantallas, que se eligen desde el menú de las tres
líneas. Cada una tiene su dirección, así se puede compartir el enlace directo y
el botón Atrás del celular funciona:

| Pantalla | Dirección |
|---|---|
| Productos | `/` o `/#productos` |
| Contacto | `/#contacto` |
| Horarios y ubicación | `/#local` |

## Carrito y pedidos

Cada producto con stock y precio tiene el botón "Agregar". El carrito se guarda
en el navegador de cada persona, así que no se pierde al recargar. Al tocar
"Enviar pedido por WhatsApp" se abre el chat del local con el pedido escrito.

Los productos sin stock o sin precio no van al carrito: muestran "Consultar",
que abre el chat con el nombre del producto.

La página no cobra ni guarda pedidos: el local recibe el mensaje y confirma
precio y stock por el chat.

**Antes de publicar hay que cargar el número real** en `whatsapp`, dentro de
`src/config.js`. Con el número de ejemplo los botones no abren ningún chat.

## Diseño

Los colores se cambian en `src/config.js` (`fondo`, `texto` y `acento`). Los
grises y las líneas se calculan solos a partir de esos tres, en `src/index.css`.

Los títulos usan la tipografía Michroma, incluida en `public/fuentes` (licencia
libre OFL, el texto está en esa misma carpeta). El resto usa la letra del
propio dispositivo.

## Campos de cada producto

| Campo | Tipo | Notas |
|---|---|---|
| `id` | texto | Único y que no cambie nunca: el carrito guardado en el navegador de cada persona identifica los productos por su id. |
| `categoria` | texto | iPhone, iPad, Mac, AirPods, Accesorios, etc. Cada valor distinto genera una sección de la página y su nombre en la barra de arriba, en el orden en que aparece en el archivo. Escribirlo siempre igual: `iPad` e `Ipad` serían dos secciones. |
| `marca` | texto | |
| `nombre` | texto | Incluir capacidad o modelo: es lo que llega en el mensaje de WhatsApp. |
| `descripcion` | texto | En accesorios, con qué modelos es compatible. |
| `precio` | número o `null` | En pesos, sin puntos ni centavos. `null` muestra "Consultar precio" y el producto no se puede agregar al carrito. |
| `precioAnterior` | número o `null` | Si es mayor al precio, se muestra tachado con la etiqueta "Oferta". |
| `stock` | `true` o `false` | `false` muestra "Sin stock" y el producto no se puede agregar al carrito. |
| `destacado` | `true` o `false` | Todavía no se usa: más adelante los manda arriba. |
| `imagen` | texto | Ruta de la foto, por ejemplo `/img/iphone-16-azul.jpg`. Vacío muestra una placa azul con la inicial. |

Para agregar una foto: guardarla en `public/img/` y poner en `imagen` la ruta
empezando con `/img/`. La foto llena toda la placa cuadrada y se recorta lo que
sobra, así que conviene que el producto esté centrado.

## Modo demo

Los productos cargados ahora son de ejemplo, con precios inventados e
ilustraciones (los archivos `public/img/ejemplo-*.svg`). El único real es el
iPad A16. Mientras `demo` esté en `true` en `src/config.js`, la página muestra
el aviso "Los productos y los precios son de ejemplo".

Para pasar a la versión real:

1. Reemplazar los productos de `src/data/productos.json` por los reales.
2. Guardar las fotos en `public/img/` y borrar los `ejemplo-*.svg`.
3. Poner `demo: false` en `src/config.js`.

Mientras sea demo, no compartir el enlace con clientes: el WhatsApp es el real
y podría llegar un pedido de un producto de ejemplo.

## Avance

- [x] Paso 1: proyecto, configuración y productos de prueba
- [x] Paso 2: catálogo (encabezado, tarjeta y grilla)
- [x] Paso 3a: secciones por categoría, con la barra que sigue el scroll
- [x] Diseño: negro, blanco y azul oscuro
- [x] Carrito, guardado en el navegador
- [x] Pedido y consultas por WhatsApp
- [x] Menú y pantallas de Contacto y de Horarios y ubicación
- [ ] Buscador
- [ ] Cargar los datos reales del local, las fotos y el logo
- [ ] Publicar y probar en celulares reales
