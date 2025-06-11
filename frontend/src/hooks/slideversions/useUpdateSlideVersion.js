// src/hooks/useUpdateSlideVersion.js
import axios from 'axios';

export function useUpdateSlideVersion() {
  const update = async (slideId, versionId, payload) => {
    const res = await axios.put(`/slides/${slideId}/versions/${versionId}`, payload);
    return res.data;
  };
  return { update };
}