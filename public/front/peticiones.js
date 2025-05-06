
export async function obtenerDatos (operacion) {
    const url = "http://localhost:3000/";

    const datos = await fetch(url, {
        method: "GET",
        headers: {
            "Operacion": operacion,
            "Content-Type": "application/json"
        },
    });

    return datos.json();
}

export async function guardarResultados (nombre, tiempoTotal, puntajeTotal) {
    const url = "http://localhost:3000/";

    const datos = await fetch (url, {
        method: "POST",
        headers: {
            "Operacion": "guardarResultados",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            tiempo: tiempoTotal,
            puntaje: puntajeTotal,
            marcaDeTiempo: Date.now()
        })
    })

    return datos.json();
}

export async function guardarRanking (ranking) {
    const url = "http://localhost:3000/";

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