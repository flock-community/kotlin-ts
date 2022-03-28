/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  snapshotSerializers: ["./snapshot-serializers.cjs"],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@flock/kotlin-ts/(.*)$": "<rootDir>/src/$1",
  },
  globals: {
    "ts-jest": {
      useESM: true,
      files: true,
    },
  },
  modulePathIgnorePatterns: ["<rootDir>/build/"],
};

export default config;
