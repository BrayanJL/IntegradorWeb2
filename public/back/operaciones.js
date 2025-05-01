import path from "path";
import fs from "fs";

export function ejecutarOperacionGet(operacion) {
    switch (operacion) {

    }
};

export function ejecutarOperacionPost(operacion, datos) {
    switch (operacion) {
        case "guardarNombre": guardarNombre(datos); break;
        default: throw Error("Operación Desconocida");
    }
};

// OPERACION GET:

function obtenerDatosDelJugador (datos) {

};

// OPERACION POST:

function guardarNombre (datos) {
    const ruta = path.join(process.cwd(), "public", "back");
    const nombreArchivo = path.join(ruta, "jugadorActual.json");
    const nombre = {nombre: datos["nombre"]};

    console.log(ruta);

    fs.writeFile(nombreArchivo , JSON.stringify(nombre), (err) => {
        if (err) {
            throw Error("Error al guardar el nombre del jugador");
        }
        else {
            console.log("Nombre del jugador guardado con éxito");
        }
    })
};