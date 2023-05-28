import { UseCase } from '../../../../shared/core/UseCase';
import { TaskProps } from '../../domain/Task';
import { TaskDescription } from '../../domain/TaskDescription';
import { TaskTitle } from '../../domain/TaskTitle';
import { ITaskRepo } from '../../repos/TaskRepo/TaskRepo';

import { EditTaskDTO } from './EditTaskDto';

type Response = void;

export class EditTask implements UseCase<EditTaskDTO, Response> {
  private taskRepo: ITaskRepo;

  constructor(taskRepo: ITaskRepo) {
    this.taskRepo = taskRepo;
  }

  public async execute(request: EditTaskDTO): Promise<Response> {
    const task = await this.taskRepo.getTaskById(request.taskId);

    if (!task) {
      throw new Error(`Unable to find task with id ${request.taskId}`);
    }

    const newTaskProps: TaskProps = {
      title: TaskTitle.create({ value: request.title }),
      description: TaskDescription.create({ value: request.description }),
      isCompleted: request.isCompleted,
      dueDate: request.dueDate
    };

    task.updateTaskProps(newTaskProps);
    this.taskRepo.save(task);

    return Promise.resolve();
  }
}
