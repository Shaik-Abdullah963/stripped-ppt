import React from 'react';
import { render, screen } from '@testing-library/react';
import Container from './Container';

describe('<Container />', () => {
  it('renders children and uses default size (`md`)', () => {
    render(
      <Container>
        <div data-testid="inner">Hello</div>
      </Container>
    );
    const inner = screen.getByTestId('inner');
    expect(inner).toBeInTheDocument();

    const wrapper = inner.parentElement;
    expect(wrapper).toHaveClass('container--md');
  });

  it('applies custom size and as props', () => {
    render(
      <Container size="xl" as="section" data-testid="wrapper">
        Content
      </Container>
    );
    const wrapper = screen.getByTestId('wrapper');
    expect(wrapper.tagName.toLowerCase()).toBe('section');
    expect(wrapper).toHaveClass('container--xl');
  });
});
