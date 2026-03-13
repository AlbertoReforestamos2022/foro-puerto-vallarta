import { C } from "../styles/tokens"; 
import { arcosPuertoVallartaSolo, logoReforestamosVerde } from '../imgs';

export default function NavLogo({ onClick }) {
    return(
    <div className="ayc-nav-logo" onClick={onClick}>
      <img src={ arcosPuertoVallartaSolo } width="100" alt="" />
      <img src={ logoReforestamosVerde } width="80" alt="" />
      {/* <span>Foro<br /><em>Puerto Vallarta</em></span> */}
    </div>        
    )
}