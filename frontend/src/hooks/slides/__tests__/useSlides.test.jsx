import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useSlides } from '../useSlides';

// Mock axios
jest.mock('axios');

describe('useSlides', () => {
  test('loads slides successfully', async () => {
    const fake = [{ id: 1, title: 'Slide A' }];
    
    axios.get.mockResolvedValueOnce({ data: fake });
    
    const { result } = renderHook(() => useSlides('1'));
    
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    // UPDATE THIS LINE - expect the normalized data format with latestVersion
    expect(result.current.slides).toEqual([
      { id: 1, title: 'Slide A', latestVersion: { content: '', id: null } }
    ]);
    expect(result.current.error).toBeNull();
  });
  
  test('handles load error', async () => {
    const err = new Error('Failed to load');
    axios.get.mockRejectedValueOnce(err);
    
    const { result } = renderHook(() => useSlides('2'));
    
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    expect(result.current.slides).toEqual([]);
    expect(result.current.error).toBe(err);
  });
});