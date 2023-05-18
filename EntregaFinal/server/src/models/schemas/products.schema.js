const { Schema } = require('mongoose');


const ProductSchema = new Schema({
    timestamp: {type: Date, default: new Date()},
    title: {type: String, require: true},
    price: {type: Number, require: true},
    category: { type: String, required: true},
    thumbnail: {type: String, default: "https://png.pngtree.com/png-vector/20190214/ourmid/pngtree-vector-gallery-icon-png-image_515223.jpg"},
    stock: {type: Number, require: true},
    description: {type: String}
})

module.exports = ProductSchema;