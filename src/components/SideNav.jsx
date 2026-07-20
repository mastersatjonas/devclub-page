/**
 * Eu uso a navegação lateral apenas como atalho complementar no desktop.
 * Todos os pontos recebem rótulo acessível, mesmo sem texto visível.
 */
export default function SideNav({ sections, activeSection }) {
  return (
    <nav className="dc-side-nav" aria-label="Navegação rápida pelas seções">
      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-label={`Ir para a seção ${section.label}`}
            aria-current={isActive ? "location" : undefined}
            className={isActive ? "is-active" : ""}
            title={section.label}
          />
        );
      })}
    </nav>
  );
}
