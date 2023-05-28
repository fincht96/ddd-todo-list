export function toError(arg: unknown): Error {
  if (arg instanceof Error) {
    return arg;
  }

  try {
    if (typeof arg === 'string') {
      return new Error(arg);
    }
    return new Error(JSON.stringify(arg));
  } catch (error) {
    return new Error(String(error));
  }
}
