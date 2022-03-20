import { Iterable } from "./Iterable.js";

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
  for (let i = self; i <= other; i++) yield i;
});

/**
 * Returns a range from this value up to but excluding the specified [to] value.
 *
 * If the [to] value is less than or equal to `this` value, then the returned range is empty.
 *
 * @tsplus fluent number until
 */
export const until = Iterable(function* (self: number, other: number) {
  for (let i = self; i < other; i++) yield i;
});
