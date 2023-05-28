import { UseCase } from '../../../../shared/core/UseCase';
import { Task } from '../../domain/Task';
import { ITaskRepo } from '../../repos/TaskRepo/TaskRepo';
import { GetCompletedTasksDTO } from './GetCompletedTasksDTO';

type Response = Array<Task>;

export class GetCompletedTasks
  implements UseCase<GetCompletedTasksDTO, Response>
{
  private taskRepo: ITaskRepo;

  constructor(taskRepo: ITaskRepo) {
    this.taskRepo = taskRepo;
  }

  public async execute(request: GetCompletedTasksDTO): Promise<Response> {
    const { offset, limit, sortBy } = request;

    const tasks = await this.taskRepo.getCompletedTasks({
      offset,
      limit,
      sortBy
    });

    return Promise.resolve(tasks);
  }
}
