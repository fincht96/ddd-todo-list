import { Result } from './Result';

describe('Results', () => {
  test('should create a successful result', () => {
    const result = new Result(true, null, 5);
    expect(result.getValue()).toBe(5);
    expect(result.isSuccess).toBe(true);
  });

  test('should create a failed result', () => {
    const result = new Result(false, 'This is an error');
    expect(result.getErrorValue()).toBe('This is an error');
  });

  test('given results are logically anded together with a failing result, should create a failed result', () => {
    const results = [
      new Result(false, 'This is an error'),
      new Result(true, null, 5),
      new Result(true, null, 'Another successful answer'),
      new Result(true, null, { a: 5, c: 45 }),
      new Result(true, null, { a: 5, c: 45 })
    ];

    const finalResult = Result.combine(results);
    expect(finalResult.isSuccess).toBe(false);
    expect(finalResult.isFailure).toBe(true);
  });

  test('given successful results are logically anded together, should create a success result', () => {
    const results = [
      new Result(true, null, 5),
      new Result(true, null, 'Another successful answer'),
      new Result(true, null, { a: 5, c: 45 }),
      new Result(true, null, {
        func: () => {
          console.log('hi');
        },
        c: 45
      })
    ];

    const finalResult = Result.combine(results);
    expect(finalResult.isSuccess).toBe(true);
    expect(finalResult.getValue()).toBe(undefined);
  });
});
