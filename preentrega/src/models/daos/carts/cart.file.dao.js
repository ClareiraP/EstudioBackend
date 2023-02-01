const FileContainer = require('../../containers/file.container');
const fs = require('fs')

const { HttpError } = require('../../../utils/api.utils');
const  HTTP_STATUS  = require('../../../constants/api.constants');


class CartFilesDao extends FileContainer {
    constructor() {
      super("./src/db/data/carts.json");
      }

    async getCartProds (idCart){
        const cart = await this.getById(idCart);
        return [...cart.products]
    }

    async addProduct(idCart, idProduct) {
      const carts = await this.getAll();
      const cartById = carts.find((cart) => cart.id == idCart);
   
      if (!cartById) {
        const message = ` id ${idCart} no existe`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
      }

      const product = cartById.products
      product.push(idProduct)
      const updatedCarts = carts.map((cart) => cart.id == idCart ? cart = {
            ...cart,
            products: product
        } : cart);
        fs.writeFileSync(`./src/db/data/carts.json`, JSON.stringify(updatedCarts, null, 2))
        return product
    }

  
    async deleteProduct(idCart, idProduct) {
      const carts = await this.getAll();
      const cartById = carts.find((cart) => cart.id == idCart);

      if (!cartById) {
        const message = `id ${idCart} no existe`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
      }

      if (!cartById.products.find((product) => product == idProduct)) {
        const message = `id ${idProduct} no existe`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }

    const productsInCart = cartById.products.filter((product) => product != idProduct)
    const updatedCarts = carts.map((cart) => cart.id == idCart ? cart = {
            ...cart,
            products: productsInCart
        } : cart);
        fs.writeFileSync(`./src/db/data/carts.json`, JSON.stringify(updatedCarts, null, 2))
        return productsInCart
    }
  
  }
  
  module.exports = CartFilesDao;