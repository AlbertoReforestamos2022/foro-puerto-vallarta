# Estructura del Proyecto — Foro Puerto Vallarta

Contenido completo de cada archivo del proyecto listo para implementar.

---

## Arbol de archivos

```
foro-puerto-vallarta/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Badge.jsx
│   │   ├── Footer.jsx
│   │   ├── Nav.jsx
│   │   ├── NavLogo.jsx
│   │   └── Reveal.jsx
│   ├── data/
│   │   ├── programa.js
│   │   ├── ponentes.js
│   │   ├── preguntas.js
│   │   └── recursos.js
│   ├── hooks/
│   │   └── useReveal.js
│   ├── pages/
│   │   ├── Inicio/
│   │   │   ├── Hero.jsx
│   │   │   ├── Ponentes.jsx
│   │   │   ├── Programa.jsx
│   │   │   ├── RegistroCard.jsx
│   │   │   ├── Sobre.jsx
│   │   │   └── index.jsx
│   │   ├── Registro/
│   │   │   └── index.jsx
│   │   └── Toolkit/
│   │       └── index.jsx
│   ├── styles/
│   │   ├── global.css
│   │   └── tokens.js
│   ├── App.jsx
│   ├── index.css          (vaciar — se reemplaza por global.css)
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── STRUCTURE.md
```

---

## index.html

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Foro Puerto Vallarta — Encuentro iberoamericano de arbolado urbano 2025" />
    <title>Foro Puerto Vallarta · Arboles y Ciudades</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <!-- Bootstrap (descomenta para activar) -->
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"> -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## src/main.jsx

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

## src/App.jsx

```jsx
import { useState } from "react";
import Nav from "./components/Nav";
import PageInicio from "./pages/Inicio";
import PageRegistro from "./pages/Registro";
import PageToolkit from "./pages/Toolkit";

export default function App() {
  const [page, setPage] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);

  const goPage = (p) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Nav page={page} goPage={goPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div style={{ paddingTop: 70 }}>
        {page === "inicio"   && <PageInicio   goPage={goPage} />}
        {page === "registro" && <PageRegistro goPage={goPage} />}
        {page === "toolkit"  && <PageToolkit  goPage={goPage} />}
      </div>
    </div>
  );
}
```

---

## src/styles/tokens.js

```js
export const C = {
  oscuro:  "#1a3d38",
  medio:   "#628b83",
  claro:   "#feae22",
  azul:    "#1a8fb0",
  azulOsc: "#126b84",
  naranja: "#ff6b00",
  crema:   "#f7f4ef",
  blanco:  "#ffffff",
  texto:   "#2e2e2e",
};
```

---

## src/styles/global.css

