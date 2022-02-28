import { Iterable, naturals } from "./Iterable";

describe("Iterable", () => {
  const iterable = Iterable(function* () {
    yield "a";
    yield "b";
    yield "c";
  });

  test("withIndex", () => {
    expect(iterable.withIndex().toArray()).toMatchInlineSnapshot(`
      [
        ["a", 0],
        ["b", 1],
        ["c", 2]
      ]
    `);
  });

  test("zip", () => {
    expect(iterable.zip(naturals()).toArray()).toMatchInlineSnapshot(`
      [
        ["a", 0],
        ["b", 1],
        ["c", 2]
      ]
    `);
  });

  test("+", () => {
    expect((iterable + naturals()).toArray()).toMatchInlineSnapshot(`
      [
        ["a", 0],
        ["b", 1],
        ["c", 2]
      ]
    `);
  });
});
