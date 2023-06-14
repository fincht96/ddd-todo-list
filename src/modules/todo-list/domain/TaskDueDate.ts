import { Result } from '../../../shared/core/Result';

interface TaskDueDateProps {
  value: string; // ISO-8601 format date/time
}

export class TaskDueDate {
  private props: TaskDueDateProps;

  private static iso8601Pattern =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/;

  get value(): Date {
    return new Date(this.props.value);
  }

  private constructor(props: TaskDueDateProps) {
    this.props = props;
  }

  public static create(props: TaskDueDateProps): Result<TaskDueDate> {
    if (typeof props.value !== 'string') {
      return Result.fail<TaskDueDate>(
        `Task due date value must be of type ISO 8601 string`
      );
    }

    if (!this.iso8601Pattern.test(props.value)) {
      return Result.fail<TaskDueDate>(
        `Task due date value must be in ISO 8601 format`
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
