// From: https://github.com/JetBrains/kotlin/blob/master/libraries/stdlib/common/src/generated/_Collections.kt
import { throws } from "@flock/kotlin-ts/utils";
import { Sequence } from "@flock/kotlin-ts/Sequence";
import {
  IllegalArgumentException,
  IndexOutOfBoundsException,
  NoSuchElementException,
  UnsupportedOperationException,
} from "@flock/kotlin-ts/Exceptions";
import { TODO } from "@flock/kotlin-ts/Object";
import { Comparable } from "@flock/kotlin-ts/Comparable";

declare global {
  // Check if performant enough
  // /** @tsplus type Iterable */
  // export interface Object {}
  // /** @tsplus type Iterable */
  // export interface String {}
  /** @tsplus type Iterable */
  export interface Iterable<T> {}
  /** @tsplus type Iterable */
  export interface IterableIterator<T> {}
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
export const associate = <T, K, V>(self: Iterable<T>, transform: (it: T) => [K, V]): Map<K, V> =>
  self.map(transform).toMap();

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
export const associateWith = <K, V>(self: Iterable<K>, valueSelector: (key: K) => V): Map<K, V> =>
  // TODO change to as const in next tsplus release
  self.map((it) => [it, valueSelector(it)] as [K, V]).toMap();

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
 *
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
 * Splits this collection into a list of lists each not exceeding the given [size].
 *
 * The last list in the resulting list may have fewer elements than the given [size].
 *
 * @param size the number of elements to take in each list, must be positive and can be greater than the number of elements in this collection.
 *
 * @tsplus fluent Iterable chunked
 */
export const chunked = <T>(self: Iterable<T>, size: number): T[][] => TODO();

/**
 * Returns `true` if [element] is found in the collection.
 *
 * @tsplus fluent Iterable contains
 */
export const contains = <T>(self: Iterable<T>, element: T): boolean => self.indexOf(element) !== -1;

/**
 * Returns the number of elements in this collection.
 *
 * @tsplus fluent Iterable count
 */
export const count = <T>(self: Iterable<T>): number => {
  return (
    self
      .withIndex()
      .map(([, index]) => index + 1)
      .lastOrNull() ?? 0
  );
};

/**
 * Returns the number of elements matching the given [predicate].
 *
 * @tsplus fluent Iterable count
 */
export const count_ = <T>(self: Iterable<T>, predicate: (it: T) => boolean): number => {
  return self.filter(predicate).count();
};

/**
 * Returns a list containing only distinct elements from the given collection.
 *
 * Among equal elements of the given collection, only the first one will be present in the resulting list.
 * The elements in the resulting list are in the same order as they were in the source collection.
 *
 * @tsplus fluent Iterable distinct
 */
export const distinct = <T>(self: Iterable<T>): T[] => self.toSet().toArray();

/**
 * Returns a list containing only elements from the given collection
 * having distinct keys returned by the given [selector] function.
 *
 * Among elements of the given collection with equal keys, only the first one will be present in the resulting list.
 * The elements in the resulting list are in the same order as they were in the source collection.
 *
 * @tsplus fluent Iterable distinctBy
 */
export const distinctBy = <T, K>(self: Iterable<T>, selector: (it: T) => K): T[] =>
  self.asSequence().distinctBy(selector).toArray();

/**
 * Returns a list containing all elements except first [n] elements.
 *
 * @throws IllegalArgumentException if [n] is negative.
 *
 * @tsplus fluent Iterable drop
 */
export const drop = <T>(self: Iterable<T>, n: number): T[] => {
  return self.asSequence().drop(n).toArray();
};

/**
 * Returns a list containing all elements except first elements that satisfy the given [predicate].
 *
 * @tsplus fluent Iterable dropWhile
 */
export const dropWhile = <T>(self: Iterable<T>, predicate: (it: T) => boolean): T[] => {
  return self.asSequence().dropWhile(predicate).toArray();
};

/**
 * Returns an element at the given [index] or throws an [IndexOutOfBoundsException] if the [index] is out of bounds of this collection.
 *
 * @tsplus fluent Iterable elementAt
 */
export const elementAt = <T>(self: Iterable<T>, index: number): T =>
  self.zip(naturals).find(([, i]) => i === index)?.[0] ?? throws(new IndexOutOfBoundsException());

/**
 * Returns an element at the given [index] or the result of calling the [defaultValue] function if the [index] is out of bounds of this collection.
 *
 * @tsplus fluent Iterable elementAtOrElse
 */
export const elementAtOrElse = <T>(self: Iterable<T>, defaultValue: (it: number) => T): T => TODO();

/**
 * Returns an element at the given [index] or `null` if the [index] is out of bounds of this collection.
 *
 * @tsplus fluent Iterable elementAtOrNull
 */
export const elementAtOrNull = <T>(self: Iterable<T>, index: number): T | undefined => TODO();

/**
 * Returns a list containing only elements matching the given [predicate].
 *
 * @tsplus fluent Iterable filter
 */
export function filter<T, S extends T>(self: Iterable<T>, predicate: (it: T) => it is S): S[];
export function filter<T>(self: Iterable<T>, predicate: (it: T) => boolean): T[];
export function filter<T>(self: Iterable<T>, predicate: (it: T) => boolean): T[] {
  return self.asSequence().filter(predicate).toArray();
}

/**
 * Returns a list containing only elements matching the given [predicate].
 * @param [predicate] function that takes the index of an element and the element itself
 * and returns the result of predicate evaluation on the element.
 *
 * @tsplus fluent Iterable filterIndexed
 */
export function filterIndexed<T, S extends T>(self: Iterable<T>, predicate: (index: number, it: T) => it is S): S[];
export function filterIndexed<T>(self: Iterable<T>, predicate: (index: number, it: T) => boolean): T[];
export function filterIndexed<T>(self: Iterable<T>, predicate: (index: number, it: T) => boolean): T[] {
  return self
    .asSequence()
    .withIndex()
    .filter(([it, index]) => predicate(index, it))
    .map(([it]) => it);
}

/**
 * Returns a list containing all elements not matching the given [predicate].
 *
 * @tsplus fluent Iterable filterNot
 */
export const filterNot = <T>(self: Iterable<T>, predicate: (it: T) => boolean) => TODO();

/**
 * Returns a list containing all elements that are not `null`.
 *
 * @tsplus fluent Iterable filterNotNull
 */
export const filterNotNull = <T>(self: Iterable<T | undefined>): T[] => TODO();

/**
 * Returns the first element matching the given [predicate], or `undefined` if element was not found.
 *
 * @tsplus fluent Iterable find
 */
export function find<T>(self: Iterable<T>, predicate: (t: T) => boolean): T | undefined {
  for (const it of self) if (predicate(it)) return it;
}

/**
 * Returns the last element matching the given [predicate], or `null` if no such element was found.
 *
 * @tsplus fluent Iterable findLast
 */
export const findLast = <T, S extends T>(self: Iterable<T>, predicate: (it: T) => it is S): S | undefined => TODO();

/**
 * Returns first element.
 *
 * @throws {NoSuchElementException} if the list is empty.
 * @tsplus fluent Iterable first
 */
export function first<T>(self: Iterable<T>): T {
  const next = self.iterator().next();
  if (!next.done) return next.value;
  throw new NoSuchElementException("Iterable is empty.");
}

/**
 * Returns the first element matching the given [predicate].
 * @throws [NoSuchElementException] if no such element is found.
 * @tsplus fluent Iterable first
 */
export const first_ = <T, S extends T>(self: Iterable<T>, predicate: (it: T) => it is S): S => TODO();

/**
 * Returns the first non-null value produced by [transform] function being applied to elements of this collection in iteration order,
 * or throws [NoSuchElementException] if no non-null value was produced.
 *
 * @tsplus fluent Iterable firstNotNullOf
 */
export const firstNotNullOf = <T, R>(self: Iterable<T>, transform: (it: T) => R | undefined): R => TODO();

/**
 * Returns the first non-null value produced by [transform] function being applied to elements of this collection in iteration order,
 * or `null` if no non-null value was produced.
 *
 * @tsplus fluent Iterable firstNotNullOfOrNull
 */
export const firstNotNullOfOrNull = <T, R>(self: Iterable<T>, transform: (it: T) => R | undefined): R | undefined =>
  TODO();

/**
 * Returns the first element, or `null` if the collection is empty.
 *
 * @tsplus fluent Iterable firstOrNull
 */
export const firstOrNull = <T>(self: Iterable<T>): T | undefined => TODO();

/**
 * Returns the first element matching the given [predicate], or `null` if element was not found.
 * @tsplus fluent Iterable firstOrNull
 */
export const firstOrNull_ = <T, S extends T>(self: Iterable<T>, predicate: (it: T) => it is S): S | undefined => TODO();

/**
 * Returns a single list of all elements yielded from results of [transform] function being invoked on each element of original collection.
 *
 * @tsplus fluent Iterable flatMap
 */
export const flatMap = <T, R>(self: Iterable<T>, transform: (it: T) => Iterable<R>): R[] =>
  self
    .asSequence()
    .flatMap((it) => transform(it).asSequence())
    .toArray();

/**
 * Returns a single list of all elements yielded from results of [transform] function being invoked on each element
 * and its index in the original collection.
 *
 * @tsplus fluent Iterable flatMapIndexed
 */
export const flatMapIndexed = <T, R>(self: Iterable<T>, transform: (index: number, it: T) => Iterable<R>) => TODO();

/**
 * Returns a single list of all elements from all collections in the given collection.
 *
 * @tsplus fluent Iterable flatten
 */
export const flatten = <T>(self: Iterable<Iterable<T>>): T[] => {
  return self.flatMap((it) => it);
};

/**
 * Accumulates value starting with [initial] value and applying [operation] from left to right
 * to current accumulator value and each element.
 *
 * Returns the specified [initial] value if the collection is empty.
 *
 * @param [operation] function that takes current accumulator value and an element, and calculates the next accumulator value.
 *
 * @tsplus fluent Iterable fold
 */
export const fold = <T, R>(self: Iterable<T>, initial: R, operation: (acc: R, it: T) => R): R => {
  let acc = initial;
  for (const it of self) acc = operation(acc, it);
  return acc;
};

/**
 * Performs the given [action] on each element.
 * @tsplus fluent Iterable forEach
 */
export const forEach = <T>(self: Iterable<T>, action: (it: T) => void) => {
  for (const it of self) action(it);
};

/**
 * Groups values returned by the [valueTransform] function applied to each element of the original collection
 * by the key returned by the given [keySelector] function applied to the element
 * and returns a map where each group key is associated with a list of corresponding values.
 *
 * The returned map preserves the entry iteration order of the keys produced from the original collection.
 *
 * @tsplus fluent Iterable groupBy
 */
export const groupBy = <T, K>(self: Iterable<T>, keySelector: (it: T) => K): Map<K, T[]> =>
  self.groupBy(keySelector, (it) => it);

/**
 * Groups values returned by the [valueTransform] function applied to each element of the original collection
 * by the key returned by the given [keySelector] function applied to the element
 * and returns a map where each group key is associated with a list of corresponding values.
 *
 * The returned map preserves the entry iteration order of the keys produced from the original collection.
 *
 * @tsplus fluent Iterable groupBy
 */
export function groupBy_<T, K, V>(
  self: Iterable<T>,
  keySelector: (it: T) => K,
  valueTransform: (it: T) => V
): Map<K, V[]> {
  const map = new Map<K, V[]>();
  for (const it of self) {
    const key = keySelector(it);
    const value = map.get(key);
    map.set(key, (value == null ? [] : value) + valueTransform(it));
  }
  return map;
}

/**
 * Returns first index of [element], or -1 if the collection does not contain element.
 *
 * @tsplus fluent Iterable indexOf
 */
export const indexOf = <T>(self: Iterable<T>, element: T): number =>
  self.zip(naturals).find(([it]) => it === element)?.[1] ?? -1;

/**
 * Returns index of the first element matching the given [predicate], or -1 if the collection does not contain such element.
 * @tsplus fluent Iterable indexOfFirst
 */
export const indexOfFirst = <T>(self: Iterable<T>, predicate: (it: T) => boolean): number => TODO();

/**
 * Returns a set containing all elements that are contained by both this collection and the specified collection.
 *
 * The returned set preserves the element iteration order of the original collection.
 *
 * To get a set containing all elements that are contained at least in one of these collections use [union].
 *
 * @tsplus fluent Iterable intersect
 */
export const intersect = <T>(self: Iterable<T>, other: Iterable<T>): Set<T> => {
  return TODO();
};

/**
 * Returns an iterator over the elements of this object.
 * @tsplus fluent Iterable iterator
 */
export const iterator = <T>(self: Iterable<T>) => self[Symbol.iterator]();

/**
 * @tsplus fluent Iterable isEmpty
 */
export function isEmpty<T>(self: Iterable<T>): boolean {
  return self.iterator().next().done ?? false;
}

/**
 * Creates a string from all the elements separated using [separator] and using the given [prefix] and [postfix] if supplied.
 *
 * If the collection could be huge, you can specify a non-negative value of [limit], in which case only the first [limit]
 * elements will be appended, followed by the [truncated] string (which defaults to "...").
 *
 * @tsplus fluent Iterable joinToString
 */
export const joinToString = <T>(
  self: Iterable<T>,
  {
    seperator = ", ",
    prefix = "",
    postfix = "",
    limit = -1,
    truncated = "...",
    transform = (it: T) => `${it}`,
  }: {
    seperator?: string;
    prefix?: string;
    postfix?: string;
    limit?: number;
    truncated?: string;
    transform?: (it: T) => string;
  } = {}
) => {
  const truncate = limit !== -1 && self.count() > limit;
  const result = self
    .take(truncate ? limit : self.count())
    .map((it) => transform(it))
    .join(seperator);

  return `${prefix}${result}${postfix}${truncate ? seperator + truncated : ""}`;
};

/**
 * Returns the last element.
 *
 * @throws {NoSuchElementException} if the list is empty.
 *
 * @tsplus fluent Iterable last
 */
export const last = <T>(self: Iterable<T>): T =>
  self.lastOrNull() ?? throws(new NoSuchElementException("Iterable contains no element matching the predicate."));

/**
 * Returns the last element matching the given [predicate].
 *
 * @throws {NoSuchElementException} if no such element is found.
 * @tsplus fluent Iterable last
 */
export const last_ = <T, S extends T>(self: Iterable<T>, predicate: (it: T) => it is S): S => TODO();

/**
 * Returns last index of [element], or -1 if the collection does not contain element.
 *
 * @tsplus fluent Iterable lastIndexOf
 */
export const lastIndexOf = <T>(self: Iterable<T>, element: T): number => TODO();

/**
 * Returns the last element, or `null` if the collection is empty.
 *
 * @tsplus fluent Iterable lastOrNull
 */
export const lastOrNull = <T>(self: Iterable<T>): T | undefined => {
  let last: T | undefined;
  for (const it of self) last = it;
  return last;
};

/**
 * Returns the last element matching the given [predicate], or `null` if no such element was found.
 *
 * @tsplus fluent Iterable lastOrNull
 */
export const lastOrNull_ = <T, S extends T>(self: Iterable<T>, predicate: (it: T) => it is S): T | undefined => TODO();

/**
 * Returns a list containing the results of applying the given [transform] function
 * to each element in the original collection.
 *
 * @tsplus fluent Iterable map
 */
export const map = <T, R>(self: Iterable<T>, transform: (it: T) => R): R[] => {
  return self.asSequence().map(transform).toArray();
};

// /**
//  * @tsplus fluent Iterable maxByOrNull
//  */
// export const maxByOrNull = <T, R>(self: Iterable<T>, selector: (it: T) => Comparable<R>): T | undefined => TODO();

/**
 * Returns the largest value among all values produced by [selector] function
 * applied to each element in the collection.
 *
 * If any of values produced by [selector] function is `NaN`, the returned result is `NaN`.
 *
 * @throws NoSuchElementException if the collection is empty.
 * @tsplus fluent Iterable maxOf
 */
export const maxOf = <T>(self: Iterable<T>, selector: (it: T) => number): number => TODO();

/**
 * Returns the largest value among all values produced by [selector] function
 * applied to each element in the collection.
 *
 * @throws NoSuchElementException if the collection is empty.
 * @tsplus fluent Iterable maxOf
 */
export const maxOf_ = <T, R>(self: Iterable<T>, selector: (it: T) => Comparable<R>): Comparable<R> => TODO();

/**
 * Returns the first element yielding the smallest value of the given function or `null` if there are no elements.
 *
 * @tsplus fluent Iterable minByOrNull
 */
export const minByOrNull = <T, R>(self: Iterable<T>, selector: (it: T) => Comparable<R>): T | undefined => TODO();

/**
 * Returns the smallest value among all values produced by [selector] function
 * applied to each element in the collection.
 *
 * If any of values produced by [selector] function is `NaN`, the returned result is `NaN`.
 *
 * @throws {NoSuchElementException} if the collection is empty.
 * @tsplus fluent Iterable minOf
 */
export const minOf = <T>(self: Iterable<T>, selector: (it: T) => number): number => TODO();

/**
 * Returns the smallest element or `null` if there are no elements.
 *
 * If any of elements is `NaN` returns `NaN`.
 *
 * @tsplus fluent Iterable minOrNull
 */
export const minOrNull = <T>(self: Iterable<T>): number | undefined => TODO();

/**
 * Returns a list containing all elements of the original collection without the first occurrence of the given [element].
 *
 * @tsplus fluent Iterable minus
 * @tsplus operator Iterable -
 */
export const minus = <T>(self: Iterable<T>, element: T): T[] => self.filter((it) => it != element);

/**
 * Returns a list containing all elements of the original collection except the elements contained in the given [elements] collection.
 *
 * Before Kotlin 1.6, the [elements] collection may have been converted to a [HashSet] to speed up the operation, thus the elements were required to have
 * a correct and stable implementation of `hashCode()` that didn't change between successive invocations.
 * On JVM, you can enable this behavior back with the system property `kotlin.collections.convert_arg_to_set_in_removeAll` set to `true`.
 *
 * @tsplus fluent Iterable minus
 * @tsplus operator Iterable -
 */
export const minus_ = <T>(self: Iterable<T>, elements: Iterable<T>) => {
  return self.filter((it) => !elements.contains(it));
};

/**
 * Returns `true` if the collection has no elements.
 *
 * @tsplus fluent Iterable none
 */
export const none = <T>(self: Iterable<T>): boolean => {
  return self.isEmpty();
};

/**
 * Returns `true` if no elements match the given [predicate].
 *
 * @tsplus fluent Iterable none
 */
export const none_ = <T>(self: Iterable<T>, predicate: (it: T) => boolean): boolean => !self.any(predicate);

/**
 * Splits the original collection into pair of lists,
 * where *first* list contains elements for which [predicate] yielded `true`,
 * while *second* list contains elements for which [predicate] yielded `false`.
 *
 * @tsplus fluent Iterable partition
 */
export const partition = <T>(self: Iterable<T>, predicate: (it: T) => boolean): [T[], T[]] => TODO();

/**
 * Returns a list containing all elements of the original collection and then the given [element].
 *
 * @tsplus fluent Iterable plus
 * @tsplus operator Iterable +
 */
export const plus = <T>(self: Iterable<T>, element: T): T[] => {
  return [...self, element];
};

/**
 * Returns a list containing all elements of the original collection and then all elements of the given [elements] collection.
 *
 * @tsplus fluent Iterable plus
 * @tsplus operator Iterable +
 */
export const plus_ = <T>(self: Iterable<T>, elements: Iterable<T>): T[] => {
  return [...self, ...elements];
};

/**
 * Accumulates value starting with the first element and applying [operation] from left to right
 * to current accumulator value and each element.
 *
 * Throws an exception if this collection is empty. If the collection can be empty in an expected way,
 * please use [reduceOrNull] instead. It returns `null` when its receiver is empty.
 *
 * @param [operation] function that takes current accumulator value and an element,
 * and calculates the next accumulator value.
 *
 * @tsplus fluent Iterable reduce
 */
export const reduce = <T, S extends T>(self: Iterable<T>, operation: (acc: S, it: T) => S): S => {
  const iterator = self.iterator();
  let { value, done } = iterator.next();
  if (done) throw new UnsupportedOperationException("Empty collection can't be reduced.");
  let acc = value;
  while (true) {
    ({ value, done } = iterator.next());
    if (done) break;
    acc = operation(acc, value);
  }
  return acc;
};

/**
 * Returns an original collection containing all the non-`null` elements, throwing an [IllegalArgumentException] if there are any `null` elements.
 *
 * @tsplus fluent Iterable requireNoNulls
 */
export const requireNoNulls = <T>(self: Iterable<T | undefined>): Iterable<T> => TODO();

/**
 * Returns a list with elements in reversed order.
 *
 * @tsplus fluent Iterable reversed
 */
export const reversed = <T>(self: Iterable<T>): T[] => TODO();

/**
 * Returns a list containing successive accumulation values generated by applying [operation] from left to right
 * to each element and current accumulator value that starts with [initial] value.
 *
 * Note that `acc` value passed to [operation] function should not be mutated;
 * otherwise it would affect the previous value in resulting list.
 *
 * @param [operation] function that takes current accumulator value and an element, and calculates the next accumulator value.
 *
 * @tsplus fluent Iterable runningFold
 */
export const runningFold = <T, R>(self: Iterable<T>, initial: R, operation: (acc: R, it: T) => R): R[] => TODO();

/**
 * Returns a list containing successive accumulation values generated by applying [operation] from left to right
 * to each element and current accumulator value that starts with the first element of this collection.
 *
 * Note that `acc` value passed to [operation] function should not be mutated;
 * otherwise it would affect the previous value in resulting list.
 *
 * @param [operation] function that takes current accumulator value and the element, and calculates the next accumulator value.
 *
 * @tsplus fluent Iterable runningReduce
 */
export const runningReduce = <T, R>(self: Iterable<T>, operation: (acc: R, it: T) => R): R[] => TODO();

/**
 * Returns a list containing successive accumulation values generated by applying [operation] from left to right
 * to each element and current accumulator value that starts with [initial] value.
 *
 * Note that `acc` value passed to [operation] function should not be mutated;
 * otherwise it would affect the previous value in resulting list.
 *
 * @param [operation] function that takes current accumulator value and an element, and calculates the next accumulator value.
 *
 * @tsplus fluent Iterable scan
 */
export const scan = <T, R>(self: Iterable<T>, initial: R, operation: (acc: R, it: T) => R): R[] => {
  return self.asSequence().scan(initial, operation).toArray();
};

/**
 * Returns the single element, or throws an exception if the list is empty or has more than one element.
 *
 * @tsplus fluent Iterable single
 */
export const single = <T>(self: Iterable<T>): T => {
  const iterator = self.iterator();
  let { value, done } = iterator.next();
  if (done) throw new NoSuchElementException("Iterable is empty.");
  const second = iterator.next();
  if (!second.done) throw new IllegalArgumentException("Collection has more than one element.");
  return value;
};

/**
 * Returns the single element matching the given [predicate], or throws exception if there is no or more than one matching element.
 *
 * @tsplus fluent Iterable single
 */
export function single_<T, S extends T>(self: Iterable<T>, predicate: (it: T) => it is S): S;
export function single_<T>(self: Iterable<T>, predicate: (it: T) => boolean): T;
export function single_<T>(self: Iterable<T>, predicate: (it: T) => boolean): T {
  return self.filter(predicate).single();
}

/**
 * Returns a set containing all elements that are contained by this collection and not contained by the specified collection.
 *
 * The returned set preserves the element iteration order of the original collection.
 *
 * @tsplus fluent Iterable subtract
 */
export const subtract = <T>(self: Iterable<T>, other: Iterable<T>): Set<T> => new Set(self - other);

/**
 * Returns the sum of all elements in the iterable.
 *
 * @tsplus fluent Iterable sum
 */
export const sum = (self: Iterable<number>): number => {
  return self.fold(0, (a, b) => a + b);
};

/**
 * Returns the sum of all values produced by [selector] function applied to each element in the collection.
 *
 * @tsplus fluent Iterable sumOf
 */
export const sumOf = <T>(self: Iterable<T>, selector: (it: T) => number): number => {
  return self.map(selector).sum();
};

/**
 * Returns a list containing first [n] elements.
 *
 * @throws IllegalArgumentException if [n] is negative.
 * @tsplus fluent Iterable take
 */
export const take = <T>(self: Iterable<T>, n: number): T[] => self.asSequence().take(n).toArray();

/**
 * Returns a list containing first elements satisfying the given [predicate].
 *
 * @tsplus fluent Iterable takeWhile
 */
export function takeWhile<T>(self: Iterable<T>, predicate: (it: T) => boolean): T[];
export function takeWhile<T, S extends T>(self: Iterable<T>, predicate: (it: T) => it is S): S[];
export function takeWhile<T>(self: Iterable<T>, predicate: (it: T) => boolean): T[] {
  return self.asSequence().takeWhile(predicate).toArray();
}

/**
 * Returns a [Array] containing all elements.
 *
 * @tsplus fluent Iterable toArray
 */
export const toArray = <T>(self: Iterable<T>): T[] => [...self];

/**
 * Returns a [ReadonlyArray] containing all elements.
 *
 * @tsplus fluent Iterable toArray
 */
export const toReadonlyArray = <T>(self: Iterable<T>): ReadonlyArray<T> => [...self];

/**
 * Returns a new [Set] of all elements.
 *
 * @tsplus fluent Iterable toSet
 */
export const toSet = <T>(self: Iterable<T>): Set<T> => new Set(self);

/**
 * @tsplus fluent Iterable toReadonlySet
 */
export const toReadonlySet = <T>(self: Iterable<T>): ReadonlySet<T> => TODO();

/**
 * Returns a new map containing all key-value pairs from the given collection of pairs.
 *
 * The returned map preserves the entry iteration order of the original collection.
 * If any of two pairs would have the same key the last one gets added to the map.
 *
 * @tsplus fluent Iterable toMap
 */
export const toMap = <K, V>(self: Iterable<readonly [K, V]>) => new Map(self);

/**
 * @tsplus fluent Iterable toReadonlyMap
 */
export const toReadonlyMap = <K, V>(self: Iterable<readonly [K, V]>): ReadonlyMap<K, V> => TODO();

/**
 * Returns a set containing all distinct elements from both collections.
 *
 * The returned set preserves the element iteration order of the original collection.
 * Those elements of the [other] collection that are unique are iterated in the end
 * in the order of the [other] collection.
 *
 * To get a set containing all elements that are contained in both collections use [intersect].
 *
 * @tsplus fluent Iterable union
 */
export const union = <T>(self: Iterable<T>, other: Iterable<T>): Set<T> => new Set(self + other);

/**
 * Returns a list of snapshots of the window of the given [size]
 * sliding along this collection with the given [step], where each
 * snapshot is a list.
 *
 * Several last lists may have fewer elements than the given [size].
 *
 * Both [size] and [step] must be positive and can be greater than the number of elements in this collection.
 * @param size the number of elements to take in each window
 * @param step the number of elements to move the window forward by on an each step, by default 1
 * @param partialWindows controls whether or not to keep partial windows in the end if any,
 * by default `false` which means partial windows won't be preserved
 *
 * @tsplus fluent Iterable windowed
 */
export const windowed = <T>(self: Iterable<T>, size: number, step = 1, partialWindows = false): T[][] => TODO();

/**
 * Returns a lazy [Iterable] that wraps each element of the original collection
 * into a tuple [T, number] containing the index of that element and the element itself.
 *
 * @tsplus fluent Iterable withIndex
 */
export const withIndex = <T>(self: Iterable<T>): Iterable<[T, number]> => zip(self, naturals);

/**
 * Returns a list of pairs built from the elements of `this` collection and [other] collection with the same index.
 * The returned list has length of the shortest collection.
 *
 * @tsplus fluent Iterable zip
 */
export const zip = <T, R>(self: Iterable<T>, other: Iterable<R>): [T, R][] => {
  return self.asSequence().zip(other.asSequence()).toArray();
};

/**
 * Returns a list of pairs of each two adjacent elements in this collection.
 *
 * The returned list is empty if this collection contains less than two elements.
 *
 * @tsplus fluent Iterable zipWithNext
 */
export const zipWithNext = <T>(self: Iterable<T>): [T, T][] => TODO();
