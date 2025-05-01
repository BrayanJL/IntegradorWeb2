import {crearInterfazDeJuego} from "./interfaces.js";

let interfaz = {};
const paisesOpcion = [];
const paisesEnUso = [];
const preguntas = obtenerPreguntas();
const cantidadDePreguntas = 10;
let sinContestar = false; 

// FUNCIONES PRINCIPALES

export function empezarPartida() {
    interfaz = crearInterfazDeJuego();
    preguntar();
    interfaz.siguiente.addEventListener("click", preguntar);
}

export function prepararPartida() {
    const subregiones = seleccionarSubRegiones(cantidadDePreguntas);
    obtenerPaises(subregiones);
}

function preguntar() {
    if (!sinContestar) preguntas.next();
}


// OBTENCIÓN DE DATOS

function *obtenerPreguntas () {
    const tipoDePregunta = obtenerTipoDePregunta();

    for (let i=0; i<cantidadDePreguntas; i++) {
        const tipo = tipoDePregunta.next().value;

        cargarPregunta(tipo);

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

function obtenerPaises (subregiones) {
    const url = "https://restcountries.com/v3.1/subregion/";
    const cantidadDeOpciones = 4;

    subregiones.forEach((sg) => {
        fetch(url+sg).
         then((res) => res.json()). 
         then((listaDePaises) => {
            const paises = [];

            for (let i=0; i<cantidadDeOpciones; i++) {
                const indiceRandom = Math.round(Math.random() * (listaDePaises.length-1));
                const pais = listaDePaises.splice(indiceRandom, 1)[0];

                if (i === cantidadDeOpciones-1) {
                    pais.seleccionado = true;
                    paises.push(pais);
                    paisesOpcion.push(paises);

                } else {
                    paises.push(pais);
                }
            }
        })
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


// CARGA DE PREGUNTAS EN LA INTERFAZ

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

// CARGA DE RESPUESTAS EN LA INTERFAZ

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
        boton.style.backgroundColor = "darkblue";
        boton.disabled = false;

        sinContestar = true;
    };
}

function respuestaCorrecta() {
    for (const boton of interfaz.divRespuestas.childNodes) {
        boton.disabled = true;
    }

    this.style.backgroundColor = "green";
    sinContestar = false;
}

function respuestaIncorrecta() {
    for (const boton of interfaz.divRespuestas.childNodes) {
        boton.disabled = true;
    }

    this.style.backgroundColor = "red";
    sinContestar = false;
}