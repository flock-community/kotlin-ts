const prettier = require("prettier");

module.exports = {
  serialize: (val) => prettier.format(JSON.stringify(val), { parser: "json" }).trim(),
  test: () => true,
};
