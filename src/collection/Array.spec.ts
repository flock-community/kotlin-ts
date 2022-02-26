import {} from "./Array";

describe("Array", () => {
  const numbers = [1, 2, 3];
  test("sum", () => {
    expect(numbers.sum()).toMatchInlineSnapshot(`6`);
  });

  test("average", () => {
    expect(numbers.average()).toMatchInlineSnapshot(`2`);
  });

  test("distinct", () => {
    expect(numbers.distinct()).toMatchInlineSnapshot(`[1, 2, 3]`);
  });

  test("distinctBy", () => {
    const points = [
      { x: 1, y: 2 },
      { y: 2, x: 1 },
      { x: 1, y: 1 + 1 },
      { x: 1, y: 3 },
    ];
    expect(points.distinctBy(({ x, y }) => `${x},${y}`)).toMatchInlineSnapshot(`
    [
      { "x": 1, "y": 2 },
      { "x": 1, "y": 3 }
    ]
  `);
  });
});
