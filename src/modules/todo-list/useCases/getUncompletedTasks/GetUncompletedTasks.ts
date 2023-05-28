import { UseCase } from '../../../../shared/core/UseCase';
import { Task } from '../../domain/Task';
import { ITaskRepo } from '../../repos/TaskRepo/TaskRepo';
import { GetUncompletedTasksDTO } from './GetUncompletedTasksDTO';

type Response = Array<Task>;

export class GetUncompletedTasks
  implements UseCase<GetUncompletedTasksDTO, Response>
{
  private taskRepo: ITaskRepo;

  constructor(taskRepo: ITaskRepo) {
    this.taskRepo = taskRepo;
  }

  public async execute(request: GetUncompletedTasksDTO): Promise<Response> {
    const { offset, limit, sortBy } = request;

    const tasks = await this.taskRepo.getUncompletedTasks({
      offset,
      limit,
      sortBy
    });

    return Promise.resolve(tasks);
  }
}
