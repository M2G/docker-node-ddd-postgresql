module.exports = {
  coverageDirectory: './test/coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!**/node_modules/**',
    "!<rootDir>/src/core/**",
    "!<rootDir>/src/models/**",
    "!<rootDir>/src/repository/**",
    "!<rootDir>/src/utils/**",
    "!<rootDir>/src/index.ts"
  ],
  forceExit: true,
  globals: {
    "ts-jest": {
      "tsConfig": "<rootDir>/tsconfig.json"
    }
  },
  preset: "ts-jest",
  roots: [
    "<rootDir>/test"
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: [
    '**/__tests__/**/*.(js|ts)',
    '**/?(*.)+(spec|test).(js|ts)',
  ],
  modulePaths: [],
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "node"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/(build|node_modules)/"
  ],
  testEnvironment: 'node',
};
