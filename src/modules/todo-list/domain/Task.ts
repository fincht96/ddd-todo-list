import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { generateUniqueId } from '../../../shared/utils/generateUniqueId';
import { TaskCompleted } from './TaskCompleted';
import { TaskDescription } from './TaskDescription';
import { TaskDueDate } from './TaskDueDate';
import { TaskTitle } from './TaskTitle';

export interface TaskProps {
  title: TaskTitle;
  description: TaskDescription;
  isCompleted: TaskCompleted;
  dueDate: TaskDueDate;
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

  get dueDate(): TaskDueDate {
    return this.props.dueDate;
  }

  get isCompleted(): TaskCompleted {
    return this.props.isCompleted;
  }

  public equals(anotherTask: Task): boolean {
    if (this === anotherTask || anotherTask.uniqueId === this.uniqueId) {
      return true;
    }
    return false;
  }

  public updateTaskProps(newProps: TaskProps) {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: newProps.title, argumentName: 'title' },
      { argument: newProps.description, argumentName: 'description' },
      { argument: newProps.dueDate, argumentName: 'dueDate' },
      { argument: newProps.isCompleted, argumentName: 'isCompleted' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<void>(nullGuard.getErrorValue());
    }

    this.props = newProps;

    return Result.ok<void>();
  }

  public static create(props: TaskProps, uniqueId?: string) {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.title, argumentName: 'title' },
      { argument: props.description, argumentName: 'description' },
      { argument: props.dueDate, argumentName: 'dueDate' },
      { argument: props.isCompleted, argumentName: 'isCompleted' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Task>(nullGuard.getErrorValue());
    }

    // TODO: validate actual data not just assume types are valid, maybe some kind of schema testing??

    return Result.ok<Task>(new Task(props, uniqueId ?? generateUniqueId()));
  }
}
