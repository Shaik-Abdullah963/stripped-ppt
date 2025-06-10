// src/hooks/useHealthCheck.js
import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Checks that the server is alive.
 * GET /
 */
export function useHealthCheck() {
  const [ok, setOk] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    axios.get('/')
      .then(() => { if (!cancelled) setOk(true); })
      .catch((err) => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) {/* nothing*/} });
    return () => { cancelled = true; };
  }, []);

  return { ok, error };
}
