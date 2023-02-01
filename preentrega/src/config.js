const path = require('path')
const dotenv = require('dotenv');
dotenv.config({path: __dirname + "/.env"});

const DB_PASSWORD = process.env.DB_PASSWORD;
const DATASOURCE = process.env.DATASOURCE;

console.log({DB_PASSWORD, DATASOURCE});

module.exports = {
    DB_PASSWORD: process.env.DB_PASSWORD,
    DATASOURCE: process.env.DATASOURCE
};

