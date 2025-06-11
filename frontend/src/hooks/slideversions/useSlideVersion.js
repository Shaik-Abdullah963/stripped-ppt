// src/hooks/useSlideVersion.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useSlideVersion(slideId, versionId) {
  const [version, setVersion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!slideId || !versionId) return;
    let cancel = false;
    setLoading(true);
    axios.get(`/slides/${slideId}/versions/${versionId}`)
      .then(res => { if (!cancel) setVersion(res.data); })
      .catch(err => { if (!cancel) setError(err); })
      .finally(() => { if (!cancel) setLoading(false); });
    return () => { cancel = true; };
  }, [slideId, versionId]);
  return { version, loading, error };
}