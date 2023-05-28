import { Task } from '../../domain/Task';

export interface GetTasksParams {
  offset: number;
  limit: number;
  sortBy?: 'dueDateDesc' | 'dueDateAsc';
}

export interface ITaskRepo {
  save(task: Task): Promise<void>;
  getTaskById(uniqueTaskId: string): Promise<Task>;
  deleteTaskById(uniqueTaskId: string): Promise<void>;
  getCompletedTasks(getTasksParams: GetTasksParams): Promise<Array<Task>>;
  getUncompletedTasks(getTasksParams: GetTasksParams): Promise<Array<Task>>;
}
