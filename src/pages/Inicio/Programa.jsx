import { useState } from "react";
import { PROGRAMA } from "../../data/programa";
import Badge from "../../components/Badge";

export default function Programa() {
  const [dia, setDia] = useState("dia1");

  return (
    <section className="ayc-section ayc-section-programa " id="programa">
      <div className="ayc-container">
        <h2 className="ayc-h2 ayc-h2-light" style={{ maxWidth: 500 }}>
          Programa
        </h2>
        <span className="ayc-section-tag light"></span>

        <div className="ayc-day-tabs">
          {["dia1"].map((d, i) => (
            <button
              key={d}
              className={`ayc-day-tab ${dia === d ? "active" : ""}`}
              onClick={() => setDia(d)}
            >
              {i === 0 ? "Viernes 29" : ""}
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
            {/* <Badge tipo={item.badge} /> */}
          </div>
        ))}
      </div>
    </section>
  );
}