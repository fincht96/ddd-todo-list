import { UseCaseError } from '../../../../shared/core/UseCaseError';
import { Result } from '../../../../shared/core/Result';

export class TaskNotFound extends Result<UseCaseError> {
  constructor(taskId: string) {
    super(false, {
      message: `Task with taskId ${taskId} not found.`
    } as UseCaseError);
  }
}
