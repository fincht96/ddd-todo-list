import { Task } from '../domain/Task';
import { TaskCompleted } from '../domain/TaskCompleted';
import { TaskDescription } from '../domain/TaskDescription';
import { TaskDueDate } from '../domain/TaskDueDate';
import { TaskTitle } from '../domain/TaskTitle';

export class TaskMap {
  public static toDomain(raw: any): Task {
    const props = {
      title: TaskTitle.create({ value: raw.title }).getValue(),
      description: TaskDescription.create({
        value: raw.description
      }).getValue(),
      dueDate: TaskDueDate.create({
        value: new Date(raw.due_date).toISOString()
      }).getValue(),
      isCompleted: TaskCompleted.create({ value: raw.is_completed }).getValue()
    };

    const taskOrError = Task.create(props);

    if (taskOrError.isFailure) {
      throw new Error('Unable to create Task domain entity from raw');
    }

    return taskOrError.getValue();
  }

  public static toPersistence(task: Task): any {
    return {
      id: task.taskId,
      title: task.title.value,
      description: task.description.value,
      is_completed: task.isCompleted.value,
      due_date: task.dueDate.value.toISOString()
    };
  }
}
