import { emitData, readMessages, readAuthors } from "./socketFront.js";


const d = document;

//DOM ELEMENTS
const $chatForm = d.getElementById("chatForm");
const $nombre = d.getElementById("nombre");
const $apellido = d.getElementById("apellido");
const $edad = d.getElementById("edad");
const $alias = d.getElementById("alias");
const $outputChats = d.getElementById("outputChats");
const $mensaje = d.getElementById("mensaje");
const $email = d.getElementById("email");
const $btnSend = d.getElementById("send");



const renderMessages = (data) => {
    console.log(data)
    for (let i of data) {
        // let p = d.createElement("p")
        // p.innerText = i.nombre
        $outputChats.innerHTML += `
        <p> ${i.mensaje}</p>
                `
    }

}


const renderAuthors = (data) => {
    console.log(data)
    for (let i of data) {
        // let p = d.createElement("p")
        // p.innerText = i.nombre
        $outputChats.innerHTML += `
        <p> ${i.nombre}</p>
                `
    }


}

// const hola = (data, data2) => {
//     console.log(data, data2)
//     data.forEach(element => {
//         console.log(element.nombre)
//     });
//     data2.forEach(element => {
//         console.log(element.mensaje)
//     });
//     // for (let i of data) {
//     //     console.log(i.nombre)
//     //     console.log(i.mensaje)
//     //     // // let p = d.createElement("p")
//     //     // // p.innerText = i.nombre
//     //     // $outputChats.innerHTML += `
//     //     // <p> ${i.nombre}</p>
//     //     // <p> ${i.mensaje}</p>
//     //     //         `
//     // }
// }

const renderChat = () => {
    readAuthors(renderAuthors)
    readMessages(renderMessages)
    // readDatas(hola)
    // data.forEach(element => {
    //     $outputChats.innerHTML += `
    //             <p> ${renderAuthors()}</p>
    //             `
    // });
}

d.addEventListener("DOMContentLoaded", (e) => {

    renderChat()

    d.addEventListener("submit", (e) => {
        e.preventDefault();
        $outputChats.innerHTML = ""
        emitData($nombre, $apellido, $edad, $alias, $mensaje, $email);
    });


});

