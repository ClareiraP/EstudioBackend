const mongoose = require ('mongoose');
const dbConfig = require('../../db/db.config');

const  HTTP_STATUS  = require('../../constants/api.constants');
const { HttpError } = require('../../utils/api.utils');

class MongoContainer {
    constructor(collection, schema) {
        this.model = mongoose.model(collection, schema);
    }


    static async connect() {
        await mongoose.connect(dbConfig.mongodb.uri);
    }

    static async disconnect() {
        await mongoose.disconnect();
    }

    async getAll(filter = {}) {
        const documents = await this.model.find(filter,{__v: 0}).lean();
        return documents;
    }

    async getById(id) {
        const document = await this.model.findOne({_id:id}, {__v: 0});
        if (!document){
            const message = `id ${id} no existe.`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return document;
    }

    async save(item) {
        item.timestamp = Date.now()
        const newDocument = new this.model(item);
        return await newDocument.save();
    }

    async update(id, item) {
        const updatedDocument = await this.model.updateOne(
            {_id: id},
            { $set: {...item}, }
        );
        if (!updatedDocument.matchedCount){
            const message = `id ${id} no existe.`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }

        return updatedDocument;
    }

    async delete(id) {
        const deletedDocument = await this.model.deleteOne({_id: id});

        if (!deletedDocument.deletedCount){
            const message = ` id ${id} no existe.`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }

        return deletedDocument
    }
}

module.exports = MongoContainer;