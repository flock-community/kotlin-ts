// From https://github.com/JetBrains/kotlin/blob/master/libraries/stdlib/src/kotlin/util/Standard.kt
import { throws } from "@flock/kotlin-ts/utils";
import { NotImplementedError } from "@flock/kotlin-ts/Exceptions";

declare global {
  /**
   * @tsplus type object
   * @tsplus type string
   */
  export interface String {}
  /**
   * @tsplus type object
   * @tsplus type number
   */
  export interface Number {}
  /**
   * @tsplus type object
   * @tsplus type boolean
   */
  export interface Boolean {}
  /**
   * @tsplus type bigint
   * @tsplus type object
   */
  export interface BigInt {}

  /**
   * @tsplus type function
   * @tsplus type object
   */
  export interface Function {}
  /**
   * @tsplus type regexp
   * @tsplus type object
   */
  export interface RegExp {}
  /**
   * @tsplus type object
   */
  export interface Object {}
}

/**
 * Calls the specified function [block] with `this` value as its argument and returns `this` value.
 *
 * For detailed usage information see the documentation for [scope functions](https://kotlinlang.org/docs/reference/scope-functions.html#also).
 *
 * @tsplus fluent object also
 */
export function also<T>(self: T, block: (t: T) => void): T {
  block(self);
  return self;
}

/**
 * Calls the specified function [block] with `this` value as its argument and returns its result.
 *
 * For detailed usage information see the documentation for [scope functions](https://kotlinlang.org/docs/reference/scope-functions.html#let).
 *
 * @tsplus fluent object let
 */
export const let_ = <T, R>(self: T, block: (t: T) => R): R => block(self);

/**
 * Returns `this` value if it satisfies the given [predicate] or `null`, if it doesn't.
 *
 * For detailed usage information see the documentation for [scope functions](https://kotlinlang.org/docs/reference/scope-functions.html#takeif-and-takeunless).
 *
 * @tsplus fluent object takeIf
 */
export const takeIf = <T>(self: T, predicate: (it: T) => boolean): T | undefined =>
  predicate(self) ? self : undefined;

/**
 * Returns `this` value if it _does not_ satisfy the given [predicate] or `null`, if it does.
 *
 * For detailed usage information see the documentation for [scope functions](https://kotlinlang.org/docs/reference/scope-functions.html#takeif-and-takeunless).
 *
 * @tsplus fluent object takeUnless
 */
export const takeUnless = <T>(self: T, predicate: (it: T) => boolean): T | undefined =>
  !predicate(self) ? self : undefined;

/**
 * Always throws [NotImplementedError] stating that operation is not implemented.
 */
export const TODO = (reason?: string): never =>
  throws(new NotImplementedError(reason == null ? undefined : `"An operation is not implemented: ${reason}`));
