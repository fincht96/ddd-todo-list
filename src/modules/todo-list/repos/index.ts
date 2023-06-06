import models from '../../../shared/infra/database/sequelize/models';
import { TaskRepo } from './implementations/TaskRepo';

const taskRepo = new TaskRepo(models);

export { taskRepo };
