import { useState } from "react";
import { PROGRAMA } from "../../data/programa";
import Badge from "../../components/Badge";

export default function Programa() {
  const [dia, setDia] = useState("dia1");

  return (
    <section className="ayc-section ayc-section-dark" id="programa">
      <div className="ayc-container">
        <p className="ayc-section-tag light">Programa</p>
        <h2 className="ayc-h2 ayc-h2-light" style={{ maxWidth: 500 }}>
          Dos dias de dialogo, ciencia y accion forestal
        </h2>

        <div className="ayc-day-tabs">
          {["dia1", "dia2"].map((d, i) => (
            <button
              key={d}
              className={`ayc-day-tab ${dia === d ? "active" : ""}`}
              onClick={() => setDia(d)}
            >
              {i === 0 ? "Viernes 11" : "Sabado 12"}
            </button>
          ))}
        </div>

        {PROGRAMA[dia].map((item, i) => (
          <div key={i} className="ayc-prog-item">
            <div className="ayc-prog-hora">{item.hora}</div>
            <div style={{ flex: 1 }}>
              <div className="ayc-prog-titulo">{item.titulo}</div>
              {item.tipo && <div className="ayc-prog-tipo">{item.tipo}</div>}
            </div>
            <Badge tipo={item.badge} />
          </div>
        ))}
      </div>
    </section>
  );
}