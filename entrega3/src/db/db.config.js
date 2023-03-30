const envConfig = require('../config');
const firebaseConfig = require('./firebase/firebase.config.json')
module.exports = {
    memory: {
        products: [],
        carts: [],
      },

    file: {
        products: './data/products.json',
     },

    mongodb: {
        uri: `mongodb+srv://cluster0.opxsjnq.mongodb.net/myFirstDatabase" --apiVersion 1 --username clari`
    },

    firebase: {
        credentials: firebaseConfig
    }
}