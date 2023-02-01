const MemoryContainer = require('../../containers/memory.container');
const dbConfig = require('../../../db/db.config');

const data = dbConfig.memory.products;
const resource = 'Product';

class ProductsMemoryDao extends MemoryContainer {
  constructor() {
    super(data, resource);
  }
}

module.exports = ProductsMemoryDao;