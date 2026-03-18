import {  logoReforestamos, logoArborDay, logoTCOW, logoPuertoVallarta, LogosJuntos } from '../imgs'; 
import { logosFooter } from '../imgs/index';

export default function Footer({ goPage }) {
    return(
        <footer className="ayc-footer">
            <div className="ayc-footer-logo">
                {/* {logosFooter.map((logo) => (
                    <img key={logo.alt} src={logo.src} style={{ width: logo.width }}  alt={logo.alt} />
                ))} */}
            </div>

            <div className="ayc-footer-links">
                <a href="https://www.reforestamosmexico.org/aviso-de-privacidad/" target='_blank'>Aviso de privacidad</a>
                <a onClick={() => goPage("registro")}>Registro</a>
                <a href="https://www.reforestamosmexico.org" target="_blank" rel="noreferrer">Reforestamos México</a>

            </div>

            <div className="ayc-footer-copy">
                &copy; 2026 Reforestamos México A.C. &middot; 
                <br />
                Todos los derechos reservados
            </div>
        </footer>
    )
}