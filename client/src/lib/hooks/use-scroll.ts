import { useState, useEffect } from 'react';

/**
 * Hook to detect if page has been scrolled past a certain threshold
 * @param threshold Scroll threshold in pixels
 * @returns Boolean indicating if scroll position exceeds threshold
 */
export function useScroll(threshold: number = 0): boolean {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrolled;
}
