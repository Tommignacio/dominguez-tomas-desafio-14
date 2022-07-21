import mongoose from "mongoose";
import config from "../config.js";

//conecta a DB mongo atlas
mongoose.connect(config.mongoDB.URL, config.mongoDB.options);

class MongoClass {
    constructor(collectionName, docSchema) {
        this.collection = mongoose.model(collectionName, docSchema);
    }

    //crea nuevo documento
    async create(doc) {
        try {
            const newDoc = await this.collection.create(doc)
            return newDoc
        } catch (err) {
            throw new Error("error:", err);
        }
    }

    //devuelve todos los documentos
    async getAll() {
        try {
            const all = await this.collection.find({})
            return all
        } catch (err) {
            throw new Error("error:", err);
        }
    }

    //devuelve el doc que coincide con el id
    async getOne(id) {
        try {
            const one = await this.collection.findById(id)
            return one
        } catch (err) {
            throw new Error("error: Producto no encontrado");
        }
    }
    //actualiza un documento por su id
    async update(id, doc) {
        try {
            const updateDoc = await this.collection.findByIdAndUpdate(id, doc)
            return updateDoc
        } catch (err) {
            throw new Error("error:", err);
        }
    }
    //eliminar por id
    async delete(id) {
        try {
            const deleteDoc = await this.collection.findByIdAndDelete(id)
            return deleteDoc
        } catch (err) {
            throw new Error("error:", err);
        }
    }

}
export default MongoClass;