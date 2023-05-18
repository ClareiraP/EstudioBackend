const OrderDAO = require('../models/daos/orders.dao');

const orderDAO = new OrderDAO()


  const createOrder = async (order) => {
    await orderDAO.save(order);
  };

  const getOrderById = async (id) => {
    return await orderDAO.getById(id);
  };

 const deleteOrder = async (id) => {
    return await orderDAO.delete(id);
  }

module.exports = {
  createOrder,
  getOrderById,
  deleteOrder
}