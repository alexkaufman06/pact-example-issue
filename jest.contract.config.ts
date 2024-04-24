import nextJest from "next/jest.js";
import { Config } from "jest";

const createJestConfig = nextJest({ dir: "./" });

// https://jestjs.io/docs/configuration
const config: Config = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  moduleDirectories: ["node_modules", "<rootDir>/src/"],
  extensionsToTreatAsEsm: [".esm.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/e2e-tests/", // ignore Playwright tests
    "/src/", // ignore unit tests
  ],
};
export default createJestConfig(config);
