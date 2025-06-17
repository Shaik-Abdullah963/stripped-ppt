import axios from 'axios'

/**
 * Updates slide metadata (e.g. title) or replaces content.
 */
export function useUpdateSlide() {
  async function update(id, payload) {
    const res = await axios.put(`/slides/${id}`, payload)
    return res.data
  }
  return { update }
}
