import axios from 'axios';
import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { useSlideVersions } from '../useSlideVersions';

jest.mock('axios');

describe('useSlideVersions', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('does nothing when slideId is null', () => {
    const { result } = renderHook(() => useSlideVersions(null));
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('loads versions successfully', async () => {
    const fake = [{ id: 1, name: 'v1' }, { id: 2, name: 'v2' }];
    axios.get.mockResolvedValue({ data: fake });

    const { result } = renderHook(() => useSlideVersions(123));

    // loading flips false when done
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(axios.get).toHaveBeenCalledWith('/slides/123/versions');
    expect(result.current.data).toEqual(fake);
    expect(result.current.error).toBeNull();
  });

  it('handles load errors', async () => {
    const err = new Error('oops');
    axios.get.mockRejectedValue(err);

    const { result } = renderHook(() => useSlideVersions(456));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(err);
  });
});
