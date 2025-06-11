// src/components/PresentationList.stories.jsx
import React from 'react';
import PresentationList from './PresentationList';
import { http } from 'msw';
import { within, userEvent } from '@storybook/testing-library';

export default {
  title: 'Pages/PresentationList',
  component: PresentationList,
  loaders: [],  // picks up mswLoader from preview
  parameters: {
    msw: {
      handlers: [
        http.get('/presentations', () =>
          new Response(
            JSON.stringify([
              { id: 1, title: 'Deck One' },
              { id: 2, title: 'Deck Two' },
            ]),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }
          )
        ),
      ],
    },
  },
};

const Template = (args) => <PresentationList {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSelect: (id) => alert(`Selected deck ${id}`),
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const buttons = await canvas.findAllByRole('button', {
    name: /open deck/i,
  });
  await userEvent.click(buttons[0]);
};
