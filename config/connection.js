require('dotenv').config();
const { Sequelize } = require('sequelize');
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PW:', process.env.DB_PW);


// Use JAWSDB_URL in production (e.g., Heroku), otherwise use local .env vars
const useJawsDb = Boolean(process.env.JAWSDB_URL);
const sequelize = useJawsDb
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PW,
      {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        timezone: process.env.DB_TIMEZONE || '+05:30',
        logging: false,
      }
    );

module.exports = sequelize;