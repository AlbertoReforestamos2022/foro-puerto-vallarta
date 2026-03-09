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