/**
 * @throws {TypeError} if the input is not an instance of Error
 */
function assertIsError(error: unknown): asserts error is Error {
  if (!(error instanceof Error)) {
    throw new TypeError(`"error" is not an Error`);
  }
}

export { assertIsError };
