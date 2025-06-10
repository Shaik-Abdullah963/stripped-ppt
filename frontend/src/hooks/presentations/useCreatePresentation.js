import axios from 'axios';

export function useCreatePresentation() {
  const create = async (payload) => {
    const res = await axios.post('/presentations', payload);
    return res.data;
  };
  return { create };
}