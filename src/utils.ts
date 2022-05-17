import { AssertionException } from "./Exceptions.js";

export function assertNever(_: never): never {
  throw new AssertionException("This point should never be reached.");
}

/**
 * Throws an [IllegalArgumentException] with the result of calling [lazyMessage] if the [value] is false.
 */
export function assert(condition: unknown, message?: string): asserts condition {
  if (!condition) throw new AssertionException(message);
}

export function throws(error: Error): never {
  throw error;
}

/**
 * @tsplus fluent object up
 */
export const up = <T>(self: T): T => self;

/**
 * @tsplus fluent object omit
 */
export const omit = <T extends Record<string, unknown>, K extends string>(object: T, key: K): Omit<T, K> => {
  const { [key]: _, ...rest } = object;
  return rest;
};
