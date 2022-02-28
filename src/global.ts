export {};

declare global {
  /** @tsplus type Array */
  export interface Array<T> {}

  /** @tsplus type Iterable */
  export interface Iterable<T> {}

  /** @tsplus type Iterator */
  export interface Iterator<T> {}
}
