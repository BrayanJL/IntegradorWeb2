import {ejecutarOperacionGet, ejecutarOperacionPost} from "./public/back/operaciones.js";

import express from "express";
import path from "path";

const app = express();
const puerto = 3000;
const front = path.join(process.cwd(), 'public', 'front');
const back = path.join(process.cwd(), 'public', 'back');

app.use(express.static(front));
app.use(express.static(back));
app.use(express.json()); 


app.get("/", (req, res) => {
    const operacion = req.headers["Operacion"];

    if (!!operacion === false) {
        res.sendFile(path.join(front, "index.html"));
    } else {
        
    }
});

app.post("/", (req, res) => {
    const datos = req.body
    const operacion = req.headers["operacion"];

    if (!!operacion === false) {
        throw Error("Operación Inexistente");
    } else {
        ejecutarOperacionPost(operacion, datos);
    }
});

app.listen(puerto, () => {
    console.log(`Escuchando en el puerto ${puerto}`);
});