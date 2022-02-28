export function absurd(_: never): never {
  throw new Error("Called `absurd` function which should be uncallable");
}

export function assertNever(message?: string): never {
  throw new Error(`Failed never assertion: ${message}`);
}
