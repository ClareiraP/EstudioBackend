const envConfig = require('../env.config');


module.exports = {
  mongodb: {
    connectTo: (database) => `mongodb+srv://claricca5:${envConfig.DB_PASSWORD}@yinsignias.nuk3cgy.mongodb.net/${database}?retryWrites=true&w=majority`,
  }
}

