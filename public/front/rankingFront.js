import {crearInterfazDeRanking} from "./interfaces.js";
import {iniciar} from "./inicio.js";
import {guardarRanking, obtenerDatos} from "./peticiones.js";

export function verRanking() {
    const interfaz = crearInterfazDeRanking();
    const listaDeFilas = interfaz.listaDeFilas;
    const volver = interfaz.botones.botonVolver;

    prepararRanking(listaDeFilas);
    cargarPosiciones(listaDeFilas);

    volver.addEventListener("click", () => iniciar());
};

function cargarPosiciones(listaDeFilas) {
    for (let i = 0; i<listaDeFilas.length; i++) {
        const celda = listaDeFilas[i].childNodes[0];
        celda.textContent = i+1;
    }
}

async function prepararRanking(listaDeFilas) {
    const resultados = await obtenerDatos("obtenerResultados");
    let ranking = await actualizarRanking (resultados);
    ranking = ordenarRanking(ranking);
    cargarTabla(ranking, listaDeFilas);

    console.log(resultados);
    console.log(ranking);
}

async function actualizarRanking (resultados) {
    let ranking = await obtenerDatos("obtenerRanking");
    let actualizable = true;

    if (!resultados.vacio) {
        for (let i=0; i<ranking.length; i++) {
            const partida = ranking[i];

            if (partida.marcaDeTiempo === resultados.marcaDeTiempo) {
                actualizable = false;
                break;
            }
        }

        if (actualizable) {
            ranking.unshift(resultados);
            return await guardarRanking (ranking);
        }
    }

    return ranking;
}

function ordenarRanking(ranking) {
    return ranking.sort((a,b) => {
        if (a.puntaje !== b.puntaje) {
            return (b.puntaje - a.puntaje);
        } else return (a.tiempo - b.tiempo)
    });
}

function cargarTabla (ranking, listaDeFilas) {
    for (let i=0; i<listaDeFilas.length; i++) {
        const filaRanking = ranking[i];
        const filaInterfaz = listaDeFilas[i];
        cargarFila (filaRanking, filaInterfaz);
    }
}

function cargarFila (filaRanking, filaInterfaz) {
    const celdaNombre = filaInterfaz.childNodes[1];
    const celdaTiempo = filaInterfaz.childNodes[2];
    const celdaPuntaje = filaInterfaz.childNodes[3];

    celdaNombre.textContent = filaRanking.nombre;
    celdaTiempo.textContent = filaRanking.tiempo;
    celdaPuntaje.textContent = filaRanking.puntaje;
}