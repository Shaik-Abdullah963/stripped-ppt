import React from 'react';
import Button from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'icon'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

const Template = (args) => <Button {...args}>{args.children}</Button>;

export const Primary = Template.bind({});
Primary.args = { variant: 'primary', size: 'md', disabled: false };

export const Secondary = Template.bind({});
Secondary.args = { variant: 'secondary', size: 'md' };

export const IconOnly = Template.bind({});
IconOnly.args = { variant: 'icon', size: 'sm' };
