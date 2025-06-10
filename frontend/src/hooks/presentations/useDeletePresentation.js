import axios from 'axios';

export function useDeletePresentation() {
  const remove = async (id) => {
    await axios.delete(`/presentations/${id}`);
  };
  return { remove };
}