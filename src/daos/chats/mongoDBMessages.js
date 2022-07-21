import MongoClass from "../../contenedores/MongoClass.js";
import { messagesSchema } from "../../models/MessagesSchema.js";


export class MongoDBMessages extends MongoClass {
    constructor() {
        super("mensajes", messagesSchema)
    }

    async addIdAuthor(message, idAuthor) {
        message.autor = idAuthor
        //actualiza mensaje
        const messageUpdated = await this.collection.findByIdAndUpdate(message._id, { autor: message.autor });
        return messageUpdated

    }
}