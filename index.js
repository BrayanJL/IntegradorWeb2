import {ejecutarOperacionGet, ejecutarOperacionPost} from "./public/back/operaciones.js";

import express from "express";
import path from "path";

const app = express();
const puerto = 3000;
const front = path.join(process.cwd(), "public", "front");
const back = path.join(process.cwd(), "public", "back");

app.use(express.json()); 

app.get("/", (req, res) => {
    const cabecera = req.headers;
    const operacion = cabecera["operacion"];

    if (!!operacion === false) {
        const archivo = path.join(front, "index.html");
        res.sendFile(archivo);
    } else {
        const archivo = ejecutarOperacionGet(cabecera);
        res.sendFile(archivo);
    }
})

app.post("/", (req, res) => {
    const datos = req.body
    const operacion = req.headers["operacion"];

    if (!!operacion === false) {
        throw Error("Operación Inexistente");
    } else {
        const archivo = ejecutarOperacionPost(operacion, datos);
        res.sendFile(archivo);
    }
});

app.use(express.static(front));
app.use(express.static(back));

app.listen(puerto, () => {
    console.log(`Escuchando en el puerto ${puerto}`);
});