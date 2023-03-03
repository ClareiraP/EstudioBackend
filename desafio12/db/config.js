const envConfig = require('../env.config');

module.exports = {
    mariaDB: {
       client: 'mysql',
       connection: {
        host : '192.168.64.2',
        port : 3306,
        user : 'root',
        database : 'ecommerce'
       }
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: './db/sqlite/chat.sqlite'
        }
    },

    mongodb: {
            connectTo: (database) => `mongodb://mayricca5:${envConfig.DB_PASSWORD}@ac-cengsbu-shard-00-00.nuk3cgy.mongodb.net:27017,ac-cengsbu-shard-00-01.nuk3cgy.mongodb.net:27017,ac-cengsbu-shard-00-02.nuk3cgy.mongodb.net:27017/${database}?ssl=true&replicaSet=atlas-nt5oql-shard-0&authSource=admin&retryWrites=true&w=majority`,
      }
}