```css
/* ─────────────────────────────────────────────────────────────────
   TOKENS DE COLOR
───────────────────────────────────────────────────────────────── */
:root {
  --c-oscuro:  #1a3d38;
  --c-medio:   #628b83;
  --c-claro:   #feae22;
  --c-azul:    #1a8fb0;
  --c-azulOsc: #126b84;
  --c-naranja: #ff6b00;
  --c-crema:   #f7f4ef;
  --c-blanco:  #ffffff;
  --c-texto:   #2e2e2e;
}

/* ─────────────────────────────────────────────────────────────────
   RESET
───────────────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'DM Sans', sans-serif;
  color: var(--c-texto);
  background: var(--c-crema);
  overflow-x: hidden;
}
img { max-width: 100%; }
a { text-decoration: none; color: inherit; }

/* ─────────────────────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────────────────────── */
.ayc-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(26,61,56,.96); backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 2.5rem; height: 70px;
  border-bottom: 2px solid var(--c-naranja);
}
.ayc-nav-logo { display: flex; align-items: center; gap: .8rem; cursor: pointer; }
.ayc-nav-logo svg { width: 36px; height: 36px; }
.ayc-nav-logo span {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem; color: #fff; line-height: 1.2;
}
.ayc-nav-logo span em { color: var(--c-claro); font-style: normal; }
.ayc-nav-links { display: flex; gap: .4rem; align-items: center; }
.ayc-nav-btn {
  background: none; border: none; cursor: pointer;
  color: rgba(255,255,255,.75); font-family: 'DM Sans', sans-serif;
  font-size: .85rem; font-weight: 500;
  padding: .45rem .9rem; border-radius: 4px; transition: all .25s;
}
.ayc-nav-btn:hover,
.ayc-nav-btn.active { background: var(--c-naranja); color: #fff; }
.ayc-nav-cta {
  background: var(--c-naranja) !important;
  color: #fff !important;
  font-weight: 600 !important;
  border-radius: 30px !important;
  padding: .45rem 1.2rem !important;
}
.ayc-hamburger {
  display: none; flex-direction: column; gap: 5px;
  cursor: pointer; background: none; border: none;
}
.ayc-hamburger span {
  display: block; width: 24px; height: 2px;
  background: #fff; border-radius: 2px;
}

/* ─────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────── */
.ayc-hero {
  min-height: 100vh;
  background:
    linear-gradient(to bottom, rgba(26,61,56,.72) 0%, rgba(26,61,56,.58) 60%, rgba(26,61,56,.88) 100%),
    url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1800&q=80') center/cover no-repeat;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  text-align: center; padding: 120px 2rem 160px;
  position: relative; overflow: hidden;
}
.ayc-hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 60% 50% at 50% 70%, rgba(255,107,0,.15), transparent);
  pointer-events: none;
}
.ayc-leaf {
  position: absolute; opacity: .13; font-size: 2.5rem;
  animation: ayc-float 12s infinite ease-in-out;
}
@keyframes ayc-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-18px) rotate(8deg); }
}
.ayc-tag {
  display: inline-block; background: var(--c-naranja); color: #fff;
  font-size: .75rem; font-weight: 600; letter-spacing: .12em;
  text-transform: uppercase; padding: .35rem 1.1rem;
  border-radius: 30px; margin-bottom: 1.5rem;
  animation: ayc-up .8s ease both;
}
.ayc-hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.6rem, 6vw, 5.2rem);
  font-weight: 900; color: #fff; line-height: 1.08;
  max-width: 900px; animation: ayc-up .9s .1s ease both;
}
.ayc-hero h1 em { color: var(--c-claro); font-style: normal; }
.ayc-hero-sub {
  font-size: 1.1rem; color: rgba(255,255,255,.82);
  max-width: 600px; margin: 1.4rem auto 2.2rem;
  line-height: 1.7; animation: ayc-up .9s .2s ease both;
}
.ayc-hero-fecha {
  font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem;
  letter-spacing: .12em; color: var(--c-naranja);
  margin-bottom: 2.2rem; animation: ayc-up .9s .3s ease both;
}
.ayc-hero-btns {
  display: flex; gap: 1rem; flex-wrap: wrap;
  justify-content: center; animation: ayc-up .9s .4s ease both;
}
@keyframes ayc-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: none; }
}

/* ─────────────────────────────────────────────────────────────────
   BOTONES GLOBALES
───────────────────────────────────────────────────────────────── */
.ayc-btn-primary {
  background: var(--c-naranja); color: #fff;
  font-weight: 600; font-size: .95rem;
  padding: .85rem 2rem; border-radius: 40px;
  border: none; cursor: pointer; transition: all .25s;
  display: inline-flex; align-items: center; gap: .5rem;
}
.ayc-btn-primary:hover {
  background: #d05800; transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255,107,0,.4);
}
.ayc-btn-secondary {
  background: rgba(255,255,255,.12); color: #fff;
  font-weight: 500; font-size: .95rem;
  padding: .85rem 2rem; border-radius: 40px;
  border: 2px solid rgba(255,255,255,.4);
  cursor: pointer; transition: all .25s; backdrop-filter: blur(4px);
  display: inline-flex; align-items: center; gap: .5rem;
}
.ayc-btn-secondary:hover {
  background: rgba(255,255,255,.2);
  border-color: rgba(255,255,255,.7);
}

/* ─────────────────────────────────────────────────────────────────
   STATS STRIP (barra inferior del Hero)
───────────────────────────────────────────────────────────────── */
.ayc-stats-strip {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: rgba(26,61,56,.9); backdrop-filter: blur(8px);
  display: flex; justify-content: center;
  border-top: 2px solid rgba(254,174,34,.4);
}
.ayc-stat {
  padding: 1.4rem 2.5rem; text-align: center;
  border-right: 1px solid rgba(255,255,255,.08);
}
.ayc-stat:last-child { border-right: none; }
.ayc-stat-num {
  font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem;
  color: var(--c-claro); line-height: 1;
}
.ayc-stat-lbl {
  font-size: .72rem; color: rgba(255,255,255,.55);
  text-transform: uppercase; letter-spacing: .08em; margin-top: .25rem;
}

/* ─────────────────────────────────────────────────────────────────
   SECCIONES GENERICAS
───────────────────────────────────────────────────────────────── */
.ayc-section { padding: 80px 2rem; }
.ayc-section-cream { background: var(--c-crema); }
.ayc-section-dark  { background: var(--c-oscuro); }
.ayc-container { max-width: 1100px; margin: 0 auto; }
.ayc-section-tag {
  display: inline-flex; align-items: center; gap: .5rem;
  font-size: .72rem; font-weight: 600;
  letter-spacing: .15em; text-transform: uppercase;
  color: var(--c-naranja); margin-bottom: .8rem;
}
.ayc-section-tag::before {
  content: ''; display: block;
  width: 20px; height: 2px; background: var(--c-naranja);
}
.ayc-section-tag.light { color: var(--c-claro); }
.ayc-section-tag.light::before { background: var(--c-claro); }
.ayc-h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700; line-height: 1.18;
  color: var(--c-oscuro); margin-bottom: 1rem;
}
.ayc-h2-light { color: #fff; }
.ayc-body { color: #555; line-height: 1.8; max-width: 600px; }

/* ─────────────────────────────────────────────────────────────────
   SECCION SOBRE
───────────────────────────────────────────────────────────────── */
.ayc-sobre-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 4rem; align-items: center;
}
.ayc-sobre-img {
  border-radius: 16px; overflow: hidden; position: relative;
  box-shadow: 0 20px 60px rgba(26,61,56,.2);
}
.ayc-sobre-img img {
  width: 100%; height: 380px; object-fit: cover; display: block;
}
.ayc-sobre-img::after {
  content: ''; position: absolute;
  bottom: -8px; left: -8px; right: 8px; top: 8px;
  border: 3px solid var(--c-naranja); border-radius: 16px; z-index: -1;
}
.ayc-pilares {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: .8rem; margin-top: 1.6rem;
}
.ayc-pilar {
  background: #fff; border-radius: 10px; padding: .9rem 1.1rem;
  display: flex; align-items: flex-start; gap: .7rem;
  box-shadow: 0 2px 10px rgba(26,62,56,.13);
  border-left: 3px solid var(--c-naranja);
}
.ayc-pilar i { color: var(--c-naranja); margin-top: 2px; }
.ayc-pilar span { font-size: .82rem; line-height: 1.5; font-weight: 500; }

/* ─────────────────────────────────────────────────────────────────
   SECCION PROGRAMA
───────────────────────────────────────────────────────────────── */
.ayc-day-tabs { display: flex; gap: .5rem; margin: 2rem 0 1.5rem; }
.ayc-day-tab {
  background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15);
  color: rgba(255,255,255,.6); font-family: 'DM Sans', sans-serif;
  font-size: .82rem; font-weight: 500;
  padding: .5rem 1.2rem; border-radius: 30px; cursor: pointer; transition: all .2s;
}
.ayc-day-tab.active {
  background: var(--c-naranja); color: #fff;
  border-color: var(--c-naranja);
}
.ayc-prog-item {
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  border-radius: 12px; padding: 1.1rem 1.4rem;
  display: flex; align-items: flex-start; gap: 1.2rem;
  margin-bottom: .9rem; transition: background .2s;
}
.ayc-prog-item:hover { background: rgba(255,255,255,.1); }
.ayc-prog-hora {
  font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem;
  color: var(--c-naranja); min-width: 56px; padding-top: 2px;
}
.ayc-prog-titulo { color: #fff; font-weight: 600; font-size: .92rem; margin-bottom: .2rem; }
.ayc-prog-tipo {
  font-size: .7rem; color: rgba(255,255,255,.45);
  text-transform: uppercase; letter-spacing: .1em;
}
.ayc-badge {
  font-size: .65rem; font-weight: 600; letter-spacing: .08em;
  text-transform: uppercase; padding: .22rem .7rem;
  border-radius: 20px; align-self: flex-start; margin-top: 2px;
}

/* ─────────────────────────────────────────────────────────────────
   SECCION PONENTES
───────────────────────────────────────────────────────────────── */
.ayc-ponentes-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
  gap: 1.5rem; margin-top: 2.5rem;
}
.ayc-ponente-card {
  background: #fff; border-radius: 16px; overflow: hidden;
  box-shadow: 0 4px 20px rgba(26,62,56,.13);
  transition: transform .25s, box-shadow .25s;
}
.ayc-ponente-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(26,61,56,.15);
}
.ayc-ponente-foto {
  width: 100%; height: 180px;
  display: flex; align-items: center; justify-content: center;
  font-size: 3rem; color: rgba(255,255,255,.4);
}
.ayc-ponente-info { padding: 1rem 1.1rem 1.2rem; }
.ayc-ponente-nombre { font-weight: 700; font-size: .88rem; color: var(--c-oscuro); margin-bottom: .25rem; }
.ayc-ponente-tema { font-size: .73rem; color: #777; line-height: 1.45; }
.ayc-ponente-pais {
  display: inline-flex; align-items: center; gap: .3rem;
  font-size: .65rem; color: var(--c-azul); font-weight: 600;
  margin-top: .5rem; text-transform: uppercase; letter-spacing: .08em;
}

/* ─────────────────────────────────────────────────────────────────
   REGISTRO CARD (bloque CTA en pagina Inicio)
───────────────────────────────────────────────────────────────── */
.ayc-reg-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 2rem; margin-top: 2.5rem;
}
.ayc-reg-card {
  border-radius: 20px; overflow: hidden;
  box-shadow: 0 8px 32px rgba(26,62,56,.13);
  cursor: pointer; transition: transform .25s, box-shadow .25s; position: relative;
}
.ayc-reg-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(26,61,56,.2);
}
.ayc-reg-bg {
  height: 160px; display: flex; align-items: flex-end;
  padding: 1.5rem; position: relative;
}
.ayc-reg-icon {
  font-size: 3rem; color: rgba(255,255,255,.25);
  position: absolute; top: 1rem; right: 1.2rem;
}
.ayc-reg-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem; color: #fff; font-weight: 700;
}
.ayc-reg-body { background: #fff; padding: 1.4rem; }
.ayc-reg-desc { font-size: .83rem; color: #666; line-height: 1.6; margin-bottom: 1rem; }
.ayc-btn-reg {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .82rem; font-weight: 600; padding: .6rem 1.4rem;
  border-radius: 30px; border: none; cursor: pointer;
  transition: all .2s; color: #fff;
}

/* ─────────────────────────────────────────────────────────────────
   PAGINA REGISTRO (formulario)
───────────────────────────────────────────────────────────────── */
.ayc-diag-hero {
  background: linear-gradient(135deg, var(--c-oscuro) 0%, var(--c-azulOsc) 100%);
  padding: 120px 2rem 60px; text-align: center;
}
.ayc-diag-hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3.2rem); color: #fff; font-weight: 900;
}
.ayc-diag-hero p {
  color: rgba(255,255,255,.7); margin-top: .8rem;
  max-width: 560px; margin-left: auto; margin-right: auto;
  font-size: .95rem; line-height: 1.7;
}
.ayc-form-container {
  max-width: 700px; margin: 0 auto; padding: 60px 2rem 80px;
}
.ayc-q-block-title {
  font-family: 'Playfair Display', serif; font-size: 1.1rem;
  color: var(--c-oscuro); font-weight: 700;
  margin: 2rem 0 1rem; padding-bottom: .5rem;
}
.ayc-q-card {
  background: #fff; border-radius: 16px; padding: 2rem 2.2rem;
  box-shadow: 0 4px 20px rgba(26,62,56,.13); margin-bottom: 1.5rem;
  border-left: 4px solid var(--c-azul); transition: transform .2s;
}
.ayc-q-card:hover { transform: translateX(4px); }
.ayc-q-card.orange { border-left-color: var(--c-naranja); }
.ayc-q-num {
  font-family: 'Bebas Neue', sans-serif; font-size: 1rem;
  color: var(--c-azul); letter-spacing: .1em; margin-bottom: .4rem;
}
.ayc-q-label {
  font-weight: 600; color: var(--c-oscuro);
  font-size: .95rem; margin-bottom: 1rem; line-height: 1.5;
}
.ayc-q-option {
  display: flex; align-items: center; gap: .8rem;
  padding: .65rem .9rem; border-radius: 8px;
  border: 1.5px solid #e0e0e0; cursor: pointer;
  transition: all .2s; font-size: .87rem; margin-bottom: .5rem;
}
.ayc-q-option:hover {
  border-color: var(--c-azul);
  background: rgba(26,143,176,.05);
}
.ayc-q-option input { accent-color: var(--c-azul); width: 16px; height: 16px; }
.ayc-input {
  width: 100%; padding: .8rem 1rem;
  border: 1.5px solid #e0e0e0; border-radius: 8px;
  font-family: 'DM Sans', sans-serif; font-size: .88rem;
  color: var(--c-texto); transition: border .2s; background: #fff;
}
.ayc-input:focus {
  outline: none; border-color: var(--c-azul);
  box-shadow: 0 0 0 3px rgba(26,143,176,.12);
}
textarea.ayc-input { resize: vertical; min-height: 100px; }
select.ayc-input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23628b83' stroke-width='2' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 1rem center;
  padding-right: 2.5rem; cursor: pointer;
}
.ayc-btn-submit {
  background: var(--c-azul); color: #fff;
  font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 1rem;
  padding: 1rem 3rem; border-radius: 40px; border: none; cursor: pointer;
  transition: all .25s; display: inline-flex; align-items: center; gap: .6rem;
  box-shadow: 0 8px 24px rgba(26,143,176,.3);
}
.ayc-btn-submit:hover { background: var(--c-azulOsc); transform: translateY(-2px); }
.ayc-success {
  text-align: center; padding: 3rem;
  background: #fff; border-radius: 16px;
  box-shadow: 0 4px 20px rgba(26,62,56,.13);
}
.ayc-success i { font-size: 3.5rem; color: var(--c-naranja); margin-bottom: 1rem; display: block; }
.ayc-success h3 {
  font-family: 'Playfair Display', serif;
  color: var(--c-oscuro); font-size: 1.6rem;
}
.ayc-success p { color: #666; margin-top: .5rem; }

/* ─────────────────────────────────────────────────────────────────
   PAGINA TOOLKIT
───────────────────────────────────────────────────────────────── */
.ayc-tk-hero {
  background:
    linear-gradient(to bottom, rgba(26,61,56,.84) 0%, rgba(26,61,56,.72) 100%),
    url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80') center/cover no-repeat;
  padding: 140px 2rem 100px; text-align: center; position: relative;
}
.ayc-tk-hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 5vw, 4rem);
  color: #fff; font-weight: 900; line-height: 1.12;
}
.ayc-tk-hero h1 em { color: var(--c-claro); font-style: normal; }
.ayc-tk-hero p {
  color: rgba(255,255,255,.75); max-width: 560px;
  margin: 1rem auto 0; line-height: 1.7;
}
.ayc-tk-wave { position: absolute; bottom: -2px; left: 0; right: 0; }
.ayc-tk-intro-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 3rem; align-items: center; margin-bottom: 4rem;
}
.ayc-pasos-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.ayc-paso {
  text-align: center; padding: 1.5rem 1rem;
  background: #fff; border-radius: 16px;
  box-shadow: 0 4px 20px rgba(26,62,56,.13);
}
.ayc-paso-num {
  width: 48px; height: 48px; border-radius: 50%;
  background: var(--c-oscuro); color: var(--c-naranja);
  font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto .8rem;
}
.ayc-paso-title { font-weight: 700; color: var(--c-oscuro); font-size: .88rem; margin-bottom: .4rem; }
.ayc-paso-desc { font-size: .75rem; color: #666; line-height: 1.55; }
.ayc-filter-tabs { display: flex; gap: .5rem; flex-wrap: wrap; margin: 2rem 0 1.5rem; }
.ayc-filter-tab {
  background: none; border: 1.5px solid #ddd; color: #666;
  font-family: 'DM Sans', sans-serif; font-size: .78rem; font-weight: 500;
  padding: .4rem 1rem; border-radius: 30px; cursor: pointer; transition: all .2s;
}
.ayc-filter-tab.active {
  background: var(--c-azul); color: #fff; border-color: var(--c-azul);
}
.ayc-recursos-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(260px,1fr));
  gap: 1.5rem;
}
.ayc-recurso {
  background: #fff; border-radius: 16px; padding: 1.6rem 1.8rem;
  box-shadow: 0 4px 20px rgba(26,62,56,.13);
  transition: transform .25s, box-shadow .25s;
  position: relative; overflow: hidden;
}
.ayc-recurso:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(26,61,56,.14);
}
.ayc-recurso-cat {
  font-size: .65rem; font-weight: 600; letter-spacing: .1em;
  text-transform: uppercase; margin-bottom: .8rem;
  display: inline-flex; align-items: center; gap: .3rem;
}
.ayc-recurso-icon { font-size: 2rem; margin-bottom: .8rem; }
.ayc-recurso-title { font-weight: 700; color: var(--c-oscuro); font-size: .92rem; margin-bottom: .4rem; }
.ayc-recurso-desc { font-size: .78rem; color: #777; line-height: 1.55; margin-bottom: 1.1rem; }
.ayc-recurso-footer {
  display: flex; align-items: center; justify-content: space-between;
}
.ayc-recurso-tipo {
  font-size: .65rem; background: #f0f0f0; color: #666;
  padding: .2rem .6rem; border-radius: 4px; font-weight: 500;
}
.ayc-btn-dl {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .75rem; font-weight: 600;
  padding: .45rem 1rem; border-radius: 20px; border: none;
  cursor: pointer; transition: all .2s;
  color: var(--c-azul); background: rgba(26,143,176,.1);
}
.ayc-btn-dl:hover { background: var(--c-azul); color: #fff; }
.ayc-tk-cta {
  background: linear-gradient(135deg, var(--c-oscuro), var(--c-azulOsc));
  border-radius: 20px; padding: 3rem 2.5rem;
  display: grid; grid-template-columns: 1fr auto;
  align-items: center; gap: 2rem; margin: 4rem 0 0;
}
.ayc-tk-cta h3 {
  font-family: 'Playfair Display', serif; font-size: 1.6rem; color: #fff;
}
.ayc-tk-cta p { color: rgba(255,255,255,.65); margin-top: .4rem; font-size: .88rem; }
.ayc-btn-white {
  background: #fff; color: var(--c-oscuro); font-weight: 700; font-size: .88rem;
  padding: .85rem 2rem; border-radius: 30px; border: none; cursor: pointer;
  white-space: nowrap; transition: all .2s;
  display: inline-flex; align-items: center; gap: .5rem;
}
.ayc-btn-white:hover { background: var(--c-naranja); color: #fff; }

/* ─────────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────── */
.ayc-footer { background: var(--c-oscuro); padding: 3rem 2rem 2rem; text-align: center; }
.ayc-footer-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem; color: #fff; margin-bottom: .5rem;
}
.ayc-footer-logo em { color: var(--c-claro); font-style: normal; }
.ayc-footer-links {
  display: flex; justify-content: center;
  gap: 2rem; margin: 1.2rem 0; flex-wrap: wrap;
}
.ayc-footer-links a { color: rgba(255,255,255,.55); font-size: .8rem; transition: color .2s; }
.ayc-footer-links a:hover { color: var(--c-claro); }
.ayc-footer-copy { font-size: .72rem; color: rgba(255,255,255,.3); margin-top: 1rem; }
.ayc-footer-social { display: flex; justify-content: center; gap: 1rem; margin: 1.2rem 0; }
.ayc-social-btn {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,.08);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,.5); font-size: .9rem;
  transition: all .2s; cursor: pointer; border: none;
}
.ayc-social-btn:hover { background: var(--c-naranja); color: #fff; }

/* ─────────────────────────────────────────────────────────────────
   ANIMACION REVEAL (scroll)
───────────────────────────────────────────────────────────────── */
.ayc-reveal {
  opacity: 0; transform: translateY(28px);
  transition: opacity .7s ease, transform .7s ease;
}
.ayc-reveal.visible { opacity: 1; transform: none; }

/* ─────────────────────────────────────────────────────────────────
   RESPONSIVE
───────────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .ayc-sobre-grid,
  .ayc-reg-grid,
  .ayc-tk-intro-grid,
  .ayc-tk-cta { grid-template-columns: 1fr; }

  .ayc-stats-strip { display: none; }

  .ayc-nav-links {
    display: none; flex-direction: column;
    position: fixed; top: 70px; left: 0; right: 0;
    background: rgba(26,61,56,.98);
    padding: 1.5rem; gap: .5rem;
  }
  .ayc-nav-links.open { display: flex; }
  .ayc-hamburger { display: flex; }

  .ayc-section { padding: 60px 1.5rem; }
  .ayc-tk-cta { text-align: center; }
}
```

