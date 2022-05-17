import { Iterable } from "@flock/kotlin-ts/Iterable";
import { AssertionException, IllegalArgumentException, NoSuchElementException } from "@flock/kotlin-ts/Exceptions";

describe("IterableTests", () => {
  const empty = Iterable.of<string>();
  const data = Iterable.of("foo", "bar");

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
    const names = Iterable.of("Grace Hopper", "Jacob Bernoulli", "Johann Bernoulli");
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

  test.skip("chunked", () => {
    const data = (1).to(6);
    const result = data.chunked(4);

    expect(result).toEqual([
      [0, 1, 2, 3],
      [4, 5, 6],
    ]);
  });

  test("contains", () => {
    expect(data.contains("foo")).toBe(true);
    expect(data.contains("bar")).toBe(true);
    expect(data.contains("baz")).toBe(false);
    expect(empty.contains("baz")).toBe(false);
  });

  test("count", () => {
    expect(data.count()).toBe(2);
    expect(empty.count()).toBe(0);

    expect(data.count((it) => it.startsWith("f"))).toBe(1);
    expect(empty.count((it) => it.startsWith("f"))).toBe(0);

    expect(data.count((it) => it.startsWith("x"))).toBe(0);
    expect(empty.count((it) => it.startsWith("x"))).toBe(0);
  });

  test("drop", () => {
    const foo = data.drop(1);
    expect(foo.all((it) => it.startsWith("b"))).toBe(true);
    expect(foo.length).toBe(1);
    expect(foo).toEqual(["bar"]);
  });

  test("dropWhile", () => {
    const foo = data.dropWhile((it) => it[0] === "f");
    expect(foo.all((it) => it.startsWith("b"))).toBe(true);
    expect(foo.length).toBe(1);
    expect(foo).toEqual(["bar"]);
  });

  // test("filter", () => {
  //   const foo = data.filter((it) => it.startsWith("f"));
  //   expect(foo.length).toBe(1);
  //   expect(foo).toEqual(["foo"]);
  // });

  // test("filterIndexed", () => {
  //   const result = data.filterIndexed((index, [first]) => first === String.fromCharCode("a".charCodeAt(0) + index));
  //   expect(result).toEqual(["bar"]);
  // });

  test("flatten", () => {
    expect(data.map((it) => (0).to(it.length)).flatten()).toEqual([0, 1, 2, 3, 0, 1, 2, 3]);
  });

  test("fold", () => {
    expect(data.fold(1, (acc, cur) => acc + (cur === "foo" ? 200 : 30))).toBe(231);
  });

  test("forEach", () => {
    let count = 0;
    data.forEach((it) => (count += it.length));
    expect(count).toBe(6);
  });

  test("map", () => {
    const lengths = data.map((it) => it.length);
    expect(lengths.all((it) => it === 3)).toBe(true);
    expect(lengths.length).toBe(2);
    expect(lengths).toEqual([3, 3]);
  });

  test("minusElement", () => {
    const result = data - "foo" - "g";
    expect(result).toEqual(["bar"]);
  });

  test("minusCollection", () => {
    const result = data - ["foo", "g"];
    expect(result).toEqual(["bar"]);
  });

  test("none", () => {
    expect(data.none()).toBe(false);
    expect(empty.none()).toBe(true);
    expect(data.none((it) => it.length === 3)).toBe(false);
    expect(data.none((it) => it.startsWith("b"))).toBe(false);
    expect(data.none((it) => it.startsWith("x"))).toBe(true);
    expect(empty.none((it) => it.startsWith("b"))).toBe(true);
  });

  test("reduce", () => {
    const reduced = data.reduce((acc, cur) => acc + cur);
    expect(reduced.length).toBe(6);
    expect(reduced === "foobar" || reduced === "barfoo").toBe(true);
  });

  test("scan", () => {
    const accumulators = data.scan("baz", (acc, cur) => acc + cur);
    expect(accumulators.length).toBe(3);
    expect(accumulators[0]).toEqual("baz");
    expect(["bazfoo", "bazbar"].contains(accumulators[1])).toBe(true);
    expect(["bazfoobar", "bazbarfoo"].contains(accumulators[2])).toBe(true);
  });

  test("single", () => {
    expect(() => data.single()).toThrow(IllegalArgumentException);
    expect(() => empty.single()).toThrow(NoSuchElementException);
    expect(data.single((it) => it.startsWith("f"))).toBe("foo");
    expect(data.single((it) => it.startsWith("b"))).toBe("bar");
    expect(() => data.single((it) => it.length === 3)).toThrow();
  });

  test("take", () => {
    const coll = ["foo", "bar", "abc"];
    expect(coll.take(0)).toEqual([]);
    expect(coll.take(1)).toEqual(["foo"]);
    expect(coll.take(2)).toEqual(["foo", "bar"]);
    expect(coll).toEqual(coll.take(coll.count()));
    expect(coll).toEqual(coll.take(coll.count() + 1));
    expect(() => coll.take(-1)).toThrow(AssertionException);
  });

  test("takeWhile", () => {
    const coll = ["foo", "bar", "abc"];
    expect(coll.takeWhile(() => false)).toEqual([]);
    expect(coll.takeWhile(() => true)).toEqual(coll);
    expect(coll.takeWhile((it) => it.startsWith("f"))).toEqual(["foo"]);
    expect(coll.takeWhile((it) => it.length === 3)).toEqual(["foo", "bar", "abc"]);
  });

  function testPlus(doPlus: (it: Iterable<string>) => string[]) {
    const result = doPlus(data);
    expect(result).toEqual(["foo", "bar", "zoo", "g"]);
    expect(result === data).toBe(false);
  }

  test("plusElement", () => testPlus((it) => it + "zoo" + "g"));
  test("plusArray", () => testPlus((it) => it + ["zoo", "g"]));
  test("plusSet", () => testPlus((it) => it + new Set(["zoo", "g"])));
  // test("plusIterable", () => testPlus((it) => it + Iterable.of("zoo", "g")));
  test("plusSequence", () => testPlus((it) => it + Sequence.of("zoo", "g")));

  test("sumOf", () => {
    expect(data.sumOf((it) => it.length)).toBe(6);
    expect(empty.sumOf((it) => it.length)).toBe(0);
  });

  test("withIndices", () => {
    let index = 0;

    for (const [d, i] of data.withIndex()) {
      expect(index).toBe(i);
      expect(data.elementAt(index)).toBe(d);
      index += 1;
    }

    expect(data.count()).toBe(index);
  });

  test("withIndex", () => {
    const indexed = data.withIndex().map(([value, index]) => value.substring(0, index + 1));
    expect(indexed.length).toBe(2);
    expect(indexed).toEqual(["f", "ba"]);
  });
});

