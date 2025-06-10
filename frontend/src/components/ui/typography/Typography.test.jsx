import React from 'react';
import { render, screen } from '@testing-library/react';
import Typography from './Typography';

describe('<Typography />', () => {
  it.each([
    ['h1', 'Heading 1', 'h1'],
    ['h2', 'Heading 2', 'h2'],
    ['h3', 'Heading 3', 'h3'],
    ['h4', 'Heading 4', 'h4'],
    ['h5', 'Heading 5', 'h5'],
    ['h6', 'Heading 6', 'h6'],
    ['body', 'Body text', 'p'],
    ['caption', 'Caption text', 'span'],
  ])('renders variant %s as <%s>', (variant, text, tag) => {
    render(<Typography variant={variant}>{text}</Typography>);
    const el = screen.getByText(text);
    expect(el.tagName.toLowerCase()).toBe(tag);
    expect(el).toHaveClass(`typography--${variant}`);
  });
})