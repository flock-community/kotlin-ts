import { Sequence } from "@flock/kotlin-ts/Sequence";

const fibonacci = Sequence.generate<[number, number]>([0, 1], ([first, second]) => [second, first + second]).map(
  ([first]) => first
);

describe("Sequence", () => {
  test.skip("take", () => {
    expect(Sequence.of<number>().take(1).toArray()).toEqual([]);
    expect(fibonacci.take(0)).toEqual([]);
  });
});
