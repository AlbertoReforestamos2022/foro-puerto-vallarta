import { C } from "../styles/tokens"; 

export default function NavLogo({ onClick }) {
    return(
    <div className="ayc-nav-logo" onClick={onClick}>
      <svg viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="18" fill={C.naranja} opacity=".18" />
        <path
          d="M18 6 C13 6 8 11 8 16 C8 20 11 23 15 24 L15 30 L21 30 L21 24 C25 23 28 20 28 16 C28 11 23 6 18 6Z"
          fill={C.medio}
        />
        <path
          d="M18 6 C18 6 14 12 14 18 C14 22 16 25 18 26 C20 25 22 22 22 18 C22 12 18 6 18 6Z"
          fill={C.claro}
          opacity=".9"
        />
      </svg>
      <span>Foro<br /><em>Puerto Vallarta</em></span>
    </div>        
    )
}