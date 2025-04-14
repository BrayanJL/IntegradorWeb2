
import express from "express";
import {fileURLToPath} from "url"; 
import path, {dirname} from "path";

const app = express();
const puerto = 3000;
const directorio = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public")) // Middleware para servir archivos estáticos

app.get("/", (req, res) => {
    res.sendFile(path.join(directorio, "index.html"));
});

app.listen(puerto, () => {
    console.log(directorio);
    console.log(`Escuchando en el puerto ${puerto}, ${directorio}`);
});