import { toError } from './Error';

describe('Error', () => {
  test('should, provided a standard error with message, return error with message', async () => {
    const error = new Error('Example error');
    const result = toError(error);
    expect(result instanceof Error).toBe(true);
    expect(result.message).toBe('Example error');
  });

  test('should, provided a string, return an error with message', async () => {
    const text = 'Example error';
    const result = toError(text);
    expect(result instanceof Error).toBe(true);
    expect(result.message).toBe('Example error');
  });

  test('should, provided a string, return an error with message', async () => {
    const text = 'Example error';
    const result = toError(text);
    expect(result instanceof Error).toBe(true);
    expect(result.message).toBe('Example error');
  });

  test('should, provided a simple object, return an error with message', async () => {
    const obj = { a: 'this property' };
    const result = toError(obj);
    expect(result instanceof Error).toBe(true);
    expect(result.message).toBe('{"a":"this property"}');
  });

  test('should, provided a simple function, return an error with an empty message', async () => {
    const fn = (a: number, b: number) => {
      return a + b;
    };

    const result = toError(fn);
    expect(result instanceof Error).toBe(true);
    expect(result.message).toBe('');
  });

  test('should, provided a circular dependency, return an error with message', async () => {
    const obj: any = {};
    obj.circularRef = obj;

    const result = toError(obj);
    expect(result instanceof Error).toBe(true);
    expect(result.message)
      .toBe(`TypeError: Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    --- property 'circularRef' closes the circle`);
  });
});
