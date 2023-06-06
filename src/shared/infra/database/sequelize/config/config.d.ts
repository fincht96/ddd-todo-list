import { Sequelize } from 'sequelize';

interface DatabaseCredentials {
  development: DatabaseConfig;
  test: DatabaseConfig;
  production: DatabaseConfig;
}

interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
}

declare const databaseCredentials: DatabaseCredentials;

declare const NODE_ENV: string;
declare const DDD_TODO_LIST_IS_PRODUCTION: string;
declare const CLEARDB_DATABASE_URL: string;

declare const username: string;
declare const password: string;
declare const database: string;
declare const host: string;
declare const dialect: string;

declare const mode: 'prod' | 'dev';

declare const connection: Sequelize;

export {
  databaseCredentials,
  NODE_ENV,
  DDD_TODO_LIST_IS_PRODUCTION,
  CLEARDB_DATABASE_URL,
  username,
  password,
  database,
  host,
  dialect,
  mode,
  connection
};
