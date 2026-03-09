
export default function Footer() {
    return(
        <footer className="ayc-footer">
            <div className="ayc-footer-logo">
                Foro Puerto Vallarta . <em>Reforestamos México</em>
            </div>

            <div className="ayc-footer-social">
                {["fab fa-facebook-f", "fa fa-twitter", "fab fa-instagram", "fab fa-linkedin-in"].map((ic) => (
                    <button key={ic} className="ayc-social-btn">
                        <i className={ic} />
                    </button>
                ))}
            </div>

            <div className="ayc-footer-links">
                <a href="#">Aviso de privacidad</a>
                <a href="#">Contacto</a>
                <a href="https://www.reforestamosmexico.org" target="_blank" rel="noreferrer">Reforestamos México</a>

            </div>

            <div className="ayc-footer-copy">
                &copy; 2025 Reforestamos México A.C. &middot; Todos los derechos reservados
            </div>
        </footer>
    )
}