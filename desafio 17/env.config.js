require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  DB_NAME: process.env.DB_NAME || 'test',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  ADMIN: process.env.ADMIN || false,
  SESSION_SECRET: process.env.SESSION_SECRET || '',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ||'',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
}