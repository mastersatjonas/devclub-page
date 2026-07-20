import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import logoDevClub from "../assets/logo-devclub.webp";

const NAVIGATION_ID = "dc-main-navigation";

/**
 * Eu mantenho o header completamente independente do conteúdo principal.
 * Isso garante que position: fixed continue relativo à viewport, mesmo
 * quando a página executa animações com transform.
 */
export default function Header({ sections = [], activeSection = "" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className={`dc-site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="dc-site-header__inner">
        <a
          href="#topo"
          className="dc-site-brand"
          onClick={closeMenu}
          aria-label="DevClub — voltar ao início"
        >
          <img
            src={logoDevClub}
            alt=""
            className="dc-site-brand__image"
            width="1000"
            height="333"
          />
        </a>

        <nav
          id={NAVIGATION_ID}
          className={`dc-site-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Navegação principal"
        >
          {sections.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={closeMenu}
                className={isActive ? "is-active" : ""}
                aria-current={isActive ? "location" : undefined}
              >
                {section.label}
              </a>
            );
          })}

          <a
            href="#cta"
            className="dc-site-header__cta dc-site-header__cta--mobile"
            onClick={closeMenu}
          >
            <span aria-hidden="true">
              <ArrowRight size={17} />
            </span>
            Começar agora
          </a>
        </nav>

        <a href="#cta" className="dc-site-header__cta dc-site-header__cta--desktop">
          <span aria-hidden="true">
            <ArrowRight size={17} />
          </span>
          Começar agora
        </a>

        <button
          type="button"
          className="dc-site-menu-button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls={NAVIGATION_ID}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
    </header>
  );
}
