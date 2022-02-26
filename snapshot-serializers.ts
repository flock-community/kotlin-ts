import * as prettier from "prettier";

module.exports = {
  serialize: (val: string) => prettier.format(JSON.stringify(val), { parser: "json" }).trim(),
  test: () => true,
};
