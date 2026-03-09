const BADGE_STYLES = {
  conf:       { bg: "rgba(26,143,176,.3)",   color: "#7ac6f0", label: "Conferencia" },
  panel:      { bg: "rgba(98,139,131,.3)",   color: "#a3cec8", label: "Panel"       },
  taller:     { bg: "rgba(255,107,0,.3)",    color: "#f4b56a", label: "Taller"      },
  campo:      { bg: "rgba(254,174,34,.25)",  color: "#fedb7a", label: "Campo"       },
  libre:      { bg: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.4)", label: "Libre" },
  ceremonial: { bg: "rgba(26,143,176,.3)",   color: "#7ac6f0", label: "Ceremonial"  },
};

export default function Badge({ tipo }) {
    const bs = BADGE_STYLES[tipo] ?? BADGE_STYLES.libre; 

    return (
        <span className="ayc-bdge" style={{ background: bs.bg, color: bs.color }}>
            {bs.label}
        </span>
    )
}