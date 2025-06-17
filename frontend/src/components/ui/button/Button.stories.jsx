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

// Using the newer CSF 3.0 format (recommended for Storybook 7+)
export const Primary = {
  args: { 
    variant: 'primary', 
    size: 'md', 
    disabled: false,
    children: 'Primary Button' // Added children
  }
};

export const Secondary = {
  args: { 
    variant: 'secondary', 
    size: 'md',
    children: 'Secondary Button' // Added children
  }
};

export const IconOnly = {
  args: { 
    variant: 'icon', 
    size: 'sm',
    children: '🔍' // Added an icon as children
  }
};

// Large variant
export const Large = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Large Button'
  }
};

// Disabled state
export const Disabled = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button'
  }
};