import { TaskTitle } from './TaskTitle';

describe('TaskTitle', () => {
  const tooLongTitle = Array(TaskTitle.maxLength + 1)
    .fill('')
    .map(() => 'a')
    .join('');
  const tooShortTitle = '';

  test('create valid task title', () => {
    const title = TaskTitle.create({
      value: 'An example task title'
    });

    expect(title.value).toBe('An example task title');
  });

  test('task title too long', () => {
    expect(() =>
      TaskTitle.create({
        value: tooLongTitle
      })
    ).toThrowError(
      `Task title must have a length less than ${TaskTitle.maxLength} characters`
    );
  });

  test('task title too short', () => {
    expect(() =>
      TaskTitle.create({
        value: tooShortTitle
      })
    ).toThrowError(
      `Task title must have a length greater than ${TaskTitle.minLength} characters`
    );
  });
});
