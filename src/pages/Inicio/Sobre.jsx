import Reveal from "../../components/Reveal";
import { arcosVallarta, arcosPuertoVallartaHero  } from '../../imgs'; 

export default function Sobre() {
  return (
    <section className="ayc-section ayc-section-cream" id="sobre">
      <div className="ayc-container">
        <Reveal>
          <div className="ayc-sobre-grid">
            <div className="ayc-sobre-img">
              <img
                src={arcosPuertoVallartaHero}
                alt="Arboles urbanos"
              />
            </div>
            <div>
              
              <h2 className="ayc-h2">Un espacio para pensar las ciudades que queremos</h2>
              <span className="ayc-section-tag"></span>

              <p className="ayc-body">
                Consolidar el Foro Tree Cities of the World México 2026 en Puerto Vallarta como el espacio de referencia en América Latina sobre resiliencia climática y arbolado urbano, 
                articulando liderazgo municipal, innovación tecnológica, política pública y cooperación internacional.
              </p>
              <div className="ayc-pilares">
                {/* Poner este array de objetos aparte */}
                {[
                  ["fa-comments",       "Conferencias magistrales internacionales"],
                  ["fa-users",          "Paneles de discusion ciudadana"],
                  ["fa-seedling",       "Construcción de la ley de bosque y arbolado urbano."],
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