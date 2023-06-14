import { Sequelize } from 'sequelize';
import { toError } from '../../shared/core/Error';

// gets sequelize connection (to ddd_todo_list_db)
import config from '../../shared/infra/database/sequelize/config/config';

// initialises models
import '../../shared/infra/database/sequelize/models';

const {
  DDD_TODO_LIST_DB_USER,
  DDD_TODO_LIST_DB_PASS,
  DDD_TODO_LIST_DB_TEST_HOST
} = process.env;

async function createTestDatabase() {
  try {
    // connect to default postgres db
    const defaultPgConnection = new Sequelize(
      'postgres',
      DDD_TODO_LIST_DB_USER ?? 'postgres',
      DDD_TODO_LIST_DB_PASS ?? 'postgres',
      {
        host: DDD_TODO_LIST_DB_TEST_HOST,
        port: 5432,
        dialect: 'postgres',
        dialectOptions: {
          multipleStatements: true
        },
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        },
        logging: false
      }
    );

    await defaultPgConnection.query(
      `DROP DATABASE IF EXISTS ${config.database}`
    );
    await defaultPgConnection.query(`CREATE DATABASE ${config.database}`);
    await defaultPgConnection.close();
  } catch (error) {
    throw toError(error);
  }
}

async function migrateTestDatabase() {
  // use ddd_todo_list_db database connection
  const dddPgConnection = config.connection;
  try {
    await dddPgConnection.sync();
  } catch (error) {
    throw toError(error);
  }
}

// export function that does it all
export default async function () {
  await createTestDatabase();
  await migrateTestDatabase();
  console.log('Test database created successfully');
}
