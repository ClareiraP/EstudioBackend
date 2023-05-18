const { STATUS } = require('../../constants/api.constants')
const { HTTPError } = require('../../utils/errors.utils')
const MongoContainer = require('../containers/mongo.containers')
const CartSchema = require('../schemas/carts.schema')
const ProductsDAO = require('./products.dao')

const productsDAO = new ProductsDAO()

const collection = 'carts'

class CartsDAO extends MongoContainer {
  constructor() {
    super(collection, CartSchema)
  }

  async getProducts(cartId) {
    const cart = await this.getById(cartId)
    return [...cart.products]
  }

  async saveProduct(cartId, prodId) {
    const product = await productsDAO.getById(prodId)

    const productAlreadyInCart = await this.productExistsInCart(cartId, prodId)

    let updatedCart;

    if (productAlreadyInCart) {
      const cartProducts = await this.getProducts(cartId)
      const productIndex = cartProducts.findIndex(
        item => item.product._id.toString() === prodId
      )
      cartProducts[productIndex].qty++

      updatedCart = await this.model.updateOne(
        { _id: cartId },
        { $set: { products: cartProducts } },
        { new: true }
      )
    } else {
      updatedCart = await this.model.updateOne(
        { _id: cartId },
        { $push: { products: { product, qty: 1 } } },
        { new: true }
      )
    }

    if (!updatedCart.matchedCount) {
      const message = `Cart with id ${cartId} does not exists`
      throw new HTTPError(STATUS.NOT_FOUND, message)
    }

    return updatedCart
  }

  async deleteProduct(cartId, prodId) {
    const cartProducts = await this.getProducts(cartId)
    const newCartProducts = cartProducts.filter(
      item => item.product._id.toString() !== prodId)
      if (cartProducts.length === newCartProducts.length) { 
        const message = `Product with id ${prodId} does not exist in cart with id ${cartId}`
        throw new HTTPError(STATUS.NOT_FOUND, message)
        }
    const updatedCart = await this.model.updateOne(
      { _id: cartId },
      { $set: { products: newCartProducts } },
      { new: true }
    )
    return updatedCart
  }

  async emptyCart(cartId) {
    const emptyCart = await this.model.updateOne(
      { _id: cartId },
      { $set: { products: [] } },
      { new: true }
    )
    if (!emptyCart.matchedCount) {
      const message = `Cart with id ${cartId} does not exists`
      throw new HTTPError(STATUS.NOT_FOUND, message)
    }
    return emptyCart
  }

  async productExistsInCart(cartId, prodId) {
    const cart = await this.getById(cartId)
    const product = cart.products.find(
      item => item.product._id.toString() === prodId
    )
    if (!product) {
      return false
    }
    return true
  }
}
module.exports = CartsDAO;