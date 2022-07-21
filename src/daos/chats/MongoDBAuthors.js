import MongoClass from "../../contenedores/MongoClass.js";
import { authorSchema } from "../../models/AuthorsSchema.js";

export class MongoDBAuthors extends MongoClass {
    constructor() {
        super("usuarios", authorSchema)
    }

    //agregar id mensaje al usuario
    async addIdMssg(user, idMessage) {
        user.mensajes.push(idMessage)
        //actualiza usuario
        const userUpdated = await this.collection.findByIdAndUpdate(user._id, { mensajes: user.mensajes });
        return userUpdated
    }


}