require('dotenv').config();
const Sequelize = require('sequelize');

const {
  DDD_TODO_LIST_DB_USER,
  DDD_TODO_LIST_DB_PASS,
  DDD_TODO_LIST_DB_HOST,
  DDD_TODO_LIST_DB_DEV_DB_NAME,
  DDD_TODO_LIST_DB_TEST_DB_NAME,
  DDD_TODO_LIST_DB_PROD_DB_NAME,
  NODE_ENV,
  DDD_TODO_LIST_IS_PRODUCTION,
  // prod database url
  DATABASE_URL
} = process.env;

const databaseCredentials = {
  development: {
    username: DDD_TODO_LIST_DB_USER,
    password: DDD_TODO_LIST_DB_PASS,
    database: DDD_TODO_LIST_DB_DEV_DB_NAME,
    host: DDD_TODO_LIST_DB_HOST,
    dialect: 'postgres'
  },
  test: {
    username: DDD_TODO_LIST_DB_USER,
    password: DDD_TODO_LIST_DB_PASS,
    database: DDD_TODO_LIST_DB_TEST_DB_NAME,
    host: DDD_TODO_LIST_DB_HOST,
    dialect: 'postgres'
  },
  production: {
    username: DDD_TODO_LIST_DB_USER,
    password: DDD_TODO_LIST_DB_PASS,
    database: DDD_TODO_LIST_DB_PROD_DB_NAME,
    host: DDD_TODO_LIST_DB_HOST,
    dialect: 'postgres'
  }
};

const { username, password, database, host, dialect } =
  databaseCredentials[NODE_ENV];

module.exports = databaseCredentials;

const mode = DDD_TODO_LIST_IS_PRODUCTION === 'true' ? 'prod' : 'dev';

console.log(`[DB]: Connecting to the database in ${mode} mode.`);

module.exports.connection =
  DDD_TODO_LIST_IS_PRODUCTION === 'true'
    ? new Sequelize(DATABASE_URL)
    : new Sequelize(database, username, password, {
        host,
        dialect,
        port: 5432,
        dialectOptions: {
          multipleStatements: true
        },
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        },
        logging: false
      });
