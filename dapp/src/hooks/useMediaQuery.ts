'use client';

import { useCallback, useEffect, useState } from 'react';

enum MINMAX {
  min = 'min',
  max = 'max',
}

function useMediaQuery(query: `(${MINMAX}-width: ${number}px)`): boolean {
  const getMatches = (mediaQuery: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(mediaQuery).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  const handleChange = useCallback(() => {
    setMatches(getMatches(query));
  }, [query]);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query, handleChange]);

  return matches;
}

export default useMediaQuery;
