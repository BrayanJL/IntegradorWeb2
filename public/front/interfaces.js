const menu = document.querySelector(".menu");
const cabecera = document.querySelector(".cabecera");
const contenido = document.querySelector(".contenidoPrincipal");

// #region Inicio

export function crearInterfazDeInicio() {
    reestablecerMenu();
    const interfaz = cargarInterfazDeInicio();
    return interfaz
};

function cargarInterfazDeInicio() {
    const titulo = document.createElement("h1");
    const botonJugar = document.createElement("button");
    const botonRanking = document.createElement("button");

    titulo.textContent = "Integrador";
    botonJugar.textContent = "Jugar";
    botonRanking.textContent = "Ranking";

    botonJugar.classList.add("botones");
    botonRanking.classList.add("botones");

    cabecera.appendChild(titulo);
    contenido.appendChild(botonJugar);
    contenido.appendChild(botonRanking);

    menu.style.display = "block";

    return {
        botonJugar,
        botonRanking
    };
}

// #endregion

// #region Jugador

export function crearInterfazDeJugador() {
    reestablecerMenu();
    const interfaz = cargarInterfazDeJugador();
    return interfaz;
};

function cargarInterfazDeJugador() {
    const titulo = document.createElement("h1");
    const campoNombre = document.createElement("input");
    const botonVolver = document.createElement("button");
    const botonEmpezar = document.createElement("button");

    titulo.textContent = "Nombre del jugador";
    botonVolver.textContent = "Volver";
    botonEmpezar.textContent = "Empezar";

    botonVolver.classList.add("botones");
    botonEmpezar.classList.add("botones");

    cabecera.appendChild(titulo);
    contenido.appendChild(botonVolver);
    contenido.appendChild(campoNombre);
    contenido.appendChild(botonEmpezar);

    menu.style.display = "block";

    return {
        campoNombre,
        botonVolver,
        botonEmpezar
    };
}

// #endregion

// #region Juego

export function crearInterfazDeJuego() {
    reestablecerMenu();
    const interfaz = cargarInterfazDeJuego();
    return interfaz;
};

function cargarInterfazDeJuego() {
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
    siguiente.classList.add("botones");

    divRespuestas.appendChild(respuestaA);
    divRespuestas.appendChild(respuestaB);
    divRespuestas.appendChild(respuestaC);
    divRespuestas.appendChild(respuestaD);
    divSiguiente.appendChild(siguiente);

    cabecera.appendChild(preguntaParteA);
    cabecera.appendChild(preguntaParteB);
    contenido.appendChild(divRespuestas);
    contenido.appendChild(divSiguiente);

    menu.style.display = "block";

    return {
        preguntaParteA,
        preguntaParteB,
        divRespuestas,
        siguiente
    };
}

// #endregion

// #region Resultados

export function crearInterfazDeResultados() {
    reestablecerMenu();

    const tabla = cargarTablaResultados();
    const interfaz = {};
    const filas = 10;
    const celdas = 5;

    interfaz.listaDeFilas = cargarContenidoDeTabla (tabla, filas, celdas),
    interfaz.totales = cargarFooterTablaResultados(tabla);
    interfaz.botones = cargarBotonesDeTablaResultados();

    menu.style.display = "block";
    return interfaz;
};

function cargarTablaResultados() {
    const tabla = document.createElement("table");
    const titulo = document.createElement("caption");

    titulo.textContent = "RESULTADOS DE LA PARTIDA";
    titulo.style.background = "black";
    titulo.style.color = "orange";

    tabla.classList.add("tabla");

    tabla.appendChild(titulo);
    contenido.appendChild(tabla);

    cargarCabeceraDeTablaResultados(tabla);

    return tabla;
}

function cargarCabeceraDeTablaResultados (tabla) {
    const cabeceraTabla = document.createElement("thead");
    const pregunta = document.createElement("th");
    const preguntasCorrectas = document.createElement("th");
    const preguntasIncorrectas = document.createElement("th");
    const tiempo = document.createElement("th");
    const puntaje = document.createElement("th");

    pregunta.textContent = "Pregunta";
    preguntasCorrectas.textContent = "Preguntas Correctas";
    preguntasIncorrectas.textContent = "Preguntas Incorrectas";
    tiempo.textContent = "Tiempo";
    puntaje.textContent = "Puntaje";

    pregunta.classList.add("celdas");
    preguntasCorrectas.classList.add("celdas");
    preguntasIncorrectas.classList.add("celdas");
    tiempo.classList.add("celdas");
    puntaje.classList.add("celdas");

    cabeceraTabla.appendChild(pregunta)
    cabeceraTabla.appendChild(preguntasCorrectas);
    cabeceraTabla.appendChild(preguntasIncorrectas);
    cabeceraTabla.appendChild(tiempo);
    cabeceraTabla.appendChild(puntaje);

    tabla.appendChild(cabeceraTabla);
}

