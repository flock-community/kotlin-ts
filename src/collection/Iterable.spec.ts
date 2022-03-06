import { Iterable, naturals } from "./Iterable";

describe("Iterable", () => {
  test("all", () => {
    const isEven = (it: number) => it % 2 === 0;
    const zeroToTen = (0).to(10);

    expect(zeroToTen.all(isEven)).toBe(false);
    expect(zeroToTen.map((it) => it * 2).all(isEven)).toBe(true);

    const emptyList = <number[]>[];
    expect(emptyList.all(() => false)).toBe(true);
  });

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
    expect(iterable.zip(naturals).toArray()).toMatchInlineSnapshot(`
      [
        ["a", 0],
        ["b", 1],
        ["c", 2]
      ]
    `);
  });
});
