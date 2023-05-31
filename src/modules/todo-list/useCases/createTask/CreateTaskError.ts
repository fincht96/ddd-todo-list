import { UseCaseError } from '../../../../shared/core/UseCaseError';
import { Result } from '../../../../shared/core/Result';

export class CreateTaskError extends Result<UseCaseError> {
  constructor(username: string) {
    super(false, {
      message: `No user with the username ${username} was found`
    } as UseCaseError);
  }
}
