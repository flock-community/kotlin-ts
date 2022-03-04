// From https://github.com/JetBrains/kotlin/blob/master/libraries/stdlib/src/kotlin/util/Standard.kt

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
 * Calls the specified function [block] with `this` value as its argument and returns its result.
 *
 * For detailed usage information see the documentation for [scope functions](https://kotlinlang.org/docs/reference/scope-functions.html#let).
 *
 * @tsplus fluent object let
 */
export function let_<T, R>(self: T, block: (t: T) => R): R {
  return block(self);
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
 * @tsplus fluent object up
 */
export function up<T>(self: T): T {
  return self;
}
