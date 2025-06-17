import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePresentations(refreshDependency) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPresentations = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/presentations');
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresentations();
  }, [refreshDependency]); // Re-fetch when this changes

  return { data, loading, error };
}