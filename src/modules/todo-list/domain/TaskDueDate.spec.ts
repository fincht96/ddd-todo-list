import { TaskDueDate } from './TaskDueDate';

describe('TaskDueDate', () => {
  test('valid task due date', () => {
    const dueDate: Date = new Date(Date.now() + 60 * 1000 * 60);
    const titleOrErrorResult = TaskDueDate.create({
      value: dueDate.getTime()
    });

    expect(titleOrErrorResult.isSuccess).toBe(true);
    expect(titleOrErrorResult.getValue().value instanceof Date).toBe(true);
    expect(titleOrErrorResult.getValue().value).toEqual(dueDate);
  });

  test('invalid task due date as in past', () => {
    const dueDate: Date = new Date(Date.now() - 60 * 1000 * 60);
    const titleOrErrorResult = TaskDueDate.create({
      value: dueDate.getTime()
    });

    expect(titleOrErrorResult.isFailure).toBe(true);
    expect(titleOrErrorResult.getErrorValue()).toBe(
      `Task due date value must be in the future`
    );
  });

  test('invalid task due date, undefined type', () => {
    const dueDate = undefined as unknown as number;
    const titleOrErrorResult = TaskDueDate.create({
      value: dueDate
    });

    expect(titleOrErrorResult.isFailure).toBe(true);
    expect(titleOrErrorResult.getErrorValue()).toBe(
      `Task due date value must be of type number`
    );
  });

  test('invalid task due date, string type', () => {
    const dueDate = 'hello world' as unknown as number;
    const titleOrErrorResult = TaskDueDate.create({
      value: dueDate
    });

    expect(titleOrErrorResult.isFailure).toBe(true);
    expect(titleOrErrorResult.getErrorValue()).toBe(
      `Task due date value must be of type number`
    );
  });
});
