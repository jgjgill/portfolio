const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.DB_PASSWORD)

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'portfolio',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'portfolio',
    host: '127.0.0.1',
    dialect: 'mysql',

  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'portfolio',
    host: '127.0.0.1',
    dialect: 'mysql',

  },
};
