import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Helper function to normalize slide data
const normalizeSlide = (slide) => {
  if (!slide) return null;
  
  // Check for latestVersion and ensure it has content field
  if (!slide.latestVersion) {
    return { ...slide, latestVersion: { content: '', id: null } };
  }
  
  // Make sure content is accessible with the right field name
  const normalizedVersion = {
    ...slide.latestVersion,
    content: slide.latestVersion.content || slide.latestVersion.markdown_content || ''
  };
  
  return { ...slide, latestVersion: normalizedVersion };
};

export function useSlides(presentationId, refreshTrigger = 0) {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Reset slides when presentation changes
  useEffect(() => {
    setSlides([]);
    setError(null);
  }, [presentationId]);

  const refresh = useCallback(() => {
    if (!presentationId) return Promise.resolve([]);
    
    console.log("Refreshing slides for presentation:", presentationId);
    setLoading(true);
    
    return axios.get(`/presentations/${presentationId}/slides`)
      .then(response => {
        console.log("Fetched slides:", response.data);
        
        // Normalize all slides to ensure consistent data structure
        const normalizedSlides = response.data.map(normalizeSlide);
        console.log("Normalized slides:", normalizedSlides);
        
        setSlides(normalizedSlides);
        setLoading(false);
        return normalizedSlides;
      })
      .catch(err => {
        console.error("Error refreshing slides:", err);
        setError(err);
        setLoading(false);
        throw err;
      });
  }, [presentationId]);

  // Fetch slides when component mounts or dependencies change
  useEffect(() => {
    let isMounted = true;
    
    if (presentationId) {
      refresh().catch(err => {
        if (isMounted) console.error("Failed initial refresh:", err);
      });
    }
    
    return () => { isMounted = false; };
  }, [presentationId, refreshTrigger, refresh]);
  
  return { slides, loading, error, refresh, setSlides };
}