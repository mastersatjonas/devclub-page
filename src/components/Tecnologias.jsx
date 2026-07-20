import {
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiJavascript, SiPostgresql, SiTypescript, SiVite } from "react-icons/si";
import { Braces } from "lucide-react";
import useReveal from "../hooks/useReveal";
import { TECNOLOGIAS } from "../data/devclubData";

/**
 * Eu relaciono os ícones no componente para manter devclubData.js livre
 * de dependências React. O conteúdo continua serializável e fácil de testar.
 */
const TECHNOLOGY_ICONS = {
  html: FaHtml5,
  css: FaCss3Alt,
  javascript: SiJavascript,
  react: FaReact,
  typescript: SiTypescript,
  node: FaNodeJs,
  postgresql: SiPostgresql,
  "react-native": FaReact,
  python: FaPython,
  git: FaGitAlt,
  github: FaGithub,
  vite: SiVite,
};

export default function Tecnologias() {
  const [sectionRef, visible] = useReveal();

  return (
    <section
      id="tecnologias"
      ref={sectionRef}
      className="dc-section"
      aria-labelledby="tecnologias-title"
    >
      <div className="dc-container">
        <div className="dc-eyebrow dc-eyebrow--yellow">
          <Braces size={15} aria-hidden="true" />
          <span>stack.config</span>
        </div>

        <h2 id="tecnologias-title" className="dc-section-title">
          tecnologias presentes na formação
        </h2>

        <p className="dc-section-text dc-technologies-description">
          Uma stack moderna para desenvolver interfaces, aplicações web, sistemas completos,
          APIs, aplicativos mobile e soluções orientadas por dados.
        </p>

        <div className="dc-tech-grid">
          {TECNOLOGIAS.map((technology, index) => {
            const TechnologyIcon = TECHNOLOGY_ICONS[technology.id] ?? Braces;

            return (
              <article
                key={technology.id}
                className={`dc-tech-card dc-reveal ${visible ? "is-visible" : ""}`}
                style={{
                  "--tech-color": technology.cor,
                  "--delay": `${index * 55}ms`,
                }}
              >
                <div className="dc-tech-card__icon" aria-hidden="true">
                  <TechnologyIcon />
                </div>

                <h3>{technology.nome}</h3>
                <p>{technology.descricao}</p>

                <span className="dc-tech-card__status">
                  <span aria-hidden="true" />
                  incluída na formação
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
