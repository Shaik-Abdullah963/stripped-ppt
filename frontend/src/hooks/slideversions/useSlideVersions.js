// src/hooks/useSlideVersions.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useSlideVersions(slideId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (slideId == null) return;
    let cancel = false;
    setLoading(true);
    axios.get(`/slides/${slideId}/versions`)
      .then(res => { if (!cancel) setData(res.data); })
      .catch(err => { if (!cancel) setError(err); })
      .finally(() => { if (!cancel) setLoading(false); });
    return () => { cancel = true; };
  }, [slideId]);
  return { data, loading, error };
}