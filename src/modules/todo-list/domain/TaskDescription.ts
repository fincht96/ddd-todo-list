import { Result } from '../../../shared/core/Result';

interface TaskDescriptionProps {
  value: string;
}

export class TaskDescription {
  public static minLength = 2;
  public static maxLength = 1000;

  private props: TaskDescriptionProps;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: TaskDescriptionProps) {
    this.props = props;
  }

  public static create(props: TaskDescriptionProps): Result<TaskDescription> {
    if (typeof props.value !== 'string') {
      return Result.fail<TaskDescription>(
        `Task description value must be of type string`
      );
    }

    if (props.value.length > TaskDescription.maxLength) {
      return Result.fail<TaskDescription>(
        `Task description value must have a length less than ${TaskDescription.maxLength} characters`
      );
    }
    if (props.value.length < TaskDescription.minLength) {
      return Result.fail<TaskDescription>(
        `Task description value must have a length greater than ${TaskDescription.minLength} characters`
      );
    }
    return Result.ok<TaskDescription>(new TaskDescription(props));
  }
}
