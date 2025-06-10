// src/hooks/slides/__tests__/useCreateUpdateDeleteSlide.test.jsx
import axios from 'axios';
import { renderHook } from '@testing-library/react';
import { useCreateSlide } from '../useCreateSlide';
import { useUpdateSlide } from '../useUpdateSlide';
import { useDeleteSlide } from '../useDeleteSlide';

jest.mock('axios');  // ← ensure axios is mocked

describe('slide CRUD hooks', () => {
  beforeEach(() => {
    axios.post.mockReset();
    axios.put.mockReset();
    axios.delete.mockReset();
  });

  it('creates a slide', async () => {
    const payload = { title: 'New' };
    const returned = { id: 9, ...payload };
    axios.post.mockResolvedValue({ data: returned });

    const { result } = renderHook(() => useCreateSlide());
    const data = await result.current.create(payload);

    expect(axios.post).toHaveBeenCalledWith('/slides', payload);
    expect(data).toEqual(returned);
  });

  it('updates a slide', async () => {
    const payload = { title: 'Updated' };
    const returned = { id: 9, ...payload };
    axios.put.mockResolvedValue({ data: returned });

    const { result } = renderHook(() => useUpdateSlide());
    const data = await result.current.update(9, payload);

    expect(axios.put).toHaveBeenCalledWith('/slides/9', payload);
    expect(data).toEqual(returned);
  });

  it('deletes a slide', async () => {
    axios.delete.mockResolvedValue({}); 

    const { result } = renderHook(() => useDeleteSlide());
    await result.current.remove(3);

    expect(axios.delete).toHaveBeenCalledWith('/slides/3');
  });
});
