# Foro Puerto Vallarta

Sitio web para el encuentro iberoamericano de arbolado urbano organizado por Reforestamos Mexico.
Construido con **React + Vite**, sin dependencias de routing externo.

Para la estructura detallada del proyecto, componentes, datos y guia de implementacion consulta [STRUCTURE.md](./STRUCTURE.md).

---

## Stack tecnologico

| Capa | Tecnologia |
|---|---|
| Framework | React 18 |
| Bundler | Vite |
| Estilos | CSS global (`src/styles/global.css`) + Bootstrap opcional |
| Iconos | Font Awesome 6 (CDN) |
| Tipografia | Playfair Display · DM Sans · Bebas Neue (Google Fonts) |
| Routing | Estado interno con `useState` (sin React Router) |

---

## Paleta de color

| Token | Nombre | Hex |
|---|---|---|
| `oscuro` | Verde oscuro | `#1a3d38` |
| `medio` | Verde medio | `#628b83` |
| `claro` | Amarillo dorado | `#feae22` |
| `azul` | Azul primario | `#1a8fb0` |
| `azulOsc` | Azul oscuro | `#126b84` |
| `naranja` | Naranja acento | `#ff6b00` |
| `crema` | Fondo claro | `#f7f4ef` |
| `texto` | Texto base | `#2e2e2e` |

Los tokens estan definidos en `src/styles/global.css` como variables CSS (`--c-oscuro`, etc.)
y como objeto JS `C` en `src/styles/tokens.js` para usarlos en estilos en linea.

---

## Instalacion y desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para produccion
npm run build

# Vista previa del build
npm run preview
```

---

## Dependencias externas (index.html)

Agregar en el `<head>` de `index.html` antes de cualquier hoja de estilos:

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap" rel="stylesheet">

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

<!-- Bootstrap (opcional, ver STRUCTURE.md seccion CSS) -->
<!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"> -->
```

---

## Paginas

| Ruta (estado) | Archivo | Descripcion |
|---|---|---|
| `inicio` | `src/pages/Inicio/index.jsx` | Landing principal con Hero, Sobre, Programa, Ponentes y acceso a Registro |
| `registro` | `src/pages/Registro/index.jsx` | Formulario de registro al evento (10 preguntas) |
| `toolkit` | `src/pages/Toolkit/index.jsx` | Biblioteca de recursos descargables para municipios |

---

## Estructura de carpetas

```
src/
├── assets/             # Imagenes y archivos estaticos locales
├── components/         # Componentes reutilizables (Nav, Footer, Reveal, Badge)
├── data/               # Contenido del sitio en archivos JS (programa, ponentes, etc.)
├── hooks/              # Custom hooks (useReveal)
├── pages/              # Vistas completas por pagina
│   ├── Inicio/
│   ├── Registro/
│   └── Toolkit/
├── styles/             # CSS global y tokens de color
├── App.jsx             # Router de estado + Nav
└── main.jsx
```

Ver [STRUCTURE.md](./STRUCTURE.md) para el arbol completo, descripcion de cada componente y esquema de datos.

---

## Formulario de Registro

La pagina **Registro** contiene 10 preguntas con los siguientes tipos de input:
`radio`, `checkbox`, `select`, `text`, `textarea`.

Al enviar el formulario se muestra una pantalla de confirmacion. El `onSubmit`
esta preparado para conectarse a cualquier backend, Formspree o EmailJS.

---

## Notas rapidas

- El **Nav** y el estado de pagina viven en `App.jsx`. Cada pagina recibe `goPage` como prop.
- Los **datos** del sitio (programa, ponentes, preguntas, recursos) estan en `src/data/` para
  editarlos sin tocar los componentes o conectarlos a una API en el futuro.
- El CSS global usa clases con prefijo `.ayc-` para evitar conflictos con Bootstrap u otras librerias.
