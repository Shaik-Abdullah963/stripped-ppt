// .storybook/preview.js
import React from 'react';
import { initialize, mswDecorator } from 'msw-storybook-addon';

// 1. Start the MSW worker
initialize();

// 2. Provide the MSW decorator
export const decorators = [mswDecorator];

// 3. Global parameters
export const parameters = {
  msw: {
    // *here* we bypass ALL unhandled requests (including CSS fetches)
    onUnhandledRequest: 'bypass',
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
