import Reveal from "../../components/Reveal";
import imagenSobre from '../../imgs/CAJAAGUA.png'; 

export default function Sobre() {
  return (
    <section className="ayc-section ayc-section-cream" id="sobre">
      <div className="ayc-container">
        <Reveal>
          <div className="ayc-sobre-grid">
            <div className="ayc-sobre-img">
              <img
                src={imagenSobre}
                alt="Arboles urbanos"
              />
            </div>
            <div>
              
              <h2 className="ayc-h2">Un espacio para pensar las ciudades que queremos</h2>
              <span className="ayc-section-tag"></span>

              <p className="ayc-body">
                Consolidar el Foro TCW Puerto Vallarta 2026 como el espacio de referencia en América Latina sobre resiliencia climática y arbolado urbano, 
                articulando liderazgo municipal, innovación tecnológica, política pública y cooperación internacional. 
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