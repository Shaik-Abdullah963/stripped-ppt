// src/components/ui/iconbutton/IconButton.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IconButton from './IconButton';
import { ReactComponent as TestIcon } from '../../../icons/arrow-left.svg'; // will be mocked

describe('<IconButton />', () => {
  it('renders as a button with the correct aria-label', () => {
    render(
      <IconButton size="sm" aria-label="Go back">
        <TestIcon data-testid="icon" />
      </IconButton>
    );
    const btn = screen.getByRole('button', { name: /go back/i });
    expect(btn).toBeInTheDocument();
  });

  it('renders the passed icon as its child', () => {
    const { container } = render(
      <IconButton size="sm" aria-label="Icon only">
        <TestIcon data-testid="icon" />
      </IconButton>
    );
    // Should find exactly one <svg> inside the button
    const svg = container.querySelector('button svg');
    expect(svg).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBe(svg);
  });

  it('always has the icon-button base class', () => {
    render(
      <IconButton variant="secondary" size="lg" aria-label="Test">
        <TestIcon />
     </IconButton>
    );
   const btn = screen.getByRole('button', { name: /test/i });
    expect(btn).toHaveClass('icon-button');
  });
  it('calls onClick when clicked and not disabled', () => {
    const handle = jest.fn();
    render(
      <IconButton onClick={handle} aria-label="Click me">
        <TestIcon />
      </IconButton>
    );
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClick when disabled', () => {
    const handle = jest.fn();
    render(
      <IconButton disabled onClick={handle} aria-label="Disabled">
        <TestIcon />
      </IconButton>
    );
    const btn = screen.getByRole('button', { name: /disabled/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handle).not.toHaveBeenCalled();
  });
});
