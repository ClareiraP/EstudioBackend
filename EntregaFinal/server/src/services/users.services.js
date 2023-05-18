const UsersDAO = require('../models/daos/users.dao')
const CartsDAO = require('../models/daos/carts.dao')

const usersDAO = new UsersDAO()
const cartsDAO = new CartsDAO()

const assignCartUser = async (userId) => {
  const user = await usersDAO.getById(userId)
  const cart = await cartsDAO.save()
  user.cartId = cart._id
  await usersDAO.update(user._id, user)
  return user
}
 
module.exports = assignCartUser