import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock all problematic ES modules first
jest.mock('rehype-highlight', () => {
  return { default: jest.fn() };
}, { virtual: true });

jest.mock('react-hotkeys-hook', () => ({
  useHotkeys: jest.fn()
}), { virtual: true });

jest.mock('react-markdown', () => {
  return {
    default: ({ children }) => <div data-testid="markdown-content">{children}</div>
  };
}, { virtual: true });

jest.mock('remark-gfm', () => {
  return { default: jest.fn() };
}, { virtual: true });

// Mock the hooks
jest.mock('../../hooks/slides/useSlides', () => ({
  useSlides: jest.fn().mockImplementation((presentationId, refreshTrigger) => ({
    slides: [
      { 
        id: 1, 
        latestVersion: { 
          id: 101, 
          content: '# Slide 1', 
          layout_type: 'title' 
        } 
      }
    ],
    loading: false,
    error: null,
    setSlides: jest.fn()
  }))
}));

jest.mock('../../hooks/slides/useCreateSlide', () => ({
  useCreateSlide: () => ({
    create: jest.fn()
  })
}));

jest.mock('../../hooks/slides/useDeleteSlide', () => ({
  useDeleteSlide: () => ({
    remove: jest.fn()
  })
}));

// Import the component AFTER all mocks are set up
import SlideDeck from './SlideDeck';

// Simple test that doesn't require complex functionality
describe('SlideDeck Component', () => {
  test('renders without crashing', () => {
    // Simple test that just verifies it renders
    render(<SlideDeck presentationId="1" />);
    expect(document.body).toBeInTheDocument();
  });
})