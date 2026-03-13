import { C } from "../../styles/tokens";
import Reveal from "../../components/Reveal";
import { backgroundPtincipalVerde } from '../../imgs'; 

export default function RegistroCard({goPage}) {
    return(
        <section className="ayc-section ayc-section-cream" id="registro">
            <div className="ayc-container">
                <Reveal>
                    <div style={{ marginBottom: "2.5rem"}}>
                        <h2 className="ayc-h2" style={{ maxwidth: "100%"}}>
                            Se parte del cambio
                        </h2>

                        <span className="ayc-section-tag"> </span>

                        {/* <p style={{ color: "#666", margin: "0 auto", lineHeight: 1.7 }}>
                        Elige la modalidad que mejor se adapte a tu perfil y asegura tu lugar
                        en este encuentro historico.
                        </p> */}
                    </div>


                    <div className="ayc-reg-grid">
                        {[
                            {
                                label:  "Registro al Evento",
                                icon:   "fa-tree",
                                bg:     `linear-gradient(135deg, #3d6b63, ${C.medio})`,
                                imgBg:  `${backgroundPtincipalVerde}`,
                                btnBg:  C.verderm,
                                desc:   "Accede a las conferencias magistrales, paneles de discusion, ceremonia de reconocimiento y la reforestacion masiva del sabado.",
                            },
                            // {
                            //     label:  "Registro a Capacitacion",
                            //     icon:   "fa-chalkboard-teacher",
                            //     bg:     `linear-gradient(135deg, ${C.azulOsc}, ${C.azul})`,
                            //     btnBg:  C.azul,
                            //     desc:   "Programa tecnico intensivo con metodologias de diagnostico, inventario y gestion del arbolado urbano. Incluye constancia.",
                            // },
                        ].map((r)=> (
                            <div key={r.label} className="ayc-reg-card" >
                                <div className="ayc-reg-bg" style={{ background: `url(${r.imgBg}) center/cover no-repeat` }}>
                                    {/* <i className={`fa ${r.icon} ayc-reg-icon`} /> */}
                                    <div className="ayc-reg-title">{r.label}</div>
                                </div>

                                <div className="ayc-reg-body">
                                    <p className="ayc-reg-desc">{r.desc}</p>

                                    <button className="ayc-btn-reg" onClick={()=> goPage("registro")} style={{ background: r.btnBg }}>
                                        <i className="fa fa-arrrow-right" /> {r.label}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
