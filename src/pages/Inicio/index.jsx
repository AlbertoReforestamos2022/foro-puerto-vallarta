import Hero         from "./Hero";
import Sobre        from "./Sobre"; 
import Programa      from "./Programa"; 
import Ponentes     from "./Ponentes"; 
import RegistroCard from "./RegistroCard"; 
import Footer       from "../../components/Footer";



export default function PageInicio({ goPage }) {
    return (
        <>
            <Hero goPage={goPage} />
            <Sobre />
            <Ponentes />
            <Programa />
            <RegistroCard goPage={goPage} />
            <Footer /> 
        </>
    );
}