import { Either, left, right } from '../../../../shared/core/Either';
import { toError } from '../../../../shared/core/Error';
import { Result } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { TaskProps } from '../../domain/Task';
import { TaskCompleted } from '../../domain/TaskCompleted';
import { TaskDescription } from '../../domain/TaskDescription';
import { TaskDueDate } from '../../domain/TaskDueDate';
import { TaskTitle } from '../../domain/TaskTitle';
import { ITaskRepo } from '../../repos/TaskRepo';

import { EditTaskDTO } from './EditTaskDTO';

type Response = Either<Result<any>, Result<void>>;

export class EditTask implements UseCase<EditTaskDTO, Response> {
  private taskRepo: ITaskRepo;

  constructor(taskRepo: ITaskRepo) {
    this.taskRepo = taskRepo;
  }

  public async execute(request: EditTaskDTO): Promise<Response> {
    try {
      const titleOrError = TaskTitle.create({ value: request.title });

      if (titleOrError.isFailure) {
        return left(titleOrError);
      }

      const descriptionOrError = TaskDescription.create({
        value: request.description
      });

      if (descriptionOrError.isFailure) {
        return left(descriptionOrError);
      }

      const isCompletedOrError = TaskCompleted.create({
        value: request.isCompleted
      });

      if (isCompletedOrError.isFailure) {
        return left(isCompletedOrError);
      }

      const dueDateOrError = TaskDueDate.create({ value: request.dueDateISO });

      if (dueDateOrError.isFailure) {
        return left(dueDateOrError);
      }

      const taskProps: TaskProps = {
        title: titleOrError.getValue(),
        description: descriptionOrError.getValue(),
        isCompleted: isCompletedOrError.getValue(),
        dueDate: dueDateOrError.getValue()
      };

      const task = await this.taskRepo.getTaskById(request.taskId);

      if (!task) {
        throw new Error(`Unable to find task with id ${request.taskId}`);
      }

      const voidOrErrorResult = task.updateTaskProps(taskProps);

      if (voidOrErrorResult.isFailure) {
        return left(voidOrErrorResult);
      }

      await this.taskRepo.save(task);

      return right(Result.ok<void>());
    } catch (e) {
      const error = toError(e);
      return left(Result.fail<string>(error.message));
    }
  }
}
