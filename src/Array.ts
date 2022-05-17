declare global {
  /** @tsplus type Array */
  export interface Array<T> {}
}

/**
 * @tsplus fluent Array sum
 */
export const sum = (self: Array<number>): number => self.reduce((prev, cur) => prev + cur, 0);

/**
 * @tsplus fluent Array average
 */
export const average = (self: Array<number>): number => self.sum() / self.length;

/**
 * @tsplus fluent Array distinct
 */
export function distinct<T>(self: T[]): T[] {
  return [...new Set(self)];
}
