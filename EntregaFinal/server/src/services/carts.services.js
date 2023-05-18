const CartsDAO = require('../models/daos/carts.dao');
const { STATUS } = require('../constants/api.constants');
const { HTTPError } = require('../utils/errors.utils');
const { sendEmail } = require('../utils/email.utils');
const { createOrder } = require('../services/orders.services')


const cartsDAO = new CartsDAO()


const createCart = async () => {
   return await cartsDAO.save()
}

const deleteCart = async (id) => {
   return await cartsDAO.delete(id)
}

const getProductsFromCart = async (id) => {
  return await cartsDAO.getProducts(id)
}

const saveProductToCart = async (cartId, prodId) => {
    return await cartsDAO.saveProduct(cartId, prodId)
}


const deleteProductFromCart = async (cartId, prodId) => {
    return await cartsDAO.deleteProduct(cartId, prodId)
}

const checkoutCart = async (cartId, user) => {
    const products = await cartsDAO.getProducts(cartId)
  
    if (products.length < 1) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The cart must have at least one product to checkout')
    }
    await cartsDAO.emptyCart(cartId)
  
    const totalCost = products.reduce((acc, item) => acc + item.product.price * item.qty, 0)

    // Create and save the order in the database
    const order = {
      products,
      user,
      totalCost
    }
    const newOrder = await createOrder(order)
  
    // Send confirmation email
  const emailOptions = {
  subject: 'Order Confirmation',
  html: `
    <p>New Order Received!</p>
    <p>Order details:</p>
    <ul>
      <li>Name: ${user.email}</li>
      <li>Address: ${user.address}</li>
      <li>Products:</li>
      <ul>
        ${products.map((product) => `<li><span style="color: blue">${product.product.title} - Product ID: '${product.product._id}</span><li><span style="color: blue">Quantity of Products: ${product.qty} - Price: ${products.map((product) => `${product.product.price}`)}</span></li>`).join('')}
      </ul>
      <li><span style="color: red">Total cost: $${totalCost}</li></span>
    </ul>
  `
};

    await sendEmail(emailOptions)
  
    return newOrder
  }

module.exports = {
    createCart,
    deleteCart,
    getProductsFromCart,
    saveProductToCart,
    deleteProductFromCart,
    checkoutCart
}