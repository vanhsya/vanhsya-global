import { useState, useEffect, type RefObject } from 'react';

interface MotionPreferences {
  reduceMotion: boolean;
  enableParallax: boolean;
  enableTransitions: boolean;
  shouldAnimate: boolean;
}

export const useMotionPreferences = () => {
  const [preferences, setPreferences] = useState<MotionPreferences>({
    reduceMotion: false,
    enableParallax: true,
    enableTransitions: true,
    shouldAnimate: true,
  });

  useEffect(() => {
    // Check system preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPreferences(prev => ({
        ...prev,
        reduceMotion: e.matches,
        enableParallax: !e.matches,
        enableTransitions: !e.matches,
        shouldAnimate: !e.matches,
      }));
    };

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    queueMicrotask(() => {
      setPreferences(prev => ({
        ...prev,
        reduceMotion: mediaQuery.matches,
        enableParallax: !mediaQuery.matches,
        enableTransitions: !mediaQuery.matches,
        shouldAnimate: !mediaQuery.matches,
      }));
    });

    // Check for saved preferences in localStorage
    const savedPreferences = localStorage.getItem('motion-preferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        queueMicrotask(() => setPreferences(prev => ({ ...prev, ...parsed })));
      } catch {
        console.warn('Failed to parse saved motion preferences');
      }
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const updatePreferences = (newPreferences: Partial<MotionPreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    localStorage.setItem('motion-preferences', JSON.stringify(updated));
  };

  return {
    preferences,
    updatePreferences,
    shouldAnimate: !preferences.reduceMotion && preferences.enableTransitions,
    shouldParallax: !preferences.reduceMotion && preferences.enableParallax,
  };
};

export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  threshold = 0.1,
  rootMargin = '0px'
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, threshold, rootMargin]);

  return isVisible;
};

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};
