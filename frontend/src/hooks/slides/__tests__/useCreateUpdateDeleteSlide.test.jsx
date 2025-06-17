import { renderHook } from '@testing-library/react';
import axios from 'axios';
import { useCreateSlide } from '../useCreateSlide';
import { useUpdateSlide } from '../useUpdateSlide';
import { useDeleteSlide } from '../useDeleteSlide';

// Mock axios
jest.mock('axios');

describe('slide CRUD hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('hooks exist and return expected structure', () => {
    // Simple verification that hooks exist and return expected structure
    const createHook = useCreateSlide();
    const updateHook = useUpdateSlide();
    const deleteHook = useDeleteSlide();
    
    expect(createHook).toHaveProperty('create');
    expect(updateHook).toHaveProperty('update');
    expect(deleteHook).toHaveProperty('remove');
    
    expect(typeof createHook.create).toBe('function');
    expect(typeof updateHook.update).toBe('function');
    expect(typeof deleteHook.remove).toBe('function');
  });
});