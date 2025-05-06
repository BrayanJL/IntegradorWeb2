import {crearInterfazDeCarga, crearInterfazDeInicio} from "./interfaces.js";
import {prepararPartida} from "./juego.js";
import {nombrar} from "./jugador.js";
import {verRanking} from "./rankingFront.js";

export async function iniciar() {
    crearInterfazDeCarga();
    await prepararPartida();
    const interfaz = crearInterfazDeInicio();
    interfaz.botonJugar.addEventListener("click", () => nombrar());
    interfaz.botonRanking.addEventListener("click", () => verRanking());
};