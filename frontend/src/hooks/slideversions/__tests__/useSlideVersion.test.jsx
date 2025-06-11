import axios from 'axios';
import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { useSlideVersion } from '../useSlideVersion';

jest.mock('axios');

describe('useSlideVersion', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('does nothing if slideId or versionId is missing', () => {
    const { result: r1 } = renderHook(() => useSlideVersion(null, null));
    expect(r1.current.version).toBeNull();
    expect(r1.current.loading).toBe(false);

    const { result: r2 } = renderHook(() => useSlideVersion(1, null));
    expect(r2.current.version).toBeNull();
    expect(r2.current.loading).toBe(false);
  });

  it('fetches a specific version', async () => {
    const fake = { id: 7, name: 'v7' };
    axios.get.mockResolvedValue({ data: fake });

    const { result } = renderHook(() => useSlideVersion(10, 7));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(axios.get).toHaveBeenCalledWith('/slides/10/versions/7');
    expect(result.current.version).toEqual(fake);
    expect(result.current.error).toBeNull();
  });

  it('handles fetch errors', async () => {
    const err = new Error('fail fetch');
    axios.get.mockRejectedValue(err);

    const { result } = renderHook(() => useSlideVersion(10, 8));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.version).toBeNull();
    expect(result.current.error).toBe(err);
  });
});
