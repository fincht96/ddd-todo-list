import express from 'express';

import { taskRouter } from '../../../../modules/todo-list/routes';

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  return res.json({ message: "We're up and running!" });
});

v1Router.use('/task', taskRouter);

export { v1Router };
