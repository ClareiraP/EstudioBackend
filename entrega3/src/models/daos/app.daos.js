const envConfig = require("../../config");

let ProductsDao;
let CartDao; 


switch(envConfig.DATASOURCE){
    case 'file':
        ProductsDao = require('./products/products.file.dao');
        CartDao = require('./carts/cart.file.dao');
    break;

    case 'memory':
        ProductsDao = require('./products/products.memory.dao');
        CartDao = require('./carts/cart.memory.dao');
    break;

    case 'mongo':
        ProductsDao = require('./products/products.mongo.dao');
        CartDao = require('./carts/cart.mongo.dao');
        break;
        
    case 'firebase':
        ProductsDao = require('./products/products.firebase.dao');
        CartDao = require('./carts/cart.firebase.dao');
        break;
    default:
        throw new Error ("Invalid Datasource");
}

module.exports = {
    ProductsDao,
    CartDao
}