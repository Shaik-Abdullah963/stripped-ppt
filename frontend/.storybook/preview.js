// .storybook/preview.js
import React from 'react';
import { initialize, mswLoader } from 'msw-storybook-addon';

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass' // Set default behavior at initialization
});

// Global parameters
export const parameters = {
  msw: {
    handlers: {},
    onUnhandledRequest: 'bypass' // Set to bypass all unhandled requests
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  a11y: {
    test: 'todo',
  },
};

// Replace the deprecated mswDecorator with mswLoader
export const loaders = [mswLoader];