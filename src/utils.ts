import { AssertionError } from "./Exceptions.js";

export function assertNever(_: never): never {
  throw new AssertionError("This point should never be reached.");
}

export function assert(condition: unknown, message?: string | Error): asserts condition {
  if (!condition) throw typeof message === "string" ? new AssertionError(message) : message;
}

export function throws(error: Error): never {
  throw error;
}

/**
 * @tsplus fluent object up
 */
export const up = <T>(self: T): T => self;
