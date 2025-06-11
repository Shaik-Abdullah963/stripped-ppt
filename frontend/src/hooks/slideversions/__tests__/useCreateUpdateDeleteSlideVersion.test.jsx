import axios from 'axios';
import { renderHook } from '@testing-library/react';
import { useCreateSlideVersion } from '../useCreateSlideVersion';
import { useUpdateSlideVersion } from '../useUpdateSlideVersion';
import { useDeleteSlideVersion } from '../useDeleteSlideVersion';

jest.mock('axios');

describe('slide version CRUD hooks', () => {
  beforeEach(() => {
    axios.post.mockReset();
    axios.put.mockReset();
    axios.delete.mockReset();
  });

  it('creates a new version', async () => {
    const payload = { name: 'v3' };
    const returned = { id: 3, ...payload };
    axios.post.mockResolvedValue({ data: returned });

    const { result } = renderHook(() => useCreateSlideVersion());
    const data = await result.current.create(5, payload);

    expect(axios.post).toHaveBeenCalledWith('/slides/5/versions', payload);
    expect(data).toEqual(returned);
  });

  it('updates an existing version', async () => {
    const payload = { name: 'v4' };
    const returned = { id: 4, ...payload };
    axios.put.mockResolvedValue({ data: returned });

    const { result } = renderHook(() => useUpdateSlideVersion());
    const data = await result.current.update(5, 4, payload);

    expect(axios.put).toHaveBeenCalledWith('/slides/5/versions/4', payload);
    expect(data).toEqual(returned);
  });

  it('deletes a version', async () => {
    axios.delete.mockResolvedValue({});

    const { result } = renderHook(() => useDeleteSlideVersion());
    await result.current.remove(5, 2);

    expect(axios.delete).toHaveBeenCalledWith('/slides/5/versions/2');
  });
});
