import path from "path";
import fs from "fs";

export function ejecutarOperacionGet(operacion, datos) {
    switch (operacion) {
        case "obtenerResultados": obtenerResultados(datos); break;
        case "obtenerRanking": obtenerRanking(datos); break;
        default: throw Error("Operación(GET) Desconocida");
    }
};

export function ejecutarOperacionPost(operacion, datos) {
    switch (operacion) {
        case "guardarResultados": guardarResultados(datos); break;
        case "guardarRanking": guardarRanking(datos); break;
        default: throw Error("Operación(POST) Desconocida");
    }
};

// OPERACION GET:

async function obtenerResultados(datos) {
    return await fetch("partida.json").
     then((r) => r.json()). 
     then((r) => r). 
     catch((err) => console.log(err))
    ;
};

async function obtenerRanking(datos) {
    return await fetch("ranking.json").
     then((r) => r.json()). 
     then((r) => r). 
     catch((err) => console.log(err))
    ;
}


// OPERACION POST:

function guardarResultados(datos) {
    const ruta = path.join(process.cwd(), "public", "back");
    const nombreArchivo = path.join(ruta, "partida.json");

    fs.writeFile(nombreArchivo , JSON.stringify(datos), (err) => {
        if (err) {
            throw Error("Error al guardar resultados");
        }
        else {
            console.log("Resultados guardados con éxito");
        }
    })
}

function guardarRanking(datos) {
    
}