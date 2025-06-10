// src/components/ui/Button.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('<Button />', () => {
  it('renders the provided label', () => {
    render(<Button variant="primary" size="md">Test Label</Button>);
    // find by role=button and text
    expect(screen.getByRole('button', { name: /test label/i })).toBeInTheDocument();
  });

  it('applies the correct CSS classes for variant and size', () => {
    const { container } = render(
      <Button variant="secondary" size="lg">Label</Button>
    );
    const btn = container.querySelector('button');
    expect(btn).toHaveClass('btn--secondary');
    expect(btn).toHaveClass('btn--lg');
  });

  it('calls onClick when clicked and not disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button variant="primary" size="md" onClick={handleClick}>
        Click Me
      </Button>
    );
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button variant="primary" size="md" onClick={handleClick} disabled>
        No Click
      </Button>
    );
    const btn = screen.getByRole('button', { name: /no click/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
