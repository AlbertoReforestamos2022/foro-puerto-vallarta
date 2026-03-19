import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { PREGUNTAS, BLOQUES } from "../../data/preguntas";
import Footer from "../../components/Footer";

import { backgroundPtincipal } from '../../imgs'; 


export default function PageRegistro({ goPage }) {
    const [submited, setSubmited] = useState(false);
    const [loading,  setLoading]  = useState(false);
    const [error,    setError]    = useState(null);
    const [formData, setFormData] = useState({});
    const [boletin,  setBoletin]  = useState(false);

    const handleChange = (num, value) => {
        setFormData(prev => ({ ...prev, [num]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Construir objeto con labels legibles para Firestore
            const registro = { fechaRegistro: serverTimestamp() };
            PREGUNTAS.forEach(q => {
                registro[`P${q.num}_${q.label}`] = formData[q.num] ?? "";
                if (q.conditionalText && formData[q.num] === q.conditionalText.trigger) {
                    registro[`P${q.num}_detalle`] = formData[`${q.num}_extra`] ?? "";
                }
            });

            registro.boletin = boletin;
            await addDoc(collection(db, "registros"), registro);
            setSubmited(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
            console.error(err);
            setError("Ocurrió un error al enviar tu registro. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    let lastBloque = null;

    return (
        <>
            <div className="ayc-diag-hero">
                <h1>
                    Registro al Foro <br /> <br /> Arbolado Urbano <br />
                    <em>como Semilla de Resiliencia</em>

                </h1>
            </div>

            <div className="ayc-form-container">
                {submited ? (
                    <div className="ayc-success">
                        <i className="fa fa-check-circle" />
                        <h3>Registro completado</h3>
                        <p>
                            Gracias por registrarte. Recibirás un correo de confirmación con los detalles de tu participación
                            en el Foro
                        </p>
                        {/* Reemplaza href por la ruta del PDF cuando esté listo */}
                        <a
                            href={ backgroundPtincipal }
                            target="_blank"
                            rel="noreferrer"
                            className="ayc-btn-primary"
                            style={{ marginTop: "1.5rem", display: "inline-flex", alignItems: "center", gap: ".6rem" }}
                        >
                            <i className="fa fa-file-pdf" /> Descargar documento del evento
                        </a>
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
                                                value={formData[q.num] ?? ""}
                                                onChange={e => handleChange(q.num, e.target.value)}
                                            />
                                        )}

                                        {q.tipo === "number" && (
                                            <input
                                                type="number"
                                                className="ayc-input"
                                                placeholder={q.placeholder}
                                                required={q.required}
                                                value={formData[q.num] ?? ""}
                                                onChange={e => handleChange(q.num, e.target.value)}
                                            />
                                        )}

                                        {q.tipo === "email" && (
                                            <input
                                                type="email"
                                                className="ayc-input"
                                                placeholder={q.placeholder}
                                                required={q.required}
                                                value={formData[q.num] ?? ""}
                                                onChange={e => handleChange(q.num, e.target.value)}
                                            />
                                        )}

                                        {q.tipo === "textarea" && (
                                            <textarea
                                                className="ayc-input"
                                                placeholder={q.placeholder}
                                                rows={4}
                                                value={formData[q.num] ?? ""}
                                                onChange={e => handleChange(q.num, e.target.value)}
                                            />
                                        )}

                                        {q.tipo === "select" && (
                                            <select
                                                className="ayc-input"
                                                required={q.required}
                                                value={formData[q.num] ?? ""}
                                                onChange={e => handleChange(q.num, e.target.value)}
                                            >
                                                <option value="">Selecciona una opción...</option>
                                                {q.opts.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        )}

                                        {(q.tipo === "radio" || q.tipo === "checkbox") &&
                                            q.opts.map(opt => (
                                                <label key={opt} className="ayc-q-option">
                                                    <input
                                                        type={q.tipo}
                                                        name={q.name || `q_${q.num}`}
                                                        value={opt}
                                                        required={q.tipo === "radio" && q.required}
                                                        checked={
                                                            q.tipo === "radio"
                                                                ? formData[q.num] === opt
                                                                : (formData[q.num] || []).includes(opt)
                                                        }
                                                        onChange={() => {
                                                            if (q.tipo === "radio") {
                                                                handleChange(q.num, opt);
                                                            } else {
                                                                const prev = formData[q.num] || [];
                                                                const next = prev.includes(opt)
                                                                    ? prev.filter(v => v !== opt)
                                                                    : [...prev, opt];
                                                                handleChange(q.num, next);
                                                            }
                                                        }}
                                                    />
                                                    {opt}
                                                </label>
                                            ))
                                        }

                                        {q.conditionalText && formData[q.num] === q.conditionalText.trigger && (
                                            <textarea
                                                className="ayc-input"
                                                placeholder={q.conditionalText.placeholder}
                                                rows={3}
                                                required
                                                value={formData[`${q.num}_extra`] ?? ""}
                                                onChange={e => handleChange(`${q.num}_extra`, e.target.value)}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {error && (
                            <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>
                                {error}
                            </p>
                        )}

                        <label className="ayc-q-option" style={{ marginTop: "2rem", justifyContent: "center" }}>
                            <input
                                type="checkbox"
                                checked={boletin}
                                onChange={e => setBoletin(e.target.checked)}
                            />
                            Deseo suscribirme al boletín informativo de Reforestamos México
                        </label>

                        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                            <button type="submit" className="ayc-btn-submit" disabled={loading}>
                                {loading
                                    ? <><i className="fa fa-spinner fa-spin" /> Enviando...</>
                                    : <><i className="fa fa-paper-plane" /> Enviar registro</>
                                }
                            </button>
                            <p style={{ color: "#999", fontSize: ".75rem", marginTop: "1rem" }}>
                                Tus datos son confidenciales y se usan únicamente para
                                gestionar tu participación en el evento.
                            </p>
                        </div>
                    </form>
                )}
            </div>

            <Footer goPage={goPage} />
        </>
    );
}
