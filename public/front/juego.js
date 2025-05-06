import {crearInterfazDeJuego} from "./interfaces.js";
import {obtenerRepuesto} from "./peticiones.js";
import {mostrarResultados} from "./resultadosFront.js";

let interfaz;
let preguntas = obtenerPreguntas();
let cantidadDePreguntas = 10;
let tipoDePregunta;
let paisesOpcion = [];
let paisesEnUso = [];
let puntaje = [];
let tiempos = [];
let tiempo;
let nombre;
let sinContestar = false; 

// #region FUNCIONES PRINCIPALES

export function empezarPartida(nombreJugador) {
    nombre = nombreJugador;
    interfaz = crearInterfazDeJuego();
    preguntar();
    interfaz.siguiente.addEventListener("click", preguntar);
}

export async function prepararPartida() {
    const subregiones = seleccionarSubRegiones(cantidadDePreguntas);
    await obtenerPaises(subregiones);
    return paisesEnUso;
}

function preguntar() {
    if (!sinContestar) {
        const pregunta = preguntas.next();
        tiempo = Date.now();

        if (pregunta.done) {
            mostrarResultados(nombre, tiempos, puntaje);
            restablecerPartida();
        };
    };
}

function restablecerPartida() {
    preguntas = obtenerPreguntas();
    paisesOpcion = [];
    paisesEnUso = [];
    puntaje = [];
    tiempos = [];
    sinContestar = false;

    interfaz.siguiente.removeEventListener("click", preguntar);
}

// #endregion

// #region OBTENCIÓN DE DATOS

function *obtenerPreguntas () {
    const tdp = obtenerTipoDePregunta();

    for (let i=0; i<cantidadDePreguntas; i++) {
        tipoDePregunta = tdp.next().value;
        cargarPregunta(tipoDePregunta);
        yield true;
    }
}

function *obtenerTipoDePregunta() {
    const cantidadDeTipos = 3;
    const listaDeTipos = [];

    for (;;) {
        if (listaDeTipos.length === 0) {
            for (let i = 1; i <= cantidadDeTipos; i++) {
                listaDeTipos.push(i);
            };
        } else {
            const indiceRandom = Math.round(Math.random() * (listaDeTipos.length-1));
            yield listaDeTipos.splice(indiceRandom, 1)[0];
        };
    };
};

async function obtenerPaises (subregiones) {
    const url = "https://restcountries.com/v3.1/subregion/";
    const cantidadDeOpciones = 4;

    for (const sg of subregiones) {
        await fetch(url+sg).
         then((res) => res.json()). 
         then((listaDePaises) => {
            seleccionarPaises(listaDePaises, cantidadDeOpciones);
        }).catch(() => {
            const paisesDeRepuesto = obtenerRepuesto("obtenerRepuesto", sg);
            seleccionarPaisesRepuesto(paisesDeRepuesto, cantidadDeOpciones);
        })
    }
}

function seleccionarPaises(listaDePaises, cantidadDeOpciones) {
    const paises = [];
    let paisSeleccionado;

    for (let i=0; i<cantidadDeOpciones; i++) {
        const indiceRandom = Math.round(Math.random() * (listaDePaises.length-1));
        const pais = listaDePaises.splice(indiceRandom, 1)[0];

        if (!paisSeleccionado) {
            if (pais.capital !== undefined && pais.flags?.svg !== undefined) {
                paisSeleccionado = pais;
                pais.seleccionado = true;
                paises.push(pais);
            }
        } else paises.unshift(pais);

        if (i === cantidadDeOpciones-1) {
            paisesOpcion.push(paises);
        } 
    }
}

function seleccionarPaisesRepuesto(paisesRepuesto, cantidadDeOpciones) {
    paisesRepuesto.then((listaDePaises) => {
        seleccionarPaises(listaDePaises, cantidadDeOpciones);
    })
}

function seleccionarSubRegiones (cantidadDePreguntas) {
    const subregiones = [
        "South America", "Central America", "North America", "Southern Africa", "Middle Africa",
        "Northern Africa", "Western Asia", "Eastern Asia", "Central Asia", "Southern Europe",
        "Northern Europe", "Western Europe", "Central Europe", "Eastern Europe"
    ];

    const sgs = [];

    for (let i=0; i<cantidadDePreguntas; i++) {
        const indiceRandom = Math.round(Math.random() * (subregiones.length-1));
        const subregion = subregiones.splice(indiceRandom, 1)[0];
        sgs.push(subregion);
    }

    return sgs;
}

// #endregion

// #region CARGA DE PREGUNTAS EN LA INTERFAZ

function cargarPregunta (tipoDePregunta) {
    switch (tipoDePregunta) {
        case 1: preguntaCapital(); break;
        case 2: preguntaBandera(); break;
        case 3: preguntaPaisesLimitrofes(); break;
    }
}

function obtenerSegundaParteDeLaPregunta (tipoDeEtiqueta) {
    for (const nodo of interfaz.preguntaParteB.childNodes) {
        nodo.remove();
    }
    return document.createElement(tipoDeEtiqueta);
}

