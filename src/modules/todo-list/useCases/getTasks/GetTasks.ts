import { Either, left, right } from '../../../../shared/core/Either';
import { toError } from '../../../../shared/core/Error';
import { Result } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { Task } from '../../domain/Task';
import { ITaskRepo } from '../../repos/TaskRepo';
import { GetTasksDTO } from './GetTasksDTO';

import { UnexpectedError } from '../../../../shared/core/AppError';

type Response = Either<Result<any>, Result<Array<Task>>>;

export class GetTasks implements UseCase<GetTasksDTO, Response> {
  private taskRepo: ITaskRepo;

  constructor(taskRepo: ITaskRepo) {
    this.taskRepo = taskRepo;
  }

  public async execute(request: GetTasksDTO): Promise<Response> {
    try {
      // TODO: validate request

      const tasks = await this.taskRepo.getTasks({
        ...request
      });

      return right(Result.ok(tasks));
    } catch (e) {
      const err = toError(e);
      return left(new UnexpectedError(err));
    }
  }
}
