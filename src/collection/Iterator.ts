declare global {
  /** @tsplus type Iterator */
  export interface Iterator<T> {}
}

/**
 * Iterator transforming original `iterator` into iterator of a tuple [T, number], counting index from zero.
 * @tsplus fluent Iterator withIndex
 */
export function withIndex<T>(self: Iterator<T>): Iterator<[T, number]> {
  let index = 0;
  return {
    next(): IteratorResult<[T, number]> {
      const { done, value } = self.next();
      return { done, value: [value, index++] };
    },
  };
}
