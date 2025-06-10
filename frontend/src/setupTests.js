// src/setupTests.js
import axios from 'axios';

// Auto‐mock axios for all tests
jest.mock('axios', () => ({
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));
