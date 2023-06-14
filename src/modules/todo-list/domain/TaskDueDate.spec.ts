import { TaskDueDate } from './TaskDueDate';

describe('TaskDueDate', () => {
  test('valid task due date', () => {
    const dueDate: Date = new Date(Date.now() + 60 * 1000 * 60);
    const titleOrErrorResult = TaskDueDate.create({
      value: dueDate.toISOString()
    });

    expect(titleOrErrorResult.isSuccess).toBe(true);
    expect(titleOrErrorResult.getValue().value instanceof Date).toBe(true);
    expect(titleOrErrorResult.getValue().value).toEqual(dueDate);
  });

  test('invalid task due date as in past', () => {
    const dueDate: Date = new Date(Date.now() - 60 * 1000 * 60);
    const titleOrErrorResult = TaskDueDate.create({
      value: dueDate.toISOString()
    });

    expect(titleOrErrorResult.isFailure).toBe(true);
    expect(titleOrErrorResult.getErrorValue()).toBe(
      `Task due date value must be in the future`
    );
  });

  test('invalid task due date, undefined type', () => {
    const dueDate = undefined as unknown as string;
    const titleOrErrorResult = TaskDueDate.create({
      value: dueDate
    });

    expect(titleOrErrorResult.isFailure).toBe(true);
    expect(titleOrErrorResult.getErrorValue()).toBe(
      `Task due date value must be of type ISO 8601 string`
    );
  });

  test('invalid task due date, string type', () => {
    const dueDate = '2023-06-13';
    const titleOrErrorResult = TaskDueDate.create({
      value: dueDate
    });

    expect(titleOrErrorResult.isFailure).toBe(true);
    expect(titleOrErrorResult.getErrorValue()).toBe(
      `Task due date value must be in ISO 8601 format`
    );
  });
});
