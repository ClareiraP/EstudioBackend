const envConfig = require('../env.config')
const jwt = require('jsonwebtoken')
const { logger } = require('../logger/logger')
const { STATUS } = require('../constants/api.constants')
const { HTTPError } = require('../utils/errors.utils')
const UsersDAO = require('../models/daos/users.dao')

const usersDAO = new UsersDAO()

const adminMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, envConfig.JWT_SECRET);
    if (!decoded.admin) {
      return next(new HTTPError(STATUS.UNAUTHORIZED, 'Sorry, you are not authorize to acces this route'));
    }
    return next();
  } catch (err) {
    return next(new HTTPError(STATUS.UNAUTHORIZED, 'Sorry, you are not authorize to acces this route'))
  }
};


const authMiddleware = async (req, res, next) => {
  logger.trace('Middleware de autenticación llamado');

  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {

    return next(new HTTPError(STATUS.UNAUTHORIZED, 'Sorry, you must be authenticated to access this route'))
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, envConfig.JWT_SECRET)

    const user = await usersDAO.getById(decoded.id)

    if (!user) {
      return next(new HTTPError(STATUS.UNAUTHORIZED, 'No user matches with the token'))
    }
    req.user = user;

    next()
  } catch (error) {
    return next(new HTTPError(STATUS.UNAUTHORIZED, 'Sorry, You must be authenticated to access this route'))
  }

}
module.exports = { adminMiddleware, authMiddleware }