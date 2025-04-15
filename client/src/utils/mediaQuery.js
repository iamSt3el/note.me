import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    const updateMatch = (e) => {
      setMatches(e.matches);
    };

    // Initial check
    setMatches(media.matches);

    // Add event listener
    media.addEventListener('change', updateMatch);

    // Cleanup
    return () => {
      media.removeEventListener('change', updateMatch);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;