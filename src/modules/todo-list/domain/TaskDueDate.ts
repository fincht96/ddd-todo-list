import { Result } from '../../../shared/core/Result';

interface TaskDueDateProps {
  value: number;
}

export class TaskDueDate {
  private props: TaskDueDateProps;

  get value(): Date {
    return new Date(this.props.value);
  }

  private constructor(props: TaskDueDateProps) {
    this.props = props;
  }

  public static create(props: TaskDueDateProps): Result<TaskDueDate> {
    if (typeof props.value !== 'number') {
      return Result.fail<TaskDueDate>(
        `Task due date value must be of type number`
      );
    }

    const currentDateTime = new Date();
    const dueDateTime = new Date(props.value);

    if (dueDateTime.getTime() < currentDateTime.getTime()) {
      return Result.fail<TaskDueDate>(
        `Task due date value must be in the future`
      );
    }

    return Result.ok<TaskDueDate>(new TaskDueDate(props));
  }
}
