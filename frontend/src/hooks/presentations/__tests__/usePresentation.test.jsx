// src/hooks/presentations/__tests__/usePresentation.test.jsx
import axios from 'axios';
import { renderHook, waitFor } from '@testing-library/react';
import { usePresentation } from '../usePresentation';

jest.mock('axios');

describe('usePresentation', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('does nothing when id is null', () => {
    const { result } = renderHook(() => usePresentation(null));
    expect(result.current.presentation).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('fetches a presentation when id is provided', async () => {
    const mockPres = { id: 42, title: 'Answer Deck' };
    axios.get.mockResolvedValue({ data: mockPres });

    const { result } = renderHook(() => usePresentation(42));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.presentation).toEqual(mockPres);
    expect(result.current.error).toBeNull();
  });
});
