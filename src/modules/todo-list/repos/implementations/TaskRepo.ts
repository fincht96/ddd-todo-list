import { Task } from '../../domain/Task';
import { ITaskRepo, GetTasksParams } from '../TaskRepo';
import { TaskMap } from '../../mappers/taskMap';

export class TaskRepo implements ITaskRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  public async exists(taskId: string): Promise<boolean> {
    const TaskModel = this.models.task;

    const task = await TaskModel.findOne({
      where: {
        id: taskId
      }
    });
    const found = !!task === true;
    return found;
  }

  async getTasks(getTasksParams: GetTasksParams): Promise<Task[]> {
    const TaskModel = this.models.task;

    const tasks: Array<any> = await TaskModel.findAll({
      where: {
        ...(getTasksParams.taskType !== 'any' && {
          is_completed: getTasksParams.taskType === 'completed' ? true : false
        })
      },
      limit: getTasksParams.limit ?? 15,
      offset: getTasksParams.offset ?? 0
    });

    // TODO: add sort by, and asc/desc

    return tasks.map((task) => TaskMap.toDomain(task));
  }

  async save(task: Task): Promise<void> {
    const rawTask = TaskMap.toPersistence(task);
    const exists = await this.exists(task.taskId);
    const isNewTask = !exists;
    const TaskModel = this.models.task;

    if (isNewTask) {
      await TaskModel.create(rawTask);
    } else {
      await TaskModel.update(rawTask, {
        where: {
          id: task.taskId
        }
      });
    }
  }

  async getTaskById(uniqueTaskId: string): Promise<Task> {
    const TaskModel = this.models.task;
    const task = await TaskModel.findOne({
      where: {
        id: uniqueTaskId
      }
    });

    return task;
  }

  async deleteTaskById(uniqueTaskId: string): Promise<void> {
    const TaskModel = this.models.task;
    await TaskModel.destroy({
      where: {
        id: uniqueTaskId
      }
    });
  }
}
