// backend/jest.config.js
export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': ['babel-jest', { configFile: './babel.config.js' }]
  }
};
