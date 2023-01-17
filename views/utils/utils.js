const moment = require("moment");

const formatMessage = (id, email, text) => {
  return {
    id,
    email,
    text,
    time: moment().format('h: mm a')
  };
};

module.exports = {
  formatMessage,
};