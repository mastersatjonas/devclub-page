import {
  Bot,
  BrainCircuit,
  Code2,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import useReveal from "../hooks/useReveal";
import { RECURSOS_IA } from "../data/devclubData";
import iaDevClubImage from "../assets/ia-devclub.webp";

/**
 * Eu mantenho este mapa próximo da interface porque os ícones são uma
 * decisão visual. O arquivo de dados continua independente da biblioteca.
 */
const ICONS = {
  brain: BrainCircuit,
  code: Code2,
  bot: Bot,
  rocket: Rocket,
};

function AIResourceCard({ resource, index, visible }) {
  const Icon = ICONS[resource.icon] ?? Sparkles;
  const titleId = `${resource.id}-title`;

  return (
    <article
      className={`dc-ai-resource-card dc-reveal ${visible ? "is-visible" : ""}`}
      style={{ "--delay": `${140 + index * 90}ms` }}
      aria-labelledby={titleId}
    >
      <div className="dc-ai-resource-card__icon" aria-hidden="true">
        <Icon size={23} strokeWidth={1.9} />
      </div>

      <div className="dc-ai-resource-card__content">
        <h3 id={titleId}>{resource.title}</h3>
        <p>{resource.text}</p>
      </div>
    </article>
  );
}

/**
 * Eu posiciono a IA como ferramenta de ampliação, não como substituição
 * do raciocínio. A composição em duas colunas preserva leitura e impacto
 * visual sem transformar a imagem em ruído de fundo.
 */
export default function IADevClub() {
  const [sectionRef, visible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="ia-devclub"
      ref={sectionRef}
      className="dc-section dc-ai-section"
      aria-labelledby="ia-devclub-title"
    >
      <div className="dc-ai-section__background" aria-hidden="true" />

      <div className="dc-container dc-ai-section__container">
        <div className="dc-ai-section__layout">
          <div className={`dc-ai-section__content dc-reveal ${visible ? "is-visible" : ""}`}>
            <div className="dc-eyebrow dc-eyebrow--cyan">
              <Sparkles size={15} aria-hidden="true" />
              <span>inteligencia-artificial.ai</span>
            </div>

            <h2 id="ia-devclub-title" className="dc-section-title">
              A IA não substitui o desenvolvedor.
              <span> Ela amplia o que ele consegue construir.</span>
            </h2>

            <p className="dc-section-text dc-ai-section__description">
              No DevClub, a Inteligência Artificial faz parte da formação como ferramenta
              estratégica de apoio. O aluno aprende a formular boas perguntas, validar respostas,
              proteger informações e transformar ideias em soluções com mais eficiência e
              responsabilidade.
            </p>

            <div className="dc-ai-resources" aria-label="Benefícios da IA na formação">
              {RECURSOS_IA.map((resource, index) => (
                <AIResourceCard
                  key={resource.id}
                  resource={resource}
                  index={index}
                  visible={visible}
                />
              ))}
            </div>

            <aside
              className={`dc-ai-responsibility dc-reveal ${visible ? "is-visible" : ""}`}
              style={{ "--delay": "540ms" }}
              aria-label="Uso responsável da Inteligência Artificial"
            >
              <div className="dc-ai-responsibility__icon" aria-hidden="true">
                <ShieldCheck size={24} strokeWidth={1.9} />
              </div>

              <div>
                <strong>IA com responsabilidade</strong>
                <p>
                  O objetivo não é copiar respostas prontas. É analisar, validar, compreender e
                  assumir responsabilidade por cada decisão e por cada linha de código produzida.
                </p>
              </div>
            </aside>
          </div>

          <div
            className={`dc-ai-section__visual dc-reveal ${visible ? "is-visible" : ""}`}
            style={{ "--delay": "200ms" }}
          >
            <div className="dc-ai-section__visual-glow" aria-hidden="true" />

            <figure className="dc-ai-preview">
              <div className="dc-ai-preview__header" aria-hidden="true">
                <div className="dc-ai-preview__controls">
                  <span />
                  <span />
                  <span />
                </div>

                <small>devclub-ai.preview</small>

                <span className="dc-ai-preview__status">
                  <i />
                  online
                </span>
              </div>

              <div className="dc-ai-preview__image-wrapper">
                <img
                  src={iaDevClubImage}
                  alt="Representação de um cérebro digital conectado a interfaces de Inteligência Artificial"
                  className="dc-ai-preview__image"
                  width="1254"
                  height="1254"
                  loading="lazy"
                  decoding="async"
                />
                <div className="dc-ai-preview__image-overlay" aria-hidden="true" />
              </div>

              <figcaption className="dc-ai-preview__footer">
                <div>
                  <span>AI-assisted learning</span>
                  <small>Ambiente de aprendizado inteligente</small>
                </div>
                <span className="dc-ai-preview__badge">active</span>
              </figcaption>
            </figure>

            <div
              className="dc-ai-floating-status dc-ai-floating-status--top"
              aria-hidden="true"
            >
              <BrainCircuit size={17} />
              <div>
                <strong>AI Engine</strong>
                <small>ready</small>
              </div>
            </div>

            <div
              className="dc-ai-floating-status dc-ai-floating-status--bottom"
              aria-hidden="true"
            >
              <Code2 size={17} />
              <div>
                <strong>Code review</strong>
                <small>analisando contexto</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
