import {} from "./Standard.js";
import {} from "../collection/Array.js";

describe("Object", () => {
  test("let", () => {
    const a = [1, 2];
    const b = a.let((it) => [...it, 3]);

    expect(b).toMatchInlineSnapshot(`[1, 2, 3]`);
    expect(b.let((it) => [0, ...it])).toMatchInlineSnapshot(`[0, 1, 2, 3]`);
  });

  test("also", () => {
    const array = [1, 2];
    let state = 0;

    expect(array.sum().also((it) => (state = it))).toMatchInlineSnapshot(`3`);
    expect(state).toMatchInlineSnapshot(`3`);
  });
});