function cargarFooterTablaResultados (tabla) {
    const footerTabla = document.createElement("tfoot");
    const totales = cargarTotales(footerTabla);
    tabla.appendChild(footerTabla);
    return totales
}

function cargarTotales (footerTabla) {
    const filaFooter = document.createElement("tr");
    const total = document.createElement("td");
    const totalPreguntasCorrectas = document.createElement("td");
    const totalPreguntasIncorrectas = document.createElement("td");
    const totalTiempos = document.createElement("td");
    const totalPuntaje = document.createElement("td");

    total.textContent = "TOTAL";

    total.classList.add("totales");
    totalPreguntasCorrectas.classList.add("totales");
    totalPreguntasIncorrectas.classList.add("totales");
    totalTiempos.classList.add("totales");
    totalPuntaje.classList.add("totales");

    filaFooter.appendChild(total);
    filaFooter.appendChild(totalPreguntasCorrectas);
    filaFooter.appendChild(totalPreguntasIncorrectas);
    filaFooter.appendChild(totalTiempos);
    filaFooter.appendChild(totalPuntaje);

    footerTabla.appendChild(filaFooter);

    return {
        totalPreguntasCorrectas,
        totalPreguntasIncorrectas,
        totalTiempos,
        totalPuntaje
    };
}

function cargarBotonesDeTablaResultados() {
    const divBotones = document.createElement("div");
    const botonVolver = document.createElement("button");
    const botonRanking = document.createElement("button");

    botonVolver.textContent = "Volver al inicio";
    botonRanking.textContent = "Ver ranking";

    botonVolver.classList.add("botones");
    botonRanking.classList.add("botones");

    divBotones.appendChild(botonVolver);
    divBotones.appendChild(botonRanking);

    contenido.appendChild(divBotones);

    return {
        botonVolver,
        botonRanking
    };
}

// #endregion

// #region Ranking

export function crearInterfazDeRanking() {
    reestablecerMenu();

    const tabla = cargarTablaRanking();
    const interfaz = {};
    const filas = 20;
    const celdas = 4;

    interfaz.listaDeFilas = cargarContenidoDeTabla (tabla, filas, celdas),
    interfaz.botones = cargarBotonesDeTablaRanking();

    menu.style.display = "block";
    return interfaz;
};

function cargarTablaRanking() {
    const tabla = document.createElement("table");
    const titulo = document.createElement("caption");

    titulo.textContent = "RANKING DE JUGADORES";
    titulo.style.background = "black";
    titulo.style.color = "orange";

    tabla.classList.add("tabla");

    tabla.appendChild(titulo);
    contenido.appendChild(tabla);

    cargarCabeceraDeTablaRanking(tabla);

    return tabla;
}

function cargarCabeceraDeTablaRanking (tabla) {
    const cabeceraTabla = document.createElement("thead");
    const posicion = document.createElement("th");
    const nombre = document.createElement("th");
    const tiempo = document.createElement("th");
    const puntaje = document.createElement("th");

    posicion.textContent = "Posición";
    nombre.textContent = "Nombre del jugador";
    tiempo.textContent = "Tiempo";
    puntaje.textContent = "Puntaje";

    posicion.classList.add("celdas");
    nombre.classList.add("celdas");
    tiempo.classList.add("celdas");
    puntaje.classList.add("celdas");

    cabeceraTabla.appendChild(posicion);
    cabeceraTabla.appendChild(nombre);
    cabeceraTabla.appendChild(tiempo);
    cabeceraTabla.appendChild(puntaje);

    tabla.appendChild(cabeceraTabla);
}

function cargarBotonesDeTablaRanking() {
    const divBotones = document.createElement("div");
    const botonVolver = document.createElement("button");

    botonVolver.textContent = "Volver al inicio";
    botonVolver.classList.add("botones");
    divBotones.appendChild(botonVolver);

    contenido.appendChild(divBotones);

    return {
        botonVolver,
    };
}

// #endregion

export function crearInterfazDeCarga() {
    reestablecerMenu();
    cargarInterfazDeCarga();
}

function cargarInterfazDeCarga() {
    const titulo = document.createElement("h1");
    titulo.textContent = "Cargando preguntas...";
    cabecera.appendChild(titulo);
    menu.style.display = "block";
}

function reestablecerMenu() {
    menu.style.display = "none";

    while (cabecera.childNodes.length > 0) {
        cabecera.firstChild.remove();
    };
    while (contenido.childNodes.length > 0) {
        contenido.firstChild.remove();
    };
};

function cargarContenidoDeTabla (tabla, filas, celdas) {
    const listaDeFilas = [];

    for (let i=0; i<filas; i++) {
        const fila = document.createElement("tr");
        tabla.appendChild(fila);
        listaDeFilas.push(fila);

        for (let j=0; j<celdas; j++) {
            const celda = document.createElement("td");
            celda.classList.add("celdas");
            fila.appendChild(celda);
        }
    }

    return listaDeFilas;
}