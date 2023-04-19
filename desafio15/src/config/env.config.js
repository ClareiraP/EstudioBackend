const path = require('path');
const dotenv = require('dotenv');

dotenv.config();


const config = {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 8080,
    SESSION_SECRET: process.env.SESSION_SECRET || '',
    DATA_SOURCE: process.env.DATA_SOURCE || 'MEM', 
    DB_PASSWORD: process.env.DB_PASSWORD || '',

}

module.exports = config