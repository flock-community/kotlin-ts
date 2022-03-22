/**
 * @tsplus type Sequence
 */
export interface Sequence<T> extends Iterable<T> {
  readonly _tag: "Sequence";
}

/**
 * @tsplus type SequenceOps
 */
export interface SequenceOps {}
export const Sequence: SequenceOps = {};

/**
 * @tsplus static SequenceOps __call
 */
export const sequenceCreate = <T>(iterator: () => Iterator<T>): Sequence<T> => ({
  _tag: "Sequence",
  [Symbol.iterator]: iterator,
});

/**
 * @tsplus static SequenceOps of
 */
export const sequenceOf = <T>(...elements: Array<T>): Sequence<T> => Sequence(() => elements.iterator());
