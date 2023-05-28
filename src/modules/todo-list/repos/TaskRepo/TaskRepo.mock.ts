import { Task } from '../../domain/Task';
import { ITaskRepo, GetTasksParams } from './TaskRepo';

export class MockTaskRepo implements ITaskRepo {
  private tasks: Set<Task>;

  constructor(tasks: Array<Task>) {
    this.tasks = new Set(tasks);
  }
  getCompletedTasks(getTasksParams: GetTasksParams): Promise<Task[]> {
    const { offset, limit, sortBy } = getTasksParams;
    const results = [...this.tasks]
      .filter((task) => task.isCompleted)
      .slice(offset, limit + 1);

    if (sortBy === 'dueDateDesc') {
      return Promise.resolve(
        results.sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime())
      );
    }

    if (sortBy === 'dueDateAsc') {
      return Promise.resolve(
        results.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
      );
    }
    return Promise.resolve(results);
  }

  getUncompletedTasks(getTasksParams: GetTasksParams): Promise<Task[]> {
    const { offset, limit, sortBy } = getTasksParams;
    const results = [...this.tasks]
      .filter((task) => !task.isCompleted)
      .slice(offset, limit + 1);

    if (sortBy === 'dueDateDesc') {
      return Promise.resolve(
        results.sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime())
      );
    }

    if (sortBy === 'dueDateAsc') {
      return Promise.resolve(
        results.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
      );
    }
    return Promise.resolve(results);
  }

  save(task: Task): Promise<void> {
    this.tasks.add(task);
    return Promise.resolve();
  }

  getTaskById(uniqueTaskId: string): Promise<Task> {
    let result = null;
    const entries = this.tasks.entries();

    for (const entry of entries) {
      if (entry[0].taskId === uniqueTaskId) {
        result = entry[0];
        break;
      }
    }

    if (!result) {
      throw new Error(`Unable to find a task with id ${uniqueTaskId}`);
    }
    return Promise.resolve(result);
  }

  async deleteTaskById(uniqueTaskId: string): Promise<void> {
    const element = await this.getTaskById(uniqueTaskId);
    this.tasks.delete(element);
    return Promise.resolve();
  }
}
