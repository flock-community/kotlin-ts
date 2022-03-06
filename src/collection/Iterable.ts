// From: https://github.com/JetBrains/kotlin/blob/master/libraries/stdlib/common/src/generated/_Collections.kt
import { throws } from "../utils";
import { IndexOutOfBoundsException } from "../Exceptions";

declare global {
  /** @tsplus type Iterable */
  export interface Iterable<T> {}
  /** @tsplus type Iterable */
  export interface Map<K, V> {}
  /** @tsplus type Iterable */
  export interface Set<T> {}
  /** @tsplus type Iterable */
  export interface Array<T> {}
}

/**
 * @tsplus type IterableOps
 */
export interface IterableOps {}
export const Iterable: IterableOps = {};

/**
 * @tsplus static IterableOps __call
 */
export function createIterable<T, P extends [...unknown[]] & { length: 0 }>(
  iteratorFactory: (...args: P) => Iterator<T>
): Iterable<T>;
export function createIterable<T, S, P extends [...unknown[]]>(
  iteratorFactory: (self?: S, ...rest: P) => Iterator<T>
): (self?: S, ...rest: P) => Iterable<T>;
export function createIterable<T, S, P extends [...unknown[]]>(
  iteratorFactory: (self: S, ...rest: P) => Iterator<T>
): (self: S, ...rest: P) => Iterable<T>;
export function createIterable<T, P extends [...unknown[]]>(
  iteratorFactory: (...args: P) => Iterator<T>
): Iterable<T> | ((...args: P) => Iterable<T>) {
  if (iteratorFactory.length === 0) return { [Symbol.iterator]: iteratorFactory };
  return (...args: P) => ({ [Symbol.iterator]: () => iteratorFactory(...args) });
}

/**
 * @tsplus static IterableOps naturals
 */
export const naturals = Iterable(() => {
  let n = 0;
  return { next: () => ({ value: n++, done: false }) };
});

/**
 * Returns `true` if all elements match the given [predicate].
 *
 * @tsplus fluent Iterable all
 */
export function all<T>(self: Iterable<T>, predicate: (item: T) => boolean): boolean {
  for (const it of self) if (!predicate(it)) return false;
  return true;
}

/**
 * Returns a list containing the results of applying the given [transform] function
 * to each element in the original collection.
 *
 * @tsplus fluent Iterable map
 */
export const map = Iterable(function* <T, R>(self: Iterable<T>, transform: (it: T) => R) {
  for (const it of self) yield transform(it);
});

/**
 * Returns an iterator over the elements of this object.
 * @tsplus fluent Iterable toArray
 */
export const toArray = <T>(self: Iterable<T>) => [...self];

/**
 * Returns an iterator over the elements of this object.
 * @tsplus fluent Iterable iterator
 */
export const iterator = <T>(self: Iterable<T>) => self[Symbol.iterator]();

/**
 * Returns `true` if [element] is found in the collection.
 *
 * @tsplus fluent Iterable contains
 * @tsplus fluent Array contains
 */
export const contains = <T>(self: Iterable<T>, element: T): boolean => self.indexOf(element) !== -1;

/**
 * Returns an element at the given [index] or throws an [IndexOutOfBoundsException] if the [index] is out of bounds of this collection.
 *
 * @tsplus fluent Iterable elementAt
 */
export const elementAt = <T>(self: Iterable<T>, index: number): T =>
  self.zip(naturals).find(([, i]) => i === index)?.[0] ?? throws(new IndexOutOfBoundsException());

/**
 * Returns the first element matching the given [predicate], or `undefined` if element was not found.
 * @tsplus fluent Iterable find
 */
export function find<T>(self: Iterable<T>, predicate: (t: T) => boolean): T | undefined {
  for (const it of self) if (predicate(it)) return it;
}

/**
 * Returns first index of [element], or -1 if the collection does not contain element.
 *
 * @tsplus fluent Iterable indexOf
 */
export const indexOf = <T>(self: Iterable<T>, element: T): number =>
  self.zip(naturals).find(([it]) => it === element)?.[1] ?? -1;

/**
 * Returns first element.
 * @tsplus fluent Iterable first
 */
export function first<T>(self: Iterable<T>): T | undefined {
  const next = self.iterator().next();
  if (!next.done) return next.value;
}

/**
 * Returns index of the first element matching the given [predicate], or -1 if the collection does not contain such element.
 * @tsplus fluent Iterable indexOf
 */
export const indexOf_ = <T>(self: Iterable<T>, predicate: (t: T) => boolean): number =>
  self.zip(naturals).find(([it]) => predicate(it))?.[1] ?? -1;

/**
 * @tsplus fluent Iterable zip
 */
export const zip: <T, R>(self: Iterable<T>, other: Iterable<R>) => Iterable<[T, R]> = Iterable(
  <T, R>(self: Iterable<T>, other: Iterable<R>): Iterator<[T, R]> => {
    const iter = self[Symbol.iterator]();
    const otherIter = other[Symbol.iterator]();
    return {
      next(): IteratorResult<[T, R], unknown> {
        const { value, done } = iter.next();
        const { value: otherValue, done: otherDone } = otherIter.next();
        if (done || otherDone) return { value: [value, otherValue], done: true };
        return { value: [value, otherValue], done: done || otherDone };
      },
    };
  }
);

/**
 * Returns a lazy [Iterable] that wraps each element of the original collection
 * into a tuple [T, number] containing the index of that element and the element itself.
 *
 * @tsplus fluent Iterable withIndex
 */
export const withIndex = <T>(self: Iterable<T>): Iterable<[T, number]> => zip(self, naturals);
