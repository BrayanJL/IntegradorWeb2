
const url = "https://integradorweb2-uwe2.onrender.com/";

export async function obtenerRepuesto (operacion, subregion) {
    const datos = await fetch(url, {
        method: "GET",
        headers: {
            "Operacion": operacion,
            "subregion": subregion,
            "Content-Type": "application/json"
        },
    });

    return datos.json();
}

export async function obtenerDatos (operacion) {
    const datos = await fetch(url, {
        method: "GET",
        headers: {
            "Operacion": operacion,
            "Content-Type": "application/json"
        },
    });

    return datos.json();
}

export async function guardarResultados (nombre, respuestasCorrectas, tiempoTotal, puntajeTotal) {
    const datos = await fetch (url, {
        method: "POST",
        headers: {
            "Operacion": "guardarResultados",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            respuestas: respuestasCorrectas,
            tiempo: tiempoTotal,
            puntaje: puntajeTotal,
            marcaDeTiempo: Date.now()
        })
    })

    return datos.json();
}

export async function guardarRanking (ranking) {
    const datos = await fetch (url, {
        method: "POST",
        headers: {
            "Operacion": "guardarRanking",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ranking)  
    })

    return datos.json();
}