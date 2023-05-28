import { generateUniqueId } from '../../../shared/utils/generateUniqueId';
import { TaskDescription } from './TaskDescription';
import { TaskTitle } from './TaskTitle';

export interface TaskProps {
  title: TaskTitle;
  description: TaskDescription;
  isCompleted: boolean;
  dueDate: Date;
}

export class Task {
  private uniqueId: string;
  private props: TaskProps;

  private constructor(props: TaskProps, uniqueId: string) {
    this.props = props;
    this.uniqueId = uniqueId;
  }

  get taskId(): string {
    return this.uniqueId;
  }

  get title(): TaskTitle {
    return this.props.title;
  }

  get description(): TaskDescription {
    return this.props.description;
  }

  get dueDate(): Date {
    return this.props.dueDate;
  }

  get isCompleted(): boolean {
    return this.props.isCompleted;
  }

  public equals(anotherTask: Task): boolean {
    if (this === anotherTask || anotherTask.uniqueId === this.uniqueId) {
      return true;
    }
    return false;
  }

  public updateTaskProps(newProps: TaskProps) {
    this.props = newProps;
  }

  public static create(props: TaskProps, uniqueId?: string) {
    return new Task(props, uniqueId ?? generateUniqueId());
  }
}
