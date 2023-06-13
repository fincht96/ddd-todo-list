import { Task, TaskProps } from './Task';
import { TaskTitle } from './TaskTitle';
import { TaskDescription } from './TaskDescription';
import { TaskDueDate } from './TaskDueDate';
import { TaskCompleted } from './TaskCompleted';

describe('Task', () => {
  const firstDate = new Date(Date.now() + 60 * 1000);
  const secondDate = new Date(Date.now() + 60 * 1000 * 1000);

  const oldProps: TaskProps = {
    title: TaskTitle.create({ value: 'Example title' }).getValue(),
    description: TaskDescription.create({
      value: 'This is an example description'
    }).getValue(),
    dueDate: TaskDueDate.create({ value: firstDate.toISOString() }).getValue(),
    isCompleted: TaskCompleted.create({ value: false }).getValue()
  };

  const newProps: TaskProps = {
    title: TaskTitle.create({ value: 'Another Example title' }).getValue(),
    description: TaskDescription.create({
      value: 'Another example description'
    }).getValue(),
    dueDate: TaskDueDate.create({ value: secondDate.toISOString() }).getValue(),
    isCompleted: TaskCompleted.create({ value: true }).getValue()
  };

  test('should create task', () => {
    const taskOrErrorResult = Task.create(oldProps);
    expect(taskOrErrorResult.isSuccess).toEqual(true);
    expect(taskOrErrorResult.isFailure).toEqual(false);
    expect(taskOrErrorResult.getValue().title).toEqual(oldProps.title);
    expect(taskOrErrorResult.getValue().description).toEqual(
      oldProps.description
    );
    expect(taskOrErrorResult.getValue().dueDate).toEqual(oldProps.dueDate);
    expect(taskOrErrorResult.getValue().isCompleted).toEqual(
      oldProps.isCompleted
    );
  });

  test('should not create task, missing prop values', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { title, ...rest } = oldProps;
    const invalidProps = rest as unknown as TaskProps;
    const taskOrErrorResult = Task.create({ ...invalidProps });
    expect(taskOrErrorResult.isSuccess).toEqual(false);
    expect(taskOrErrorResult.isFailure).toEqual(true);
    expect(taskOrErrorResult.getErrorValue()).toEqual(
      'title is null or undefined'
    );
  });

  test('should update task', () => {
    const taskOrErrorResult = Task.create(oldProps);
    expect(taskOrErrorResult.isSuccess).toEqual(true);
    taskOrErrorResult.getValue().updateTaskProps(newProps);
    expect(taskOrErrorResult.getValue().title).toEqual(newProps.title);
    expect(taskOrErrorResult.getValue().description).toEqual(
      newProps.description
    );
    expect(taskOrErrorResult.getValue().dueDate).toEqual(newProps.dueDate);
    expect(taskOrErrorResult.getValue().isCompleted).toEqual(
      newProps.isCompleted
    );
  });

  test('should not update task, missing prop values', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { description, ...rest } = oldProps;
    const invalidProps = rest as unknown as TaskProps;

    const taskOrErrorResult = Task.create(oldProps);
    expect(taskOrErrorResult.isSuccess).toEqual(true);

    const updateOrErrorResult = taskOrErrorResult
      .getValue()
      .updateTaskProps(invalidProps);

    expect(updateOrErrorResult.isSuccess).toEqual(false);
    expect(updateOrErrorResult.isFailure).toEqual(true);
    expect(updateOrErrorResult.getErrorValue()).toEqual(
      'description is null or undefined'
    );
  });
});
