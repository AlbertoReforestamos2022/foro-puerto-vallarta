import { useState } from "react";
import { PREGUNTAS, BLOQUES } from "../../data/preguntas";
import Footer from "../../components/Footer";


export default function PageRegistro({ goPage }) {
    const [submited, setSubmited] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setSubmited(true); 
        window.scrollTo( {top: 0, behavior: "smooth" }); 
    }; 

    let lastBloque = null; 

    return (
        <>
            <div className="ayc-diag-hero">
                <span className="ayc-tag">
                    <i className="fa fa-ticket-alt" /> &nbsp; Ciudad Árbol 2025
                </span>

                <h1> Registro al Foro <br />Puerto Vallarta</h1>

                <p>
                    Completa el formulario para asegurar tu lugar en el encuentro
                    iberoamericano de arbolado urbano.
                </p>
            </div>

            <div className="ayc-form-container">
                {submited ? (
                    <div className="ayc-success">
                        <i className="fa fa-check-circle" />
                        <h3>Registro completado</h3>

                        <p>
                            Gracias por registrarte. Recibiras un correo de confirmación con los detalles de tu participación 
                            en el Foro
                        </p>

                        <button
                        className="ayc-btn-primary"
                        style={{ marginTop: "1.5rem" }}
                        onClick={() => goPage("toolkit")}
                        >
                        <i className="fa fa-box-open" /> Explorar el Toolkit
                        </button>                        
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {PREGUNTAS.map((q, i) => {
                        const bloque = q.bloque;
                        const showHeader = bloque !== lastBloque;
                        lastBloque = bloque;
                        const bm = BLOQUES[bloque];

                        return (
                            <div key={i}>
                            {showHeader && (
                                <p
                                className="ayc-q-block-title"
                                style={{ borderBottom: `2px solid ${bm.border}` }}
                                >
                                {bm.label}
                                </p>
                            )}

                            <div className={`ayc-q-card ${q.accent === "orange" ? "orange" : ""}`}>
                                <div className="ayc-q-num">Pregunta {q.num}</div>
                                <div className="ayc-q-label">{q.label}</div>

                                {q.tipo === "text" && (
                                <input
                                    type="text"
                                    className="ayc-input"
                                    placeholder={q.placeholder}
                                    required={q.required}
                                />
                                )}

                                {q.tipo === "number" && (
                                <input
                                    type="number"
                                    className="ayc-input"
                                    placeholder={q.placeholder}
                                    required={q.required}
                                />
                                )}                                

                                {q.tipo === "email" && (
                                <input
                                    type="email"
                                    className="ayc-input"
                                    placeholder={q.placeholder}
                                    required={q.required}
                                />
                                )}

                                {q.tipo === "textarea" && (
                                <textarea
                                    className="ayc-input"
                                    placeholder={q.placeholder}
                                    rows={4}
                                />
                                )}

                                {q.tipo === "select" && (
                                <select className="ayc-input" required={q.required}>
                                    <option value="">Selecciona una opcion...</option>
                                    {q.opts.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                                )}

                                {(q.tipo === "radio" || q.tipo === "checkbox") &&
                                q.opts.map((opt) => (
                                    <label key={opt} className="ayc-q-option">
                                    <input
                                        type={q.tipo}
                                        name={q.name}
                                        value={opt}
                                        required={q.tipo === "radio" && q.required}
                                    />
                                    {opt}
                                    </label>
                                ))}
                            </div>
                            </div>
                        );
                        })}

                        <div style={{ textAlign: "center", marginTop: "2rem" }}>
                        <button type="submit" className="ayc-btn-submit">
                            <i className="fa fa-paper-plane" /> Enviar registro
                        </button>
                        <p style={{ color: "#999", fontSize: ".75rem", marginTop: "1rem" }}>
                            Tus datos son confidenciales y se usan unicamente para
                            gestionar tu participacion en el evento.
                        </p>
                        </div>
                    </form>
                )}
            </div>

            <Footer />
        </>
    )
}