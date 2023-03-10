require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  SESSION_SECRET: process.env.SESSION_SECRET || '',
}