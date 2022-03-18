import { Iterable, naturals } from "./Iterable";
import {} from "../util/Standard";

describe("Iterable", () => {
  const empty = new Set<string>();
  const data = new Set(["foo", "bar"]);

  test("all", () => {
    expect(data.all((it) => it.length === 3)).toBe(true);
    expect(data.all((it) => it.startsWith("b"))).toBe(false);
    expect(empty.all((it) => it.startsWith("b"))).toBe(true);
  });

  test("any", () => {
    expect(data.any()).toBe(true);
    expect(empty.any()).toBe(false);
    expect(data.any((it) => it.startsWith("f"))).toBe(true);
    expect(data.any((it) => it.startsWith("x"))).toBe(false);
    expect(empty.any((it) => it.startsWith("x"))).toBe(false);
  });

  test("associate", () => {
    const names = ["Grace Hopper", "Jacob Bernoulli", "Johann Bernoulli"];
    const byLastName = names.associate((it) => it.split(" ").let(([firstName, lastName]) => [lastName, firstName]));

    expect(byLastName.asString()).toBe("{Hopper=Grace, Bernoulli=Johann}");
  });

  test("associateBy", () => {
    class Person {
      constructor(readonly firstName: string, readonly lastName: string) {}
      toString = () => `${this.firstName} ${this.lastName}`;
    }

    const scientists = [
      new Person("Grace", "Hopper"),
      new Person("Jacob", "Bernoulli"),
      new Person("Johann", "Bernoulli"),
    ];

    const byLastName = scientists.associateBy((it) => it.lastName);

    expect(byLastName.asString()).toBe("{Hopper=Grace Hopper, Bernoulli=Johann Bernoulli}");
  });

  test("associateByWithValueTransform", () => {
    class Person {
      constructor(readonly firstName: string, readonly lastName: string) {}
    }

    const scientists = [
      new Person("Grace", "Hopper"),
      new Person("Jacob", "Bernoulli"),
      new Person("Johann", "Bernoulli"),
    ];

    const byLastName = scientists.associateBy(
      (it) => it.lastName,
      (it) => it.firstName
    );

    expect(byLastName.asString()).toBe("{Hopper=Grace, Bernoulli=Johann}");
  });

  test("associateByTo", () => {
    class Person {
      constructor(readonly firstName: string, readonly lastName: string) {}
      toString = () => `${this.firstName} ${this.lastName}`;
    }

    const scientists = [
      new Person("Grace", "Hopper"),
      new Person("Jacob", "Bernoulli"),
      new Person("Johann", "Bernoulli"),
    ];

    const byLastName = new Map<string, Person>();
    expect(byLastName.isEmpty()).toBe(true);

    scientists.associateByTo(byLastName, (it) => it.lastName);

    expect(byLastName.isEmpty()).toBe(false);

    expect(byLastName.asString()).toBe("{Hopper=Grace Hopper, Bernoulli=Johann Bernoulli}");
  });

  test("associateByToWithValueTransform", () => {
    class Person {
      constructor(readonly firstName: string, readonly lastName: string) {}
    }

    const scientists = [
      new Person("Grace", "Hopper"),
      new Person("Jacob", "Bernoulli"),
      new Person("Johann", "Bernoulli"),
    ];

    const byLastName = new Map<string, string>();

    scientists.associateByTo(
      byLastName,
      (it) => it.lastName,
      (it) => it.firstName
    );

    expect(byLastName.asString()).toBe("{Hopper=Grace, Bernoulli=Johann}");
  });

  test("associateTo", () => {
    class Person {
      constructor(readonly firstName: string, readonly lastName: string) {}
    }

    const scientists = [
      new Person("Grace", "Hopper"),
      new Person("Jacob", "Bernoulli"),
      new Person("Johann", "Bernoulli"),
    ];

    const byLastName = new Map<string, string>();
    expect(byLastName.isEmpty()).toBe(true);

    scientists.associateTo(byLastName, (it) => [it.lastName, it.firstName]);
    expect(byLastName.isEmpty()).toBe(false);

    expect(byLastName.asString()).toMatchInlineSnapshot(`"{Hopper=Grace, Bernoulli=Johann}"`);
  });

  test("associateWith", () => {
    const words = ["a", "abc", "ab", "def", "abcd"];
    const withLength = words.associateWith((it) => it.length);

    expect(withLength.keys().toArray()).toMatchInlineSnapshot(`["a", "abc", "ab", "def", "abcd"]`);
    expect(withLength.values().toArray()).toMatchInlineSnapshot(`[1, 3, 2, 3, 4]`);
  });

  test("associateWithTo", () => {
    class Person {
      constructor(readonly firstName: string, readonly lastName: string) {}

      toString = () => `${this.firstName} ${this.lastName}`;
    }

    const jacob = new Person("Jacob", "Bernoulli");
    const scientists = [new Person("Grace", "Hopper"), jacob, jacob];

    const withLengthOfNames = new Map<Person, number>();

    expect(withLengthOfNames.isEmpty()).toBe(true);

    scientists.associateWithTo(withLengthOfNames, (it) => it.firstName.length + it.lastName.length);

    expect(withLengthOfNames.isEmpty()).toBe(false);

    // Jacob Bernoulli only occurs once in the map because only the last pair with the same key gets added
    expect(withLengthOfNames.asString()).toMatchInlineSnapshot(`"{Grace Hopper=11, Jacob Bernoulli=14}"`);
  });

  test("average", () => {
    expect([].average()).toBeNaN();
    expect([1, 2, 5, 8, 3].average()).toBe(3.8);
    expect(Iterable.of(1.6, 2.6, 3.6, 0.6).average()).toBe(2.1);
    expect(Iterable.of(1.6, 2.6, 3.6, 0.6).average()).toBe(2.1);

    const n = 100;
    const range = (0).to(n);
    expect(range.average()).toBe(n / 2);
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
