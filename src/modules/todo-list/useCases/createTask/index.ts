import { CreateTask } from './CreateTask';
import { CreateTaskController } from './CreateTaskController';
import { taskRepo } from '../../repos';

const createTask = new CreateTask(taskRepo);
const createTaskController = new CreateTaskController(createTask);

export { createTask, createTaskController };
