import { useEffect, useRef, useState } from "react";

/**
 * Eu concentro a lógica de reveal neste hook para evitar observers
 * repetidos em cada seção. O fallback mantém o conteúdo visível em
 * navegadores sem IntersectionObserver.
 */
export default function useReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -8%",
  once = true,
} = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }

          return;
        }

        if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [elementRef, isVisible];
}
