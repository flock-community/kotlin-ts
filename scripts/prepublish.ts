import * as fs from "fs";
import { format } from "prettier";

createDirSync("build/esm");

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

fs.copyFileSync("README.md", "build/README.md");

function createDirSync(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
