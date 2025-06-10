// src/hooks/slides/__tests__/useSlide.test.jsx
import axios from 'axios';
import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { useSlide } from '../useSlide';

jest.mock('axios');  // ← ensure axios is mocked

describe('useSlide', () => {
  beforeEach(() => {
    axios.get.mockReset();  // now mockReset exists
  });

  it('does nothing if id is null', () => {
    const { result } = renderHook(() => useSlide(null));
    expect(result.current.slide).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('fetches slide by id', async () => {
    const mockSlide = { id: 5, title: 'Test' };
    axios.get.mockResolvedValue({ data: mockSlide });

    const { result } = renderHook(() => useSlide(5));

    await waitFor(() => expect(result.current.loading).toBe(false)); 

    expect(result.current.slide).toEqual(mockSlide);
    expect(result.current.error).toBeNull();
  });
});
