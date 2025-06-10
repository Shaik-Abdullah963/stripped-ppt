// src/hooks/presentations/__tests__/usePresentations.test.jsx
import axios from 'axios';
import { renderHook, waitFor } from '@testing-library/react';
import { usePresentations } from '../usePresentations';

jest.mock('axios');

describe('usePresentations', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('should load data successfully', async () => {
    const fakeData = [{ id: 1, title: 'Deck A' }];
    axios.get.mockResolvedValue({ data: fakeData });

    const { result } = renderHook(() => usePresentations());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(fakeData);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors', async () => {
    const testError = new Error('Network error');
    axios.get.mockRejectedValue(testError);

    const { result } = renderHook(() => usePresentations());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(testError);
  });
});
