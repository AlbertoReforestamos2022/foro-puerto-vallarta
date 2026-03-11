import { INVITADOS } from "../../data/ponentes";

export default function Ponentes() {
    return(
        <section className="ayc-section" id="ponentes"> 
            <div className="ayc-container">
                
                <h2 className="ayc-h2">Invitados especiales</h2>
                <span className="ayc-section-tag"></span>

                <div className="ayc-ponentes-grid">
                    {INVITADOS.map((i)=> (
                        <div key={i.nombre} className="ayc-ponente-card">
                            <div className="ayc-ponente-foto" style={{ background: i.bg }}>
                                {i.emoji}
                            </div>

                            <div className="ayc-ponente-info">
                                <div className="ayc-ponente-nombre"> {i.nombre} </div>
                                <div className="ayc-ponente-tema"> {i.tema}</div>
                                <div className="ayc-ponente-pais">
                                    <i className="fa fa-globe-americas"/> {i.pais}
                                </div>
                                <div className="ayc-ponente-pais">
                                    {i.organizacion}
                                </div>                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}