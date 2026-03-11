import { backgroundPtincipal, CAJAAGUA, logoArborDay, logoTCOW, logoPuertoVallarta, LogosJuntos } from '../../imgs'; 

export default function Hero({ goPage }) {
  const scrollRegistro = () =>
    document.getElementById("registro")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="ayc-hero">
      {/* <span className="ayc-tag"><i className="fa fa-leaf" /> Reforestamos Mexico</span> */}


    <div className="ayc-hero-intro-section">
      <h2 className="ayc-hero-sub">
        Save the date
      </h2>

      <div className="ayc-hero-subtitle">
         Entrega de reconocimientos 
      </div>

      <h2>CIUDAD ARBOL 2025</h2>

      <div className="ayc-hero-title-intro">
          <h1>En el marco del Foro:<br /> Arbolado Urbano <br /><em>como Semilla de la Resiliencia</em></h1>
      </div>

      <p className="ayc-hero-sub">
        Hotel Velas, Vallarta
      </p>

      <div className="ayc-hero-fecha">
         28 y 29 de mayo del 2026
      </div>

      <div className="ayc-hero-btns">
        {/* <button className="ayc-btn-primary" onClick={() => goPage("registro")}>
          <i className="fa fa-ticket-alt" /> Registrarme
        </button> */}
        {/* <button className="ayc-btn-secondary" onClick={() => goPage("toolkit")}>
          <i className="fa fa-box-open" /> Ver Toolkit
        </button> */}
      </div>      
    </div>

    <div className="ayc-hero-imagen">
      <img src={ CAJAAGUA } alt="" />
    </div>

    <div className="ayc-hero-logos">
          <img src={ LogosJuntos }  alt="" />
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