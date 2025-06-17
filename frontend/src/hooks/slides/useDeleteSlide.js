import axios from 'axios';

export function useDeleteSlide() {
  const remove = async (slideId, presentationId) => {
    try {
      await axios.delete(`/presentations/${presentationId}/slides/${slideId}`);
    } catch (err) {
      console.error('Error deleting slide:', err);
      throw err;
    }
  };
  
  return { remove };
}