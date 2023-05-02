const { STATUS } = require('../constants/api.constants');
const { succesResponse } = require('../utils/errors.utils');
const { createOrder, deleteOrder, getOrderById } = require('../services/orders.services')

class OrdersController {
  async createOrder(req, res, next) {
    try {
      const order = req.body
      const newOrder = await createOrder(order)
      const response = succesResponse({ newOrder })
      res.status(STATUS.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  async getOrderById(req, res, next) {
    try {
      const orderId = req.params.id;
      const order = await getOrderById(orderId);
      const response = succesResponse(order)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const orderId = req.params.id;
      const deletedOrder = await deleteOrder(orderId);
      const response = succesResponse(deletedOrder);
      res.json(response)
    } catch (err) {
      next(err)
    }
  }
}


module.exports = OrdersController