---

## src/hooks/useReveal.js

```js
import { useRef, useEffect } from "react";

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}
```

---

## src/components/NavLogo.jsx

```jsx
import { C } from "../styles/tokens";

export default function NavLogo({ onClick }) {
  return (
    <div className="ayc-nav-logo" onClick={onClick}>
      <svg viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="18" fill={C.naranja} opacity=".18" />
        <path
          d="M18 6 C13 6 8 11 8 16 C8 20 11 23 15 24 L15 30 L21 30 L21 24 C25 23 28 20 28 16 C28 11 23 6 18 6Z"
          fill={C.medio}
        />
        <path
          d="M18 6 C18 6 14 12 14 18 C14 22 16 25 18 26 C20 25 22 22 22 18 C22 12 18 6 18 6Z"
          fill={C.claro}
          opacity=".9"
        />
      </svg>
      <span>Foro<br /><em>Puerto Vallarta</em></span>
    </div>
  );
}
```

---

## src/components/Nav.jsx

```jsx
import NavLogo from "./NavLogo";

export default function Nav({ page, goPage, menuOpen, setMenuOpen }) {
  const scrollTo = (id) => {
    goPage("inicio");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <nav className="ayc-nav">
      <NavLogo onClick={() => goPage("inicio")} />

      <div className={`ayc-nav-links ${menuOpen ? "open" : ""}`}>
        <button
          className={`ayc-nav-btn ${page === "inicio" ? "active" : ""}`}
          onClick={() => goPage("inicio")}
        >
          Inicio
        </button>
        <button className="ayc-nav-btn" onClick={() => scrollTo("sobre")}>
          Sobre el evento
        </button>
        <button className="ayc-nav-btn" onClick={() => scrollTo("programa")}>
          Programa
        </button>
        <button className="ayc-nav-btn" onClick={() => scrollTo("ponentes")}>
          Ponentes
        </button>
        <button
          className={`ayc-nav-btn ${page === "toolkit" ? "active" : ""}`}
          onClick={() => goPage("toolkit")}
        >
          Toolkit
        </button>
        <button
          className={`ayc-nav-btn ayc-nav-cta ${page === "registro" ? "active" : ""}`}
          onClick={() => goPage("registro")}
        >
          Registro <i className="fa fa-arrow-right" />
        </button>
      </div>

      <button className="ayc-hamburger" onClick={() => setMenuOpen((o) => !o)}>
        <span /><span /><span />
      </button>
    </nav>
  );
}
```

