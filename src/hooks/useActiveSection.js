import { useEffect, useState } from "react";

/**
 * Eu mantenho o rastreamento da seção ativa separado da página.
 * Dessa forma, Header e SideNav consomem o mesmo estado sem duplicar
 * regras de IntersectionObserver.
 */
export default function useActiveSection(sections, initialSection = "quem-somos") {
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (mostVisibleEntry) {
          setActiveSection(mostVisibleEntry.target.id);
        }
      },
      {
        rootMargin: "-92px 0px -48% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sections]);

  return activeSection;
}
