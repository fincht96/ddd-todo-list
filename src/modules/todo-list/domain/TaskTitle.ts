import { Result } from '../../../shared/core/Result';

interface TaskTitleProps {
  value: string;
}

export class TaskTitle {
  public static minLength = 2;
  public static maxLength = 250;

  private props: TaskTitleProps;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: TaskTitleProps) {
    this.props = props;
  }

  public static create(props: TaskTitleProps): Result<TaskTitle> {
    if (typeof props.value !== 'string') {
      return Result.fail<TaskTitle>(`Task title value must be of type string`);
    }

    if (props.value.length > TaskTitle.maxLength) {
      return Result.fail<TaskTitle>(
        `Task title value must have a length less than ${TaskTitle.maxLength} characters`
      );
    }
    if (props.value.length < TaskTitle.minLength) {
      return Result.fail<TaskTitle>(
        `Task title value must have a length greater than ${TaskTitle.minLength} characters`
      );
    }
    return Result.ok<TaskTitle>(new TaskTitle(props));
  }
}