---

## src/components/Footer.jsx

```jsx
export default function Footer() {
  return (
    <footer className="ayc-footer">
      <div className="ayc-footer-logo">
        Foro Puerto Vallarta · <em>Reforestamos Mexico</em>
      </div>
      <div className="ayc-footer-social">
        {["fab fa-facebook-f", "fab fa-twitter", "fab fa-instagram", "fab fa-linkedin-in"].map((ic) => (
          <button key={ic} className="ayc-social-btn">
            <i className={ic} />
          </button>
        ))}
      </div>
      <div className="ayc-footer-links">
        <a href="#">Aviso de privacidad</a>
        <a href="#">Contacto</a>
        <a href="https://www.reforestamosmexico.org" target="_blank" rel="noreferrer">
          Reforestamos Mexico
        </a>
      </div>
      <div className="ayc-footer-copy">
        &copy; 2025 Reforestamos Mexico A.C. &middot; Todos los derechos reservados
      </div>
    </footer>
  );
}
```

---

## src/components/Reveal.jsx

```jsx
import { useReveal } from "../hooks/useReveal";

export default function Reveal({ children, style }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="ayc-reveal" style={style}>
      {children}
    </div>
  );
}
```

---

## src/components/Badge.jsx

```jsx
const BADGE_STYLES = {
  conf:       { bg: "rgba(26,143,176,.3)",   color: "#7ac6f0", label: "Conferencia" },
  panel:      { bg: "rgba(98,139,131,.3)",   color: "#a3cec8", label: "Panel"       },
  taller:     { bg: "rgba(255,107,0,.3)",    color: "#f4b56a", label: "Taller"      },
  campo:      { bg: "rgba(254,174,34,.25)",  color: "#fedb7a", label: "Campo"       },
  libre:      { bg: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.4)", label: "Libre" },
  ceremonial: { bg: "rgba(26,143,176,.3)",   color: "#7ac6f0", label: "Ceremonial"  },
};

export default function Badge({ tipo }) {
  const bs = BADGE_STYLES[tipo] ?? BADGE_STYLES.libre;
  return (
    <span className="ayc-badge" style={{ background: bs.bg, color: bs.color }}>
      {bs.label}
    </span>
  );
}
```