function preguntaCapital() {
    const parteB = obtenerSegundaParteDeLaPregunta("p");
    interfaz.preguntaParteA.textContent = "¿Cual es el país de la siguiente ciudad capital?";
    interfaz.preguntaParteB.appendChild(parteB);

    const paises = paisesOpcion.pop();
    const paisSeleccionado = paises[paises.length-1];
    const capital = paisSeleccionado.capital[0];

    parteB.textContent = capital;

    cargarRespuestas(paises, 1);
}

function preguntaBandera() {
    const parteB = obtenerSegundaParteDeLaPregunta("img");
    interfaz.preguntaParteA.textContent = "¿Qué país esta representado por la siguiente bandera?";
    interfaz.preguntaParteB.appendChild(parteB);

    const paises = paisesOpcion.pop();
    const paisSeleccionado = paises[paises.length-1];
    const bandera = paisSeleccionado.flags.svg;

    parteB.classList.add("bandera");
    parteB.src = bandera;

    cargarRespuestas(paises, 1);
}

function preguntaPaisesLimitrofes() {
    const parteB = obtenerSegundaParteDeLaPregunta("p");
    interfaz.preguntaParteA.textContent = "¿Cuantos países limítrofes tiene el siguiente país?";
    interfaz.preguntaParteB.appendChild(parteB);

    const paises = paisesOpcion.pop();
    const paisSeleccionado = paises[paises.length-1];
    const pais = paisSeleccionado.translations.spa.common;

    parteB.textContent = pais;

    cargarRespuestas(paises, 2);
}

// #endregion

// #region CARGA DE RESPUESTAS EN LA INTERFAZ

function cargarRespuestas (paises, tipoDeRespuesta) {
    switch (tipoDeRespuesta) {
        case 1: cargarRespuestasConNombres(paises); break;
        case 2: cargarRespuestasConNumeros(paises); break;
    }
}

function cargarRespuestasConNombres(paises) {
    restablecerRespuestas();

    for (const boton of interfaz.divRespuestas.childNodes) {
        const indiceRandom = Math.round(Math.random() * (paises.length-1));
        const pais = paises.splice(indiceRandom, 1)[0];
        boton.textContent = pais.translations.spa.common;

        if (pais.seleccionado) {
            boton.addEventListener("click", respuestaCorrecta);
        } else boton.addEventListener("click", respuestaIncorrecta);

        paisesEnUso.push(pais);
    }
}

function cargarRespuestasConNumeros(paises) {
    const paisSeleccionado = paises[paises.length-1];
    let respuesta = paisSeleccionado.borders;
    respuesta = respuesta? respuesta.length : 0;

    let respuestaIncorrectaMayor = respuesta;
    let respuestaIncorrectaMenor = respuesta;

    restablecerRespuestas();

    for (const boton of interfaz.divRespuestas.childNodes) {
        const indiceRandom = Math.round(Math.random() * (paises.length-1));
        const pais = paises.splice(indiceRandom, 1)[0];

        if (pais.seleccionado) {
            boton.textContent = respuesta;
            boton.addEventListener("click", respuestaCorrecta);
        } else {
            boton.addEventListener("click", respuestaIncorrecta);

            if (respuestaIncorrectaMenor === 0) {
                boton.textContent = ++respuestaIncorrectaMayor;
            } else {
                if (Math.round(Math.random() * 1) === 0) {
                    boton.textContent = --respuestaIncorrectaMenor;
                } else {
                    boton.textContent = ++respuestaIncorrectaMayor;
                }
            }
        }

        paisesEnUso.push(pais);
    }
}

function restablecerRespuestas() {
    for (const boton of interfaz.divRespuestas.childNodes) {
        boton.removeEventListener("click", respuestaCorrecta);
        boton.removeEventListener("click", respuestaIncorrecta);
        boton.style["backgroundColor"] = "darkblue";
        boton.disabled = false;

        sinContestar = true;
    };
}

// #endregion

// #region EVALUACIÓN DE RESPUESTAS

function puntuar() {
    switch (tipoDePregunta) {
        case 1: puntaje.push(3); break;
        case 2: puntaje.push(5); break;
        case 3: puntaje.push(3); break;
    }
}

function respuestaCorrecta() {
    for (const boton of interfaz.divRespuestas.childNodes) {
        boton.disabled = true;
    }

    paisesEnUso = [];
    this.style["backgroundColor"] = "green";
    sinContestar = false;

    tiempo = (Date.now() - tiempo) / 1000;
    tiempo = (tiempo.toFixed(2)) * 1;
    tiempos.push(tiempo);
    puntuar();
}

function respuestaIncorrecta() {
    for (const boton of interfaz.divRespuestas.childNodes) {
        boton.disabled = true;
    }

    for (let i=0; i<paisesEnUso.length; i++) {
        const boton = interfaz.divRespuestas.childNodes[i];

        if (paisesEnUso[i].seleccionado) {
            boton.style["backgroundColor"] = "green";
        }
    }

    paisesEnUso = [];
    this.style["backgroundColor"] = "red";
    sinContestar = false;

    tiempo = (Date.now() - tiempo) / 1000;
    tiempo = (tiempo.toFixed(2)) * 1;
    tiempos.push(tiempo);
    puntaje.push(0);
}

// #endregion