const socket = io.connect();

//SOCKET FRONT END

//emite data al servidor
export const emitData = (
    $nombre,
    $apellido,
    $edad,
    $alias,
    $mensaje,
    $email
) => {
    socket.emit("chatData", {
        nombre: $nombre.value,
        apellido: $apellido.value,
        edad: $edad.value,
        alias: $alias.value,
        mensaje: $mensaje.value,
        email: $email.value,
    });
};

//lee data de la DB
export const readMessages = (callback) => {
    socket.on("DBdata:messages", callback)
}

export const readAuthors = (callback) => {
    socket.on("DBdata:authors", callback)
}

// export const readDatas = (callback) => {
//     socket.on("DBdata:authors", callback)
//     socket.on("DBdata:messages", callback)

// }




