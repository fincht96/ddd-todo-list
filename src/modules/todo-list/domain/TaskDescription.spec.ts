import { TaskDescription } from './TaskDescription';

describe('TaskDescription', () => {
  const tooLongDescription = Array(TaskDescription.maxLength + 1)
    .fill('')
    .map(() => 'a')
    .join('');
  const tooShortDescription = '';

  test('create valid task description', () => {
    const description = TaskDescription.create({
      value: 'An example task description'
    });

    expect(description.value).toBe('An example task description');
  });

  test('task description too long', () => {
    expect(() =>
      TaskDescription.create({
        value: tooLongDescription
      })
    ).toThrowError(
      `Task description must have a length less than ${TaskDescription.maxLength} characters`
    );
  });

  test('task description too short', () => {
    expect(() =>
      TaskDescription.create({
        value: tooShortDescription
      })
    ).toThrowError(
      `Task description must have a length greater than ${TaskDescription.minLength} characters`
    );
  });
});
