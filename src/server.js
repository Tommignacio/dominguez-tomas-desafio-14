import express from 'express';
const app = express();
import { Server as ioServer } from "socket.io";
import http from "http"
import router from './routes/indexRoutes.js';
import morgan from 'morgan';
//importo path para poder usar __dirname
import path from 'path';
import { fileURLToPath } from 'url';
import { socketServer } from './utils/socketServer.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//creo servidores
const httpServer = http.createServer(app); //creo servidor http
const io = new ioServer(httpServer); //creo servidor io Websocket

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


//middleware error
const ruteError = async function (req, res, next) {
    //mensaje de error al no existir la ruta
    return res
        .status(404)
        .json({ error: -2, description: `route '${req.originalUrl}' method '${req.method}' not implemented` });
};

//Motor plantillas
app.set("view engine", "ejs")
app.set("views", "src/views")


//Rutas
app.use("/", router);
app.use("/*", ruteError)


//socket 
socketServer(io)


//empezando servidor
const PORT = 8080;
try {
    httpServer.listen(PORT, () => {
        console.log(`servidor escuchando en el puerto ${PORT}`)
    })
} catch (error) {
    console.log(`error en el puerto ${PORT}`);
}