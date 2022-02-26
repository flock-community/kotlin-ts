/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  snapshotSerializers: ["./snapshot-serializers.ts"],
  extensionsToTreatAsEsm: [".ts"],
};
