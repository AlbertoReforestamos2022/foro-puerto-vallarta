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
        <button className="ayc-nav-btn" onClick={() => scrollTo("ponentes")}>
          Ponentes
        </button>        
        <button className="ayc-nav-btn" onClick={() => scrollTo("programa")}>
          Programa
        </button>
        {/* <button
          className={`ayc-nav-btn ${page === "toolkit" ? "active" : ""}`}
          onClick={() => goPage("toolkit")}
        >
          Toolkit
        </button> */}
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