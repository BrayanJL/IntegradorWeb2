import {crearInterfazDeInicio} from "./interfaces.js";
import {nombrar} from "./jugador.js";
import {verRanking} from "./rankingFront.js";

export function iniciar() {
    const interfaz = crearInterfazDeInicio();
    interfaz.botonJugar.addEventListener("click", () => nombrar());
    interfaz.botonRanking.addEventListener("click", () => verRanking());
};