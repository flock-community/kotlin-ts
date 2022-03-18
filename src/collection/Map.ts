declare global {
  /** @tsplus type Map */
  export interface Map<K, V> {}
}

/**
 * @tsplus fluent Map asString
 */
export const asString = <K, V>(self: Map<K, V>) => {
  return `{${self
    .entries()
    .map(([key, value]) => `${key}=${value}`)
    .toArray()
    .join(", ")}}`;
};
