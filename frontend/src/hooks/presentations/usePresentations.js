import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePresentations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancel = false;
    setLoading(true);
    axios.get('/presentations')
      .then(res => { if (!cancel) { setData(res.data); setError(null); } })
      .catch(err => { if (!cancel) setError(err); })
      .finally(() => { if (!cancel) setLoading(false); });
    return () => { cancel = true; };
  }, []);
  return { data, loading, error };
}
