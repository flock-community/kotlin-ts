import { Iterable } from "./Iterable";

declare global {
  /**
   * @tsplus type number
   */
  export interface Number {}
}

/**
 * Creates a range from this value to the specified [other] value.
 *
 * @tsplus fluent number rangeTo
 * @tsplus fluent number to
 */
export const rangeTo = Iterable(function* (self: number, other: number) {
  for (let i = self; i < other; i++) yield i;
});
