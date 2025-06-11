// src/hooks/useDeleteSlideVersion.js
import axios from 'axios';

export function useDeleteSlideVersion() {
  const remove = async (slideId, versionId) => {
    await axios.delete(`/slides/${slideId}/versions/${versionId}`);
  };
  return { remove };
}