import __dirname from "../utils.js";
import mongoose from "mongoose";
import {URLMongo} from "../options/options.js";

mongoose.connect(URLMongo, (err, res)=>{
    if (err) throw err;
    return console.log("Base de datos conectada");
})

class messagesManager {
    constructor(collectionName){
        const MessageSchema = mongoose.Schema({ 
            author: {
                email: {type: String, require: true}, 
                nombre: {type: String, default: null}, 
                apellido: {type: String, default: null},
                edad: {type: Number, default: null}, 
                alias: {type: String, default: null},
                avatar: {type: String, default: "https://cdn3.iconfinder.com/data/icons/avatars-set1/32/ava32px040-256.png"}
            },
            text: {type: String, require: true},
            date: {type: Date, default: Date.now}
        });
        this.model = mongoose.model(collectionName, MessageSchema);
    }

    async addMessage(data){
        try {
            await this.model.create(data);
        } catch (error) {
            console.log("Error al añadir mensaje", error);
        }
    }

    async getMessages(){
        try {
            const data = await this.model.find();
            return data; 
        } catch (error) {
            console.log("error al obtener mensajes", error);
        }
    }
}

export default new messagesManager('message');