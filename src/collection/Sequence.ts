/**
 * @tsplus type Sequence
 */
export interface Sequence<T> extends Iterable<T> {}

/**
 * @tsplus type SequenceOps
 */
export interface SequenceOps {}
export const Sequence: SequenceOps = {};

/**
 * @tsplus static SequenceOps __call
 */
export const sequenceCreate = <T>(iterator: () => Iterator<T>) => ({
  [Symbol.iterator]: iterator,
});

/**
 * @tsplus static SequenceOps of
 */
export const sequenceOf = <T>(...elements: Array<T>) => ({
  [Symbol.iterator]: () => elements.iterator(),
});
