// frontend/jest.config.js
/**
 * @type {import('jest').Config}
 */
export default {
  // Use the jsdom environment from jest-environment-jsdom package
  testEnvironment: 'jsdom',

  // Jest will treat .jsx files as ESM because "type": "module" is set
  extensionsToTreatAsEsm: ['.jsx'],

  // Let babel-jest handle JS/TS files; no { useESM } here
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },

  // Mock out CSS imports
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Redirect any .svg import to your mock
    '\\.svg$': '<rootDir>/__mocks__/svgrMock.js',
  },

  // Run this once before all tests
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],

  // Pick up any *.test.js, *.test.jsx, etc. under src/
  testMatch: ['<rootDir>/src/**/*.test.[jt]s?(x)'],
};
