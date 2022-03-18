// From: https://github.com/JetBrains/kotlin/blob/master/libraries/stdlib/common/src/generated/_Collections.kt
import { throws } from "../utils";
import { IndexOutOfBoundsException } from "../Exceptions";
import { Sequence } from "./Sequence";

declare global {
  /** @tsplus type Iterable */
  export interface Iterable<T> {}
  /** @tsplus type Iterable */
  export interface IterableIterator<T> {}
  /** @tsplus type Iterable */
  export interface Map<K, V> {}
  /** @tsplus type Iterable */
  export interface Set<T> extends Iterable<T> {}
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
 * @tsplus static IterableOps of
 */
export const iterableOf = <T>(...elements: Array<T>): Iterable<T> => ({
  [Symbol.iterator]: () => elements.iterator(),
});

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
export function all<T>(self: Iterable<T>, predicate: (it: T) => boolean): boolean {
  for (const it of self) if (!predicate(it)) return false;
  return true;
}

/**
 * Returns `true` if at least one element matches the given [predicate].
 *
 * @tsplus fluent Iterable any
 */
export const any = <T>(self: Iterable<T>, predicate: (it: T) => boolean): boolean => {
  for (const it of self) if (predicate(it)) return true;
  return false;
};

/**
 * Returns `true` if collection has at least one element.
 *
 * @tsplus fluent Iterable any
 */
export const any_ = <T>(self: Iterable<T>): boolean => !self.iterator().next().done;

/**
 * Returns this collection as an [Iterable].
 *
 * @tsplus fluent Iterable asIterable
 */
export const asIterable = <T>(self: Iterable<T>): Iterable<T> => self;

/**
 * Creates a [Sequence] instance that wraps the original collection returning its elements when being iterated.
 *
 * @tsplus fluent Iterable asSequence
 */
export const asSequence = <T>(self: Iterable<T>): Sequence<T> => Sequence(() => self[Symbol.iterator]());

/**
 * Returns a [Map] containing key-value pairs provided by [transform] function
 * applied to elements of the given collection.
 *
 * If any of two pairs would have the same key the last one gets added to the map.
 *
 * The returned map preserves the entry iteration order of the original collection.
 *
 * @tsplus fluent Iterable associate
 */
export const associate = <T, K, V>(self: Iterable<T>, transform: (it: T) => [K, V]): Map<K, V> => {
  const map = new Map<K, V>();
  for (const it of self) map.set(...transform(it));
  return map;
};

/**
 * Returns a [Map] containing the elements from the given collection indexed by the key
 * returned from [keySelector] function applied to each element.
 *
 * If any two elements would have the same key returned by [keySelector] the last one gets added to the map.
 *
 * The returned map preserves the entry iteration order of the original collection.
 *
 * @tsplus fluent Iterable associateBy
 */
export const associateBy = <T, K>(self: Iterable<T>, keySelector: (item: T) => K): Map<K, T> =>
  self.associate((it) => [keySelector(it), it]);

/**
 * Returns a [Map] containing the values provided by [valueTransform] and indexed by [keySelector] functions applied to elements of the given collection.
 *
 * If any two elements would have the same key returned by [keySelector] the last one gets added to the map.
 *
 * The returned map preserves the entry iteration order of the original collection.
 *
 * @tsplus fluent Iterable associateBy
 */
export const associateBy_ = <T, K, V>(self: Iterable<T>, keySelector: (it: T) => K, valueTransform: (item: T) => V) =>
  self.associate((it) => [keySelector(it), valueTransform(it)]);

/**
 * Populates and returns the [destination] mutable map with key-value pairs,
 * where key is provided by the [keySelector] function applied to each element of the given collection
 * and value is the element itself.
 *
 * If any two elements would have the same key returned by [keySelector] the last one gets added to the map.
 *
 * @tsplus fluent Iterable associateByTo
 */
export const associateByTo = <T, K, M extends Map<K, T>>(
  self: Iterable<T>,
  destination: M,
  keySelector: (item: T) => K
): M => {
  for (const it of self) destination.set(keySelector(it), it);
  return destination;
};

/**
 * Populates and returns the [destination] mutable map with key-value pairs,
 * where key is provided by the [keySelector] function and
 * and value is provided by the [valueTransform] function applied to elements of the given collection.
 *
 * If any two elements would have the same key returned by [keySelector] the last one gets added to the map.
 *
 * @tsplus fluent Iterable associateByTo
 */
export const associateByTo_ = <T, K, V, M extends Map<K, V>>(
  self: Iterable<T>,
  destination: M,
  keySelector: (it: T) => K,
  valueTransform: (it: T) => V
): M => {
  for (const it of self) destination.set(keySelector(it), valueTransform(it));
  return destination;
};

/**
 * Populates and returns the [destination] mutable map with key-value pairs
 * provided by [transform] function applied to each element of the given collection.
 *
 * If any of two pairs would have the same key the last one gets added to the map.
 *
 * @tsplus fluent Iterable associateTo
 */
export const associateTo = <T, K, V, M extends Map<K, V>>(
  self: Iterable<T>,
  destination: M,
  transform: (it: T) => [K, V]
): M => {
  for (const it of self) destination.set(...transform(it));
  return destination;
};

/**
 * Returns a [Map] where keys are elements from the given collection and values are
 * produced by the [valueSelector] function applied to each element.
 *
 * If any two elements are equal, the last one gets added to the map.
 *
 * The returned map preserves the entry iteration order of the original collection.
 *
 * @tsplus fluent Iterable associateWith
 */
export const associateWith = <K, V>(self: Iterable<K>, valueSelector: (key: K) => V): Map<K, V> => {
  const result = new Map<K, V>();
  return self.associateWithTo(result, valueSelector);
};

/**
 * Populates and returns the [destination] mutable map with key-value pairs for each element of the given collection,
 * where key is the element itself and value is provided by the [valueSelector] function applied to that key.
 *
 * If any two elements are equal, the last one overwrites the former value in the map.
 *
 * @tsplus fluent Iterable associateWithTo
 */
export const associateWithTo = <K, V, M extends Map<K, V>>(
  self: Iterable<K>,
  destination: M,
  valueSelector: (key: K) => V
): M => {
  for (const it of self) destination.set(it, valueSelector(it));
  return destination;
};

/**
 * Returns an average value of elements in the collection.

 * @tsplus fluent Iterable average
 */
export const average = (self: Iterable<number>): number => {
  let sum = 0;
  let count = 0;
  for (const it of self) {
    sum += it;
    count += 1;
  }
  return count === 0 ? NaN : sum / count;
};

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
 * @tsplus fluent Iterable isEmpty
 */
export function isEmpty<T>(self: Iterable<T>): boolean {
  return self.iterator().next().done ?? false;
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
export const zip = Iterable(<T, R>(self: Iterable<T>, other: Iterable<R>): Iterator<[T, R]> => {
  const iter = self.iterator();
  const otherIter = other.iterator();
  return {
    next(): IteratorResult<[T, R], unknown> {
      const { value, done } = iter.next();
      const { value: otherValue, done: otherDone } = otherIter.next();
      if (done || otherDone) return { value: [value, otherValue], done: true };
      return { value: [value, otherValue], done: done || otherDone };
    },
  };
});

/**
 * Returns a lazy [Iterable] that wraps each element of the original collection
 * into a tuple [T, number] containing the index of that element and the element itself.
 *
 * @tsplus fluent Iterable withIndex
 */
export const withIndex = <T>(self: Iterable<T>): Iterable<[T, number]> => zip(self, naturals);
