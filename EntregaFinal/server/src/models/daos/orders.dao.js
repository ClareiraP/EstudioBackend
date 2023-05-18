const MongoContainer = require('../containers/mongo.containers')
const OrderSchema = require('../schemas/orders.schema');

const collection='orders'


class OrdersDAO extends MongoContainer {
    constructor() {
        super(collection, OrderSchema)
      }
 };

 module.exports = OrdersDAO;