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

  public static create(props: TaskDescriptionProps): TaskDescription {
    if (props.value.length > TaskDescription.maxLength) {
      throw new Error(
        `Task description must have a length less than ${TaskDescription.maxLength} characters`
      );
    }

    if (props.value.length < TaskDescription.minLength) {
      throw new Error(
        `Task description must have a length greater than ${TaskDescription.minLength} characters`
      );
    }

    return new TaskDescription(props);
  }
}
