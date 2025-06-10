// src/hooks/__tests__/useCreateUpdateDelete.test.jsx
import axios from 'axios';
import { useCreatePresentation } from '../useCreatePresentation';
import { useUpdatePresentation } from '../useUpdatePresentation';
import { useDeletePresentation } from '../useDeletePresentation';
import { renderHook, act } from '@testing-library/react';
jest.mock('axios');

describe('CRUD hooks', () => {
  beforeEach(() => {
    axios.post.mockReset();
    axios.put.mockReset();
    axios.delete.mockReset();
  });

  it('useCreatePresentation returns created object', async () => {
    const payload = { title: 'New Deck' };
    const returned = { id: 99, ...payload };
    axios.post.mockResolvedValue({ data: returned });

    const { result } = renderHook(() => useCreatePresentation());
    const data = await result.current.create(payload);

    expect(axios.post).toHaveBeenCalledWith('/presentations', payload);
    expect(data).toEqual(returned);
  });

  it('useUpdatePresentation updates and returns object', async () => {
    const payload = { title: 'Updated' };
    const returned = { id: 7, ...payload };
    axios.put.mockResolvedValue({ data: returned });

    const { result } = renderHook(() => useUpdatePresentation());
    const data = await result.current.update(7, payload);

    expect(axios.put).toHaveBeenCalledWith('/presentations/7', payload);
    expect(data).toEqual(returned);
  });

  it('useDeletePresentation removes an item', async () => {
    axios.delete.mockResolvedValue({}); 
    const { result } = renderHook(() => useDeletePresentation());
    await result.current.remove(5);

    expect(axios.delete).toHaveBeenCalledWith('/presentations/5');
  });
});