---

## src/data/programa.js

```js
export const PROGRAMA = {
  dia1: [
    {
      hora: "09:00",
      titulo: "Inauguracion oficial · Entrega reconocimiento Ciudad Arbol 2024",
      tipo: "Ceremonia · Auditorio principal",
      badge: "ceremonial",
    },
    {
      hora: "10:30",
      titulo: "Bosques urbanos como derecho humano: perspectiva global",
      tipo: "Dan Lambe · Arbor Day Foundation · EUA",
      badge: "conf",
    },
    {
      hora: "12:00",
      titulo: "La construccion social de la Ley de Arbolado Urbano en Chile",
      tipo: "Cecilia Michea · Chile",
      badge: "conf",
    },
    {
      hora: "14:00",
      titulo: "Receso / Comida",
      tipo: "",
      badge: "libre",
    },
    {
      hora: "15:30",
      titulo: "Mesas de discusion: gobernanza verde y legislacion forestal urbana",
      tipo: "Moderacion: Emmanuel Bolanos · Mexico",
      badge: "panel",
    },
    {
      hora: "17:30",
      titulo: "Relatoria y sintesis del dia",
      tipo: "Plenaria participativa",
      badge: "panel",
    },
  ],
  dia2: [
    {
      hora: "09:00",
      titulo: "Soluciones basadas en la naturaleza para ciudades resilientes",
      tipo: "Pedro Calaza · Espana",
      badge: "conf",
    },
    {
      hora: "10:30",
      titulo: "Crisis hidrica: retos y respuestas desde el territorio",
      tipo: "Mesa: Gallego, Guerrero, Montero, Badano, Douterlungne",
      badge: "panel",
    },
    {
      hora: "12:00",
      titulo: "Taller: Metodologia de diagnostico de arbolado urbano",
      tipo: "Capacitacion tecnica · Cupo limitado",
      badge: "taller",
    },
    {
      hora: "14:00",
      titulo: "Receso / Comida",
      tipo: "",
      badge: "libre",
    },
    {
      hora: "15:30",
      titulo: "Reforestacion masiva · Parque Metropolitano",
      tipo: "Actividad de campo · Traslado incluido",
      badge: "campo",
    },
    {
      hora: "17:30",
      titulo: "Clausura y entrega de constancias",
      tipo: "Ceremonia de cierre",
      badge: "ceremonial",
    },
  ],
};
```

---

## src/data/ponentes.js

```js
import { C } from "../styles/tokens";

export const PONENTES = [
  {
    nombre: "Dan Lambe",
    tema: "Bosques urbanos como derecho humano",
    pais: "EUA · Arbor Day Foundation",
    emoji: "🌳",
    bg: `linear-gradient(135deg, ${C.oscuro}, ${C.medio})`,
  },
  {
    nombre: "Sophie Plitt",
    tema: "Politica internacional de arbolado urbano",
    pais: "EUA",
    emoji: "🌿",
    bg: `linear-gradient(135deg, ${C.azulOsc}, ${C.azul})`,
  },
  {
    nombre: "Lina Dolores Pohl Alfaro",
    tema: "Gobernanza forestal centroamericana",
    pais: "El Salvador · FAO",
    emoji: "🌱",
    bg: `linear-gradient(135deg, #3d6b63, ${C.medio})`,
  },
  {
    nombre: "Cecilia Michea",
    tema: "Ley de Arbolado Urbano · Chile",
    pais: "Chile",
    emoji: "🌲",
    bg: `linear-gradient(135deg, #b34d00, ${C.naranja})`,
  },
  {
    nombre: "Pedro Calaza",
    tema: "Soluciones basadas en la naturaleza",
    pais: "Espana",
    emoji: "🍀",
    bg: `linear-gradient(135deg, ${C.oscuro}, ${C.medio})`,
  },
  {
    nombre: "Mauricio Lamano",
    tema: "Biodiversidad y ecosistemas urbanos",
    pais: "Brasil",
    emoji: "🌾",
    bg: `linear-gradient(135deg, #c47d00, ${C.claro})`,
  },
  {
    nombre: "Elena Craig",
    tema: "Gestion comunitaria del arbolado",
    pais: "Argentina",
    emoji: "🌺",
    bg: `linear-gradient(135deg, ${C.azulOsc}, ${C.medio})`,
  },
  {
    nombre: "Ernesto Herrera",
    tema: "Politica forestal urbana Mexico",
    pais: "Mexico",
    emoji: "🌻",
    bg: `linear-gradient(135deg, #b34d00, ${C.medio})`,
  },
];
```

---

## src/data/preguntas.js

10 preguntas para el formulario de registro al evento.

```js
export const BLOQUES = {
  A: { label: "A · Datos personales",              border: "#ff6b00" },
  B: { label: "B · Perfil profesional",            border: "#1a8fb0" },
  C: { label: "C · Participacion en el evento",    border: "#ff6b00" },
  D: { label: "D · Confirmacion",                  border: "#1a8fb0" },
};

export const PREGUNTAS = [
  {
    num: "01",
    bloque: "A",
    label: "Nombre completo",
    tipo: "text",
    placeholder: "Ej. Maria Garcia Lopez",
    required: true,
  },
  {
    num: "02",
    bloque: "A",
    label: "Correo electronico",
    tipo: "email",
    placeholder: "Ej. maria@municipio.gob.mx",
    required: true,
  },
  {
    num: "03",
    bloque: "A",
    label: "Municipio y estado de procedencia",
    tipo: "text",
    placeholder: "Ej. Puerto Vallarta, Jalisco",
    required: true,
  },
  {
    num: "04",
    bloque: "B",
    label: "Tipo de organizacion a la que perteneces",
    tipo: "select",
    required: true,
    opts: [
      "Gobierno municipal",
      "Gobierno estatal o federal",
      "Academia o universidad",
      "OSC o fundacion",
      "Sector privado",
      "Medios de comunicacion",
      "Ciudadano independiente",
    ],
  },
  {
    num: "05",
    bloque: "B",
    label: "Cargo o puesto actual",
    tipo: "text",
    placeholder: "Ej. Directora de Medio Ambiente",
    required: false,
  },
  {
    num: "06",
    bloque: "C",
    label: "Modalidad de asistencia",
    tipo: "radio",
    name: "q6",
    required: true,
    opts: [
      "Presencial — ambos dias (viernes 11 y sabado 12)",
      "Presencial — solo viernes 11",
      "Presencial — solo sabado 12",
      "En linea (transmision en vivo)",
    ],
  },
  {
    num: "07",
    bloque: "C",
    label: "Actividades de tu interes (puedes elegir varias)",
    tipo: "checkbox",
    name: "q7",
    required: false,
    opts: [
      "Conferencias magistrales",
      "Paneles de discusion",
      "Taller de inventario de arbolado urbano",
      "Reforestacion masiva (sabado)",
      "Capacitacion tecnica",
    ],
  },
  {
    num: "08",
    bloque: "C",
    label: "Como te enteraste del evento",
    tipo: "select",
    required: false,
    opts: [
      "Redes sociales",
      "Correo electronico",
      "Colega o contacto",
      "Sitio web de Reforestamos Mexico",
      "Gobierno municipal o estatal",
      "Otro",
    ],
  },
  {
    num: "09",
    bloque: "D",
    label: "Expectativas o comentarios adicionales (opcional)",
    tipo: "textarea",
    placeholder: "Cuéntanos que esperas aprender o aportar en el foro...",
    required: false,
  },
  {
    num: "10",
    bloque: "D",
    label: "Autorizaciones",
    tipo: "checkbox",
    name: "q10",
    required: false,
    accent: "orange",
    opts: [
      "Acepto el aviso de privacidad de Reforestamos Mexico",
      "Autorizo el uso de mi imagen en materiales fotograficos y de video del evento",
    ],
  },
];
```

---

## src/data/recursos.js

```js
export const CAT_META = {
  guia:         { label: "Guia tecnica",    icon: "fa-book",           color: "#1a8fb0", accentBg: "rgba(26,143,176,.1)"  },
  plantilla:    { label: "Plantilla",       icon: "fa-file-alt",       color: "#1a8fb0", accentBg: "rgba(26,143,176,.1)"  },
  datos:        { label: "Datos y mapas",   icon: "fa-map-marked-alt", color: "#ff6b00", accentBg: "rgba(255,107,0,.1)"   },
  legal:        { label: "Marco normativo", icon: "fa-gavel",          color: "#9b59b6", accentBg: "rgba(155,89,182,.1)"  },
  comunicacion: { label: "Comunicacion",    icon: "fa-bullhorn",       color: "#ff6b00", accentBg: "rgba(255,107,0,.1)"   },
};

