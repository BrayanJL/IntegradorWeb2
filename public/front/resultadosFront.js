import {crearInterfazDeResultados} from "./interfaces.js";
import {iniciar} from "./inicio.js";
import {verRanking} from "./rankingFront.js";
import {guardarResultados} from "./peticiones.js";

let respuestasCorrectas;
let respuestasIncorrectas;
let tiempoTotal;
let puntajeTotal;

export function mostrarResultados (nombre, tiempos, puntaje) {
    const interfaz = crearInterfazDeResultados();
    const volver = interfaz.botones.botonVolver;
    const ranking = interfaz.botones.botonRanking;

    volver.addEventListener("click", () => iniciar());
    ranking.addEventListener("click", () => verRanking());

    respuestasCorrectas = 0;
    respuestasIncorrectas = 0;

    calcularTotales(tiempos, puntaje);
    cargarTabla(interfaz, tiempos, puntaje);
    guardarResultados(nombre, respuestasCorrectas, tiempoTotal, puntajeTotal);
};

function calcularTotales (tiempos, puntaje) {
    tiempoTotal = tiempos.reduce((tiempoTotal, tiempo) => tiempoTotal+=tiempo);
    puntajeTotal = puntaje.reduce((puntaje, puntos) => puntaje+=puntos);
    
    tiempoTotal = tiempoTotal.toFixed(2);
}

function cargarTabla (interfaz, tiempos, puntaje) {
    const filas = interfaz.listaDeFilas;
    let indiceFila = 0;

    for (indiceFila; indiceFila<filas.length; indiceFila++) {
        const fila = filas[indiceFila];
        cargarFila(fila, indiceFila, tiempos, puntaje);
    }

    const totales = interfaz.totales;
    cargarTotales(totales);
}

function cargarFila (fila, indiceFila, tiempos, puntaje) {
    cargarNumeroDePregunta(fila, indiceFila);
    cargarPreguntaCorrecta(fila, indiceFila, puntaje);
    cargarPreguntaIncorrecta(fila, indiceFila, puntaje);
    cargarTiempo(fila, indiceFila, tiempos);
    cargarPuntaje(fila, indiceFila, puntaje);
}

function cargarNumeroDePregunta (fila, indiceFila) {
    const celda = fila.childNodes[0];
    celda.textContent = indiceFila+1;
}

function cargarPreguntaCorrecta (fila, indiceFila, puntaje) {
    const celda = fila.childNodes[1];
    const preguntaCorrecta = puntaje[indiceFila]? "SI":"NO";
    celda.textContent = preguntaCorrecta;
    
    if (preguntaCorrecta === "SI") ++respuestasCorrectas;
}

function cargarPreguntaIncorrecta (fila, indiceFila, puntaje) {
    const celda = fila.childNodes[2];
    const preguntaIncorrecta = !puntaje[indiceFila]? "SI":"NO";
    celda.textContent = preguntaIncorrecta;
    
    if (preguntaIncorrecta === "SI") ++respuestasIncorrectas;
}

function cargarTiempo (fila, indiceFila, tiempos) {
    const celda = fila.childNodes[3];
    const tiempo = tiempos[indiceFila];
    celda.textContent = tiempo+"s";
}

function cargarPuntaje (fila, indiceFila, puntaje) {
    const celda = fila.childNodes[4];
    const puntos = puntaje[indiceFila];
    celda.textContent = puntos;
}

function cargarTotales (totales) {
    const tpc = totales.totalPreguntasCorrectas;
    const tpi = totales.totalPreguntasIncorrectas;
    const totalTiempos = totales.totalTiempos;
    const totalPuntaje = totales.totalPuntaje;

    tpc.textContent = respuestasCorrectas;
    tpi.textContent = respuestasIncorrectas;
    totalPuntaje.textContent = puntajeTotal;
    totalTiempos.textContent = tiempoTotal+"s";
}