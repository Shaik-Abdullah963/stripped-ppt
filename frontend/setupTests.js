// src/setupTests.js
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { TextEncoder, TextDecoder } from 'util';

// 1) TextEncoder/TextDecoder
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

// 2) BroadcastChannel stub
if (typeof global.BroadcastChannel === 'undefined') {
  class BroadcastChannel {
    constructor(name) { this.name = name; }
    postMessage() {}
    addEventListener() {}
    removeEventListener() {}
    close() {}
  }
  global.BroadcastChannel = BroadcastChannel;
}

// 3) Minimal Streams stubs (no getters, no prototype magic)
if (typeof global.ReadableStream === 'undefined') {
  global.ReadableStream = class {
    constructor() {}
    getReader() {
      return {
        read: () => Promise.resolve({ done: true, value: undefined }),
        releaseLock: () => {}
      };
    }
  };
}
if (typeof global.WritableStream === 'undefined') {
  global.WritableStream = class {
    constructor() {}
  };
}
if (typeof global.TransformStream === 'undefined') {
  global.TransformStream = class {
    constructor() {
      this.readable = new global.ReadableStream();
      this.writable = new global.WritableStream();
    }
  };
}

// 4) Axios mock
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));
