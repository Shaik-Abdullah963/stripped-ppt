import React from 'react';
import ProgressBar from './ProgressBar';

export default {
  title: 'UI/ProgressBar',
  component: ProgressBar,
  argTypes: {
    value: {
     control: {
        type: 'range',  // slider control
       min: 0,
        max: 1,
        step: 0.01,
      },
    },
    label: { control: 'text' },
    height: { control: 'text' },
  },
};

const Template = (args) => <div style={{ width: '300px' }}><ProgressBar {...args}/></div>;

export const Empty = Template.bind({});
Empty.args = { value: 0, label: '0%' };

export const Half = Template.bind({});
Half.args = { value: 0.5, label: '50%' };

export const Full = Template.bind({});
Full.args = { value: 1, label: '100%', height: '1rem' };
