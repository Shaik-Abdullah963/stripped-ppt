import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePresentation(id) {
  const [presentation, setPresentation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (id == null) return;
    let cancel = false;
    setLoading(true);
    axios.get(`/presentations/${id}`)
      .then(res => { if (!cancel) setPresentation(res.data); })
      .catch(err => { if (!cancel) setError(err); })
      .finally(() => { if (!cancel) setLoading(false); });
    return () => { cancel = true; };
  }, [id]);
  return { presentation, loading, error };
}