
const menu = document.querySelector(".menu");
const cabecera = document.querySelector(".cabecera");
const contenido = document.querySelector(".contenidoPrincipal");

export function crearInterfazDeInicio() {
    reestablecerMenu();

    const nodosCabecera = [];
    const nodosContenido = [];

    const titulo = document.createElement("h1");
    const botonJugar = document.createElement("button");
    const botonRanking = document.createElement("button");

    titulo.textContent = "Integrador";
    botonJugar.textContent = "Jugar";
    botonRanking.textContent = "Ranking";

    botonJugar.classList.add("botones");
    botonRanking.classList.add("botones");

    nodosCabecera.push(titulo);
    nodosContenido.push(botonJugar);
    nodosContenido.push(botonRanking);

    cargarCabecera(nodosCabecera);
    cargarContenido(nodosContenido);

    menu.style.display = "block";

    return {
        tipo: "inicio",
        menu, 
        titulo, 
        botonJugar, 
        botonRanking
    };
};

export function crearInterfazDeJugador() {
    reestablecerMenu();

    const nodosCabecera = [];
    const nodosContenido = [];

    const titulo = document.createElement("h1");
    const campoNombre = document.createElement("input");
    const botonVolver = document.createElement("button");
    const botonEmpezar = document.createElement("button");

    titulo.textContent = "Nombre del jugador";
    botonVolver.textContent = "Volver";
    botonEmpezar.textContent = "Empezar";

    botonVolver.classList.add("botones");
    botonEmpezar.classList.add("botones");

    nodosCabecera.push(titulo);
    nodosContenido.push(botonVolver);
    nodosContenido.push(campoNombre);
    nodosContenido.push(botonEmpezar);

    cargarCabecera(nodosCabecera);
    cargarContenido(nodosContenido);

    menu.style.display = "block";

    return {
        tipo: "jugador",
        menu,
        campoNombre,
        botonVolver,
        botonEmpezar
    };
};

export function crearInterfazDeJuego() {
    reestablecerMenu();

    const nodosCabecera = [];
    const nodosContenido = [];

    const preguntaParteA = document.createElement("h1");
    const preguntaParteB = document.createElement("div");

    const divRespuestas = document.createElement("div");
    const divSiguiente = document.createElement("div");
    const respuestaA = document.createElement("button");
    const respuestaB = document.createElement("button");
    const respuestaC = document.createElement("button");
    const respuestaD = document.createElement("button");
    const siguiente = document.createElement("button");

    siguiente.textContent = "Siguiente";

    respuestaA.classList.add("botonesRespuesta");
    respuestaB.classList.add("botonesRespuesta");
    respuestaC.classList.add("botonesRespuesta");
    respuestaD.classList.add("botonesRespuesta");
    siguiente.classList.add("botones")

    divRespuestas.appendChild(respuestaA);
    divRespuestas.appendChild(respuestaB);
    divRespuestas.appendChild(respuestaC);
    divRespuestas.appendChild(respuestaD);

    divSiguiente.appendChild(siguiente);

    nodosCabecera.push(preguntaParteA);
    nodosCabecera.push(preguntaParteB);
    nodosContenido.push(divRespuestas);
    nodosContenido.push(divSiguiente);

    cargarCabecera(nodosCabecera);
    cargarContenido(nodosContenido);

    menu.style.display = "block";

    return {
        tipo: "juego",
        menu,
        preguntaParteA,
        preguntaParteB,
        divRespuestas,
        respuestaA,
        respuestaB,
        respuestaC,
        respuestaD,
        siguiente
    };
};

// Sin hacer todavía.
export function crearInterfazDeResultados() {
    
};

// Sin hacer todavía.
export function crearInterfazDeRanking() {

};


function reestablecerMenu() {
    menu.style.display = "none";

    while (cabecera.childNodes.length > 0) {
        cabecera.firstChild.remove();
    };
    while (contenido.childNodes.length > 0) {
        contenido.firstChild.remove();
    };
};

function cargarCabecera(listaDeNodos) {
    for (const nodo of listaDeNodos) {
        cabecera.appendChild(nodo);
    };
}

function cargarContenido(listaDeNodos) {
    for (const nodo of listaDeNodos) {
        contenido.appendChild(nodo);
    };
}