// src/hooks/slides/useDeleteSlide.js
import axios from 'axios';

export function useDeleteSlide() {
  async function remove(id) {
    await axios.delete(`/slides/${id}`);
  }
  return { remove };
}
