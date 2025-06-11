// src/components/presentation/PresentationList.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

describe('PresentationList', () => {
  it('renders the deck and calls onSelect when clicked', () => {
    jest.isolateModules(() => {
      // Mock the named export, not default
      jest.doMock(
        '../../hooks/presentations/usePresentations',
        () => ({
          __esModule: true,
          usePresentations: () => ({
            data: [{ id: 1, title: 'Test Deck' }],
            loading: false,
            error: null,
          }),
        })
      );

      const PresentationList = require('./PresentationList').default;
      const onSelect = jest.fn();
      render(<PresentationList onSelect={onSelect} />);

      expect(screen.getByText('Test Deck')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /open deck/i }));
      expect(onSelect).toHaveBeenCalledWith(1);
    });
  });

  it('shows empty state when no data', () => {
    jest.isolateModules(() => {
      jest.doMock(
        '../../hooks/presentations/usePresentations',
        () => ({
          __esModule: true,
          usePresentations: () => ({
            data: [],
            loading: false,
            error: null,
          }),
        })
      );

      const PresentationList = require('./PresentationList').default;
      render(<PresentationList onSelect={() => {}} />);

      expect(screen.getByText(/no presentations yet/i)).toBeInTheDocument();
    });
  });

  it('shows an error message when hook returns error', () => {
    jest.isolateModules(() => {
      jest.doMock(
        '../../hooks/presentations/usePresentations',
        () => ({
          __esModule: true,
          usePresentations: () => ({
            data: [],
            loading: false,
            error: new Error('Oops!'),
          }),
        })
      );

      const PresentationList = require('./PresentationList').default;
      render(<PresentationList onSelect={() => {}} />);

      expect(screen.getByText(/Error: Oops!/i)).toBeInTheDocument();
    });
  });
});
