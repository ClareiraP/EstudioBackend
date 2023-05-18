class HTTPError {
    constructor(status, message, details) {
        this.statusCode = status;
        this.message = message;
        this.details = details;
    }
}

const succesResponse = (data, statusCode = 200) => {
    return {
        success: true,
        statusCode,
        data
    }
}

const errorResponse = (message, code) => {
    return {
      error: {
      message: message,
      code: code
    },
  };
}

  module.exports = {
    succesResponse,
    errorResponse,
    HTTPError
  }