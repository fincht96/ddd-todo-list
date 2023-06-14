// gets sequelize connection
import { Sequelize } from 'sequelize';
import config from '../../shared/infra/database/sequelize/config/config';

export default async function () {
  const dddPgConnection = config.connection;

  const {
    DDD_TODO_LIST_DB_USER,
    DDD_TODO_LIST_DB_PASS,
    DDD_TODO_LIST_DB_TEST_HOST
  } = process.env;

  try {
    // close ddd_todo_list_db database connection
    await dddPgConnection.close();

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
    await defaultPgConnection.close();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
