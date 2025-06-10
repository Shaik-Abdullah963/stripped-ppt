import React from 'react';
import Container from './Container';
import Typography from '../typography/Typography';

export default {
  title: 'UI/Container',
  component: Container,
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    as: {
      control: 'select',
      options: ['div', 'section', 'main', 'article'],
    },
  },
};

const Template = (args) => (
  <Container {...args} style={{ background: '#f3f4f6' }}>
    <Typography variant="h4">Container {args.size}</Typography>
    <Typography variant="body">
      This content is centered and padded.
    </Typography>
  </Container>
);

export const Medium = Template.bind({});
Medium.args = { size: 'md', as: 'div' };

export const LargeSection = Template.bind({});
LargeSection.args = { size: 'lg', as: 'section' };
