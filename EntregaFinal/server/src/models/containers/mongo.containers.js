const mongoose = require('mongoose');
const dbconfig = require('../../db/config');
const { HTTPError } = require('../../utils/errors.utils');
const { STATUS } = require('../../constants/api.constants');
const envConfig = require('../../env.config');
mongoose.set('strictQuery', true);

class MongoContainer {
  constructor(collection, schema) {
    this.model = mongoose.model(collection, schema)
  }

  static async connect() {
    await mongoose.connect(dbconfig.mongodb.connectTo(`${envConfig.DB_NAME}`))
  }

  static async disconnect() {
    await mongoose.disconnect()
  }

  async getAll(filter = {}) {
    const documents = await this.model.find(filter, { __v: 0 }).lean()
    return documents
  }

  async getById(id) {
    const document = await this.model.findOne({ _id: id }, { __v: 0 })
    if (!document) {
      throw new HTTPError(STATUS.NOT_FOUND)
    }
    return document
  }

  async save(item = {}) {
    const newDocument = new this.model(item)
    return await newDocument.save()
  }

  async update(id, item) {
    const updatedDocument = await this.model.updateOne(
      { _id: id },
      { $set: { ...item } }
    )
    if (!updatedDocument.matchedCount) {
      const message = `Element with id ${id} does not exists`
      throw new HTTPError(STATUS.NOT_FOUND, message)
    }
    return updatedDocument
  }

  async delete(id) {
    const deletedDocument = await this.model.deleteOne({ _id: id })
    if (!deletedDocument.deletedCount) {
      const message = `Element with id ${id} does not exists`
      throw new HTTPError(STATUS.NOT_FOUND, message)
    }
    return deletedDocument
  }
}
module.exports = MongoContainer;