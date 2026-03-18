import { C } from "../styles/tokens";
import { fotoErnesto, fotoSophie, fotoIan } from "../imgs";

export const INVITADOS = [
  {
    nombre: "Sophie Plitt ",
    tema: "",
    pais: "USA",
    organizacion: "Arbor Day Foundation",
    emoji: "Sophie",
    img: `${fotoSophie}`,
    bg: `linear-gradient(135deg, #b34d00, ${C.naranja})`,
  },
  {
    nombre: "Ernesto Herrera",
    tema: "",
    pais: "México",
    organizacion: "Director General - Reforestamos México",
    emoji: "Ernesto",
    img: `${fotoErnesto}`,
    bg: `linear-gradient(135deg, #b34d00, ${C.naranja})`,
  },
  {
    nombre: "Ian Hanou ",
    tema: "",
    pais: "USA",
    organizacion: "CEO - Planit Geo",
    emoji: "Pedro",
    img: `${fotoIan}`,
    bg: `linear-gradient(135deg, #b34d00, ${C.naranja})`,
  },
  {
    nombre: "Mariano Sanchez",
    tema: "",
    pais: "España",
    organizacion: "Presidente - Asociación Española de Arboricultura",
    emoji: "Mauricio",
    bg: `linear-gradient(135deg, #b34d00, ${C.naranja})`,
  }
];