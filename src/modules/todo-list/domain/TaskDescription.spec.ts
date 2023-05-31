import { TaskDescription } from './TaskDescription';

describe('TaskDescription', () => {
  const tooLongDescription = Array(TaskDescription.maxLength + 1)
    .fill('')
    .map(() => 'a')
    .join('');
  const tooShortDescription = '';

  test('valid task description', () => {
    const descriptioOrErrorResult = TaskDescription.create({
      value: 'An example task description'
    });

    expect(descriptioOrErrorResult.isSuccess).toBe(true);
    expect(descriptioOrErrorResult.getValue().value).toBe(
      'An example task description'
    );
  });

  test('task title too long', () => {
    const descriptioOrErrorResult = TaskDescription.create({
      value: tooLongDescription
    });

    expect(descriptioOrErrorResult.isFailure).toBe(true);
    expect(descriptioOrErrorResult.getErrorValue()).toBe(
      `Task description value must have a length less than ${TaskDescription.maxLength} characters`
    );
  });

  test('task title too short', () => {
    const descriptioOrErrorResult = TaskDescription.create({
      value: tooShortDescription
    });

    expect(descriptioOrErrorResult.isFailure).toBe(true);
    expect(descriptioOrErrorResult.getErrorValue()).toBe(
      `Task description value must have a length greater than ${TaskDescription.minLength} characters`
    );
  });

  test('task description undefined type', () => {
    const invalid = undefined as unknown as string;
    const descriptioOrErrorResult = TaskDescription.create({
      value: invalid
    });

    expect(descriptioOrErrorResult.isFailure).toBe(true);
    expect(descriptioOrErrorResult.getErrorValue()).toBe(
      `Task description value must be of type string`
    );
  });

  test('task description incorrect type prop', () => {
    const invalid = 2 as unknown as string;
    const descriptioOrErrorResult = TaskDescription.create({
      value: invalid
    });

    expect(descriptioOrErrorResult.isFailure).toBe(true);
    expect(descriptioOrErrorResult.getErrorValue()).toBe(
      `Task description value must be of type string`
    );
  });
});
