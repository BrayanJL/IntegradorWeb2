import path from "path";
import fs from "fs";

const resultados = path.join(process.cwd(), "public", "back", "partida.json");
const ranking = path.join(process.cwd(), "public", "back", "ranking.json");
const repuestos = path.join(process.cwd(), "public", "back", "DatosDeRepuesto");

export function ejecutarOperacionGet(cabecera) {
    const operacion = cabecera["operacion"];

    switch (operacion) {
        case "obtenerRepuesto": return obtenerRepuesto(cabecera); break;
        case "obtenerResultados": return obtenerResultados(); break;
        case "obtenerRanking": return obtenerRanking(); break;
        default: throw Error("Operación(GET) Desconocida");
    }
}

export function ejecutarOperacionPost(operacion, datos) {
    switch (operacion) {
        case "guardarResultados": return guardarDatos (datos, resultados); break;
        case "guardarRanking": return guardarDatos (datos, ranking); break;
        default: throw Error("Operación(POST) Desconocida");
    }
};

// OPERACIONS GET

function obtenerRepuesto(cabecera) {
    const archivo = cabecera["subregion"].replaceAll(" ","_")+".json";
    const ruta = path.join(repuestos, archivo);

    return ruta;
}

function obtenerResultados() {
    try {
        fs.readFileSync(resultados, "utf-8");
    }
    catch (err) {
        fs.writeFileSync(resultados, JSON.stringify({vacio: true}), "utf8");
    }

    return resultados;
}

function obtenerRanking() {
    try {
        fs.readFileSync(ranking, "utf-8");
    }
    catch (err) {
        fs.writeFileSync(ranking, JSON.stringify([]), "utf8");
    }

    return ranking;
}

// OPERACIONES POST

function guardarDatos (datos, ruta) {
    fs.writeFileSync(ruta, JSON.stringify(datos), "utf8");
    return ruta;
}