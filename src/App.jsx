import { useState } from 'react';
import Nav from './components/Nav';
import PageInicio from './pages/Inicio';
import PageRegistro from './pages/Registro';
import PageToolkit from './pages/Toolkit';
import PageAdmin   from './pages/Admin';

// Impotar Nav, PageRegistro, PageToolKit


export default function App() {
  const [page, setPage] = useState(() => window.location.hash.replace("#", "") || "inicio");
  const [menuOpen, setMenuOpen] = useState(false); 


  const goPage = (p) => {
    setPage(p);
    setMenuOpen(false);
    window.location.hash = p;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return(
    <div>
      {/* Agregar los componentes de Nav, PageRegistration, PageToolKit */}
      <Nav page={page} goPage={goPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>

      <div style={{ paddingTop: 70 }}>
        {page === "inicio"   && <PageInicio goPage={goPage}   />}
        {page === "registro" && <PageRegistro goPage={goPage} />}
        {page === "toolkit"  && <PageToolkit goPage={goPage}  />}
        {page === "admin"    && <PageAdmin />}
      </div>
    </div>  
  );  
}
