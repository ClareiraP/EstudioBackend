const { Schema } = require("mongoose");
const MongoContainer = require("../../containers/mongo.container");

const collection = "Products";
const productsSchema = new Schema({
    timestamp: {type: Date},
    title: {type: String, require: true},
    price: {type: Number, require: true},
    image: {type: String},
    stock: {type: Number, require: true},
    description: {type: String}
})

class ProductsMongoDao extends MongoContainer {
    constructor() {
        super(collection, productsSchema);
    }
}

module.exports = ProductsMongoDao;