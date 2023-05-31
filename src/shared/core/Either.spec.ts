import { Either, left, right } from './Either';
import { Result } from './Result';

describe('Either', () => {
  test('should return left result (error)', () => {
    type Response = Either<Result<Error>, Result<string>>;

    const errResult = new Result<Error>(false, new Error('This is an error'));
    const finalResult: Response = left(errResult);

    expect(finalResult.isLeft()).toBe(true);
    expect(finalResult.isRight()).toBe(false);
    expect(finalResult.value).toBe(errResult);
  });

  test('should return right result (success)', () => {
    type Response = Either<Result<Error>, Result<string>>;

    const successResult = new Result<string>(
      true,
      undefined,
      'My casual success'
    );
    const finalResult: Response = right(successResult);

    expect(finalResult.isLeft()).toBe(false);
    expect(finalResult.isRight()).toBe(true);
    expect(finalResult.value).toBe(successResult);
  });
});
