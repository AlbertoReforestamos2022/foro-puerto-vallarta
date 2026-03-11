export default function Hero({ goPage }) {
  const scrollRegistro = () =>
    document.getElementById("registro")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="ayc-hero">
      <span className="ayc-leaf" style={{ top: "20%", left: "8%" }}>🌿</span>
      <span className="ayc-leaf" style={{ top: "55%", left: "4%", fontSize: "1.8rem", animationDelay: "3s" }}>🍃</span>
      <span className="ayc-leaf" style={{ top: "25%", right: "7%", animationDelay: "1.5s" }}>🌿</span>
      <span className="ayc-leaf" style={{ top: "65%", right: "5%", fontSize: "2rem", animationDelay: "5s" }}>🍃</span>

      {/* <span className="ayc-tag"><i className="fa fa-leaf" /> Reforestamos Mexico</span> */}


    <div className="ayc-hero-intro-section">
      <h1>En el marco del Foro:<br /> Arbolado Urbano <br /><em>como Semilla de la Resiliencia</em></h1>

      <p className="ayc-hero-sub">

      </p>

      <div className="ayc-hero-fecha">
        <i className="fa fa-calendar-alt" /> &nbsp; 28 y 29 de mayo del 2026 · Hotel Velas Vallarta
      </div>

      <div className="ayc-hero-btns">
        <button className="ayc-btn-primary" onClick={() => goPage("registro")}>
          <i className="fa fa-ticket-alt" /> Registrarme
        </button>
        {/* <button className="ayc-btn-secondary" onClick={() => goPage("toolkit")}>
          <i className="fa fa-box-open" /> Ver Toolkit
        </button> */}
      </div>      
    </div>

      {/* <div className="ayc-stats-strip">
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
      </div> */}
    </section>
  );
}