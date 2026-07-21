import { useRef, useCallback } from 'react';

export default function useInfiniteScroll(callback, loading) {
  const observer = useRef(null);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, callback]
  );

  return lastElementRef;
}