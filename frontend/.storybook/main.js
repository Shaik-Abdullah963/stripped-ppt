// .storybook/main.js
import { mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

/** @type { import('@storybook/react-vite').StorybookConfig } */
export default {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@chromatic-com/storybook',
    'msw-storybook-addon',           // ← added MSW integration
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [
        svgr({ svgrOptions: { icon: true } }),
      ],
      resolve: {
        alias: { '@': '/src' },
      },
    });
  },
};
