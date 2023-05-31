import { TaskTitle } from './TaskTitle';

describe('TaskTitle', () => {
  const tooLongTitle = Array(TaskTitle.maxLength + 1)
    .fill('')
    .map(() => 'a')
    .join('');
  const tooShortTitle = '';

  test('valid task title', () => {
    const titleOrErrorResult = TaskTitle.create({
      value: 'An example task title'
    });

    expect(titleOrErrorResult.isSuccess).toBe(true);
    expect(titleOrErrorResult.getValue().value).toBe('An example task title');
  });

  test('task title too long', () => {
    const titleOrErrorResult = TaskTitle.create({
      value: tooLongTitle
    });

    expect(titleOrErrorResult.isFailure).toBe(true);
    expect(titleOrErrorResult.getErrorValue()).toBe(
      `Task title value must have a length less than ${TaskTitle.maxLength} characters`
    );
  });

  test('task title too short', () => {
    const titleOrErrorResult = TaskTitle.create({
      value: tooShortTitle
    });

    expect(titleOrErrorResult.isFailure).toBe(true);
    expect(titleOrErrorResult.getErrorValue()).toBe(
      `Task title value must have a length greater than ${TaskTitle.minLength} characters`
    );
  });

  test('task title undefined type', () => {
    const invalid = undefined as unknown as string;
    const titleOrErrorResult = TaskTitle.create({
      value: invalid
    });

    expect(titleOrErrorResult.isFailure).toBe(true);
    expect(titleOrErrorResult.getErrorValue()).toBe(
      `Task title value must be of type string`
    );
  });

  test('task title incorrect type prop', () => {
    const invalid = 2 as unknown as string;
    const titleOrErrorResult = TaskTitle.create({
      value: invalid
    });

    expect(titleOrErrorResult.isFailure).toBe(true);
    expect(titleOrErrorResult.getErrorValue()).toBe(
      `Task title value must be of type string`
    );
  });
});
