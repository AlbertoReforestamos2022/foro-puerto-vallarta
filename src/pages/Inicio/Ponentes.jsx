import { PONENTES } from "../../data/ponentes";

export default function Ponentes() {
    return(
        <section className="ayc-section" id="ponentes"> 
            <div className="ayc-container">
                <p className="ayc-section-tag">Ponentes</p>
                <h2 className="ayc-h2">Voces que transforman.</h2>

                <div className="ayc-ponentes-grid">
                    {PONENTES.map((p)=> (
                        <div key={p.nombre} className="ayc-ponente-card">
                            <div className="ayc-ponente-foto" style={{ background: p.bg }}>
                                {p.emoji}
                            </div>

                            <div className="ayc-ponente-info">
                                <div className="ayc-ponente-nombre"> {p.nombre} </div>
                                <div className="ayc-ponente-tema"> {p.tema}</div>
                                <div className="ayc-ponente-pais">
                                    <i className="fa fa-globe-americas"/> {p.pais}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}