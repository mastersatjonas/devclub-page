import { ClipboardCheck, FileCode2 } from "lucide-react";
import useReveal from "../hooks/useReveal";
import { COLORS, ETAPAS } from "../data/devclubData";

function DiffLine({ children, visible, delay = 0, kind = "add" }) {
  const color = kind === "add" ? COLORS.green : COLORS.red;
  const sign = kind === "add" ? "+" : "-";

  return (
    <div
      className={`dc-diff-line dc-diff-line--${kind} ${visible ? "is-visible" : ""}`}
      style={{ "--delay": `${delay}ms`, "--diff-color": color }}
    >
      <span className="dc-diff-line__sign" aria-hidden="true">
        {sign}
      </span>
      <span>{children}</span>
    </div>
  );
}

/**
 * Eu organizo esta seção como um git diff para transformar a proposta
 * pedagógica em uma narrativa visual coerente com o universo dev.
 */
export default function QuemSomos() {
  const [sectionRef, visible] = useReveal();

  return (
    <section
      id="quem-somos"
      ref={sectionRef}
      className="dc-section"
      aria-labelledby="quem-somos-title"
    >
      <div className="dc-container">
        <div className="dc-eyebrow dc-eyebrow--purple">
          <FileCode2 size={14} aria-hidden="true" />
          <span>quem-somos.md</span>
        </div>

        <h2 id="quem-somos-title" className="dc-section-title">
          git diff da sua trajetória
        </h2>

        <div className="dc-diff-card">
          <DiffLine kind="del" visible={visible}>
            currículo genérico, sem projeto e sem direção
          </DiffLine>
          <DiffLine kind="add" visible={visible} delay={80}>
            portfólio real com projetos compreendidos linha por linha
          </DiffLine>
          <DiffLine kind="del" visible={visible} delay={160}>
            estudar sozinho, travar sozinho e desistir sozinho
          </DiffLine>
          <DiffLine kind="add" visible={visible} delay={240}>
            comunidade, mentoria, revisão de código e acompanhamento
          </DiffLine>
          <DiffLine kind="del" visible={visible} delay={320}>
            curso que ensina sintaxe e termina sem prática
          </DiffLine>
          <DiffLine kind="add" visible={visible} delay={400}>
            formação conectada a projetos, portfólio e preparação profissional
          </DiffLine>
        </div>

        <p className={`dc-section-text dc-reveal ${visible ? "is-visible" : ""}`}>
          O DevClub apresenta uma jornada de aprendizado baseada em prática, consistência e
          acompanhamento. A proposta é reduzir a distância entre assistir aulas e conseguir
          construir soluções de verdade.
        </p>

        <div className="dc-subsection" aria-labelledby="metodologia-title">
          <div className="dc-eyebrow dc-eyebrow--green">
            <ClipboardCheck size={14} aria-hidden="true" />
            <span>metodologia.map</span>
          </div>

          <h3 id="metodologia-title" className="dc-subsection-title">
            como o aprendizado evolui
          </h3>

          <div className="dc-method-grid">
            {ETAPAS.map((etapa, index) => (
              <article
                key={etapa.id}
                className={`dc-method-card dc-reveal ${visible ? "is-visible" : ""}`}
                style={{ "--delay": `${500 + index * 90}ms` }}
              >
                <span className="dc-method-card__number" aria-hidden="true">
                  {etapa.numero}
                </span>
                <h4>{etapa.titulo}</h4>
                <p>{etapa.descricao}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