describe("CollectionTest", () => {
  test.skip("joinTo", () => {
    const data = ["foo", "bar"];
    const buffer = "";
    // data.joinTo(buffer, "-", "{", "}");
    expect(buffer).toEqual("{foo-bar}");
  });

  test("joinToString", () => {
    const data = ["foo", "bar"];
    const text = data.joinToString({ seperator: "-", prefix: "<", postfix: ">" });
    expect(text).toEqual("<foo-bar>");

    const mixed = ["a", "b", "c", null, "d", "e", "f"];
    const text2 = mixed.joinToString({ limit: 4, truncated: "*" });
    expect(text2).toEqual("a, b, c, null, *");
  });

  test("flatMap", () => {
    const source = Iterable.of(null, "foo", "bar");
    const result = source.flatMap((it) => it ?? "");

    const expected = "foobar".split("");
    expect(result).toEqual(expected);
  });

  test("groupBy", () => {
    const words = ["a", "abc", "ab", "def", "abcd"];
    const byLength = words.groupBy((it) => it.length);
    expect(byLength.size).toBe(4);
    expect(byLength.toArray()).toEqual([
      [1, ["a"]],
      [3, ["abc", "def"]],
      [2, ["ab"]],
      [4, ["abcd"]],
    ]);
  });

  test("zip", () => {
    expect(["a", "b", "c"].zip(["b", "c", "d"])).toEqual([
      ["a", "b"],
      ["b", "c"],
      ["c", "d"],
    ]);
  });
});

describe("SetOperationsTest", () => {
  test("distinct", () => {
    expect([1, 3, 3, 1, 5, 1, 3].distinct()).toEqual([1, 3, 5].distinct());
  });

  test("distinctBy", () => {
    expect(["some", "case", "cat", "do", "dog", "it"].distinctBy((it) => it.length)).toEqual(["some", "cat", "do"]);
  });

  test("union", () => {
    expect([1, 3].union([5])).toEqual(new Set([1, 3, 5]));
    expect([].union([1])).toEqual(new Set([1]));
  });

  test("subtract", () => {
    expect([1, 3].subtract([5])).toEqual(new Set([1, 3]));
    expect([1, 3, 5].subtract([5])).toEqual(new Set([1, 3]));
    expect([1, 3, 5].subtract([1, 3, 5]).none()).toBe(true);
    expect([].subtract([1]).none()).toBe(true);
  });

  test.skip("intersect", () => {
    expect([1, 3].intersect([5]).none()).toBe(true);
    expect([1, 3, 5].intersect([5])).toEqual(new Set([5]));
    expect([1, 3, 5].intersect([1, 3, 5])).toEqual(new Set([1, 3, 5]));
    expect([].intersect([1]).none()).toBe(true);
  });
});
