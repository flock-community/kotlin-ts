export class UnsupportedOperationException extends Error {
  override readonly name = "UnsupportedOperationException";
}

export class IllegalArgumentException extends Error {
  override readonly name = "IllegalArgumentException";
}

export class NoSuchElementException extends Error {
  override readonly name = "NoSuchElementException";
}

export class IndexOutOfBoundsException extends Error {
  override readonly name = "IndexOutOfBoundsException";
}

export class AssertionException extends Error {
  override readonly name = "AssertionException";
}

/**
 * An exception is thrown to indicate that a method body remains to be implemented.
 */
export class NotImplementedError extends Error {
  override readonly name = "NotImplementedError";

  constructor(message: string = "An operation is not implemented.") {
    super(message);
  }
}
