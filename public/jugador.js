import {crearInterfazDeJugador} from "./interfaces.js";
import {iniciar} from "./inicio.js";
import {empezarPartida} from "./juego.js";

export function nombrar() {
    const interfaz = crearInterfazDeJugador();
    interfaz.botonVolver.addEventListener("click", () => iniciar());
    interfaz.botonEmpezar.addEventListener("click", () => eventoEmpezar());

    function eventoEmpezar() {
        if (interfaz.campoNombre.value.trim() !== "") {
            empezarPartida();
            
            //Agregar fetch para cargar el nombre en al back;
        };
    };
};