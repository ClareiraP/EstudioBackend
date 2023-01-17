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
            filename: './db/sql/chat.sqlite'
        }
    }
    
}