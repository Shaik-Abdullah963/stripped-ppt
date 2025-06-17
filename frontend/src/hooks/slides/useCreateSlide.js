import axios from 'axios'

/**
 * Creates a new slide under a given presentation.
 * @param {string} presentationId 
 */
export function useCreateSlide() {
  async function create({ presentationId, content = '' }) {
    const res = await axios.post(
      `/presentations/${presentationId}/slides`,
      { content }
    )
    return res.data   // expect { id, latestVersion: { content, ... }, … }
  }
  return { create }
}
