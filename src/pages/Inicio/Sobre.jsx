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