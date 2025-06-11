import axios from 'axios';

export function useCreateSlideVersion() {
  const create = async (slideId, payload) => {
    const res = await axios.post(`/slides/${slideId}/versions`, payload);
    return res.data;
  };
  return { create };
}