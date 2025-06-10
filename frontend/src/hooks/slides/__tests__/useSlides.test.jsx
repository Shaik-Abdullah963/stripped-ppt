// src/hooks/slides/__tests__/useSlides.test.jsx
import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import axios from 'axios';
import { useSlides } from '../useSlides';

jest.mock('axios'); 

describe('useSlides', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('loads slides successfully', async () => {
    const fake = [{ id: 1, title: 'Slide A' }];
    axios.get.mockResolvedValue({ data: fake });

    const { result } = renderHook(() => useSlides());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(fake);
    expect(result.current.error).toBeNull();
  });

  it('handles load error', async () => {
    const err = new Error('fail');
    axios.get.mockRejectedValue(err);

    const { result } = renderHook(() => useSlides());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(err);
  });
});
