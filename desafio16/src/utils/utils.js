const moment = require("moment");

const formatMessage = (id, email, text) => {
  return {
    id,
    email,
    text,
    time: moment().format('h: mm a')
  };
};

const successResponse = (data) => {
  return {
    success: true,
    data
  }
}

const errorResponse = (message, details = null) => {
  return {
    success: false,
    message,
    details
  }
}

class HttpError {
  constructor(status, message, details) {
    this.statusCode = status;
    this.message = message;
    this.details = details;
  }
}

module.exports = {
  formatMessage,
  successResponse,
  errorResponse,
  HttpError
};