const { STATUS } = require('../constants/api.constants');
const { HTTPError } = require('../utils/errors.utils');
const { succesResponse } = require('../utils/errors.utils')
const { createCart, deleteCart, getProductsFromCart, saveProductToCart, deleteProductFromCart, checkoutCart } = require('../services/carts.services')


class CartsController {
  async createCart(req, res, next) {
    try {
      const newCart = await createCart()
      const response = succesResponse(newCart)
      res.status(STATUS.CREATED).json(response)
    } catch (err) {
      next(new HTTPError(STATUS.BAD_REQUEST))
    }
  }

  async deleteCart(req, res, next) {
    const { id } = req.params
    try {
      const deletedCart = await deleteCart(id)
      const response = succesResponse(deletedCart)
      res.json(response)
    } catch (err) {
      next(new HTTPError(STATUS.BAD_REQUEST, `Sorry, we don't found the cart with ID ${id}, checkt it and try again`))
    }
  }

  async getProducts(req, res, next) {
    const { id } = req.params

    try {
      const products = await getProductsFromCart(id)
      const response = succesResponse(products)
      res.json(response)
    } catch (err) {
      next(new HTTPError(STATUS.BAD_REQUEST, `Sorry, we don't found the cart with ID ${id}, checkt it and try again`))
    }
  }

  async saveProduct(req, res, next) {
    const { cartId, prodId } = req.params
    try {
      const newProduct = await saveProductToCart(cartId, prodId)
      const response = succesResponse(newProduct)
      res.status(STATUS.CREATED).json(response)
    } catch (err) {
      next(new HTTPError(STATUS.BAD_REQUEST, `Opss, sorry, check the Cart ID or the Prodduct ID and try again`))
    }
  }

  async deleteProduct(req, res, next) {
    const { cartId, prodId } = req.params
    try {
      const deletedProduct = await deleteProductFromCart(cartId, prodId)
      const response = succesResponse(deletedProduct)
      res.json(response)
    } catch (err) {
      next(new HTTPError(STATUS.BAD_REQUEST, `Sorry, we couldn't find the cart id or product id, check it and try again`))
    }
  }
  


  async checkout(req, res, next) {
    try {
      const { cartId } = req.params
      const { user } = req.body
      if (!user) {
        throw new HTTPError(STATUS.BAD_REQUEST, 'Buyer and address are required in the body to checkout')
      }
      if(!cartId) {
        throw new HTTPError(STATUS.NOT_FOUND, `Cart with ID ${cartId} not found`)
      }

      const order = await checkoutCart(cartId, user)

      const response = succesResponse({ order })
      res.status(STATUS.CREATED).json(response)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartsController;