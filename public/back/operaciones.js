import path from "path";
import fs from "fs";

const resultados = path.join(process.cwd(), "public", "back", "partida.json");
const ranking = path.join(process.cwd(), "public", "back", "ranking.json");

export function ejecutarOperacionGet(operacion) {
    switch (operacion) {
        case "obtenerResultados": return obtenerResultados(); break;
        case "obtenerRanking": return obtenerRanking(); break;
        default: throw Error("Operación(GET) Desconocida");
    }
}

export function ejecutarOperacionPost(operacion, datos) {
    switch (operacion) {
        case "guardarResultados": return guardarDatos (operacion, datos, resultados); break;
        case "guardarRanking": return guardarDatos (operacion, datos, ranking); break;
        default: throw Error("Operación(POST) Desconocida");
    }
};

// OPERACIONS GET

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

function guardarDatos (operacion, datos, ruta) {
    fs.writeFileSync(ruta, JSON.stringify(datos), "utf8");
    return ruta;
}