import axios from 'axios';

export function useUpdatePresentation() {
  const update = async (id, payload) => {
    const res = await axios.put(`/presentations/${id}`, payload);
    return res.data;
  };
  return { update };
}
