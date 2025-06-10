// src/components/ui/IconButton.stories.jsx
import React from 'react';
import IconButton from './IconButton';
import arrowLeftSrc from '../../../icons/arrow-left.svg';
import menuSrc from '../../../icons/menu.svg';

export default {
  title: 'UI/IconButton',
  component: IconButton,
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg']
    },
    disabled: { control: 'boolean' },
    'aria-label': { control: 'text' },
  },
};

const Template = (args) => <IconButton {...args} />;

export const Arrow = Template.bind({});
Arrow.args = {
  size: 'md',
  'aria-label': 'Previous slide',
  children: <img src={arrowLeftSrc} alt="Previous slide" />,
};

export const MenuButton = Template.bind({});
MenuButton.args = {
  size: 'lg',
  'aria-label': 'Open menu',
  children: <img src={menuSrc} alt="Menu" />,
};

export const Disabled = Template.bind({});
Disabled.args = {
  size: 'md',
  disabled: true,
  'aria-label': 'Disabled',
  children: <img src={arrowLeftSrc} alt="Disabled icon" />,
};