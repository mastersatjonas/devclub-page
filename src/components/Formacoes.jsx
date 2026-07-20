import { Braces, Code2, FileCode2 } from "lucide-react";
import useReveal from "../hooks/useReveal";
import { FORMACOES, PROJETOS } from "../data/devclubData";

/**
 * Eu apresento formações e projetos na mesma seção porque a proposta
 * só faz sentido quando o conteúdo está conectado a entregas práticas.
 */
export default function Formacoes() {
  const [sectionRef, visible] = useReveal();

  return (
    <section
      id="formacoes"
      ref={sectionRef}
      className="dc-section"
      aria-labelledby="formacoes-title"
    >
      <div className="dc-container">
        <div className="dc-eyebrow dc-eyebrow--cyan">
          <Braces size={14} aria-hidden="true" />
          <span>formacoes/</span>
        </div>

        <h2 id="formacoes-title" className="dc-section-title">
          escolha o arquivo que pode transformar sua carreira
        </h2>

        <div className="dc-card-grid dc-card-grid--four">
          {FORMACOES.map((formacao, index) => (
            <article
              key={formacao.id}
              className={`dc-card dc-reveal ${visible ? "is-visible" : ""}`}
              style={{ "--delay": `${index * 90}ms`, "--accent": formacao.color }}
            >
              <div className="dc-card__file" style={{ color: formacao.color }}>
                <FileCode2 size={13} aria-hidden="true" />
                {formacao.file}
              </div>
              <h3>{formacao.title}</h3>
              <p>{formacao.desc}</p>
              <div className="dc-tags" aria-label={`Tecnologias de ${formacao.title}`}>
                {formacao.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="dc-subsection" aria-labelledby="projetos-title">
          <div className="dc-eyebrow dc-eyebrow--pink">
            <Code2 size={14} aria-hidden="true" />
            <span>projetos.build</span>
          </div>

          <h3 id="projetos-title" className="dc-subsection-title">
            projetos que saem do tutorial
          </h3>

          <p className="dc-section-text">
            Exemplos demonstrativos de projetos que podem compor a jornada e o portfólio.
          </p>

          <div className="dc-card-grid dc-card-grid--three dc-project-grid">
            {PROJETOS.map((projeto, index) => (
              <article
                key={projeto.id}
                className={`dc-project-card dc-reveal ${visible ? "is-visible" : ""}`}
                style={{ "--delay": `${450 + index * 100}ms` }}
              >
                <h4>{projeto.titulo}</h4>
                <p>{projeto.descricao}</p>
                <div className="dc-tags" aria-label={`Stack do projeto ${projeto.titulo}`}>
                  {projeto.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
