import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, orderBy, query, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { PREGUNTAS } from "../../data/preguntas";

export default function PageAdmin() {
    const [user,        setUser]        = useState(null);
    const [email,       setEmail]       = useState("");
    const [password,    setPassword]    = useState("");
    const [authError,   setAuthError]   = useState(null);
    const [loading,     setLoading]     = useState(false);
    const [registros,   setRegistros]   = useState([]);
    const [loadingData,  setLoadingData]  = useState(false);
    const [enviando,     setEnviando]     = useState(new Set());

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            if (u) fetchRegistros();
        });
        return unsub;
    }, []);

    const fetchRegistros = async () => {
        setLoadingData(true);
        try {
            const q    = query(collection(db, "registros"), orderBy("fechaRegistro", "desc"));
            const snap = await getDocs(q);
            setRegistros(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        } finally {
            setLoadingData(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAuthError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch {
            setAuthError("Correo o contraseña incorrectos.");
        } finally {
            setLoading(false);
        }
    };

    const exportCSV = () => {
        if (!registros.length) return;

        const cols = [
            "Fecha",
            ...PREGUNTAS.map(q => `P${q.num} ${q.label}`),
            "P12 detalle",
            "P13 detalle",
            "Boletín",
        ];

        const rows = registros.map(r => {
            const fecha = r.fechaRegistro?.toDate
                ? r.fechaRegistro.toDate().toLocaleString("es-MX")
                : "";
            const valores = PREGUNTAS.map(q => {
                const val = r[`P${q.num}_${q.label}`];
                return Array.isArray(val) ? val.join(" | ") : (val ?? "");
            });
            return [
                fecha,
                ...valores,
                r["P12_detalle"] ?? "",
                r["P13_detalle"] ?? "",
                r.boletin ? "Sí" : "No",
            ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(",");
        });

        const csv  = [cols.map(c => `"${c}"`).join(","), ...rows].join("\n");
        const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement("a");
        a.href     = url;
        a.download = "registros-foro.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const enviarConfirmacion = async (registro) => {
        const correo = registro["P02_Correo electronico"];
        const nombre = registro["P01_Nombre completo"];
        if (!correo) return alert("Este registro no tiene correo.");

        setEnviando(prev => new Set(prev).add(registro.id));
        try {
            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                    from: "Foro Arbolado Urbano <info@reforestamos.org>",
                    to:   [correo],
                    subject: "Confirmación de registro — Foro Arbolado Urbano 2026",
                    html: `
                        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#222">
                            <div style="background:#036935;padding:2rem;border-radius:12px 12px 0 0;text-align:center">
                                <h1 style="color:#fff;margin:0;font-size:1.4rem">Foro Arbolado Urbano</h1>
                                <p style="color:#a8d5b5;margin:.5rem 0 0">como Semilla de la Resiliencia</p>
                            </div>
                            <div style="background:#fff;padding:2rem;border:1px solid #eee;border-radius:0 0 12px 12px">
                                <p>Hola <strong>${nombre}</strong>,</p>
                                <p>Tu registro al <strong>Foro Tree Cities of the World México 2026</strong> ha sido confirmado exitosamente.</p>
                                <div style="background:#f4f9f6;border-radius:8px;padding:1rem 1.5rem;margin:1.5rem 0">
                                    <p style="margin:0"><strong>📅 Fecha:</strong> 28 y 29 de mayo de 2026</p>
                                    <p style="margin:.5rem 0 0"><strong>📍 Lugar:</strong> Hotel Velas Vallarta, Puerto Vallarta</p>
                                </div>
                                <p>Próximamente recibirás más información sobre el programa y actividades.</p>
                                <p style="margin-top:2rem;color:#888;font-size:.85rem">
                                    Reforestamos México · <a href="https://reforestamos.org" style="color:#036935">reforestamos.org</a>
                                </p>
                            </div>
                        </div>
                    `,
                }),
            });

            if (!res.ok) throw new Error(await res.text());

            await updateDoc(doc(db, "registros", registro.id), { confirmacionEnviada: true });
            setRegistros(prev => prev.map(r => r.id === registro.id ? { ...r, confirmacionEnviada: true } : r));
        } catch (err) {
            alert("Error al enviar: " + err.message);
        } finally {
            setEnviando(prev => { const s = new Set(prev); s.delete(registro.id); return s; });
        }
    };

    /* ── LOGIN ──────────────────────────────────────────────── */
    if (!user) {
        return (
            <div style={styles.loginWrap}>
                <form onSubmit={handleLogin} style={styles.loginCard}>
                    <h2 style={styles.loginTitle}>Panel de administración</h2>
                    <p style={styles.loginSub}>Foro Arbolado Urbano 2026</p>

                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={styles.loginInput}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={styles.loginInput}
                    />

                    {authError && <p style={styles.loginError}>{authError}</p>}

                    <button type="submit" disabled={loading} style={styles.loginBtn}>
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </div>
        );
    }

    /* ── DASHBOARD ──────────────────────────────────────────── */
    const total   = registros.length;
    const boletin = registros.filter(r => r.boletin).length;

    return (
        <div style={styles.wrap}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h2 style={styles.headerTitle}>Panel de administración</h2>
                    <p style={styles.headerSub}>{user.email}</p>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <button onClick={exportCSV} style={styles.btnExport}>
                        <i className="fa fa-download" /> Exportar CSV
                    </button>
                    <button onClick={fetchRegistros} style={styles.btnRefresh}>
                        <i className="fa fa-sync" /> Actualizar
                    </button>
                    <button onClick={() => signOut(auth)} style={styles.btnLogout}>
                        <i className="fa fa-sign-out-alt" /> Salir
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div style={styles.statsRow}>
                <div style={styles.statCard}>
                    <span style={styles.statNum}>{total}</span>
                    <span style={styles.statLabel}>Registros totales</span>
                </div>
                <div style={styles.statCard}>
                    <span style={styles.statNum}>{boletin}</span>
                    <span style={styles.statLabel}>Suscritos al boletín</span>
                </div>
                <div style={styles.statCard}>
                    <span style={styles.statNum}>{total - boletin}</span>
                    <span style={styles.statLabel}>Sin boletín</span>
                </div>
            </div>

            {/* Tabla */}
            {loadingData ? (
                <p style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
                    <i className="fa fa-spinner fa-spin" /> Cargando registros...
                </p>
            ) : (
                <div style={styles.tableWrap}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>#</th>
                                <th style={styles.th}>Fecha</th>
                                {PREGUNTAS.map(q => (
                                    <th key={q.num} style={styles.th}>P{q.num} {q.label}</th>
                                ))}
                                <th style={styles.th}>P12 detalle</th>
                                <th style={styles.th}>P13 detalle</th>
                                <th style={styles.th}>Boletín</th>
                                <th style={styles.th}>Confirmación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registros.map((r, i) => {
                                const fecha = r.fechaRegistro?.toDate
                                    ? r.fechaRegistro.toDate().toLocaleString("es-MX")
                                    : "—";
                                return (
                                    <tr key={r.id} style={i % 2 === 0 ? styles.trEven : {}}>
                                        <td style={styles.td}>{i + 1}</td>
                                        <td style={styles.td}>{fecha}</td>
                                        {PREGUNTAS.map(q => {
                                            const val = r[`P${q.num}_${q.label}`];
                                            const txt = Array.isArray(val) ? val.join(", ") : (val ?? "—");
                                            return <td key={q.num} style={styles.td}>{txt}</td>;
                                        })}
                                        <td style={styles.td}>{r["P12_detalle"] ?? "—"}</td>
                                        <td style={styles.td}>{r["P13_detalle"] ?? "—"}</td>
                                        <td style={{ ...styles.td, textAlign: "center" }}>
                                            {r.boletin
                                                ? <span style={styles.badgeYes}>Sí</span>
                                                : <span style={styles.badgeNo}>No</span>}
                                        </td>
                                        <td style={{ ...styles.td, textAlign: "center" }}>
                                            {r.confirmacionEnviada
                                                ? <span style={styles.badgeYes}>Enviado</span>
                                                : <button
                                                    style={styles.btnEnviar}
                                                    disabled={enviando.has(r.id)}
                                                    onClick={() => enviarConfirmacion(r)}
                                                >
                                                    {enviando.has(r.id)
                                                        ? <><i className="fa fa-spinner fa-spin" /> Enviando...</>
                                                        : <><i className="fa fa-envelope" /> Enviar</>}
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                );
                            })}
                            {!registros.length && (
                                <tr>
                                    <td colSpan={PREGUNTAS.length + 6} style={{ ...styles.td, textAlign: "center", color: "#aaa" }}>
                                        Sin registros aún.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

/* ── ESTILOS ────────────────────────────────────────────────── */
const styles = {
    /* login */
    loginWrap:  { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f7f4" },
    loginCard:  { background: "#fff", borderRadius: 16, padding: "2.5rem 2rem", width: "100%", maxWidth: 380, boxShadow: "0 8px 32px rgba(3,105,53,.12)", display: "flex", flexDirection: "column", gap: "1rem" },
    loginTitle: { margin: 0, color: "#036935", fontSize: "1.4rem" },
    loginSub:   { margin: 0, color: "#888", fontSize: ".9rem" },
    loginInput: { padding: ".75rem 1rem", borderRadius: 8, border: "1.5px solid #ddd", fontSize: "1rem", outline: "none" },
    loginError: { color: "#c00", fontSize: ".85rem", margin: 0 },
    loginBtn:   { padding: ".8rem", borderRadius: 40, border: "none", background: "#036935", color: "#fff", fontWeight: 700, fontSize: "1rem", cursor: "pointer" },
    /* dashboard */
    wrap:        { padding: "2rem", minHeight: "100vh", background: "#f4f7f4" },
    header:      { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" },
    headerTitle: { margin: 0, color: "#036935", fontSize: "1.4rem" },
    headerSub:   { margin: 0, color: "#888", fontSize: ".85rem" },
    btnExport:   { padding: ".55rem 1.2rem", borderRadius: 40, border: "none", background: "#036935", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: ".9rem" },
    btnRefresh:  { padding: ".55rem 1.2rem", borderRadius: 40, border: "1.5px solid #036935", background: "transparent", color: "#036935", fontWeight: 600, cursor: "pointer", fontSize: ".9rem" },
    btnLogout:   { padding: ".55rem 1.2rem", borderRadius: 40, border: "none", background: "#eee", color: "#555", fontWeight: 600, cursor: "pointer", fontSize: ".9rem" },
    /* stats */
    statsRow:    { display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" },
    statCard:    { background: "#fff", borderRadius: 12, padding: "1.2rem 2rem", boxShadow: "0 2px 12px rgba(3,105,53,.08)", display: "flex", flexDirection: "column", alignItems: "center", minWidth: 130 },
    statNum:     { fontSize: "2rem", fontWeight: 700, color: "#036935" },
    statLabel:   { fontSize: ".8rem", color: "#888", marginTop: ".2rem" },
    /* table */
    tableWrap:   { overflowX: "auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(3,105,53,.08)" },
    table:       { width: "100%", borderCollapse: "collapse", fontSize: ".82rem" },
    th:          { padding: ".7rem 1rem", background: "#036935", color: "#fff", textAlign: "left", whiteSpace: "nowrap", fontWeight: 600, position: "sticky", top: 0 },
    td:          { padding: ".65rem 1rem", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis" },
    trEven:      { background: "#f9fdf9" },
    badgeYes:    { background: "#e6f4ed", color: "#036935", borderRadius: 20, padding: ".2rem .7rem", fontWeight: 600, fontSize: ".78rem" },
    badgeNo:     { background: "#f0f0f0", color: "#888", borderRadius: 20, padding: ".2rem .7rem", fontWeight: 600, fontSize: ".78rem" },
    btnEnviar:   { padding: ".3rem .9rem", borderRadius: 20, border: "none", background: "#036935", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: ".78rem" },
};
