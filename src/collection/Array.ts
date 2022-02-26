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

/**
 * @tsplus fluent Array distinctBy
 */
export const distinctBy = <T, K>(self: T[], selector: (a: T) => K): T[] => {
  const set = new Set<K>();
  const array: T[] = [];
  for (const e of self) {
    const key = selector(e);
    if (!set.has(key)) {
      array.push(e);
      set.add(key);
    }
  }
  return array;
};
