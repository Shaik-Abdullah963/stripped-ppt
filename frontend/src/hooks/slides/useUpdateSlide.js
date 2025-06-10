// src/hooks/slides/useUpdateSlide.js
import axios from 'axios';

export function useUpdateSlide() {
  async function update(id, payload) {
    const res = await axios.put(`/slides/${id}`, payload);
    return res.data;
  }
  return { update };
}
