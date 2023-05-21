import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(`${process.env.DATABASE_URL}`);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch((err) => {
    console.log(err);
  });
