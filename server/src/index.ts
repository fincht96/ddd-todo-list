import express from 'express';
import { Sequelize } from 'sequelize';

const init = async () => {
  const app = express();
  const port = process.env.API_PORT;

  app.get('/', (_req, res) => {
    res.send('Hello world');
  });

  try {
    const sequelize = new Sequelize(
      'postgres://postgres:postgres@db:5432/postgres'
    );

    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    app.listen(port, () => {
      console.log('port', port);
      console.log("I'm listening or am I");
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

init();
