// From: https://github.com/JetBrains/kotlin/blob/master/libraries/stdlib/common/src/generated/_Collections.kt
import "../global";
import { IndexOutOfBoundsException, NoSuchElementException } from "../Exceptions";

/**
 * @tsplus type IterableOps
 */
export interface IterableOps {}
export const Iterable: IterableOps = {};

/**
 * @tsplus static IterableOps __call
 */
export function createIterable<T>(iteratorFactory: () => Iterator<T>): Iterable<T> {
  return { [Symbol.iterator]: iteratorFactory };
}

/**
 * @tsplus static IterableOps naturals
 */
export function naturals(): Iterable<number> {
  return Iterable(() => {
    let n = 0;
    return {
      next: () => ({ value: n++, done: false }),
    };
  });
}

/**
 * Returns an iterator over the elements of this object.
 * @tsplus fluent Iterable toArray
 */
export function toArray<T>(self: Iterable<T>) {
  return [...self];
}

/**
 * Returns an iterator over the elements of this object.
 * @tsplus fluent Iterable iterator
 */
export function iterator<T>(self: Iterable<T>) {
  return self[Symbol.iterator]();
}

/**
 * Returns `true` if [element] is found in the collection.
 *
 * @tsplus fluent Iterable contains
 * @tsplus fluent Array contains
 */
export function contains<T>(self: Iterable<T>, element: T): boolean {
  return self.indexOf(element) !== -1;
}

/**
 * Returns an element at the given [index] or throws an [IndexOutOfBoundsException] if the [index] is out of bounds of this collection.
 *
 * @tsplus fluent Iterable elementAt
 */
export function elementAt<T>(self: Iterable<T>, index: number) {
  return self.elementAtOrElse(index, () => {
    throw new IndexOutOfBoundsException("Collection doesn't contain element at index $index.");
  });
}

/**
 * Returns an element at the given [index] or the result of calling the [defaultValue] function if the [index] is out of bounds of this collection.
 *
 * @tsplus fluent Iterable elementAtOrElse
 */
export function elementOrElse<T>(self: Iterable<T>, index: number, defaultValue: (index: number) => T): T {
  if (index < 0) return defaultValue(index);
  let count = 0;
  for (const element of self) if (index === count++) return element;
  return defaultValue(index);
}

/**
 * Returns a lazy [Iterable] that wraps each element of the original collection
 * into a tuple [T, number] containing the index of that element and the element itself.
 *
 * @tsplus fluent Iterable withIndex
 */
export function withIndex<T>(self: Iterable<T>): Iterable<[T, number]> {
  return Iterable(() => self.iterator().withIndex());
}

/**
 * Returns first index of [element], or -1 if the collection does not contain element.
 *
 * @tsplus fluent Iterable indexOf
 */
export function indexOf<T>(self: Iterable<T>, element: T): number {
  let index = 0;
  for (const item of self) {
    if (element === item) return index;
    index += 1;
  }
  return -1;
}

/**
 * Returns first element.
 * @throws {NoSuchElementException} if the collection is empty.
 * @tsplus fluent Iterable first
 */
export function first<T>(self: Iterable<T>) {
  const next = self.iterator().next();
  if (!next.done) return next.value;
  throw new NoSuchElementException();
}

/**
 * @tsplus operator Iterable +
 * @tsplus fluent Iterable zip
 */
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

// public inline fun <T, R, V> Iterable<T>.zip(other: Iterable<R>, transform: (a: T, b: R) -> V): List<V> {
//     val first = iterator()
//     val second = other.iterator()
//     val list = ArrayList<V>(minOf(collectionSizeOrDefault(10), other.collectionSizeOrDefault(10)))
//     while (first.hasNext() && second.hasNext()) {
//         list.add(transform(first.next(), second.next()))
//     }
//     return list
// }
