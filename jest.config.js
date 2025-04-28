/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  moduleNameMapper: {
    '^features/(.*)$': '<rootDir>/src/features/$1',
    '^store/(.*)$': '<rootDir>/src/store/$1',
    '^shared/(.*)$': '<rootDir>/src/shared/$1'
  },
};
