import { Result } from '../../../shared/core/Result';

interface TaskCompletedProps {
  value: boolean;
}

export class TaskCompleted {
  private props: TaskCompletedProps;

  get value(): boolean {
    return this.props.value;
  }

  private constructor(props: TaskCompletedProps) {
    this.props = props;
  }

  public static create(props: TaskCompletedProps): Result<TaskCompleted> {
    if (typeof props.value !== 'boolean') {
      return Result.fail<TaskCompleted>(
        `Task completed value must be of type boolean`
      );
    }
    return Result.ok<TaskCompleted>(new TaskCompleted(props));
  }
}
