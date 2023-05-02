const { succesResponse } = require('../utils/errors.utils')
const UsersDAO = require('../models/daos/users.dao')

const usersDAO = new UsersDAO

const getUserInfo = async (req, res, next) => {
  try {
    const user = await usersDAO.getByEmail(req.user.email)
    return res.json(succesResponse(user))

  } catch (err) {
    console.log(err)
    next(err);
  }
}


module.exports = { getUserInfo }