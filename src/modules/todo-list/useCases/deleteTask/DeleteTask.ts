import { Result } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { ITaskRepo } from '../../repos/TaskRepo';
import { DeleteTaskDTO } from './DeleteTaskDTO';
import { Either, left, right } from '../../../../shared/core/Either';
import * as DeleteTaskError from './DeleteTaskError';
import { toError } from '../../../../shared/core/Error';

type Response = Either<Result<any>, Result<void>>;

export class DeleteTask implements UseCase<DeleteTaskDTO, Promise<Response>> {
  private taskRepo: ITaskRepo;

  constructor(taskRepo: ITaskRepo) {
    this.taskRepo = taskRepo;
  }

  public async execute(request: DeleteTaskDTO): Promise<Response> {
    try {
      const task = await this.taskRepo.getTaskById(request.taskId);

      const taskNotFound = !task;

      if (taskNotFound) {
        return left(new DeleteTaskError.TaskNotFound(request.taskId));
      }

      await this.taskRepo.deleteTaskById(request.taskId);

      return right(Result.ok<void>());
    } catch (e) {
      const error = toError(e);
      return left(Result.fail<string>(error.message));
    }
  }
}
