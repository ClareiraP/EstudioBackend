const FileContainer = require('../../containers/file.container');

class ProductsFilesDao extends FileContainer {
  constructor() {
    super("./src/db/data/products.json");
  }

}

module.exports = ProductsFilesDao;