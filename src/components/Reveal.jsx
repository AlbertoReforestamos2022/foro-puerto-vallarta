import { useReveal } from "../hooks/useReveal";

export default function Reveal({ children, style }) {
    const ref = useReveal(); 

    return (
        <div ref={ref} className="ayc-reveal" style={style} >
            {children}
        </div>
    );
}
