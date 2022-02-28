// From: https://github.com/JetBrains/kotlin/blob/master/libraries/stdlib/common/src/generated/_Collections.kt
import "../global";

/**
 * @tsplus type IterableOps
 */
export interface IterableOps {}
export const Iterable: IterableOps = {};

/**
 * @tsplus static IterableOps __call
 */
export const createIterable = <T>(iteratorFactory: () => Iterator<T>): Iterable<T> => ({
  [Symbol.iterator]: iteratorFactory,
});

/**
 * @tsplus static IterableOps naturals
 */
export const naturals = (): Iterable<number> =>
  Iterable(() => {
    let n = 0;
    return { next: () => ({ value: n++, done: false }) };
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
 * Returns an element at the given [index] or undefined if the [index] is out of bounds of this collection.
 *
 * @tsplus fluent Iterable elementAt
 */
export const elementAt = <T>(self: Iterable<T>, index: number): T | undefined =>
  self.zip(naturals()).find(([, i]) => i === index)?.[0];

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
  self.zip(naturals()).find(([it]) => it === element)?.[1] ?? -1;

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
  self.zip(naturals()).find(([it]) => predicate(it))?.[1] ?? -1;

/**
 * @tsplus fluent Iterable zip
 * @tsplus operator Iterable +
 */
// Arrow functions, because of https://github.com/ts-plus/typescript/issues/69
export function zip<T, R>(self: Iterable<T>, other: Iterable<R>): Iterable<[T, R]> {
  return Iterable(() => {
    const iterators = [self.iterator(), other.iterator()] as const;
    return {
      next() {
        const next = [iterators[0].next(), iterators[1].next()] as const;
        return { value: [next[0].value, next[1].value], done: next[0].done || next[1].done };
      },
    };
  });
}

/**
 * Returns a lazy [Iterable] that wraps each element of the original collection
 * into a tuple [T, number] containing the index of that element and the element itself.
 *
 * @tsplus fluent Iterable withIndex
 */
export const withIndex = <T>(self: Iterable<T>): Iterable<[T, number]> => self.zip(naturals());
