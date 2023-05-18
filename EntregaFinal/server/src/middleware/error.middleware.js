const {STATUS } = require('../constants/api.constants') 
const  {errorResponse}  = require('../utils/errors.utils') 
const {logger} = require('../logger/logger') 
const path = require('path')

const errorMiddleware = (err, req, res, next) => {
  const status = err.statusCode || STATUS.INTERNAL_SERVER_ERROR
  const message = err.message || 'An unexpected error ocurred'
  const details = err.details || ""

  logger.error(`${status} ${message} ${details}`)

return res.status(status).json(errorResponse(message, status));

}

module.exports= {errorMiddleware}