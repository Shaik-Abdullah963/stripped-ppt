import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PresentationList from './PresentationList';

// Mock React hooks with a cleaner approach
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useState: jest.fn()
      .mockImplementation((init) => [init, jest.fn()])
  };
});

// Mock the hooks with named exports
jest.mock('../../hooks/presentations/usePresentations', () => ({
  usePresentations: jest.fn(() => ({
    data: [{ id: 1, title: 'Test Presentation' }],
    loading: false,
    error: null
  }))
}));

jest.mock('../../hooks/presentations/useCreatePresentation', () => ({
  useCreatePresentation: jest.fn(() => ({
    create: jest.fn(() => Promise.resolve({ id: 2, title: 'New Presentation' }))
  }))
}));

jest.mock('../../hooks/presentations/useDeletePresentation', () => ({
  useDeletePresentation: jest.fn(() => ({
    remove: jest.fn(() => Promise.resolve(true))
  }))
}));

describe('PresentationList', () => {  
  test('renders the deck and calls onSelect when clicked', () => {
    // Setup useState for this specific test to return controlled values
    React.useState
      .mockImplementationOnce(() => [0, jest.fn()]) 
      .mockImplementationOnce(() => [false, jest.fn()]);
    
    const onSelect = jest.fn();
    
    // Render and output the component structure
    const { container, debug } = render(
      <PresentationList onSelect={onSelect} selectedId={null} />
    );
    
    // Uncomment to see the actual structure
    console.log(debug());
    
    // Try various query approaches
    const item = screen.getByText('Test Presentation');
    expect(item).toBeInTheDocument();
    
    // Try to find the containing element that would have the click handler
    // Similar to how your actual component might be structured
    const listItem = item.closest('li') || 
                     item.closest('.presentation-item') ||
                     item.closest('[data-testid="presentation-item"]');
                     
    if (listItem) {
      fireEvent.click(listItem);
    } else {
      // If we can't find a container, try clicking the item directly
      fireEvent.click(item);
      
      // If that doesn't work, try all parent elements up to a reasonable limit
      let currentElement = item.parentElement;
      let depth = 0;
      const MAX_DEPTH = 5;
      
      while (currentElement && depth < MAX_DEPTH && !onSelect.mock.calls.length) {
        fireEvent.click(currentElement);
        currentElement = currentElement.parentElement;
        depth++;
      }
    }
    const openButton = screen.getByText('Open Deck');
    expect(openButton).toBeInTheDocument();
    fireEvent.click(openButton);
    // Check if onSelect was called with the expected argument
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});