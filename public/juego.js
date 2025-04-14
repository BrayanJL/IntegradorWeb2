import {crearInterfazDeJuego} from "./interfaces.js";

export function empezarPartida() {
    preguntar();
};


// EVENTO PRINCIPAL

function crearPreguntas() {
    const cantidadDePreguntas = 10;
    const preguntas = obtenerPreguntas(cantidadDePreguntas);

    function siguientePregunta() {
        if (preguntas.next().done) mostrarResutados();
    };

    return siguientePregunta;
};

const preguntar = crearPreguntas();


// GENERADORES

function *obtenerPreguntas(cantidadDePreguntas) {
    const interfaz = crearInterfazDeJuego();
    const listaDePaises = obtenerPaises(cantidadDePreguntas);
    const tipoDePregunta = obtenerTipoDePregunta();

    interfaz.siguiente.addEventListener("click", preguntar);

    for (let i = 0; i < cantidadDePreguntas; i++) {
        const pregunta = tipoDePregunta.next().value;
        const paises = listaDePaises.next().value;

        resteblecerOpciones(interfaz);
        cargarPregunta(interfaz, pregunta, paises);
        cargarRespuestas(interfaz, pregunta, paises);

        yield true;
    };
};

function *obtenerPaises(cantidadDePreguntas) {

    const subregion = obtenerSubregion(cantidadDePreguntas);

    for (let i = 0; i < cantidadDePreguntas; i++) {
        yield subregion.next().value. 
         then((listaDePaises) => {
            const cantidadDeOpciones = 4;
            const paises = [];

            for (let j = 0; j < cantidadDeOpciones; j++) {
                const pais = {};
                const indiceRandom = Math.round(Math.random() * (listaDePaises.length-1));

                pais.pais = listaDePaises.splice(indiceRandom, 1)[0];

                if (j === (cantidadDeOpciones-1)) {
                    pais.seleccionado = true;
                };

                paises.push(pais);
            };

            return paises;
         }) 
        ;
    };
};

function *obtenerSubregion(cantidadDePreguntas) {

    const url = "https://restcountries.com/v3.1/subregion/";

    const subregiones = [
        "South America", "Central America", "North America", "Southern Africa", "Middle Africa",
        "Northern Africa", "Western Asia", "Eastern Asia", "Central Asia", "Southern Europe",
        "Northern Europe", "Western Europe", "Central Europe", "Eastern Europe"
    ];

    for (let i = 0; i < cantidadDePreguntas; i++) {
        const indiceRandom = Math.round(Math.random() * (subregiones.length-1));
        const subregion = subregiones.splice(indiceRandom, 1);

        yield fetch(url+subregion).
         then((responce) => responce.json());
        ;
    }; 
};

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



// ACTUALIZACIÓN DE INTERFAZ

function cargarPregunta(interfaz, pregunta, paises) {
    switch (pregunta) {
        case 1: preguntaCapital(interfaz, paises); break;
        case 2: preguntaBandera(interfaz, paises); break;
        case 3: preguntaPaisesLimitrofes(interfaz, paises); break;
    };
};

function cargarRespuestas(interfaz, pregunta, paises) {
    switch (pregunta) {
        case 1: respuestasConNombre(interfaz, paises); break;
        case 2: respuestasConNombre(interfaz, paises); break;
        case 3: respuestasConNumero(interfaz, paises); break;
    };
};

function preguntaCapital(interfaz, paises) {
    for (const element of interfaz.preguntaParteB.childNodes) {
        element.remove();
    };

    interfaz.preguntaParteA.textContent = "¿Cual es el país de la siguiente ciudad capital?";

    const parteB = document.createElement("p");
    interfaz.preguntaParteB.appendChild(parteB);

    paises.then((listaDePaises) => {
        const paisSeleccionado = listaDePaises[listaDePaises.length-1];
        const capital = paisSeleccionado.pais.capital[0];

        parteB.textContent = capital;
    });
};

function preguntaBandera(interfaz, paises) {
    for (const element of interfaz.preguntaParteB.childNodes) {
        element.remove();
    };

    interfaz.preguntaParteA.textContent = "¿Qué país esta representado por la siguiente bandera?";

    const parteB = document.createElement("img");
    interfaz.preguntaParteB.appendChild(parteB);
    parteB.classList.add("bandera");

    paises.then((listaDePaises) => {
        const paisSeleccionado = listaDePaises[listaDePaises.length-1];
        const bandera = paisSeleccionado.pais.flags.svg;

        parteB.src = bandera;
    });
};

