// src/hooks/slides/useSlide.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useSlide(id) {
  const [slide, setSlide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id == null) return;
    let cancel = false;
    setLoading(true);

    axios.get(`/slides/${id}`)
      .then(res => {
        if (!cancel) setSlide(res.data);
      })
      .catch(err => {
        if (!cancel) setError(err);
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });

    return () => { cancel = true; };
  }, [id]);

  return { slide, loading, error };
}