export const RECURSOS = [
  {
    cat: "guia",
    emoji: "📋",
    titulo: "Metodologia de inventario de arbolado urbano",
    desc: "Protocolo estandarizado para realizar el censo de arboles de tu municipio con criterios tecnicos reconocidos internacionalmente.",
    tipo: "PDF · 48 pp.",
  },
  {
    cat: "guia",
    emoji: "🌳",
    titulo: "Seleccion de especies para arbolado urbano en Mexico",
    desc: "Catalogo de especies nativas recomendadas por region climatica, con fichas tecnicas de mantenimiento y compatibilidad con infraestructura urbana.",
    tipo: "PDF · 92 pp.",
  },
  {
    cat: "guia",
    emoji: "✂️",
    titulo: "Manual de poda y mantenimiento preventivo",
    desc: "Guia operativa para brigadas municipales: tipos de poda, epocas recomendadas, herramientas y protocolos de seguridad.",
    tipo: "PDF · 36 pp.",
  },
  {
    cat: "plantilla",
    emoji: "📊",
    titulo: "Plan Municipal de Arbolado Urbano (PMAU)",
    desc: "Documento base editable para elaborar el plan estrategico de arbolado de tu municipio, alineado con los estandares de Tree Cities of the World.",
    tipo: "DOCX + PDF",
  },
  {
    cat: "plantilla",
    emoji: "📝",
    titulo: "Ficha de campo para inventario",
    desc: "Formulario imprimible y version digital para registro de datos en campo: especie, DAP, altura, condicion fitosanitaria, ubicacion GPS.",
    tipo: "XLSX + PDF",
  },
  {
    cat: "plantilla",
    emoji: "💰",
    titulo: "Modelo de presupuesto anual de arbolado",
    desc: "Hoja de calculo con rubros estandar para estimar y presentar el presupuesto de arbolado urbano ante autoridades municipales.",
    tipo: "XLSX",
  },
  {
    cat: "datos",
    emoji: "🗺️",
    titulo: "Mapa de cobertura arborea por municipio",
    desc: "Capas geoespaciales con el indice de cobertura arborea urbana para los 100 municipios mas poblados de Mexico. Formato SHP y GeoJSON.",
    tipo: "SHP · GeoJSON",
  },
  {
    cat: "datos",
    emoji: "📈",
    titulo: "Indicadores de servicios ecosistemicos urbanos",
    desc: "Dataset con valores de captura de carbono, reduccion de temperatura, retencion de lluvia y biodiversidad asociada al arbolado urbano mexicano.",
    tipo: "CSV · XLSX",
  },
  {
    cat: "legal",
    emoji: "⚖️",
    titulo: "Modelo de reglamento municipal de arbolado",
    desc: "Borrador base de reglamento adaptable a diferentes contextos municipales, revisado por expertos juridicos en derecho ambiental.",
    tipo: "DOCX",
  },
  {
    cat: "legal",
    emoji: "📜",
    titulo: "Analisis comparativo de leyes de arbolado en LATAM",
    desc: "Estudio de casos de Chile, Argentina, Brasil y Colombia con las mejores practicas legislativas en arbolado urbano.",
    tipo: "PDF · 55 pp.",
  },
  {
    cat: "comunicacion",
    emoji: "📱",
    titulo: "Kit de redes sociales · Mes del arbol",
    desc: "Pack de 20 plantillas editables para Instagram, Facebook y Twitter/X con datos, frases y llamados a la accion sobre arbolado urbano.",
    tipo: "Canva · PNG",
  },
  {
    cat: "comunicacion",
    emoji: "📰",
    titulo: "Infografias: beneficios del arbol urbano",
    desc: "Serie de 8 infografias descargables listas para imprimir y compartir en digital, explicando los servicios ecosistemicos del arbolado.",
    tipo: "PDF · PNG",
  },
];
```

---

## src/pages/Inicio/index.jsx

```jsx
import Hero          from "./Hero";
import Sobre         from "./Sobre";
import Programa      from "./Programa";
import Ponentes      from "./Ponentes";
import RegistroCard  from "./RegistroCard";
import Footer        from "../../components/Footer";

