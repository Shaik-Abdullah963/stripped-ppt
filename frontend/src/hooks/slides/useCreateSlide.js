// src/hooks/slides/useCreateSlide.js
import axios from 'axios';

export function useCreateSlide() {
  async function create(payload) {
    const res = await axios.post('/slides', payload);
    return res.data;
  }
  return { create };
}
