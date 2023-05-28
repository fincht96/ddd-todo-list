import { UseCase } from '../../../../shared/core/UseCase';
import { Task, TaskProps } from '../../domain/Task';
import { TaskDescription } from '../../domain/TaskDescription';
import { TaskTitle } from '../../domain/TaskTitle';
import { ITaskRepo } from '../../repos/TaskRepo/TaskRepo';
import { CreateTaskDTO } from './CreateTaskDTO';

type Response = string;

export class CreateTask implements UseCase<CreateTaskDTO, Promise<Response>> {
  private taskRepo: ITaskRepo;

  constructor(taskRepo: ITaskRepo) {
    this.taskRepo = taskRepo;
  }

  public async execute(request: CreateTaskDTO): Promise<Response> {
    const title = TaskTitle.create({ value: request.title });
    const description = TaskDescription.create({ value: request.description });
    const isCompleted = request.isCompleted;
    const dueDate = request.dueDate;
    const taskProps: TaskProps = { title, description, isCompleted, dueDate };

    const task = Task.create(taskProps);
    await this.taskRepo.save(task);

    return Promise.resolve(task.taskId);
  }
}
