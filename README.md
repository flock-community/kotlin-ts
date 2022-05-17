# @flock/kolin-ts

The goal of this npm package is to port the rich standard library of Kotlin to TypeScript.
We try to keep as close the Kotlin api as possible with a couple of exceptions.

For example, we won't rewrite and rename standard Typescript types such as Iterable, Array and Map to exactly match Kotlin.
Instead, we will provide (extension) functions to make sure those standard types are as rich as an Iterable, List and Map are in Kotlin.
Below a list of all the things that diverge from the api of Kotlin's standard library.

### Installation

Install using `npm`:

> npm install --save @flock/kotlin-ts

Or `yarn`:

```
yarn add @flock/kotlin-ts
```

If you want to use @flock/kotlin-ts with ts-plus, you can find its installation instructions here: https://github.com/ts-plus/installer

### Example

The first useful script made with kotlin-ts had as purpose to publish kotlin-ts itself to npm as a multi module package with both esm and commonjs support.

```ts
fs.readFileSync("package.json", "utf-8")
  .let((it) => JSON.parse(it) as Record<string, unknown>)
  // otherwise preinstall/postinstall will be executed when including @flock/kotlin-ts in deps
  .omit("scripts")
  // TODO remove when we publish esm as root
  .omit("type")
  .let((it) => ({
    ...it,
    exports: {
      ".": {
        import: "./esm/index.js",
        require: "./index.js",
      },
      "./*": {
        import: "./esm/*.js",
        require: "./*.js",
      },
    },
  }))
  .let(JSON.stringify)
  .let((it) => format(it, { parser: "json" }))
  .also((it) => fs.writeFileSync("build/package.json", it, { flag: "w" }));

// TODO change to type: commonjs when we publish esm as root
JSON.stringify({ type: "module" })
  .let((it) => format(it, { parser: "json" }))
  .also((it) => fs.writeFileSync("build/esm/package.json", it, { flag: "w" }));
```

We adopted kotlin-ts in [flock-fit](https://github.com/flock-community/flock-fit) and we found it immediately useful with complex data transformations:

```ts
const dataPoints = fitData
  .flatMap((it) =>
    it.fitDataEntries.map((entry) => ({ time: entry.dateTime, [it.fitAccountId]: entry.stepsSinceMidnight }))
  )
  // groupBy can be chained as it an extension function on Iterable (and Array is an Iterable)
  .groupBy((it) => it.dateTime)
  // groupBy returns a Map, which has very little useful methods itself
  // but now it can be directly mapped, as map is an extension function on Iterable (and Map is an Iterable)
  .map(([, it]) => Object.fromEntries(it.flatMap(Object.entries)));
```

More about how to use extension functions with ts-plus below.
You can also use @flock/kotlin-ts without extension functions but as regular functions:

```ts
const flatMapped = fitData.flatMap((it) =>
  it.fitDataEntries.map((entry) => ({ time: entry.dateTime, [it.fitAccountId]: entry.stepsSinceMidnight }))
);
const grouped = groupBy(chartDataPoints, (it) => it.dateTime);
const dataPoints = map(grouped, ([, it]) => Object.fromEntries(it.flatMap(Object.entries)));
```

With the upcoming [pipe operator](https://github.com/tc39/proposal-pipeline-operator), you could use it even without the intermediate variables:

```ts
const dataPoints = fitData
  .flatMap((it) =>
    it.fitDataEntries.map((entry) => ({ time: entry.dateTime, [it.fitAccountId]: entry.stepsSinceMidnight }))
  )
  |> groupBy(%, (it) => it.dateTime)
  |> map((%, ([, it]) => Object.fromEntries(it.flatMap(Object.entries)))
```

### Extension functions

We need some way to emulate extension functions to achieve our goal. For example, an Iterable in Typescript is the following interface:

```ts
interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}
```

Types like Array, Generator, String, Set and Map implement this interface in TypeScript.
However, this type doesn't exist on runtime, there is no prototype called Iterable in JavasScript we could add methods to.

And even if we could, this would be a terrible idea, because prototype modifications are not scoped.
If you change a prototype, you change this prototype to all your dependencies as well.
If you and your dependency change the prototype in non-compatible ways, either you or your dependency will break.

Some languages (Kotlin, Swift, C#, Dart) have a feature called "extension functions", that allows functions to be called with "dot" notation.

> Extensions do not actually modify the classes they extend.
> By defining an extension, you are not inserting new members into a class, only making new functions callable with the dot-notation on variables of this type.
>
> Extension functions are dispatched statically, which means they are not virtual by receiver type.
> An extension function being called is determined by the type of the expression on which the function is invoked, not by the type of the result from evaluating that expression at runtime.

Source: https://kotlinlang.org/docs/extensions.html#extensions-are-resolved-statically

There is a fork of TypeScript called tsplus that adds extension functions to TypeScript. `tsplus` adds one commit on top of TypeScript codebase and is regularly rebasing this commit with the TypeScript codebase.
`tsplus` uses jsdoc comments so that all tools in the JS ecosystem keep working normally (editors/eslint/prettier).

### Contribution guide

We will start with "enriching" the following JavaScript types:

- Iterable
- Array
- Set
- Map
- number
- string
- "unknown"/generic types (such as let, also)

Those extension functions can be found in the following files:

- https://github.com/JetBrains/kotlin/tree/master/libraries/stdlib/common/src/generated
- https://github.com/JetBrains/kotlin/tree/master/libraries/stdlib/src/kotlin/util

We also port the tests, if they exist, they can be found here:

- https://github.com/JetBrains/kotlin/tree/master/libraries/stdlib/test

Sometimes there doesn't exist a test, but there is a "sample" test:

- https://github.com/JetBrains/kotlin/tree/master/libraries/stdlib/samples/test/samples

### Changes from Kotlin

- List => ReadonlyArray
- MutableList => Array
- Map => ReadonlyMap
- MutableMap => Map
- Set => ReadonlySet
- MutableSet => Set

#### Iterable

- filterIsInstance can not be implemented, but a filter with a predicate will do
