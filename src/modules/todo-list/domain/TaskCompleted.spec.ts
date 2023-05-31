import { TaskCompleted } from './TaskCompleted';

describe('TaskCompleted', () => {
  test('valid task completed', () => {
    const taskCompletedOrErrorResult = TaskCompleted.create({
      value: true
    });

    expect(taskCompletedOrErrorResult.isSuccess).toBe(true);
    expect(
      typeof taskCompletedOrErrorResult.getValue().value === 'boolean'
    ).toBe(true);
    expect(taskCompletedOrErrorResult.getValue().value).toEqual(true);
  });

  test('invalid task due date, undefined type', () => {
    const taskCompleted = undefined as unknown as boolean;
    const taskCompletedOrErrorResult = TaskCompleted.create({
      value: taskCompleted
    });

    expect(taskCompletedOrErrorResult.isFailure).toBe(true);
    expect(taskCompletedOrErrorResult.getErrorValue()).toBe(
      `Task completed value must be of type boolean`
    );
  });
});
