import express from 'express';
import { createTaskController } from '../useCases/createTask';

const taskRouter = express.Router();

taskRouter.post('/', (req, res) => {
  return createTaskController.execute(req, res);
});

export { taskRouter };
