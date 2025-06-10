import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('<ProgressBar />', () => {
  it('renders with zero width when value is 0', () => {
    render(<ProgressBar value={0} label="0%" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '0');
    // inner div is first child
    expect(bar.firstChild).toHaveStyle({ width: '0%' });
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('clamps values below 0 to zero', () => {
    render(<ProgressBar value={-0.2} />);
    expect(screen.getByRole('progressbar').firstChild).toHaveStyle({ width: '0%' });
  });

  it('clamps values above 1 to full', () => {
    render(<ProgressBar value={1.5} />);
    expect(screen.getByRole('progressbar').firstChild).toHaveStyle({ width: '100%' });
  });

  it('renders correct percentage and custom height', () => {
    render(<ProgressBar value={0.33} height="2rem" />);
    const bar = screen.getByRole('progressbar').firstChild;
    expect(bar).toHaveStyle({ width: '33%' });
    expect(bar).toHaveStyle({ height: '2rem' });
  });

  it('does not render label when none is provided', () => {
    render(<ProgressBar value={0.4} />);
    expect(screen.queryByText(/%/)).toBeNull();
  });
});
