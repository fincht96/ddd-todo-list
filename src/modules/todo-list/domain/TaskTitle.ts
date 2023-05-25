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

  public static create(props: TaskTitleProps): TaskTitle {
    if (props.value.length > TaskTitle.maxLength) {
      throw new Error(
        `Task title must have a length less than ${TaskTitle.maxLength} characters`
      );
    }

    if (props.value.length < TaskTitle.minLength) {
      throw new Error(
        `Task title must have a length greater than ${TaskTitle.minLength} characters`
      );
    }

    return new TaskTitle(props);
  }
}
