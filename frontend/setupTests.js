// setupTests.js
// (ESM module - loaded automatically by Jest via setupFilesAfterEnv)

/**
 * 1. Extend Jest's expect() with custom matchers from @testing-library/jest-dom
 *    (e.g. .toBeInTheDocument(), .toHaveClass(), etc.)
 */
import '@testing-library/jest-dom';

/**
 * 2. Polyfill window.matchMedia for components relying on CSS media queries.
 */
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

/**
 * 3. (Optional) Global fetch polyfill. Uncomment if you need it:
 */
// import 'whatwg-fetch';

/**
 * 4. (Optional) Configure Jest fake timers globally. Uncomment to use:
 */
// jest.useFakeTimers();