export default function PageInicio({ goPage }) {
  return (
    <>
      <Hero         goPage={goPage} />
      <Sobre />
      <Programa />
      <Ponentes />
      <RegistroCard goPage={goPage} />
      <Footer />
    </>
  );
}
```

---

## src/pages/Inicio/Hero.jsx

```jsx
export default function Hero({ goPage }) {
  const scrollRegistro = () =>
    document.getElementById("registro")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="ayc-hero">
      <span className="ayc-leaf" style={{ top: "20%", left: "8%" }}>🌿</span>
      <span className="ayc-leaf" style={{ top: "55%", left: "4%", fontSize: "1.8rem", animationDelay: "3s" }}>🍃</span>
      <span className="ayc-leaf" style={{ top: "25%", right: "7%", animationDelay: "1.5s" }}>🌿</span>
      <span className="ayc-leaf" style={{ top: "65%", right: "5%", fontSize: "2rem", animationDelay: "5s" }}>🍃</span>

      <span className="ayc-tag"><i className="fa fa-leaf" /> &nbsp; Reforestamos Mexico</span>

      <h1>Bosques y arboles urbanos<br /><em>como derecho humano</em></h1>

      <p className="ayc-hero-sub">
        Un encuentro nacional para reimaginar nuestras ciudades como espacios vivos,
        donde los arboles son infraestructura esencial y patrimonio colectivo.
      </p>

      <div className="ayc-hero-fecha">
        <i className="fa fa-calendar-alt" /> &nbsp; 11 y 12 de julio 2025 · Puerto Vallarta
      </div>

      <div className="ayc-hero-btns">
        <button className="ayc-btn-primary" onClick={() => goPage("registro")}>
          <i className="fa fa-ticket-alt" /> Registrarme
        </button>
        <button className="ayc-btn-secondary" onClick={() => goPage("toolkit")}>
          <i className="fa fa-box-open" /> Ver Toolkit
        </button>
      </div>

      <div className="ayc-stats-strip">
        {[
          ["27",    "Ciudades Arbol en Mexico"],
          ["+295K", "Arboles plantados 2025"],
          ["+450",  "Actores multisectoriales"],
          ["13",    "Paises participantes"],
        ].map(([n, l]) => (
          <div key={l} className="ayc-stat">
            <div className="ayc-stat-num">{n}</div>
            <div className="ayc-stat-lbl">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## src/pages/Inicio/Sobre.jsx

```jsx
import Reveal from "../../components/Reveal";

export default function Sobre() {
  return (
    <section className="ayc-section ayc-section-cream" id="sobre">
      <div className="ayc-container">
        <Reveal>
          <div className="ayc-sobre-grid">
            <div className="ayc-sobre-img">
              <img
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=700&q=80"
                alt="Arboles urbanos"
              />
            </div>
            <div>
              <p className="ayc-section-tag">Sobre el evento</p>
              <h2 className="ayc-h2">Un espacio para pensar las ciudades que queremos</h2>
              <p className="ayc-body">
                Ciudad Arbol 2025 es el encuentro iberoamericano de arbolado urbano,
                donde gobiernos, comunidades, academia y sector privado construyen juntos
                la agenda verde de nuestras ciudades.
              </p>
              <div className="ayc-pilares">
                {[
                  ["fa-comments",       "Conferencias magistrales internacionales"],
                  ["fa-users",          "Paneles de discusion ciudadana"],
                  ["fa-seedling",       "Reforestacion masiva participativa"],
                  ["fa-graduation-cap", "Capacitaciones tecnicas"],
                ].map(([ic, txt]) => (
                  <div key={txt} className="ayc-pilar">
                    <i className={`fa ${ic}`} />
                    <span>{txt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

---

## src/pages/Inicio/Programa.jsx

```jsx
import { useState } from "react";
import { PROGRAMA } from "../../data/programa";
import Badge from "../../components/Badge";

export default function Programa() {
  const [dia, setDia] = useState("dia1");

  return (
    <section className="ayc-section ayc-section-dark" id="programa">
      <div className="ayc-container">
        <p className="ayc-section-tag light">Programa</p>
        <h2 className="ayc-h2 ayc-h2-light" style={{ maxWidth: 500 }}>
          Dos dias de dialogo, ciencia y accion forestal
        </h2>

        <div className="ayc-day-tabs">
          {["dia1", "dia2"].map((d, i) => (
            <button
              key={d}
              className={`ayc-day-tab ${dia === d ? "active" : ""}`}
              onClick={() => setDia(d)}
            >
              {i === 0 ? "Viernes 11" : "Sabado 12"}
            </button>
          ))}
        </div>

        {PROGRAMA[dia].map((item, i) => (
          <div key={i} className="ayc-prog-item">
            <div className="ayc-prog-hora">{item.hora}</div>
            <div style={{ flex: 1 }}>
              <div className="ayc-prog-titulo">{item.titulo}</div>
              {item.tipo && <div className="ayc-prog-tipo">{item.tipo}</div>}
            </div>
            <Badge tipo={item.badge} />
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## src/pages/Inicio/Ponentes.jsx

```jsx
import { PONENTES } from "../../data/ponentes";

export default function Ponentes() {
  return (
    <section className="ayc-section" id="ponentes">
      <div className="ayc-container">
        <p className="ayc-section-tag">Ponentes</p>
        <h2 className="ayc-h2">Voces que transforman el arbolado urbano</h2>

        <div className="ayc-ponentes-grid">
          {PONENTES.map((p) => (
            <div key={p.nombre} className="ayc-ponente-card">
              <div className="ayc-ponente-foto" style={{ background: p.bg }}>
                {p.emoji}
              </div>
              <div className="ayc-ponente-info">
                <div className="ayc-ponente-nombre">{p.nombre}</div>
                <div className="ayc-ponente-tema">{p.tema}</div>
                <div className="ayc-ponente-pais">
                  <i className="fa fa-globe-americas" /> {p.pais}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## src/pages/Inicio/RegistroCard.jsx

```jsx
import { C } from "../../styles/tokens";
import Reveal from "../../components/Reveal";

export default function RegistroCard({ goPage }) {
  return (
    <section className="ayc-section ayc-section-cream" id="registro">
      <div className="ayc-container">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p className="ayc-section-tag" style={{ justifyContent: "center" }}>
              Registro
            </p>
            <h2 className="ayc-h2" style={{ textAlign: "center", maxWidth: "100%" }}>
              Se parte del cambio
            </h2>
            <p style={{ color: "#666", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              Elige la modalidad que mejor se adapte a tu perfil y asegura tu lugar
              en este encuentro historico.
            </p>
          </div>

          <div className="ayc-reg-grid">
            {[
              {
                label:  "Registro al Evento",
                icon:   "fa-tree",
                bg:     `linear-gradient(135deg, #3d6b63, ${C.medio})`,
                btnBg:  C.naranja,
                desc:   "Accede a las conferencias magistrales, paneles de discusion, ceremonia de reconocimiento y la reforestacion masiva del sabado.",
              },
              {
                label:  "Registro a Capacitacion",
                icon:   "fa-chalkboard-teacher",
                bg:     `linear-gradient(135deg, ${C.azulOsc}, ${C.azul})`,
                btnBg:  C.azul,
                desc:   "Programa tecnico intensivo con metodologias de diagnostico, inventario y gestion del arbolado urbano. Incluye constancia.",
              },
            ].map((r) => (
              <div key={r.label} className="ayc-reg-card" onClick={() => goPage("registro")}>
                <div className="ayc-reg-bg" style={{ background: r.bg }}>
                  <i className={`fa ${r.icon} ayc-reg-icon`} />
                  <div className="ayc-reg-title">{r.label}</div>
                </div>
                <div className="ayc-reg-body">
                  <p className="ayc-reg-desc">{r.desc}</p>
                  <button className="ayc-btn-reg" style={{ background: r.btnBg }}>
                    <i className="fa fa-arrow-right" /> {r.label}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

---

## src/pages/Registro/index.jsx

```jsx
import { useState } from "react";
import { PREGUNTAS, BLOQUES } from "../../data/preguntas";
import Footer from "../../components/Footer";

export default function PageRegistro({ goPage }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let lastBloque = null;

  return (
    <>
      <div className="ayc-diag-hero">
        <span className="ayc-tag">
          <i className="fa fa-ticket-alt" /> &nbsp; Ciudad Arbol 2025
        </span>
        <h1>Registro al Foro<br />Puerto Vallarta</h1>
        <p>
          Completa el formulario para asegurar tu lugar en el encuentro
          iberoamericano de arbolado urbano.
        </p>
      </div>

      <div className="ayc-form-container">
        {submitted ? (
          <div className="ayc-success">
            <i className="fa fa-check-circle" />
            <h3>Registro completado</h3>
            <p>
              Gracias por registrarte. Recibiras un correo de confirmacion
              con los detalles de tu participacion en el Foro Puerto Vallarta.
            </p>
            <button
              className="ayc-btn-primary"
              style={{ marginTop: "1.5rem" }}
              onClick={() => goPage("toolkit")}
            >
              <i className="fa fa-box-open" /> Explorar el Toolkit
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {PREGUNTAS.map((q, i) => {
              const bloque = q.bloque;
              const showHeader = bloque !== lastBloque;
              lastBloque = bloque;
              const bm = BLOQUES[bloque];

              return (
                <div key={i}>
                  {showHeader && (
                    <p
                      className="ayc-q-block-title"
                      style={{ borderBottom: `2px solid ${bm.border}` }}
                    >
                      {bm.label}
                    </p>
                  )}

                  <div className={`ayc-q-card ${q.accent === "orange" ? "orange" : ""}`}>
                    <div className="ayc-q-num">Pregunta {q.num}</div>
                    <div className="ayc-q-label">{q.label}</div>

                    {q.tipo === "text" && (
                      <input
                        type="text"
                        className="ayc-input"
                        placeholder={q.placeholder}
                        required={q.required}
                      />
                    )}

                    {q.tipo === "email" && (
                      <input
                        type="email"
                        className="ayc-input"
                        placeholder={q.placeholder}
                        required={q.required}
                      />
                    )}

                    {q.tipo === "textarea" && (
                      <textarea
                        className="ayc-input"
                        placeholder={q.placeholder}
                        rows={4}
                      />
                    )}

                    {q.tipo === "select" && (
                      <select className="ayc-input" required={q.required}>
                        <option value="">Selecciona una opcion...</option>
                        {q.opts.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}

                    {(q.tipo === "radio" || q.tipo === "checkbox") &&
                      q.opts.map((opt) => (
                        <label key={opt} className="ayc-q-option">
                          <input
                            type={q.tipo}
                            name={q.name}
                            value={opt}
                            required={q.tipo === "radio" && q.required}
                          />
                          {opt}
                        </label>
                      ))}
                  </div>
                </div>
              );
            })}

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button type="submit" className="ayc-btn-submit">
                <i className="fa fa-paper-plane" /> Enviar registro
              </button>
              <p style={{ color: "#999", fontSize: ".75rem", marginTop: "1rem" }}>
                Tus datos son confidenciales y se usan unicamente para
                gestionar tu participacion en el evento.
              </p>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </>
  );
}
```

---

## src/pages/Toolkit/index.jsx

```jsx
import { useState } from "react";
import { RECURSOS, CAT_META } from "../../data/recursos";
import { C } from "../../styles/tokens";
import Reveal from "../../components/Reveal";
import Footer from "../../components/Footer";

export default function PageToolkit({ goPage }) {
  const [filtro, setFiltro] = useState("all");
  const filtrados = filtro === "all" ? RECURSOS : RECURSOS.filter((r) => r.cat === filtro);

  return (
    <>
      <div className="ayc-tk-hero">
        <span className="ayc-tag">
          <i className="fa fa-box-open" /> &nbsp; Recursos para municipios
        </span>
        <h1>Toolkit de<br /><em>Arbolado Urbano</em></h1>
        <p>
          Guias, plantillas, datos y materiales de comunicacion para que tu municipio
          impulse una gestion forestal urbana de clase mundial.
        </p>
        <svg className="ayc-tk-wave" viewBox="0 0 1440 60" fill="none">
          <path d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z" fill={C.crema} />
        </svg>
      </div>

      <section className="ayc-section">
        <div className="ayc-container">
          <Reveal>
            <div className="ayc-tk-intro-grid">
              <div>
                <p className="ayc-section-tag">Para quien es este toolkit</p>
                <h2 className="ayc-h2">Todo lo que necesita tu municipio para comenzar</h2>
                <p className="ayc-body">
                  Este conjunto de herramientas fue desarrollado por Reforestamos Mexico
                  con el apoyo de la FAO y la Arbor Day Foundation para municipios que
                  buscan fortalecer su gestion del arbolado urbano y postularse al
                  reconocimiento Tree Cities of the World.
                </p>
              </div>
              <div className="ayc-pasos-grid">
                {[
                  ["1", "Diagnostica",  "Evalua el estado actual de tu arbolado con nuestras guias tecnicas"],
                  ["2", "Planifica",    "Usa nuestras plantillas para crear tu Plan Municipal de Arbolado"],
                  ["3", "Comunica",     "Kit de comunicacion para sensibilizar a tu comunidad"],
                  ["4", "Certificate",  "Guia paso a paso para postular a Tree Cities of the World"],
                ].map(([n, t, d]) => (
                  <div key={n} className="ayc-paso">
                    <div className="ayc-paso-num">{n}</div>
                    <div className="ayc-paso-title">{t}</div>
                    <div className="ayc-paso-desc">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <p className="ayc-section-tag">Recursos disponibles</p>
          <h2 className="ayc-h2">Biblioteca de materiales</h2>

          <div className="ayc-filter-tabs">
            {[
              ["all",          "Todos"],
              ["guia",         "Guias tecnicas"],
              ["plantilla",    "Plantillas"],
              ["datos",        "Datos y mapas"],
              ["legal",        "Marco normativo"],
              ["comunicacion", "Comunicacion"],
            ].map(([k, l]) => (
              <button
                key={k}
                className={`ayc-filter-tab ${filtro === k ? "active" : ""}`}
                onClick={() => setFiltro(k)}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="ayc-recursos-grid">
            {filtrados.map((r, i) => {
              const m = CAT_META[r.cat];
              return (
                <div key={i} className="ayc-recurso">
                  <div
                    style={{
                      position: "absolute", top: 0, left: 0, right: 0,
                      height: 4, background: m.color,
                      borderRadius: "16px 16px 0 0",
                    }}
                  />
                  <div className="ayc-recurso-cat" style={{ color: m.color }}>
                    <i className={`fa ${m.icon}`} /> {m.label}
                  </div>
                  <div className="ayc-recurso-icon">{r.emoji}</div>
                  <div className="ayc-recurso-title">{r.titulo}</div>
                  <div className="ayc-recurso-desc">{r.desc}</div>
                  <div className="ayc-recurso-footer">
                    <span className="ayc-recurso-tipo">{r.tipo}</span>
                    <button className="ayc-btn-dl">
                      <i className="fa fa-download" /> Descargar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <Reveal>
            <div className="ayc-tk-cta">
              <div>
                <h3>Tu municipio quiere certificarse?</h3>
                <p>
                  Acompanamos a municipios en todo el proceso de postulacion al
                  reconocimiento internacional Tree Cities of the World.
                </p>
              </div>
              <button className="ayc-btn-white" onClick={() => goPage("registro")}>
                <i className="fa fa-ticket-alt" /> Registrarse
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
```

---

## Checklist de implementacion

### Setup inicial
- [ ] Vaciar `src/index.css`
- [ ] Crear `src/styles/tokens.js`
- [ ] Crear `src/styles/global.css`
- [ ] Actualizar `src/main.jsx` (importar `./styles/global.css`)
- [ ] Actualizar `index.html` (Fonts + Font Awesome + Bootstrap comentado)

### Datos
- [ ] Crear `src/data/programa.js`
- [ ] Crear `src/data/ponentes.js`
- [ ] Crear `src/data/preguntas.js`
- [ ] Crear `src/data/recursos.js`

### Hooks y componentes base
- [ ] Crear `src/hooks/useReveal.js`
- [ ] Crear `src/components/NavLogo.jsx`
- [ ] Crear `src/components/Nav.jsx`
- [ ] Crear `src/components/Footer.jsx`
- [ ] Crear `src/components/Reveal.jsx`
- [ ] Crear `src/components/Badge.jsx`

### Pagina Inicio
- [ ] Crear `src/pages/Inicio/Hero.jsx`
- [ ] Crear `src/pages/Inicio/Sobre.jsx`
- [ ] Crear `src/pages/Inicio/Programa.jsx`
- [ ] Crear `src/pages/Inicio/Ponentes.jsx`
- [ ] Crear `src/pages/Inicio/RegistroCard.jsx`
- [ ] Crear `src/pages/Inicio/index.jsx`

### Pagina Registro
- [ ] Crear `src/pages/Registro/index.jsx`

### Pagina Toolkit
- [ ] Crear `src/pages/Toolkit/index.jsx`

### App
- [ ] Reemplazar `src/App.jsx`