function preguntaPaisesLimitrofes(interfaz, paises) {
    for (const element of interfaz.preguntaParteB.childNodes) {
        element.remove();
    };

    interfaz.preguntaParteA.textContent = "¿Cuantos países limítrofes tiene el siguiente país?";

    const parteB = document.createElement("p");
    interfaz.preguntaParteB.appendChild(parteB);

    paises.then((listaDePaises) => {
        const paisSeleccionado = listaDePaises[listaDePaises.length-1];
        const pais = paisSeleccionado.pais.translations.spa.common;

        parteB.textContent = pais;
    });
};

function respuestasConNombre(interfaz, paises) {
    const botones = [];
    const paisesUsados = [];

    for (const boton of interfaz.divRespuestas.childNodes) {
        botones.push(boton);
    };

    paises.then((listaDePaises) => {
        const cantidadDeOpciones = 4;
        
        for (let i = 0; i < cantidadDeOpciones; i++) {

            const deshabilitarRespuestas = crearFuncionDehabilitadora(botones, paisesUsados);

            const indiceRandom = Math.round(Math.random() * (listaDePaises.length-1));
            let paisAlAzar = listaDePaises.splice(indiceRandom,1)[0];
            botones[i].textContent = paisAlAzar.pais.translations.spa.common;

            paisesUsados.push(paisAlAzar);

            if (paisAlAzar.seleccionado) {
                botones[i].addEventListener("click", respuestaCorrecta);
                botones[i].addEventListener("click", deshabilitarRespuestas);
            } else {
                botones[i].addEventListener("click", respuestaIncorrecta);
                botones[i].addEventListener("click", deshabilitarRespuestas);
            }
        };
    });
};

function respuestasConNumero(interfaz, paises) {
    const botones = [];
    const paisesUsados = [];

    for (const boton of interfaz.divRespuestas.childNodes) {
        botones.push(boton);
    };

    paises.then((listaDePaises) => {

        const deshabilitarRespuestas = crearFuncionDehabilitadora(botones, paisesUsados)

        const cantidadDeOpciones = 4;
        const paisSeleccionado = listaDePaises[listaDePaises.length-1];
        let respuestaSeleccionada = paisSeleccionado.pais.borders?.length;

        if (respuestaSeleccionada === undefined) respuestaSeleccionada = 0;
        
        let respuestaIncorrectaMenor = respuestaSeleccionada;
        let respuestaIncorrectaMayor = respuestaSeleccionada;

        for (let i = 0; i < cantidadDeOpciones; i++) {
            let indiceRandom = Math.round(Math.random() * (listaDePaises.length-1));
            const paisAlAzar = listaDePaises.splice(indiceRandom, 1)[0];

            paisesUsados.push(paisAlAzar);

            if (paisAlAzar.seleccionado) {
                botones[i].textContent = respuestaSeleccionada;
                botones[i].addEventListener("click", respuestaCorrecta);
                botones[i].addEventListener("click", deshabilitarRespuestas);
            } else {
                botones[i].addEventListener("click", respuestaIncorrecta);
                botones[i].addEventListener("click", deshabilitarRespuestas);

                if (respuestaIncorrectaMenor === 0) {
                    botones[i].textContent = ++respuestaIncorrectaMayor;
                } else {
                    if (Math.round(Math.random() * 1) === 0) {
                        botones[i].textContent = --respuestaIncorrectaMenor;
                    } else {
                        botones[i].textContent = ++respuestaIncorrectaMayor;
                    };
                };
            };
        };
    });
};



// MÁS EVENTOS


function mostrarResutados() {
    console.log("fin");
}

function respuestaIncorrecta() {
    console.log("INCORRECTO");
    this.style.backgroundColor = "red";
};

function respuestaCorrecta() {
    console.log("CORRECTO");
};

function obtenerEstadoRespuestas() {
    
}

function resteblecerOpciones(interfaz) {
    for (const boton of interfaz.divRespuestas.childNodes) {
        boton.removeEventListener("click", respuestaCorrecta);
        boton.removeEventListener("click", respuestaIncorrecta);
        boton.style.backgroundColor = "darkblue";
        boton.disabled = false;
    };
};

function crearFuncionDehabilitadora(botones, paisesUsados) {
    function deshabilitarRespuestas() {
        for (let i = 0; i < botones.length; i++) {
            botones[i].disabled = true;

            if (paisesUsados[i].seleccionado) {
                botones[i].style.backgroundColor = "green";
                paisesUsados[i].seleccionado = undefined;
            }
        };
    };

    return deshabilitarRespuestas;
};