import React from 'react';
import Typography from './Typography';

export default {
  title: 'UI/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['h1','h2','h3','h4','h5','h6','body','caption'],
    },
    children: { control: 'text' },
  },
};

const Template = (args) => <Typography {...args} />;

export const Heading1 = Template.bind({});
Heading1.args = { variant: 'h1', children: 'Heading Level 1' };

export const Heading2 = Template.bind({});
Heading2.args = { variant: 'h2', children: 'Heading Level 2' };

export const BodyText = Template.bind({});
BodyText.args = { variant: 'body', children: 'This is a paragraph of body text.' };

export const CaptionText = Template.bind({});
CaptionText.args = { variant: 'caption', children: 'Caption or secondary text.' };
