import { Task } from '../../domain/Task';

export interface GetTasksParams {
  offset: number;
  limit: number;
  taskType: 'completed' | 'uncompleted' | 'any';
  sortBy?: 'dueDateDesc' | 'dueDateAsc';
}

export interface ITaskRepo {
  save(task: Task): Promise<void>;
  getTaskById(uniqueTaskId: string): Promise<Task>;
  deleteTaskById(uniqueTaskId: string): Promise<void>;
  getTasks(getTasksParams: GetTasksParams): Promise<Array<Task>>;
}
