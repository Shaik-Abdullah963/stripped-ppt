import { useState } from 'react';
import axios from 'axios';

export function useSaveVersion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveVersion = async (slideId, content, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Saving to backend:', { slideId, content });
      
      const payload = {
        markdown_content: content,
        slide_order: options.slide_order || 1,
        layout_type: options.layout_type || 'standard'
      };
      
      const response = await axios.post(`/slides/${slideId}/versions`, payload);
      
      // Ensure content is part of the returned data
      const enhancedData = {
        ...response.data,
        content: content // Make sure content is available in the expected field
      };
      
      setLoading(false);
      return enhancedData;
    } catch (err) {
      console.error('Error saving version:', err);
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { saveVersion, loading, error };
}