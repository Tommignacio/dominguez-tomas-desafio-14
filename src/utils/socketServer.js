//socket desde el servidor
import { authorsDao as apiAuthors, messagesDao as apiMessages } from "../daos/index.js";


export const socketServer = (io) => {
    io.on("connection", async (socket) => {
        console.log("conection socket");
        //lee las DBs autores y mensajes
        const authors = await apiAuthors.getAll();
        const messages = await apiMessages.getAll();
        //emite al front los usuarios y mensajes de las DBs
        socket.emit("DBdata:authors", authors)
        socket.emit("DBdata:messages", messages)
        //recibe los datos del mensaje con el usuario desde el front
        socket.on("chatData", async (data) => {
            //crea nuevo usuario y mensaje 
            const authorCreated = await apiAuthors.create(data)
            const messageCreated = await apiMessages.create(data)
            //agrega id de mensajes al usuario y agrega id de usario al mensaje
            await apiAuthors.addIdMssg(authorCreated, messageCreated._id)
            await apiMessages.addIdAuthor(messageCreated, authorCreated._id)
            //devuelve DBs actualizadas
            const authorsUpdated = await apiAuthors.getAll();
            const messagesUpdated = await apiMessages.getAll();
            //emite al front las BDs
            socket.emit("DBdata:authors", authorsUpdated)
            socket.emit("DBdata:messages", messagesUpdated)
        })
    })
}